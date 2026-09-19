import React, { useRef, useState } from 'react';
import { 
  AlertTriangle,
  ArrowDown,
  ArrowRight, 
  BookOpen, 
  Check, 
  CheckCircle2, 
  Download,
  HelpCircle, 
  Home, 
  Play,
  Printer, 
  RotateCcw, 
  X, 
  XCircle 
} from 'lucide-react';
import { QuestionResult, QuizEvaluation } from '../types';
import { exportResultsToCsv } from '../utils/csvParser';

interface ResultsViewProps {
  evaluation: QuizEvaluation;
  onViewCorrection: () => void;
  onRetakeSameQuiz: () => void;
  onNewQuiz: () => void;
  onResumeQuiz?: () => void;
  canResume?: boolean;
  onReviewRecommendedChapters?: (chapterIds: string[]) => void;
}

export const ResultsView: React.FC<ResultsViewProps> = ({
  evaluation,
  onViewCorrection,
  onRetakeSameQuiz,
  onNewQuiz,
  onResumeQuiz,
  canResume = false,
  onReviewRecommendedChapters
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
    results,
    chapterSummaries,
    weakestChapters,
    status
  } = evaluation;

  const isInterrupted = status === 'INTERRUPTED' || status === 'INTERROMPU' || evaluation.isInterrupted;
  const answeredCount = evaluation.answeredCount ?? (correctCount + wrongCount);

  const reviewSectionRef = useRef<HTMLDivElement>(null);
  const questionAnalysisRef = useRef<HTMLDivElement>(null);

  // Filter incorrect results and unanswered
  const incorrectResults = results.filter((r) => !r.isCorrect);
  const [filterMode, setFilterMode] = useState<'errors' | 'all'>(incorrectResults.length > 0 ? 'errors' : 'all');
  const displayedResults = filterMode === 'errors' ? incorrectResults : results;

  // Chapter IDs that have errors
  const chaptersWithErrorsIds = weakestChapters.map((wc) => wc.chapterId);

  const scrollToReview = () => {
    reviewSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToQuestions = () => {
    questionAnalysisRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleReviewRecommended = () => {
    if (onReviewRecommendedChapters && chaptersWithErrorsIds.length > 0) {
      onReviewRecommendedChapters(chaptersWithErrorsIds);
    } else {
      scrollToReview();
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-10 sm:py-12">
      {/* 1. Master Evaluation Card */}
      <div className="pb-8 border-b border-slate-100 mb-8">
        
        {/* Status badges */}
        <div className="flex flex-wrap items-center gap-2 mb-3">
          {isInterrupted ? (
            <>
              <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-amber-100 text-amber-900 border border-amber-300">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-700" />
                <span>Statut : INTERROMPU</span>
              </span>
              <span className="text-xs text-slate-500 font-medium">
                {evaluation.moduleName || 'Session d\'évaluation'}
              </span>
            </>
          ) : (
            <>
              <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-slate-900 text-white">
                <Check className="w-3.5 h-3.5" />
                <span>Statut : TERMINÉ</span>
              </span>
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                {percentage === 100 ? 'Score parfait (100%)' : isPassed ? 'Examen validé' : 'Examen non validé'}
              </span>
              <span
                className={`text-[11px] font-semibold px-2 py-0.5 rounded ${
                  isPassed
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-slate-100 text-slate-800'
                }`}
              >
                Seuil requis : {passThreshold}%
              </span>
            </>
          )}
        </div>

        {/* Big Headline */}
        {isInterrupted ? (
          <div className="mb-4">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-amber-950 tracking-tight mb-2">
              EXAMEN INTERROMPU
            </h1>
            <p className="text-sm font-medium text-slate-700 leading-relaxed">
              Vous avez quitté l'examen avant de répondre à toutes les questions. Votre résultat ci-dessous a été calculé exclusivement à partir des réponses enregistrées jusqu'au moment de l'interruption.
            </p>
          </div>
        ) : (
          <div className="mb-2">
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
              Bilan de l'examen
            </h1>
          </div>
        )}

        {/* Score block */}
        <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 mb-6">
          <div className="text-xs uppercase font-semibold text-slate-500 tracking-wider mb-1">
            Votre résultat est :
          </div>
          
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-3">
            <div>
              <div className="flex items-baseline gap-3">
                <span className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight font-mono">
                  {correctCount} / {totalQuestions}
                </span>
                <span className="text-2xl sm:text-3xl font-bold text-slate-700 font-mono">
                  ({percentage} %)
                </span>
              </div>
              <div className="text-xs text-slate-500 mt-1">
                {isInterrupted
                  ? `${answeredCount} questions répondues sur ${totalQuestions} au total`
                  : `${totalQuestions} questions évaluées`}
              </div>
            </div>

            <div className="text-right sm:text-right border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-200">
              <div className="text-xs text-slate-500">Score barème officiel</div>
              <div className="text-base font-bold font-mono text-slate-900">
                {rawScore} / {maxScore} pts
              </div>
              <div className="text-[11px] text-slate-500">
                (+2 pts / bonne rép., -1 pt / erreur)
              </div>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex flex-wrap items-center gap-2.5">
          {isInterrupted && canResume && onResumeQuiz && unansweredCount > 0 && (
            <button
              id="btn-resume-quiz"
              type="button"
              onClick={onResumeQuiz}
              className="px-4 py-2.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition-colors inline-flex items-center gap-2 cursor-pointer shadow-xs"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Reprendre cet examen ({unansweredCount} restantes)</span>
            </button>
          )}

          {chaptersWithErrorsIds.length > 0 && (
            <button
              id="btn-review-recommended"
              type="button"
              onClick={handleReviewRecommended}
              className="px-4 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition-colors inline-flex items-center gap-2 cursor-pointer shadow-xs"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Revoir les chapitres recommandés</span>
            </button>
          )}

          <button
            id="btn-retake-quiz"
            type="button"
            onClick={onRetakeSameQuiz}
            className="px-4 py-2.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-medium transition-colors inline-flex items-center gap-1.5 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Retenter l'épreuve</span>
          </button>

          <button
            id="btn-return-home"
            type="button"
            onClick={onNewQuiz}
            className="px-4 py-2.5 rounded-lg text-slate-600 hover:text-slate-900 text-xs font-medium transition-colors inline-flex items-center gap-1.5 cursor-pointer"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Retour à l'accueil</span>
          </button>

          <button
            id="btn-export-results-csv"
            type="button"
            onClick={() => exportResultsToCsv(evaluation)}
            className="px-4 py-2.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-medium transition-colors inline-flex items-center gap-1.5 cursor-pointer"
            title="Exporter les résultats détaillés au format CSV"
          >
            <Download className="w-3.5 h-3.5 text-slate-600" />
            <span>Exporter CSV</span>
          </button>

          <button
            id="btn-jump-to-answers"
            type="button"
            onClick={scrollToQuestions}
            className="px-4 py-2.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-medium transition-colors inline-flex items-center gap-1.5 cursor-pointer"
            title="Consulter l'analyse détaillée question par question"
          >
            <ArrowDown className="w-3.5 h-3.5 text-slate-600" />
            <span>Voir les réponses détaillées</span>
          </button>

          <button
            type="button"
            onClick={() => window.print()}
            className="ml-auto text-slate-400 hover:text-slate-700 text-xs font-medium flex items-center gap-1 cursor-pointer p-2"
            title="Imprimer cette fiche de résultats"
          >
            <Printer className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Imprimer</span>
          </button>
        </div>
      </div>

      {/* 2. Key Metrics List (Clean, flat) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4 mb-8 text-sm">
        <div className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-100">
          <div className="text-2xl font-bold text-emerald-900 font-mono">{correctCount}</div>
          <div className="text-xs text-emerald-700 mt-0.5 font-medium">Bonnes réponses (+{correctCount * 2} pts)</div>
        </div>
        <div className="p-3.5 rounded-xl bg-rose-50/70 border border-rose-100">
          <div className="text-2xl font-bold text-rose-900 font-mono">{wrongCount}</div>
          <div className="text-xs text-rose-700 mt-0.5 font-medium">Erreurs commises (-{wrongCount} pt)</div>
        </div>
        <div className="p-3.5 rounded-xl bg-slate-50/70 border border-slate-200">
          <div className="text-2xl font-bold text-slate-900 font-mono">{unansweredCount}</div>
          <div className="text-xs text-slate-600 mt-0.5 font-medium">
            {isInterrupted ? 'Questions restantes (0 pt)' : 'Sans réponse (0 pt)'}
          </div>
        </div>
        <div className="p-3.5 rounded-xl bg-slate-50/70 border border-slate-200">
          <div className="text-2xl font-bold text-slate-900 font-mono">{timeSpentFormatted}</div>
          <div className="text-xs text-slate-600 mt-0.5 font-medium">Temps passé</div>
        </div>
      </div>

      {/* 3. RÉCAPITULATIF & POINTS PAR CHAPITRE (Placé en premier à la fin de l'examen) */}
      <div className="mb-10 p-5 rounded-2xl border border-slate-200 bg-white shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100 mb-4">
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Récapitulatif des points par chapitre
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Barème officiel : +2 pts par bonne réponse, -1 pt par erreur, 0 pt sans réponse.
            </p>
          </div>
          <div className="text-xs font-mono text-slate-700 bg-slate-100 px-2.5 py-1 rounded-md self-start sm:self-auto">
            Total : <strong className="text-slate-900">{rawScore}</strong> / {maxScore} pts ({percentage} %)
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="text-slate-500 border-b border-slate-100 font-medium">
              <tr>
                <th className="py-2.5 pr-4">Chapitre / Thème</th>
                <th className="py-2.5 text-center">Questions</th>
                <th className="py-2.5 text-center text-emerald-700">Correctes</th>
                <th className="py-2.5 text-center text-rose-700">Erreurs</th>
                <th className="py-2.5 text-center text-slate-400">Restantes</th>
                <th className="py-2.5 text-right">Points</th>
                <th className="py-2.5 text-right pl-4">Réussite</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {chapterSummaries.map((cs) => (
                <tr key={cs.chapterId} className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-2.5 pr-4 font-medium text-slate-900">
                    <span className="font-semibold text-slate-900 mr-1.5">{cs.chapterCode}</span>
                    <span className="text-slate-700">{cs.chapterTitle.replace(`${cs.chapterCode} — `, '')}</span>
                  </td>
                  <td className="py-2.5 text-center">{cs.totalQuestions}</td>
                  <td className="py-2.5 text-center font-medium text-emerald-700">{cs.correctCount}</td>
                  <td className="py-2.5 text-center font-medium text-rose-700">{cs.wrongCount}</td>
                  <td className="py-2.5 text-center text-slate-400">{cs.unansweredCount}</td>
                  <td className="py-2.5 text-right font-mono font-semibold text-slate-900">
                    {cs.points} / {cs.maxPoints}
                  </td>
                  <td className="py-2.5 text-right pl-4">
                    <span
                      className={`inline-block font-semibold px-1.5 py-0.5 rounded text-[11px] ${
                        cs.percentage >= passThreshold
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : cs.percentage >= 50
                          ? 'bg-amber-50 text-amber-700 border border-amber-200'
                          : 'bg-rose-50 text-rose-700 border border-rose-200'
                      }`}
                    >
                      {cs.percentage}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot className="border-t-2 border-slate-200 bg-slate-50/70 font-semibold text-slate-900">
              <tr>
                <td className="py-2.5 pr-4 pl-1">Total général ({chapterSummaries.length} chapitres)</td>
                <td className="py-2.5 text-center">{totalQuestions}</td>
                <td className="py-2.5 text-center text-emerald-700">{correctCount}</td>
                <td className="py-2.5 text-center text-rose-700">{wrongCount}</td>
                <td className="py-2.5 text-center text-slate-500">{unansweredCount}</td>
                <td className="py-2.5 text-right font-mono text-slate-900">{rawScore} / {maxScore} pts</td>
                <td className="py-2.5 text-right pl-4 text-slate-900 font-bold">{percentage}%</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* 4. Recommandations Pédagogiques & Chapitres Identifiés */}
      <div className="mb-10 pb-8 border-b border-slate-100" ref={reviewSectionRef}>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Recommandations d'apprentissage & Thèmes à réviser
          </h2>
          <span className="text-xs text-slate-500 font-mono">
            {weakestChapters.length} chapitre{weakestChapters.length > 1 ? 's' : ''} identifié{weakestChapters.length > 1 ? 's' : ''}
          </span>
        </div>

        {weakestChapters.length > 0 ? (
          <div className="space-y-2.5">
            <p className="text-xs text-slate-600 leading-relaxed">
              Pour consolider votre apprentissage, nous vous suggérons de relire en priorité les notions clés de ces chapitres où des erreurs ont été constatées :
            </p>

            <div className="divide-y divide-slate-100 text-xs border border-slate-100 rounded-xl overflow-hidden bg-slate-50/50">
              {weakestChapters.map((wc) => (
                <div key={wc.chapterId} className="p-3 flex items-center justify-between">
                  <div>
                    <span className="font-semibold text-slate-900 mr-2">
                      {wc.chapterCode}
                    </span>
                    <span className="text-slate-700">
                      {wc.chapterTitle.replace(`${wc.chapterCode} — `, '')}
                    </span>
                  </div>
                  <span className="text-slate-600 font-medium shrink-0 ml-3">
                    {wc.wrongCount} erreur{wc.wrongCount > 1 ? 's' : ''}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-700 flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-slate-900 shrink-0" />
            <span>
              {isInterrupted
                ? "Aucune erreur constatée parmi les questions auxquelles vous avez répondu."
                : "Parfaite maîtrise des thèmes abordés ! Vous n'avez commis aucune erreur sur les chapitres évalués."}
            </span>
          </div>
        )}
      </div>

      {/* 5. Revue détaillée des erreurs & réponses (Requirement 4) */}
      <div className="mb-10 pt-6 border-t border-slate-100" ref={questionAnalysisRef}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100 mb-6">
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Analyse des réponses
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Consultez vos choix, la bonne réponse et l'explication officielle du cours.
            </p>
          </div>

          <div className="flex items-center gap-1.5 self-start sm:self-auto text-xs">
            {incorrectResults.length > 0 ? (
              <>
                <button
                  type="button"
                  onClick={() => setFilterMode('errors')}
                  className={`px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer ${
                    filterMode === 'errors'
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  Erreurs ({incorrectResults.length})
                </button>
                <button
                  type="button"
                  onClick={() => setFilterMode('all')}
                  className={`px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer ${
                    filterMode === 'all'
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  Toutes ({results.length})
                </button>
              </>
            ) : (
              <span className="px-3 py-1.5 rounded-md bg-slate-100 text-slate-800 font-medium text-xs">
                Toutes les réponses ({results.length}) • 100% exactes
              </span>
            )}
          </div>
        </div>

        {displayedResults.length === 0 ? (
          <div className="p-6 text-center text-xs text-slate-500 bg-slate-50 rounded-xl">
            Aucune erreur enregistrée dans cette session.
          </div>
        ) : (
          <div className="space-y-6">
            {displayedResults.map((item) => {
              const q = item.question;
              const isWrong = !item.isCorrect && !item.isUnanswered;
              const isUnanswered = item.isUnanswered;

              return (
                <div
                  key={q.id}
                  className="pb-6 border-b border-slate-100 last:border-b-0"
                >
                  {/* Question header */}
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="text-xs text-slate-500">
                      <span className="font-semibold text-slate-900">{q.chapterTitle}</span>
                      <span className="mx-1.5">•</span>
                      <span>Question {q.questionNumber}</span>
                    </div>

                    <span
                      className={`text-[11px] px-2 py-0.5 rounded font-medium shrink-0 ${
                        item.isCorrect
                          ? 'bg-slate-100 text-slate-800'
                          : isUnanswered
                          ? 'bg-slate-100 text-slate-500'
                          : 'bg-slate-900 text-white'
                      }`}
                    >
                      {item.isCorrect
                        ? '+2 pts (Correct)'
                        : isUnanswered
                        ? '0 pt (Non répondue)'
                        : `${item.points} pt (Erreur)`}
                    </span>
                  </div>

                  {/* Question text */}
                  <p className="text-sm font-medium text-slate-900 mb-3 leading-relaxed">
                    {q.text}
                  </p>

                  {/* User answer vs Correct answer */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs mb-3">
                    <div
                      className={`p-2.5 rounded-lg ${
                        item.isCorrect
                          ? 'bg-slate-50 text-slate-700'
                          : isUnanswered
                          ? 'bg-slate-50 text-slate-500'
                          : 'bg-slate-100 text-slate-800 font-medium'
                      }`}
                    >
                      <div className="text-[10px] uppercase font-semibold text-slate-500 mb-0.5">
                        Votre sélection :
                      </div>
                      {isUnanswered ? (
                        <span className="italic">Non répondue (interrompue avant réponse)</span>
                      ) : (
                        <span>
                          Option <strong>{item.userAnswer}</strong> —{' '}
                          {q.options.find((o) => o.key === item.userAnswer)?.text || ''}
                        </span>
                      )}
                    </div>

                    <div className="p-2.5 rounded-lg bg-slate-50 text-slate-800">
                      <div className="text-[10px] uppercase font-semibold text-slate-500 mb-0.5">
                        Bonne réponse officielle :
                      </div>
                      <span>
                        Option <strong className="text-slate-900">{item.correctAnswer}</strong> —{' '}
                        {q.options.find((o) => o.key === item.correctAnswer)?.text || ''}
                      </span>
                    </div>
                  </div>

                  {/* Explanation (if available) */}
                  {item.explanation && (
                    <div className="p-3 rounded-lg bg-slate-50/60 text-xs text-slate-600 leading-relaxed">
                      <strong className="font-semibold text-slate-900 block mb-0.5">
                        Explication pédagogique :
                      </strong>
                      {item.explanation}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Bottom Actions */}
      <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          onClick={onNewQuiz}
          className="text-xs font-medium text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
        >
          ← Retour à l'accueil
        </button>

        <div className="flex items-center gap-2">
          {isInterrupted && canResume && onResumeQuiz && unansweredCount > 0 && (
            <button
              type="button"
              onClick={onResumeQuiz}
              className="px-4 py-2.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition-colors cursor-pointer inline-flex items-center gap-1.5"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Reprendre ({unansweredCount} restantes)</span>
            </button>
          )}

          <button
            type="button"
            onClick={onRetakeSameQuiz}
            className="px-4 py-2.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-medium transition-colors cursor-pointer"
          >
            Retenter l'épreuve
          </button>
          
          <button
            id="btn-view-correction"
            type="button"
            onClick={onViewCorrection}
            className="px-5 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition-colors inline-flex items-center gap-2 cursor-pointer shadow-xs"
          >
            <span>
              {incorrectResults.length > 0
                ? "Consulter la correction (mes erreurs d'abord)"
                : "Consulter toutes les réponses & explications"}
            </span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
