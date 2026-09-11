import React, { useRef, useState } from 'react';
import { 
  ArrowRight, 
  BookOpen, 
  Check, 
  CheckCircle2, 
  HelpCircle, 
  Home, 
  Printer, 
  RotateCcw, 
  X, 
  XCircle 
} from 'lucide-react';
import { QuestionResult, QuizEvaluation } from '../types';

interface ResultsViewProps {
  evaluation: QuizEvaluation;
  onViewCorrection: () => void;
  onRetakeSameQuiz: () => void;
  onNewQuiz: () => void;
  onReviewRecommendedChapters?: (chapterIds: string[]) => void;
}

export const ResultsView: React.FC<ResultsViewProps> = ({
  evaluation,
  onViewCorrection,
  onRetakeSameQuiz,
  onNewQuiz,
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
    weakestChapters
  } = evaluation;

  const reviewSectionRef = useRef<HTMLDivElement>(null);

  // Filter incorrect results and unanswered
  const incorrectResults = results.filter((r) => !r.isCorrect);
  const [filterMode, setFilterMode] = useState<'errors' | 'all'>(incorrectResults.length > 0 ? 'errors' : 'all');
  const displayedResults = filterMode === 'errors' ? incorrectResults : results;

  // Chapter IDs that have errors
  const chaptersWithErrorsIds = weakestChapters.map((wc) => wc.chapterId);

  const scrollToReview = () => {
    reviewSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
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
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Résultats de l'évaluation • {percentage === 100 ? 'Score parfait (100%)' : isPassed ? 'Examen validé' : 'Examen non validé'}
          </span>
          <span
            className={`text-[11px] font-semibold px-2 py-0.5 rounded ${
              isPassed
                ? 'bg-slate-900 text-white'
                : 'bg-slate-100 text-slate-800'
            }`}
          >
            Seuil requis : {passThreshold}%
          </span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-4">
          <h1 className="text-4xl sm:text-5xl font-semibold text-slate-900 tracking-tight">
            {percentage}%
          </h1>
          <div className="text-sm font-mono text-slate-600">
            Score : <strong className="text-slate-900">{rawScore}</strong> / {maxScore} points
          </div>
        </div>

        {/* Personalized Message based on Pass/Fail (Requirement 4) */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 mb-6">
          <p className="text-sm text-slate-800 leading-relaxed font-medium">
            {percentage === 100
              ? "Félicitations pour ce score parfait de 100% ! Vous maîtrisez l'ensemble des notions de cette évaluation."
              : isPassed
              ? "Félicitations ! Vous avez réussi cet examen. Continuez à réviser les notions pour consolider vos acquis."
              : "Vous n'avez pas atteint le score requis cette fois-ci. Nous vous recommandons de revoir attentivement les chapitres concernés, en particulier les thèmes liés à vos erreurs, avant de retenter l'examen."}
          </p>
          <p className="text-xs text-slate-500 mt-1">
            {percentage === 100
              ? "Congratulations on a perfect score of 100%! You have mastered all topics covered in this evaluation."
              : isPassed
              ? "Congratulations! You have successfully completed this quiz. Continue reviewing key concepts to consolidate your knowledge."
              : "You did not reach the required score this time. We recommend reviewing the relevant chapters carefully, especially the topics related to your incorrect answers, before attempting the quiz again."}
          </p>
        </div>

        {/* Action buttons (Requirement 4) */}
        <div className="flex flex-wrap items-center gap-2.5">
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
            <span>Retenter l'examen</span>
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
        <div className="p-3 rounded-lg bg-slate-50/70 border border-slate-100">
          <div className="text-xl font-semibold text-slate-900">{correctCount}</div>
          <div className="text-xs text-slate-500 mt-0.5">Réponses correctes (+{correctCount * 2} pts)</div>
        </div>
        <div className="p-3 rounded-lg bg-slate-50/70 border border-slate-100">
          <div className="text-xl font-semibold text-slate-900">{wrongCount}</div>
          <div className="text-xs text-slate-500 mt-0.5">Erreurs commises</div>
        </div>
        <div className="p-3 rounded-lg bg-slate-50/70 border border-slate-100">
          <div className="text-xl font-semibold text-slate-900">{unansweredCount}</div>
          <div className="text-xs text-slate-500 mt-0.5">Sans réponse (0 pt)</div>
        </div>
        <div className="p-3 rounded-lg bg-slate-50/70 border border-slate-100">
          <div className="text-xl font-semibold text-slate-900 font-mono">{timeSpentFormatted}</div>
          <div className="text-xs text-slate-500 mt-0.5">Temps écoulé</div>
        </div>
      </div>

      {/* 3. Recommandations Pédagogiques & Chapitres Identifiés */}
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
              Parfaite maîtrise des thèmes abordés ! Vous n'avez commis aucune erreur sur les chapitres évalués.
            </span>
          </div>
        )}
      </div>

      {/* 4. Revue détaillée des erreurs (Requirement 4) */}
      <div className="mb-10">
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
            {displayedResults.map((item, idx) => {
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
                        ? '0 pt (Sans réponse)'
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
                        <span className="italic">Aucune option cochée</span>
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

      {/* 5. Summary Table per Chapter */}
      <div className="mb-10 pt-6 border-t border-slate-100">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3">
          Récapitulatif par chapitre
        </h2>
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
                    {cs.chapterCode} — {cs.chapterTitle.replace(`${cs.chapterCode} — `, '')}
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
      <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          onClick={onNewQuiz}
          className="text-xs font-medium text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
        >
          ← Retour à l'accueil
        </button>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onRetakeSameQuiz}
            className="px-4 py-2.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-medium transition-colors cursor-pointer"
          >
            Retenter l'examen
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
