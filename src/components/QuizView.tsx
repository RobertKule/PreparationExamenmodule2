import React, { useEffect, useState } from 'react';
import { 
  ArrowLeft, 
  ArrowRight, 
  Bookmark, 
  Check, 
  Clock, 
  Flag, 
  Menu, 
  SkipForward, 
  X 
} from 'lucide-react';
import { Chapter, OptionKey, Question } from '../types';
import { formatTimer } from '../utils/quizDataLoader';
import { QuestionNavigationDrawer } from './QuestionNavigationDrawer';

interface QuizViewProps {
  chapters: Chapter[];
  questions: Question[];
  currentQuestionIndex: number;
  answers: Record<string, OptionKey>;
  flaggedIds: Record<string, boolean>;
  timeRemainingSeconds: number;
  totalTimeSeconds: number;
  onSelectOption: (questionId: string, optionKey: OptionKey) => void;
  onClearOption: (questionId: string) => void;
  onToggleFlag: (questionId: string) => void;
  onNavigateToQuestion: (index: number) => void;
  onSubmitQuiz: () => void;
  onAbandonQuiz?: () => void;
  isPracticeMode?: boolean;
}

export const QuizView: React.FC<QuizViewProps> = ({
  chapters,
  questions,
  currentQuestionIndex,
  answers,
  flaggedIds,
  timeRemainingSeconds,
  totalTimeSeconds,
  onSelectOption,
  onClearOption,
  onToggleFlag,
  onNavigateToQuestion,
  onSubmitQuiz,
  onAbandonQuiz,
  isPracticeMode = false
}) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [showConfirmSubmitModal, setShowConfirmSubmitModal] = useState(false);
  const [showAbandonModal, setShowAbandonModal] = useState(false);
  const [copyWarningToast, setCopyWarningToast] = useState(false);

  // Anti-copier-coller and context menu restrictions during active quiz
  useEffect(() => {
    let toastTimeout: NodeJS.Timeout;

    const triggerToast = () => {
      setCopyWarningToast(true);
      clearTimeout(toastTimeout);
      toastTimeout = setTimeout(() => {
        setCopyWarningToast(false);
      }, 2400);
    };

    const handleCopyCutPaste = (e: ClipboardEvent) => {
      e.preventDefault();
      triggerToast();
    };

    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      triggerToast();
    };

    const handleKeyDownProtection = (e: KeyboardEvent) => {
      const isCmdOrCtrl = e.ctrlKey || e.metaKey;
      if (isCmdOrCtrl) {
        const key = e.key.toLowerCase();
        if (['c', 'x', 'v', 'a', 'p', 'u', 's'].includes(key)) {
          e.preventDefault();
          triggerToast();
        }
      }
    };

    document.addEventListener('copy', handleCopyCutPaste);
    document.addEventListener('cut', handleCopyCutPaste);
    document.addEventListener('paste', handleCopyCutPaste);
    document.addEventListener('contextmenu', handleContextMenu);
    window.addEventListener('keydown', handleKeyDownProtection, { capture: true });

    return () => {
      clearTimeout(toastTimeout);
      document.removeEventListener('copy', handleCopyCutPaste);
      document.removeEventListener('cut', handleCopyCutPaste);
      document.removeEventListener('paste', handleCopyCutPaste);
      document.removeEventListener('contextmenu', handleContextMenu);
      window.removeEventListener('keydown', handleKeyDownProtection, { capture: true });
    };
  }, []);

  const currentQ = questions[currentQuestionIndex];
  const currentChapter = chapters.find((c) => c.id === currentQ.chapterId) || {
    id: currentQ.chapterId,
    code: currentQ.chapterNumber,
    shortTitle: `Chapitre ${currentQ.chapterNumber}`,
    title: currentQ.chapterTitle,
    questions: []
  };

  const totalQuestions = questions.length;
  const answeredCount = Object.keys(answers).length;
  const unansweredCount = totalQuestions - answeredCount;
  const flaggedCount = Object.values(flaggedIds).filter(Boolean).length;
  const progressPercent = Math.round(((currentQuestionIndex + 1) / totalQuestions) * 100);

  const selectedAnswer = answers[currentQ.id];
  const isFlagged = Boolean(flaggedIds[currentQ.id]);

  // Navigation entre chapitres
  const currentChapterIndex = chapters.findIndex((c) => c.id === currentChapter.id);
  const prevChapter = currentChapterIndex > 0 ? chapters[currentChapterIndex - 1] : null;
  const nextChapter = currentChapterIndex < chapters.length - 1 ? chapters[currentChapterIndex + 1] : null;

  const goToChapter = (chapterId: string) => {
    const firstQIdx = questions.findIndex((q) => q.chapterId === chapterId);
    if (firstQIdx !== -1) {
      onNavigateToQuestion(firstQIdx);
    }
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }

      const key = e.key.toUpperCase();
      if (['A', 'B', 'C', 'D'].includes(key)) {
        const optExists = currentQ.options.some((o) => o.key === key);
        if (optExists) {
          onSelectOption(currentQ.id, key as OptionKey);
        }
      } else if (e.key === 'ArrowRight' || e.key === 'Enter') {
        if (currentQuestionIndex < totalQuestions - 1) {
          onNavigateToQuestion(currentQuestionIndex + 1);
        }
      } else if (e.key === 'ArrowLeft') {
        if (currentQuestionIndex > 0) {
          onNavigateToQuestion(currentQuestionIndex - 1);
        }
      } else if (e.key === 'f' || e.key === 'F') {
        onToggleFlag(currentQ.id);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentQ, currentQuestionIndex, totalQuestions, onSelectOption, onNavigateToQuestion, onToggleFlag]);

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col bg-white select-none">
      {/* 1. Header Minimaliste Collant */}
      <div className="sticky top-16 z-20 bg-white border-b border-slate-100 px-6 py-3">
        <div className="max-w-3xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <button
              id="btn-open-nav-drawer-header"
              onClick={() => setIsDrawerOpen(true)}
              className="p-1.5 rounded-md hover:bg-slate-100 text-slate-600 flex items-center gap-1.5 transition-colors cursor-pointer shrink-0 text-xs font-medium"
              title="Ouvrir le sommaire des questions"
            >
              <Menu className="w-4 h-4" />
              <span className="hidden sm:inline">Sommaire</span>
            </button>

            <div className="truncate">
              <span className="text-xs text-slate-500 block truncate">
                {currentChapter.shortTitle} — {currentChapter.title.replace(`${currentChapter.shortTitle} — `, '')}
              </span>
              <span className="text-sm font-semibold text-slate-900 leading-none">
                Question {currentQuestionIndex + 1} / {totalQuestions}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {totalTimeSeconds > 0 ? (
              <div className="flex items-center gap-1.5 font-mono text-xs font-medium text-slate-700 bg-slate-100 px-2.5 py-1 rounded-md">
                <Clock className="w-3.5 h-3.5 text-slate-500" />
                <span>{formatTimer(timeRemainingSeconds)}</span>
              </div>
            ) : (
              <div className="text-xs text-slate-500 font-medium">
                Mode libre
              </div>
            )}

            <button
              id="btn-quiz-abandon-top"
              onClick={() => setShowAbandonModal(true)}
              className="px-2.5 py-1.5 rounded-md text-slate-500 hover:text-amber-700 hover:bg-amber-50 text-xs font-medium transition-colors cursor-pointer"
              title="Interrompre l'épreuve en cours et consulter votre score"
            >
              Interrompre
            </button>

            <button
              id="btn-quiz-submit-top"
              onClick={() => setShowConfirmSubmitModal(true)}
              className="px-3 py-1.5 rounded-md bg-slate-900 hover:bg-slate-800 text-white text-xs font-medium transition-colors cursor-pointer"
            >
              Terminer
            </button>
          </div>
        </div>

        {/* Progress bar line */}
        <div className="max-w-3xl mx-auto mt-2">
          <div className="w-full bg-slate-100 h-1 rounded-full overflow-hidden">
            <div
              className="bg-slate-900 h-full transition-all duration-200"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* 2. Zone Principale de Question */}
      <div className="max-w-3xl w-full mx-auto px-6 py-8 flex-1 flex flex-col">
        {/* Chapter switch strip */}
        <div className="flex items-center justify-between text-xs text-slate-500 pb-4 mb-6 border-b border-slate-100">
          {prevChapter ? (
            <button
              id="btn-nav-prev-chapter"
              onClick={() => goToChapter(prevChapter.id)}
              className="hover:text-slate-900 transition-colors cursor-pointer flex items-center gap-1"
            >
              <ArrowLeft className="w-3 h-3" />
              <span>{prevChapter.shortTitle}</span>
            </button>
          ) : (
            <span className="text-slate-300">Début</span>
          )}

          <span className="font-medium text-slate-700">
            {answeredCount} / {totalQuestions} répondues
          </span>

          {nextChapter ? (
            <button
              id="btn-nav-next-chapter"
              onClick={() => goToChapter(nextChapter.id)}
              className="hover:text-slate-900 transition-colors cursor-pointer flex items-center gap-1"
            >
              <span>{nextChapter.shortTitle}</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          ) : (
            <span className="text-slate-300">Fin</span>
          )}
        </div>

        {/* Question Header & Flag button */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="text-xs uppercase tracking-wider text-slate-500">
            Question {currentQ.questionNumber} • {currentChapter.shortTitle}
          </div>

          <button
            id="btn-flag-question"
            onClick={() => onToggleFlag(currentQ.id)}
            className={`text-xs font-medium px-2.5 py-1 rounded-md transition-colors flex items-center gap-1.5 cursor-pointer ${
              isFlagged
                ? 'bg-slate-900 text-white'
                : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
            }`}
            title="Marquer cette question pour la revoir plus tard"
          >
            <Flag className="w-3 h-3" />
            <span>{isFlagged ? 'Marquée' : 'Marquer'}</span>
          </button>
        </div>

        {/* Question text */}
        <h2 className="text-lg sm:text-xl font-medium text-slate-900 leading-relaxed mb-8">
          {currentQ.text}
        </h2>

        {/* Options list */}
        <div className="space-y-2 mb-6">
          {currentQ.options.map((opt) => {
            const isSelected = selectedAnswer === opt.key;

            return (
              <div
                key={opt.key}
                id={`option-${currentQ.id}-${opt.key}`}
                onClick={() => onSelectOption(currentQ.id, opt.key)}
                className={`p-4 rounded-lg transition-colors cursor-pointer select-none flex items-start gap-3.5 ${
                  isSelected
                    ? 'bg-slate-100 text-slate-900 font-medium'
                    : 'hover:bg-slate-50 text-slate-700'
                }`}
              >
                {/* Option key */}
                <div
                  className={`w-6 h-6 rounded flex items-center justify-center font-semibold text-xs shrink-0 mt-0.5 transition-colors ${
                    isSelected
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-200/80 text-slate-600'
                  }`}
                >
                  {opt.key}
                </div>

                {/* Option text */}
                <div className="flex-1 text-sm sm:text-base leading-relaxed">
                  {opt.text}
                </div>

                {/* Check indicator */}
                {isSelected && (
                  <Check className="w-4 h-4 text-slate-900 shrink-0 mt-1" />
                )}
              </div>
            );
          })}
        </div>

        {/* Clear response link */}
        {selectedAnswer && (
          <div className="mb-6">
            <button
              type="button"
              onClick={() => onClearOption(currentQ.id)}
              className="text-xs text-slate-500 hover:text-slate-900 transition-colors flex items-center gap-1 cursor-pointer"
            >
              <X className="w-3 h-3" />
              <span>Effacer la réponse (laisser vide, 0 pt)</span>
            </button>
          </div>
        )}

        {/* Practice Mode Live Feedback (Requirement 8) */}
        {isPracticeMode && selectedAnswer && (
          <div className="mb-8 p-4 rounded-xl border transition-all text-xs space-y-2.5 bg-slate-50 border-slate-200">
            <div className="flex items-center gap-2">
              {selectedAnswer === currentQ.correctAnswer ? (
                <div className="flex items-center gap-1.5 text-emerald-800 font-semibold">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Excellente réponse (+2 points)</span>
                </div>
              ) : (
                <div className="flex items-center gap-1.5 text-rose-800 font-semibold">
                  <X className="w-4 h-4 text-rose-600" />
                  <span>
                    Réponse incorrecte (0 pt en entraînement) • Bonne réponse : {currentQ.correctAnswer}
                  </span>
                </div>
              )}
            </div>

            {currentQ.explanation && (
              <div className="pt-2 border-t border-slate-200 text-slate-700 leading-relaxed bg-white/70 p-3 rounded-lg border border-slate-100">
                <span className="font-semibold text-slate-900 block mb-1">
                  Explication pédagogique du cours :
                </span>
                {currentQ.explanation}
              </div>
            )}
          </div>
        )}

        {/* Navigation buttons */}
        <div className="mt-auto pt-6 border-t border-slate-100 flex items-center justify-between gap-3">
          <button
            id="btn-quiz-prev"
            onClick={() => onNavigateToQuestion(currentQuestionIndex - 1)}
            disabled={currentQuestionIndex === 0}
            className="px-4 py-2.5 rounded-md text-xs font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-colors flex items-center gap-1.5 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Précédent</span>
          </button>

          <button
            id="btn-quiz-skip"
            onClick={() => {
              if (currentQuestionIndex < totalQuestions - 1) {
                onNavigateToQuestion(currentQuestionIndex + 1);
              }
            }}
            className="px-3 py-2.5 rounded-md text-xs font-medium text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors flex items-center gap-1 cursor-pointer"
          >
            <SkipForward className="w-3.5 h-3.5" />
            <span>Passer</span>
          </button>

          {currentQuestionIndex < totalQuestions - 1 ? (
            <button
              id="btn-quiz-next"
              onClick={() => onNavigateToQuestion(currentQuestionIndex + 1)}
              className="px-5 py-2.5 rounded-md bg-slate-900 hover:bg-slate-800 text-white text-xs font-medium transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <span>Suivant</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              id="btn-quiz-finish-last"
              onClick={() => setShowConfirmSubmitModal(true)}
              className="px-5 py-2.5 rounded-md bg-slate-900 hover:bg-slate-800 text-white text-xs font-medium transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <span>Terminer l'examen</span>
              <Check className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Sommaire Drawer */}
      <QuestionNavigationDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        chapters={chapters}
        questions={questions}
        currentQuestionIndex={currentQuestionIndex}
        answers={answers}
        flaggedIds={flaggedIds}
        onSelectQuestionIndex={onNavigateToQuestion}
        onSelectChapter={goToChapter}
      />

      {/* Confirmation Modal (Minimalist) */}
      {showConfirmSubmitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40">
          <div className="bg-white rounded-xl max-w-sm w-full p-6">
            <h3 className="text-base font-semibold text-slate-900 mb-2">
              Confirmer la fin de l'examen
            </h3>

            <p className="text-xs text-slate-600 mb-4 leading-relaxed">
              Souhaitez-vous soumettre définitivement vos réponses ?
            </p>

            <div className="bg-slate-50 p-3.5 rounded-lg text-xs space-y-1.5 text-slate-700 mb-6">
              <div className="flex justify-between">
                <span>Questions répondues :</span>
                <strong className="font-semibold text-slate-900">{answeredCount} / {totalQuestions}</strong>
              </div>
              <div className="flex justify-between">
                <span>Sans réponse (0 pt) :</span>
                <strong className="font-semibold text-slate-900">{unansweredCount}</strong>
              </div>
              {flaggedCount > 0 && (
                <div className="flex justify-between">
                  <span>Marquées à revoir :</span>
                  <strong className="font-semibold text-slate-900">{flaggedCount}</strong>
                </div>
              )}
            </div>

            <div className="flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowConfirmSubmitModal(false)}
                className="px-3.5 py-2 rounded-md text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                Continuer l'examen
              </button>

              <button
                type="button"
                id="btn-confirm-final-submit"
                onClick={() => {
                  setShowConfirmSubmitModal(false);
                  onSubmitQuiz();
                }}
                className="px-4 py-2 rounded-md bg-slate-900 hover:bg-slate-800 text-white text-xs font-medium transition-colors cursor-pointer"
              >
                Soumettre et corriger
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Abandon/Interruption Confirmation Modal */}
      {showAbandonModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40">
          <div className="bg-white rounded-xl max-w-sm w-full p-6 shadow-xl">
            <h3 className="text-base font-semibold text-slate-900 mb-2">
              Interrompre l'examen en cours ?
            </h3>

            <p className="text-xs text-slate-600 mb-4 leading-relaxed">
              Vos réponses actuelles seront conservées et votre score sera calculé sur les questions répondues. Vous serez redirigé vers la page <strong>« Examen interrompu »</strong> et pourrez reprendre votre épreuve quand vous le souhaitez.
            </p>

            <div className="flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowAbandonModal(false)}
                className="px-3.5 py-2 rounded-md text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                Continuer l'examen
              </button>

              <button
                type="button"
                id="btn-confirm-abandon"
                onClick={() => {
                  setShowAbandonModal(false);
                  if (onAbandonQuiz) {
                    onAbandonQuiz();
                  }
                }}
                className="px-4 py-2 rounded-md bg-amber-600 hover:bg-amber-700 text-white text-xs font-medium transition-colors cursor-pointer"
              >
                Interrompre et voir le bilan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Copy/Paste Restricted Toast Notification (Requirement 2) */}
      {copyWarningToast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white text-xs font-medium px-4 py-2.5 rounded-lg shadow-lg flex items-center gap-2 pointer-events-none transition-all">
          <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0" />
          <span>Le copier-coller et le menu contextuel sont désactivés pendant l'examen.</span>
        </div>
      )}
    </div>
  );
};
