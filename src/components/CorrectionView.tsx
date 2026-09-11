import React, { useState } from 'react';
import { AlertCircle, ArrowLeft, Check, CheckCircle2, RotateCcw, X } from 'lucide-react';
import { QuizEvaluation } from '../types';

interface CorrectionViewProps {
  evaluation: QuizEvaluation;
  onBackToResults: () => void;
  onRetakeQuiz: () => void;
}

export const CorrectionView: React.FC<CorrectionViewProps> = ({
  evaluation,
  onBackToResults,
  onRetakeQuiz
}) => {
  const { results, rawScore, maxScore, percentage } = evaluation;

  // Calcul des questions échouées (erreurs + non répondues)
  const failedResults = results.filter((item) => !item.isCorrect);
  const hasFailures = failedResults.length > 0;

  // Par défaut : afficher UNIQUEMENT les questions échouées si le candidat en a eu,
  // sinon (100%) afficher toutes les questions
  const [filterType, setFilterType] = useState<'failed' | 'all' | 'wrong' | 'correct' | 'unanswered'>(
    hasFailures ? 'failed' : 'all'
  );
  const [selectedChapterCode, setSelectedChapterCode] = useState<string>('all');

  const filteredResults = results.filter((item) => {
    if (filterType === 'failed' && item.isCorrect) return false;
    if (filterType === 'wrong' && (item.isCorrect || item.isUnanswered)) return false;
    if (filterType === 'correct' && !item.isCorrect) return false;
    if (filterType === 'unanswered' && !item.isUnanswered) return false;

    if (selectedChapterCode !== 'all' && item.question.chapterNumber !== selectedChapterCode) {
      return false;
    }

    return true;
  });

  const distinctChapters = Array.from(
    new Set(results.map((r) => r.question.chapterNumber))
  ).sort();

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      {/* Top Header */}
      <div className="mb-8 flex items-center justify-between pb-4 border-b border-slate-100">
        <button
          id="btn-correction-back-results"
          onClick={onBackToResults}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Retour au bilan</span>
        </button>

        <div className="flex items-center gap-3">
          <span className="text-xs font-mono text-slate-700">
            {rawScore} / {maxScore} points ({percentage}%)
          </span>
          <button
            onClick={onRetakeQuiz}
            className="px-3 py-1.5 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium transition-colors inline-flex items-center gap-1 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Recommencer</span>
          </button>
        </div>
      </div>

      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">
          Correction détaillée
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Explications officielles et analyse des réponses question par question.
        </p>
      </div>

      {/* Dynamic Banner & Primary Toggle (Show failed first, then button to show all) */}
      {hasFailures ? (
        <div className="mb-6 p-4 rounded-xl bg-slate-50 border border-slate-200/90 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-slate-700 shrink-0 mt-0.5" />
            <div>
              <div className="text-xs font-semibold text-slate-900">
                {filterType === 'failed' || filterType === 'wrong' || filterType === 'unanswered'
                  ? `Affichage prioritaire : vos ${failedResults.length} question(s) non réussie(s)`
                  : `Affichage complet : l'ensemble des ${results.length} questions`}
              </div>
              <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                {filterType === 'failed' || filterType === 'wrong' || filterType === 'unanswered'
                  ? "Seules vos erreurs et questions sans réponse sont affichées en premier pour cibler votre révision."
                  : "Toutes les questions (réussies et échouées) sont actuellement affichées."}
              </p>
            </div>
          </div>

          <button
            id="btn-toggle-view-all-failed"
            type="button"
            onClick={() => setFilterType(filterType === 'all' ? 'failed' : 'all')}
            className="px-3.5 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-medium transition-colors shrink-0 cursor-pointer shadow-xs"
          >
            {filterType === 'all'
              ? `Voir uniquement mes erreurs (${failedResults.length})`
              : `Voir toutes les réponses (${results.length})`}
          </button>
        </div>
      ) : (
        <div className="mb-6 p-4 rounded-xl bg-slate-50 border border-slate-200/90 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-slate-900 shrink-0" />
            <div>
              <div className="text-xs font-semibold text-slate-900">
                Score parfait (100%) !
              </div>
              <p className="text-xs text-slate-600 mt-0.5">
                Aucune question échouée. Vous consultez ci-dessous l'ensemble des réponses exactes et leurs explications pédagogiques.
              </p>
            </div>
          </div>
          <span className="text-[11px] font-semibold px-2.5 py-1 rounded bg-slate-900 text-white shrink-0">
            {results.length}/{results.length} correctes
          </span>
        </div>
      )}

      {/* Filter bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-8 border-b border-slate-100">
        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          {hasFailures && (
            <button
              type="button"
              id="tab-filter-failed"
              onClick={() => setFilterType('failed')}
              className={`px-2.5 py-1 rounded-md font-medium transition-colors cursor-pointer ${
                filterType === 'failed'
                  ? 'bg-slate-900 text-white'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              Échouées ({failedResults.length})
            </button>
          )}

          <button
            type="button"
            id="tab-filter-all"
            onClick={() => setFilterType('all')}
            className={`px-2.5 py-1 rounded-md font-medium transition-colors cursor-pointer ${
              filterType === 'all'
                ? 'bg-slate-900 text-white'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Toutes ({results.length})
          </button>

          {evaluation.wrongCount > 0 && (
            <button
              type="button"
              id="tab-filter-wrong"
              onClick={() => setFilterType('wrong')}
              className={`px-2.5 py-1 rounded-md font-medium transition-colors cursor-pointer ${
                filterType === 'wrong'
                  ? 'bg-slate-900 text-white'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              Erreurs ({evaluation.wrongCount})
            </button>
          )}

          {evaluation.unansweredCount > 0 && (
            <button
              type="button"
              id="tab-filter-unanswered"
              onClick={() => setFilterType('unanswered')}
              className={`px-2.5 py-1 rounded-md font-medium transition-colors cursor-pointer ${
                filterType === 'unanswered'
                  ? 'bg-slate-900 text-white'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              Sans réponse ({evaluation.unansweredCount})
            </button>
          )}

          <button
            type="button"
            id="tab-filter-correct"
            onClick={() => setFilterType('correct')}
            className={`px-2.5 py-1 rounded-md font-medium transition-colors cursor-pointer ${
              filterType === 'correct'
                ? 'bg-slate-900 text-white'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Correctes ({evaluation.correctCount})
          </button>
        </div>

        <div>
          <select
            value={selectedChapterCode}
            onChange={(e) => setSelectedChapterCode(e.target.value)}
            className="text-xs text-slate-700 bg-slate-50 border border-slate-200 rounded-md px-2 py-1 focus:outline-none"
          >
            <option value="all">Tous les chapitres</option>
            {distinctChapters.map((code) => (
              <option key={code} value={code}>
                Chapitre {code}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Questions list (Unbordered, separated by whitespace & subtle dividers) */}
      <div className="space-y-12">
        {filteredResults.length === 0 ? (
          <div className="py-12 text-center text-xs text-slate-500">
            Aucune question pour ce filtre.
          </div>
        ) : (
          filteredResults.map((item) => {
            const { question, userAnswer, correctAnswer, isCorrect, isUnanswered, points, explanation } = item;

            let statusLabel = 'Sans réponse (0 point)';
            if (isCorrect) {
              statusLabel = 'Réponse exacte (+2 points)';
            } else if (!isUnanswered) {
              statusLabel = 'Réponse inexacte (-1 point)';
            }

            return (
              <div key={question.id} className="pb-10 border-b border-slate-100">
                {/* Meta row */}
                <div className="flex items-baseline justify-between gap-4 mb-2">
                  <div className="text-xs text-slate-500">
                    {question.chapterTitle} • Question {question.questionNumber}
                  </div>
                  <div className="text-xs font-medium text-slate-900">
                    {statusLabel}
                  </div>
                </div>

                {/* Question title */}
                <h2 className="text-base font-medium text-slate-900 mb-4 leading-relaxed">
                  {question.text}
                </h2>

                {/* Options list */}
                <div className="space-y-1.5 mb-4 text-xs sm:text-sm">
                  {question.options.map((opt) => {
                    const isSelectedByUser = userAnswer === opt.key;
                    const isOfficialCorrect = correctAnswer === opt.key;

                    let rowStyle = 'text-slate-600 hover:bg-slate-50/80';
                    let badgeStyle = 'bg-slate-100 text-slate-600';

                    if (isOfficialCorrect) {
                      rowStyle = 'bg-slate-100/90 text-slate-900 font-medium';
                      badgeStyle = 'bg-slate-900 text-white';
                    } else if (isSelectedByUser) {
                      rowStyle = 'bg-slate-50 text-slate-900';
                      badgeStyle = 'bg-slate-300 text-slate-800';
                    }

                    return (
                      <div
                        key={opt.key}
                        className={`p-3 rounded-md flex items-start gap-3 transition-colors ${rowStyle}`}
                      >
                        <div
                          className={`w-5 h-5 rounded flex items-center justify-center font-semibold text-xs shrink-0 mt-0.5 ${badgeStyle}`}
                        >
                          {opt.key}
                        </div>

                        <div className="flex-1 leading-relaxed">{opt.text}</div>

                        <div className="shrink-0 text-xs text-slate-500 font-normal">
                          {isOfficialCorrect && (
                            <span className="font-semibold text-slate-900">
                              ✓ Bonne réponse
                            </span>
                          )}
                          {isSelectedByUser && !isOfficialCorrect && (
                            <span>
                              ✗ Votre choix
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Question evaluation summary */}
                <div className="flex items-center gap-3 text-xs text-slate-500 mb-3">
                  <span>Votre réponse : <strong className="text-slate-900 font-medium">{userAnswer || 'Aucune'}</strong></span>
                  <span>•</span>
                  <span>Bonne réponse : <strong className="text-slate-900 font-medium">{correctAnswer}</strong></span>
                  <span>•</span>
                  <span>Points : <strong className="text-slate-900 font-medium">{points > 0 ? `+${points}` : points}</strong></span>
                </div>

                {/* Explanation block (Verbatim instructor rationale) */}
                {explanation && (
                  <div className="bg-slate-50 p-3.5 rounded-lg text-xs leading-relaxed text-slate-700">
                    <span className="font-semibold text-slate-900 block mb-1">
                      Explication officielle :
                    </span>
                    <p className="whitespace-pre-line">{explanation}</p>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Bottom link */}
      <div className="pt-6 flex items-center justify-between">
        <button
          onClick={onBackToResults}
          className="text-xs font-medium text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
        >
          ← Retour au bilan
        </button>

        <button
          onClick={onRetakeQuiz}
          className="px-5 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-medium transition-colors cursor-pointer"
        >
          Recommencer une évaluation
        </button>
      </div>
    </div>
  );
};
