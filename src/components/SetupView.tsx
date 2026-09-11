import React, { useState } from 'react';
import { ArrowLeft, Check, Play } from 'lucide-react';
import { Chapter, QuizConfig } from '../types';

interface SetupViewProps {
  chapters: Chapter[];
  onStartQuiz: (config: QuizConfig) => void;
  onBackToHome: () => void;
}

export const SetupView: React.FC<SetupViewProps> = ({
  chapters,
  onStartQuiz,
  onBackToHome
}) => {
  const [selectedIds, setSelectedIds] = useState<string[]>(chapters.map((c) => c.id));
  const [duration, setDuration] = useState<number>(60);
  const [threshold, setThreshold] = useState<number>(85);
  const [shuffle, setShuffle] = useState<boolean>(false);

  const isAllSelected = selectedIds.length === chapters.length;

  const toggleAll = () => {
    if (isAllSelected) {
      setSelectedIds([chapters[0].id]);
    } else {
      setSelectedIds(chapters.map((c) => c.id));
    }
  };

  const toggleChapter = (id: string) => {
    if (selectedIds.includes(id)) {
      if (selectedIds.length > 1) {
        setSelectedIds(selectedIds.filter((item) => item !== id));
      }
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const selectOnlyChapter = (id: string) => {
    setSelectedIds([id]);
  };

  const selectedChapters = chapters.filter((c) => selectedIds.includes(c.id));
  const totalSelectedQuestions = selectedChapters.reduce(
    (acc, curr) => acc + curr.questions.length,
    0
  );
  const maxPossiblePoints = totalSelectedQuestions * 2;

  const handleStart = () => {
    onStartQuiz({
      selectedChapterIds: selectedIds,
      durationMinutes: duration,
      passThresholdPercent: threshold,
      shuffleQuestions: shuffle
    });
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      {/* Back link */}
      <div className="mb-8">
        <button
          id="btn-setup-back"
          onClick={onBackToHome}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Retour à l'accueil</span>
        </button>
      </div>

      <div className="mb-10">
        <h1 className="text-2xl sm:text-3xl font-semibold text-slate-900 tracking-tight">
          Paramètres de l'examen
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Sélectionnez les chapitres à évaluer et personnalisez la session.
        </p>
      </div>

      <div className="space-y-10">
        {/* Section 1 : Chapitres */}
        <div>
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
            <div>
              <h2 className="text-sm font-semibold text-slate-900">
                Chapitres inclus ({selectedIds.length} / {chapters.length})
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                {totalSelectedQuestions} questions sélectionnées
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                id="btn-toggle-all-chapters"
                type="button"
                onClick={toggleAll}
                className="text-xs font-medium text-slate-600 hover:text-slate-900 px-2 py-1 rounded hover:bg-slate-100 transition-colors cursor-pointer"
              >
                {isAllSelected ? 'Tout désélectionner' : 'Tout sélectionner'}
              </button>
            </div>
          </div>

          {/* Quick presets */}
          <div className="flex items-center gap-2 mb-4 text-xs">
            <button
              type="button"
              onClick={() => setSelectedIds(chapters.map((c) => c.id))}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer ${
                isAllSelected
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Tous les chapitres (12)
            </button>
            <button
              type="button"
              onClick={() => setSelectedIds(chapters.slice(0, 6).map((c) => c.id))}
              className="px-3 py-1.5 rounded-md font-medium bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors cursor-pointer"
            >
              Partie 1 (2.1 à 2.6)
            </button>
            <button
              type="button"
              onClick={() => setSelectedIds(chapters.slice(6, 12).map((c) => c.id))}
              className="px-3 py-1.5 rounded-md font-medium bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors cursor-pointer"
            >
              Partie 2 (2.7 à 2.12)
            </button>
          </div>

          {/* List of chapters (unbordered rows) */}
          <div className="divide-y divide-slate-100">
            {chapters.map((ch) => {
              const isChecked = selectedIds.includes(ch.id);
              return (
                <div
                  key={ch.id}
                  onClick={() => toggleChapter(ch.id)}
                  className={`py-3 px-2 rounded-md flex items-center justify-between transition-colors cursor-pointer select-none ${
                    isChecked ? 'bg-slate-100/60' : 'hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0 pr-3">
                    <div
                      className={`w-4 h-4 rounded flex items-center justify-center transition-colors shrink-0 ${
                        isChecked
                          ? 'bg-slate-900 text-white'
                          : 'bg-white border border-slate-300'
                      }`}
                    >
                      {isChecked && <Check className="w-3 h-3 stroke-[2.5]" />}
                    </div>

                    <div className="truncate">
                      <span className="text-xs font-semibold text-slate-900 mr-2">
                        {ch.shortTitle}
                      </span>
                      <span className="text-xs text-slate-600">
                        {ch.title.replace(`${ch.shortTitle} — `, '')}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-xs text-slate-500 font-mono">
                      {ch.questions.length} Q
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        selectOnlyChapter(ch.id);
                      }}
                      className="text-[11px] text-slate-500 hover:text-slate-900 hover:underline px-1 py-0.5 ml-1"
                      title="Ne tester que ce chapitre"
                    >
                      Seul
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Section 2 : Durée */}
        <div>
          <h2 className="text-sm font-semibold text-slate-900 mb-1">
            Durée de l'épreuve
          </h2>
          <p className="text-xs text-slate-500 mb-3">
            Minuterie continue pendant toute la session d'examen.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {[
              { label: '30 minutes', value: 30, desc: 'Rythme rapide' },
              { label: '60 minutes', value: 60, desc: 'Standard conseillé' },
              { label: '90 minutes', value: 90, desc: 'Approfondi' },
              { label: 'Illimité', value: 0, desc: 'Sans minuterie' }
            ].map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => setDuration(opt.value)}
                className={`p-3 rounded-lg text-left transition-colors cursor-pointer ${
                  duration === opt.value
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                <div className="text-xs font-semibold">{opt.label}</div>
                <div className={`text-[11px] mt-0.5 ${duration === opt.value ? 'text-slate-300' : 'text-slate-500'}`}>
                  {opt.desc}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Section 3 : Options (Seuil & Ordre) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-slate-100">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-2">
              Seuil de validation
            </label>
            <div className="flex items-center gap-1.5">
              {[75, 80, 85, 90].map((th) => (
                <button
                  key={th}
                  type="button"
                  onClick={() => setThreshold(th)}
                  className={`flex-1 py-1.5 px-2 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                    threshold === th
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  {th}%
                </button>
              ))}
            </div>
            <span className="text-[11px] text-slate-500 mt-1.5 block">
              Seuil officiel recommandé : 85%
            </span>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-2">
              Ordre des questions
            </label>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setShuffle(false)}
                className={`flex-1 py-1.5 px-2 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                  !shuffle
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                Par chapitre (2.1 → 2.12)
              </button>
              <button
                type="button"
                onClick={() => setShuffle(true)}
                className={`flex-1 py-1.5 px-2 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                  shuffle
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                Aléatoire
              </button>
            </div>
          </div>
        </div>

        {/* Section 4 : Récapitulatif & Action */}
        <div className="pt-6 border-t border-slate-100">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6 text-xs text-slate-600">
            <div>
              <span className="text-slate-500">Total :</span>{' '}
              <strong className="text-slate-900 font-semibold">{totalSelectedQuestions} questions</strong>
            </div>
            <div>
              <span className="text-slate-500">Note max :</span>{' '}
              <strong className="text-slate-900 font-semibold">{maxPossiblePoints} points</strong>
            </div>
            <div>
              <span className="text-slate-500">Temps alloué :</span>{' '}
              <strong className="text-slate-900 font-semibold">
                {duration > 0 ? `${duration} min` : 'Libre'}
              </strong>
            </div>
            <div>
              <span className="text-slate-500">Barème :</span>{' '}
              <span>+2 / -1 / 0</span>
            </div>
          </div>

          <button
            id="btn-setup-start-exam"
            onClick={handleStart}
            disabled={totalSelectedQuestions === 0}
            className="w-full sm:w-auto px-8 py-3.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-medium text-sm transition-colors inline-flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>Commencer l'examen</span>
          </button>
        </div>
      </div>
    </div>
  );
};
