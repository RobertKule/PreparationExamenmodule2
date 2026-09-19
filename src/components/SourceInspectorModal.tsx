import React, { useEffect, useState } from 'react';
import { Check, Copy, RefreshCw, Upload, X } from 'lucide-react';
import { MODULE_1_MARKDOWN_SOURCE, MODULE_2_MARKDOWN_SOURCE } from '../data/rawMarkdown';
import { MODULE_5_CSV_SOURCE } from '../data/module5Csv';
import { ModuleId } from '../types';
import { parseMarkdownQuiz, ParseResult } from '../utils/markdownParser';
import { MODULE_DEFINITIONS } from '../utils/quizDataLoader';

interface SourceInspectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyCustomMarkdown: (markdown: string) => void;
  onResetDefaultMarkdown: () => void;
  activeMarkdownText: string;
  selectedModuleId: ModuleId;
  onSelectModule?: (modId: ModuleId) => void;
}

export const SourceInspectorModal: React.FC<SourceInspectorModalProps> = ({
  isOpen,
  onClose,
  onApplyCustomMarkdown,
  onResetDefaultMarkdown,
  activeMarkdownText,
  selectedModuleId,
  onSelectModule
}) => {
  const [editorText, setEditorText] = useState(activeMarkdownText);
  const [copied, setCopied] = useState(false);
  const [parseResult, setParseResult] = useState<ParseResult>(() =>
    parseMarkdownQuiz(activeMarkdownText)
  );

  useEffect(() => {
    setEditorText(activeMarkdownText);
    setParseResult(parseMarkdownQuiz(activeMarkdownText));
  }, [activeMarkdownText, isOpen]);

  if (!isOpen) return null;

  const currentMod = MODULE_DEFINITIONS[selectedModuleId];

  const handleReanalyze = () => {
    const res = parseMarkdownQuiz(editorText);
    setParseResult(res);
  };

  const handleApply = () => {
    handleReanalyze();
    onApplyCustomMarkdown(editorText);
    onClose();
  };

  const getDefaultSourceForCurrentModule = () => {
    if (selectedModuleId === 'module-1') return MODULE_1_MARKDOWN_SOURCE;
    if (selectedModuleId === 'module-2') return MODULE_2_MARKDOWN_SOURCE;
    if (selectedModuleId === 'module-5' || selectedModuleId === 'module-5-all') return MODULE_5_CSV_SOURCE;
    return `${MODULE_1_MARKDOWN_SOURCE}\n\n${MODULE_2_MARKDOWN_SOURCE}\n\n# MODULE 5 (CSV)\n${MODULE_5_CSV_SOURCE}`;
  };

  const handleReset = () => {
    const def = getDefaultSourceForCurrentModule();
    setEditorText(def);
    setParseResult(parseMarkdownQuiz(def));
    onResetDefaultMarkdown();
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(editorText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const text = ev.target?.result as string;
      if (text) {
        setEditorText(text);
        setParseResult(parseMarkdownQuiz(text));
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40">
      <div className="bg-white rounded-xl max-w-3xl w-full max-h-[85vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-semibold text-slate-900">
                Fichier source Markdown
              </h2>
              <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                {currentMod.badge}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Source de vérité pédagogique du cours ({currentMod.name})
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-7 h-7 rounded-md hover:bg-slate-100 text-slate-500 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Diagnostics strip */}
        <div className="px-5 py-2.5 bg-slate-50 border-b border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-600">
          <div className="flex items-center gap-4">
            <span>{parseResult.chapters.length} chapitres</span>
            <span>•</span>
            <span>{parseResult.totalQuestions} questions</span>
            {parseResult.warnings.length > 0 && (
              <>
                <span>•</span>
                <span className="text-slate-900 font-medium">{parseResult.warnings.length} avertissement(s)</span>
              </>
            )}
          </div>

          <div className="flex items-center gap-2">
            <label className="text-xs font-medium text-slate-600 hover:text-slate-900 cursor-pointer flex items-center gap-1">
              <Upload className="w-3.5 h-3.5" />
              <span>Charger .md</span>
              <input
                type="file"
                accept=".md,.txt"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>

            <button
              onClick={handleCopy}
              className="text-xs font-medium text-slate-600 hover:text-slate-900 cursor-pointer flex items-center gap-1"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copié' : 'Copier'}</span>
            </button>

            <button
              onClick={handleReset}
              className="text-xs font-medium text-slate-600 hover:text-slate-900 cursor-pointer flex items-center gap-1"
              title="Restaurer le fichier original"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Réinitialiser</span>
            </button>
          </div>
        </div>

        {/* Editor Area */}
        <div className="flex-1 p-4 overflow-hidden flex flex-col">
          <textarea
            value={editorText}
            onChange={(e) => setEditorText(e.target.value)}
            onBlur={handleReanalyze}
            className="flex-1 w-full p-3 font-mono text-xs leading-relaxed bg-slate-50 text-slate-800 rounded-lg border-0 focus:outline-none focus:ring-1 focus:ring-slate-400 resize-none overflow-y-auto"
            rows={14}
          />
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 flex items-center justify-between">
          <button
            type="button"
            onClick={handleReanalyze}
            className="text-xs font-medium text-slate-600 hover:text-slate-900 cursor-pointer"
          >
            Vérifier la structure
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-1.5 rounded-md text-xs font-medium text-slate-600 hover:bg-slate-100 cursor-pointer"
            >
              Fermer
            </button>
            <button
              type="button"
              onClick={handleApply}
              className="px-4 py-1.5 rounded-md bg-slate-900 hover:bg-slate-800 text-white text-xs font-medium cursor-pointer"
            >
              Appliquer ({parseResult.totalQuestions} Q)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
