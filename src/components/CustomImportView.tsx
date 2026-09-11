import React, { useRef, useState } from 'react';
import { 
  AlertCircle, 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2, 
  Download, 
  Eye, 
  FileSpreadsheet, 
  FileText, 
  Layers, 
  Sparkles, 
  Upload 
} from 'lucide-react';
import { Chapter, Question } from '../types';
import { downloadCsvTemplate, parseAndValidateCsv } from '../utils/csvParser';
import { parseMarkdownQuiz } from '../utils/markdownParser';

interface CustomImportViewProps {
  onBackToHome: () => void;
  onConfirmImport: (importedChapters: Chapter[], totalQuestions: number, bankTitle: string) => void;
}

export const CustomImportView: React.FC<CustomImportViewProps> = ({
  onBackToHome,
  onConfirmImport
}) => {
  const [activeTab, setActiveTab] = useState<'csv' | 'markdown'>('csv');
  const [bankTitle, setBankTitle] = useState<string>('Test Personnalisé');
  
  // CSV state
  const [csvContent, setCsvContent] = useState<string>('');
  const [fileName, setFileName] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [isPastingText, setIsPastingText] = useState<boolean>(false);

  // Markdown state
  const [markdownContent, setMarkdownContent] = useState<string>('');

  // Validation results
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [validationWarnings, setValidationWarnings] = useState<string[]>([]);
  const [parsedChapters, setParsedChapters] = useState<Chapter[]>([]);
  const [parsedQuestions, setParsedQuestions] = useState<Question[]>([]);
  const [hasValidated, setHasValidated] = useState<boolean>(false);
  const [showQuestionsPreview, setShowQuestionsPreview] = useState<boolean>(true);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Traiter un fichier CSV uploadé
  const handleFileUpload = (file: File) => {
    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      setCsvContent(text);
      validateCsv(text, file.name);
    };
    reader.readAsText(file, 'UTF-8');
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      handleFileUpload(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  // Validation CSV
  const validateCsv = (content: string, name?: string) => {
    const result = parseAndValidateCsv(content);
    setValidationErrors(result.errors);
    setValidationWarnings(result.warnings);
    setParsedChapters(result.chapters);
    setParsedQuestions(result.allQuestions);
    setHasValidated(true);

    if (name && !bankTitle) {
      const cleanName = name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ');
      setBankTitle(cleanName);
    }
  };

  // Validation Markdown
  const validateMarkdown = (content: string) => {
    const result = parseMarkdownQuiz(content);
    const errors: string[] = [];
    if (!content.trim()) {
      errors.push('Le contenu Markdown est vide.');
    } else if (result.allQuestions.length === 0) {
      errors.push('Aucune question détectée dans ce texte Markdown. Vérifiez la présence des balises ### Question et des options - [x] ou - [ ].');
    }

    setValidationErrors(errors);
    setValidationWarnings(result.warnings);
    setParsedChapters(result.chapters);
    setParsedQuestions(result.allQuestions);
    setHasValidated(true);
  };

  const handleConfirm = () => {
    if (parsedChapters.length === 0 || parsedQuestions.length === 0) return;
    onConfirmImport(parsedChapters, parsedQuestions.length, bankTitle.trim() || 'Test Personnalisé');
  };

  // Exemples d'aperçu (3 questions)
  const previewQuestions = parsedQuestions.slice(0, 3);

  return (
    <div className="max-w-3xl mx-auto px-6 py-10 sm:py-14">
      {/* Top row: Back link */}
      <div className="mb-6">
        <button
          id="btn-back-home-import"
          type="button"
          onClick={onBackToHome}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Retour à l'accueil</span>
        </button>
      </div>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
          <span>Banque Personnalisée</span>
          <span>•</span>
          <span className="text-slate-900">Évaluation Sur-Mesure</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-semibold text-slate-900 tracking-tight leading-tight mb-2">
          Créer un test personnalisé
        </h1>
        <p className="text-sm text-slate-600 leading-relaxed max-w-2xl">
          Importez votre propre jeu de questions pour créer une session d'examen autonome, 
          avec le même barème officiel (+2 / -1 / 0), minuterie, et analyse détaillée.
        </p>
      </div>

      {/* Tab Selector: CSV vs Markdown */}
      <div className="flex items-center gap-2 mb-6 border-b border-slate-200">
        <button
          type="button"
          id="tab-select-csv"
          onClick={() => {
            setActiveTab('csv');
            if (csvContent) validateCsv(csvContent);
            else {
              setHasValidated(false);
              setValidationErrors([]);
              setParsedChapters([]);
              setParsedQuestions([]);
            }
          }}
          className={`pb-3 px-3 text-sm font-medium transition-colors cursor-pointer relative ${
            activeTab === 'csv'
              ? 'text-slate-900 font-semibold'
              : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          <div className="flex items-center gap-2">
            <FileSpreadsheet className="w-4 h-4" />
            <span>Fichier CSV (Recommandé)</span>
          </div>
          {activeTab === 'csv' && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-slate-900 rounded-full" />
          )}
        </button>

        <button
          type="button"
          id="tab-select-markdown"
          onClick={() => {
            setActiveTab('markdown');
            if (markdownContent) validateMarkdown(markdownContent);
            else {
              setHasValidated(false);
              setValidationErrors([]);
              setParsedChapters([]);
              setParsedQuestions([]);
            }
          }}
          className={`pb-3 px-3 text-sm font-medium transition-colors cursor-pointer relative ${
            activeTab === 'markdown'
              ? 'text-slate-900 font-semibold'
              : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            <span>Format Markdown</span>
          </div>
          {activeTab === 'markdown' && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-slate-900 rounded-full" />
          )}
        </button>
      </div>

      {/* CSV TAB CONTENT */}
      {activeTab === 'csv' && (
        <div className="space-y-6">
          {/* Download Template Banner (Requirement 3) */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="text-xs font-semibold text-slate-900 mb-0.5 flex items-center gap-1.5">
                <Download className="w-4 h-4 text-slate-700" />
                <span>Modèle de fichier CSV prêt à l'emploi</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Téléchargez notre fichier modèle pré-rempli avec les 8 colonnes requises et des exemples de questions.
              </p>
            </div>
            <button
              type="button"
              id="btn-download-csv-template"
              onClick={downloadCsvTemplate}
              className="px-4 py-2 rounded-lg bg-white hover:bg-slate-100 text-slate-900 border border-slate-300 text-xs font-medium transition-colors inline-flex items-center gap-2 shrink-0 shadow-2xs cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-slate-600" />
              <span>Télécharger le modèle (.csv)</span>
            </button>
          </div>

          {/* Column structure explanation */}
          <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-100 text-xs text-slate-600 space-y-1">
            <div className="font-semibold text-slate-800 mb-1">Structure requise des colonnes CSV :</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-[11px]">
              <div><code className="text-slate-900 bg-white px-1 py-0.5 rounded border border-slate-200">id</code> : identifiant unique (ex: 1, 2)</div>
              <div><code className="text-slate-900 bg-white px-1 py-0.5 rounded border border-slate-200">chapter</code> : numéro de chapitre (ex: 2.1)</div>
              <div><code className="text-slate-900 bg-white px-1 py-0.5 rounded border border-slate-200">question</code> : énoncé complet</div>
              <div><code className="text-slate-900 bg-white px-1 py-0.5 rounded border border-slate-200">option_a à d</code> : les 4 choix</div>
              <div><code className="text-slate-900 bg-white px-1 py-0.5 rounded border border-slate-200">correct_answer</code> : A, B, C ou D</div>
              <div><code className="text-slate-900 bg-white px-1 py-0.5 rounded border border-slate-200">explanation</code> : explication (optionnel)</div>
            </div>
          </div>

          {/* Test Name Input */}
          <div>
            <label htmlFor="input-bank-title" className="block text-xs font-semibold text-slate-700 mb-1.5">
              Nom du test personnalisé :
            </label>
            <input
              id="input-bank-title"
              type="text"
              value={bankTitle}
              onChange={(e) => setBankTitle(e.target.value)}
              placeholder="Ex : Révision Météorologie & Réglementation"
              className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-slate-900 transition-colors"
            />
          </div>

          {/* Drag & Drop File Upload or Textarea Paste */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-700">Fichier de questions :</span>
              <button
                type="button"
                onClick={() => setIsPastingText(!isPastingText)}
                className="text-xs text-slate-600 hover:text-slate-900 underline cursor-pointer"
              >
                {isPastingText ? "Déposer un fichier à la place" : "Ou coller directement du texte CSV"}
              </button>
            </div>

            {!isPastingText ? (
              <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onClick={() => fileInputRef.current?.click()}
                className={`p-8 rounded-xl border-2 border-dashed text-center transition-all cursor-pointer ${
                  isDragging
                    ? 'border-slate-900 bg-slate-50'
                    : 'border-slate-200 hover:border-slate-400 bg-white hover:bg-slate-50/50'
                }`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".csv,text/csv"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files && e.target.files.length > 0) {
                      handleFileUpload(e.target.files[0]);
                    }
                  }}
                />
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-700 mx-auto mb-3">
                  <Upload className="w-5 h-5" />
                </div>
                <div className="text-sm font-semibold text-slate-900 mb-1">
                  {fileName ? fileName : 'Glissez-déposez votre fichier CSV ici'}
                </div>
                <p className="text-xs text-slate-500">
                  {fileName ? 'Cliquez pour changer de fichier' : 'Ou cliquez pour parcourir vos fichiers (.csv)'}
                </p>
              </div>
            ) : (
              <div>
                <textarea
                  id="textarea-csv-paste"
                  rows={8}
                  value={csvContent}
                  onChange={(e) => {
                    setCsvContent(e.target.value);
                    validateCsv(e.target.value);
                  }}
                  placeholder="id,chapter,question,option_a,option_b,option_c,option_d,correct_answer,explanation&#10;1,2.1,&quot;Quelle force compense le poids ?&quot;,&quot;Traînée&quot;,&quot;Portance&quot;,&quot;Poussée&quot;,&quot;Tension&quot;,&quot;B&quot;,&quot;Explication...&quot;"
                  className="w-full font-mono text-xs p-3.5 rounded-lg border border-slate-200 focus:outline-none focus:border-slate-900 leading-relaxed text-slate-800"
                />
              </div>
            )}
          </div>
        </div>
      )}

      {/* MARKDOWN TAB CONTENT (Requirement 14) */}
      {activeTab === 'markdown' && (
        <div className="space-y-6">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 text-xs text-slate-600">
            <div className="font-semibold text-slate-900 mb-1">Format Markdown supporté :</div>
            <p className="leading-relaxed mb-2">
              Vous pouvez coller des questions au même format Markdown que les modules de cours officiels :
              titres de chapitre <code>## Chapitre...</code>, questions <code>### Question...</code>, et options <code>- [x] Bonne réponse</code> ou <code>- [ ] Réponse fausse</code>.
            </p>
          </div>

          <div>
            <label htmlFor="input-bank-title-md" className="block text-xs font-semibold text-slate-700 mb-1.5">
              Nom du test :
            </label>
            <input
              id="input-bank-title-md"
              type="text"
              value={bankTitle}
              onChange={(e) => setBankTitle(e.target.value)}
              placeholder="Ex : Questions Spécifiques Drone"
              className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-slate-900 transition-colors"
            />
          </div>

          <div>
            <label htmlFor="textarea-markdown-paste" className="block text-xs font-semibold text-slate-700 mb-1.5">
              Contenu Markdown :
            </label>
            <textarea
              id="textarea-markdown-paste"
              rows={10}
              value={markdownContent}
              onChange={(e) => {
                setMarkdownContent(e.target.value);
                validateMarkdown(e.target.value);
              }}
              placeholder="## 2.1 Aérodynamique&#10;&#10;### Question 1&#10;Quelle force équilibre le poids en vol stationnaire ?&#10;&#10;- [ ] La traînée&#10;- [x] La portance&#10;- [ ] L'effet de sol&#10;- [ ] L'inertie&#10;&#10;> Explication : La portance équilibre exactement le poids."
              className="w-full font-mono text-xs p-3.5 rounded-lg border border-slate-200 focus:outline-none focus:border-slate-900 leading-relaxed text-slate-800"
            />
          </div>
        </div>
      )}

      {/* VALIDATION & ERROR REPORTING (Requirement 4) */}
      {hasValidated && (
        <div className="mt-8 space-y-6">
          {validationErrors.length > 0 ? (
            <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-900">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <div className="text-xs font-semibold">
                    Erreurs de validation détectées ({validationErrors.length})
                  </div>
                  <p className="text-xs text-rose-800 leading-relaxed">
                    Veuillez corriger ces anomalies pour pouvoir configurer votre examen :
                  </p>
                  <ul className="list-disc list-inside text-xs space-y-1 mt-2 text-rose-700 max-h-48 overflow-y-auto pr-2">
                    {validationErrors.map((err, idx) => (
                      <li key={idx}>{err}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-4 rounded-xl bg-slate-900 text-white flex items-center justify-between gap-4 shadow-sm">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <div>
                  <div className="text-xs font-semibold text-white">
                    Fichier validé avec succès
                  </div>
                  <div className="text-xs text-slate-300 mt-0.5">
                    {parsedQuestions.length} question(s) réparties en {parsedChapters.length} thème(s)
                  </div>
                </div>
              </div>

              <button
                type="button"
                id="btn-confirm-import-top"
                onClick={handleConfirm}
                className="px-5 py-2.5 rounded-lg bg-white text-slate-900 hover:bg-slate-100 text-xs font-semibold transition-colors inline-flex items-center gap-2 cursor-pointer shrink-0"
              >
                <span>Confirmer et configurer le test</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* PREVIEW OF IMPORTED QUESTIONS (Requirement 5) */}
          {parsedQuestions.length > 0 && validationErrors.length === 0 && (
            <div className="border border-slate-200 rounded-xl p-5 bg-white space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div>
                  <h3 className="text-sm font-semibold text-slate-900">
                    Aperçu des questions importées
                  </h3>
                  <div className="text-xs text-slate-500 mt-0.5">
                    {parsedQuestions.length} questions au total • {parsedChapters.length} chapitres
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs text-slate-600">
                  <span className="font-medium">Chapitres détectés :</span>
                  <div className="flex flex-wrap gap-1">
                    {parsedChapters.map((c) => (
                      <span
                        key={c.id}
                        className="px-2 py-0.5 rounded bg-slate-100 text-slate-800 text-[11px] font-medium"
                      >
                        {c.code} ({c.questions.length} Q)
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sample preview */}
              <div className="space-y-4">
                <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Échantillon des premières questions :
                </div>

                {previewQuestions.map((q, idx) => (
                  <div key={q.id} className="p-3.5 rounded-lg bg-slate-50/70 border border-slate-100 text-xs">
                    <div className="flex items-center justify-between text-slate-500 mb-1.5">
                      <span className="font-semibold text-slate-700">Question #{idx + 1} (id: {q.id})</span>
                      <span className="font-mono text-[11px]">{q.chapterTitle}</span>
                    </div>

                    <div className="font-medium text-slate-900 mb-2.5 leading-snug">
                      {q.text}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-slate-700">
                      {q.options.map((opt) => {
                        const isCorrect = opt.key === q.correctAnswer;
                        return (
                          <div
                            key={opt.key}
                            className={`px-2.5 py-1.5 rounded flex items-center gap-2 ${
                              isCorrect
                                ? 'bg-emerald-50 text-emerald-900 font-medium border border-emerald-200/60'
                                : 'bg-white border border-slate-200/60 text-slate-600'
                            }`}
                          >
                            <span className="font-mono font-semibold">{opt.key}.</span>
                            <span className="truncate">{opt.text}</span>
                            {isCorrect && (
                              <span className="ml-auto text-[10px] uppercase tracking-wider font-semibold text-emerald-700">
                                Réponse
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {q.explanation && (
                      <div className="mt-2 text-[11px] text-slate-500 italic bg-white/70 p-2 rounded border border-slate-100">
                        Justification : {q.explanation}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Final Confirm CTA */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-end">
                <button
                  type="button"
                  id="btn-confirm-import-bottom"
                  onClick={handleConfirm}
                  className="px-6 py-3 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-medium text-sm transition-colors inline-flex items-center gap-2 cursor-pointer shadow-xs"
                >
                  <span>Confirmer et configurer le test ({parsedQuestions.length} Q)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
