import React from 'react';
import { ChevronRight, X } from 'lucide-react';
import { Chapter, OptionKey, Question } from '../types';

interface QuestionNavigationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  chapters: Chapter[];
  questions: Question[];
  currentQuestionIndex: number;
  answers: Record<string, OptionKey>;
  flaggedIds: Record<string, boolean>;
  onSelectQuestionIndex: (index: number) => void;
  onSelectChapter: (chapterId: string) => void;
}

export const QuestionNavigationDrawer: React.FC<QuestionNavigationDrawerProps> = ({
  isOpen,
  onClose,
  chapters,
  questions,
  currentQuestionIndex,
  answers,
  flaggedIds,
  onSelectQuestionIndex,
  onSelectChapter
}) => {
  if (!isOpen) return null;

  const chapterProgress = chapters.map((ch) => {
    const chQuestions = questions.filter((q) => q.chapterId === ch.id);
    const answeredCount = chQuestions.filter((q) => answers[q.id] !== undefined).length;
    const firstQIndex = questions.findIndex((q) => q.chapterId === ch.id);

    return {
      chapter: ch,
      total: chQuestions.length,
      answered: answeredCount,
      firstQIndex
    };
  });

  const totalAnswered = Object.keys(answers).length;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-900/30 transition-opacity" 
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="relative w-full max-w-sm bg-white h-full flex flex-col z-10">
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h2 className="text-sm font-semibold text-slate-900">
              Sommaire de l'examen
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              {totalAnswered} / {questions.length} questions répondues
            </p>
          </div>
          <button
            id="btn-close-nav-drawer"
            onClick={onClose}
            className="w-7 h-7 rounded-md hover:bg-slate-100 text-slate-500 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Legend */}
        <div className="px-5 py-2.5 border-b border-slate-100 flex items-center gap-4 text-[11px] text-slate-500">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm bg-slate-900 inline-block" />
            <span>Répondue</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm bg-slate-100 inline-block" />
            <span>Non répondue</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-slate-900 font-bold">•</span>
            <span>Marquée</span>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          {/* Chapitres */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2.5">
              Progression par chapitre
            </h3>
            <div className="divide-y divide-slate-100">
              {chapterProgress.map((cp) => {
                const isCurrentChap = questions[currentQuestionIndex]?.chapterId === cp.chapter.id;
                return (
                  <div
                    key={cp.chapter.id}
                    onClick={() => {
                      if (cp.firstQIndex !== -1) {
                        onSelectQuestionIndex(cp.firstQIndex);
                        onClose();
                      }
                    }}
                    className={`py-2 px-1 flex items-center justify-between cursor-pointer text-xs transition-colors rounded ${
                      isCurrentChap ? 'bg-slate-100/70 font-medium' : 'hover:bg-slate-50'
                    }`}
                  >
                    <span className="truncate text-slate-800 pr-2">
                      {cp.chapter.shortTitle}
                    </span>
                    <span className="text-slate-500 font-mono text-[11px] shrink-0">
                      {cp.answered} / {cp.total}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Grille des questions */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2.5">
              Toutes les questions
            </h3>

            <div className="grid grid-cols-6 gap-1.5">
              {questions.map((q, idx) => {
                const isCurrent = idx === currentQuestionIndex;
                const isAnswered = answers[q.id] !== undefined;
                const isFlagged = Boolean(flaggedIds[q.id]);

                let btnStyle = 'bg-slate-100 text-slate-700 hover:bg-slate-200';
                if (isAnswered) {
                  btnStyle = 'bg-slate-900 text-white';
                }

                return (
                  <button
                    key={q.id}
                    onClick={() => {
                      onSelectQuestionIndex(idx);
                      onClose();
                    }}
                    className={`relative h-9 rounded text-xs font-medium transition-colors flex items-center justify-center cursor-pointer ${btnStyle} ${
                      isCurrent ? 'ring-2 ring-slate-900 ring-offset-1' : ''
                    }`}
                  >
                    <span>{idx + 1}</span>

                    {isFlagged && (
                      <span className={`absolute top-0.5 right-1 text-[9px] ${isAnswered ? 'text-white' : 'text-slate-900'}`}>
                        •
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 space-y-2">
          {totalAnswered < questions.length && (
            <button
              onClick={() => {
                const firstUnansweredIndex = questions.findIndex(
                  (q) => answers[q.id] === undefined
                );
                if (firstUnansweredIndex !== -1) {
                  onSelectQuestionIndex(firstUnansweredIndex);
                  onClose();
                }
              }}
              className="w-full py-2 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors cursor-pointer"
            >
              Aller à la première non répondue
            </button>
          )}

          <button
            onClick={onClose}
            className="w-full py-2 text-xs font-medium text-white bg-slate-900 hover:bg-slate-800 rounded-md transition-colors cursor-pointer"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
};
