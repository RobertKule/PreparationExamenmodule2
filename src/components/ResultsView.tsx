import React from 'react';
import { ArrowRight, Printer, RotateCcw } from 'lucide-react';
import { QuizEvaluation } from '../types';

interface ResultsViewProps {
  evaluation: QuizEvaluation;
  onViewCorrection: () => void;
  onRetakeSameQuiz: () => void;
  onNewQuiz: () => void;
}

export const ResultsView: React.FC<ResultsViewProps> = ({
  evaluation,
  onViewCorrection,
  onRetakeSameQuiz,
  onNewQuiz
}) => {
  const {
    rawScore,
    maxScore,
    percentage,
    correctCount,
    wrongCount,
    unansweredCount,
    totalQuestions,
    isPassed,
    passThreshold,
    timeSpentFormatted,
    timeRemainingFormatted,
    chapterSummaries,
    weakestChapters
  } = evaluation;

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      {/* 1. Master Evaluation Summary */}
      <div className="pb-8 border-b border-slate-100 mb-8">
        <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
          Bilan de l'examen • {isPassed ? 'Examen validé' : 'Examen non validé'}
        </div>

        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 mb-4">
          <h1 className="text-4xl sm:text-5xl font-semibold text-slate-900 tracking-tight">
            {percentage}%
          </h1>
          <div className="text-sm text-slate-600 font-mono">
            {rawScore} / {maxScore} points • Seuil requis : {passThreshold}%
          </div>
        </div>

        <p className="text-sm text-slate-600 leading-relaxed max-w-2xl mb-6">
          {isPassed
            ? `Félicitations. Vous avez atteint le seuil d'admissibilité de ${passThreshold}%${evaluation.moduleName ? ` sur le ${evaluation.moduleName}` : ''}.`
            : `Le score obtenu reste inférieur au seuil d'admissibilité de ${passThreshold}%. Révisez les notions clés ci-dessous avant de retenter l'examen.`}
        </p>

        <div className="flex flex-wrap items-center gap-3">
          <button
            id="btn-results-view-correction"
            onClick={onViewCorrection}
            className="px-5 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-medium transition-colors inline-flex items-center gap-2 cursor-pointer"
          >
            <span>Consulter la correction détaillée</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <button
            id="btn-results-retake"
            onClick={onRetakeSameQuiz}
            className="px-4 py-2.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium transition-colors inline-flex items-center gap-1.5 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Recommencer</span>
          </button>

          <button
            id="btn-results-new-config"
            onClick={onNewQuiz}
            className="px-4 py-2.5 rounded-lg text-slate-600 hover:text-slate-900 text-xs font-medium transition-colors cursor-pointer"
          >
            <span>Nouvelle sélection</span>
          </button>

          <button
            type="button"
            onClick={() => window.print()}
            className="ml-auto text-slate-500 hover:text-slate-900 text-xs font-medium flex items-center gap-1 cursor-pointer"
            title="Imprimer cette page"
          >
            <Printer className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Imprimer</span>
          </button>
        </div>
      </div>

      {/* 2. Key Metrics List (Flat, unbordered) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 py-4 mb-10 text-sm">
        <div>
          <div className="text-xl font-semibold text-slate-900">{correctCount}</div>
          <div className="text-xs text-slate-500 mt-0.5">Correctes (+{correctCount * 2} pts)</div>
        </div>
        <div>
          <div className="text-xl font-semibold text-slate-900">{wrongCount}</div>
          <div className="text-xs text-slate-500 mt-0.5">Erreurs (-{wrongCount} pts)</div>
        </div>
        <div>
          <div className="text-xl font-semibold text-slate-900">{unansweredCount}</div>
          <div className="text-xs text-slate-500 mt-0.5">Sans réponse (0 pt)</div>
        </div>
        <div>
          <div className="text-xl font-semibold text-slate-900 font-mono">{timeSpentFormatted}</div>
          <div className="text-xs text-slate-500 mt-0.5">Temps écoulé</div>
        </div>
      </div>

      {/* 3. Recommandations prioritaires / Chapitres avec erreurs */}
      {weakestChapters.length > 0 && (
        <div className="mb-10 pb-8 border-b border-slate-100">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3">
            Chapitres à réviser en priorité
          </h2>
          <div className="divide-y divide-slate-100 text-xs">
            {weakestChapters.map((wc) => (
              <div key={wc.chapterId} className="py-2.5 flex items-center justify-between">
                <span className="font-medium text-slate-900">
                  {wc.chapterCode} — {wc.chapterTitle}
                </span>
                <span className="text-slate-600">
                  {wc.wrongCount} erreur{wc.wrongCount > 1 ? 's' : ''} ({wc.percentage}%)
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. Tableau par chapitre (Clean, unbordered) */}
      <div className="mb-10">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-2">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Détail des résultats par chapitre
          </h2>
          <span className="text-xs text-slate-500">
            {chapterSummaries.length} chapitres
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="text-slate-500 border-b border-slate-100 font-medium">
              <tr>
                <th className="py-2.5 pr-4">Chapitre</th>
                <th className="py-2.5 text-center">Total</th>
                <th className="py-2.5 text-center">Correctes</th>
                <th className="py-2.5 text-center">Erreurs</th>
                <th className="py-2.5 text-center">Vides</th>
                <th className="py-2.5 text-right">Points</th>
                <th className="py-2.5 text-right pl-4">Note</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {chapterSummaries.map((cs) => (
                <tr key={cs.chapterId} className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-2.5 pr-4 font-medium text-slate-900">
                    {cs.chapterCode} — {cs.chapterTitle}
                  </td>
                  <td className="py-2.5 text-center">{cs.totalQuestions}</td>
                  <td className="py-2.5 text-center">{cs.correctCount}</td>
                  <td className="py-2.5 text-center">{cs.wrongCount}</td>
                  <td className="py-2.5 text-center text-slate-400">{cs.unansweredCount}</td>
                  <td className="py-2.5 text-right font-mono font-medium text-slate-900">
                    {cs.points} / {cs.maxPoints}
                  </td>
                  <td className="py-2.5 text-right pl-4 font-semibold text-slate-900">
                    {cs.percentage}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="pt-4 flex items-center justify-between">
        <button
          onClick={onNewQuiz}
          className="text-xs font-medium text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
        >
          ← Retour aux chapitres
        </button>

        <button
          onClick={onViewCorrection}
          className="px-6 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-medium transition-colors inline-flex items-center gap-2 cursor-pointer"
        >
          <span>Examiner les questions et explications</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
