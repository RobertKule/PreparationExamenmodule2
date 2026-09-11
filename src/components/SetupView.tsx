import React, { useState } from 'react';
import { 
  AlertTriangle, 
  ArrowLeft, 
  ArrowRight, 
  Check, 
  Clock, 
  HelpCircle, 
  Layers, 
  Minus,
  Play, 
  Plus,
  RotateCcw, 
  Settings2, 
  ShieldCheck, 
  Sliders,
  Sparkles 
} from 'lucide-react';
import { Chapter, ModuleId, QuizConfig } from '../types';
import { MODULE_DEFINITIONS } from '../utils/quizDataLoader';

interface SetupViewProps {
  selectedModuleId?: ModuleId;
  chapters: Chapter[];
  onStartQuiz: (config: QuizConfig) => void;
  onBackToHome: () => void;
  isCustomBank?: boolean;
  customBankTitle?: string;
}

const STEP_LABELS = [
  '1. Questions',
  '2. Chapitres',
  '3. Durée',
  '4. Mode',
  '5. Confirmation'
];

export const SetupView: React.FC<SetupViewProps> = ({
  selectedModuleId = 'module-1',
  chapters,
  onStartQuiz,
  onBackToHome,
  isCustomBank = false,
  customBankTitle
}) => {
  const currentMod = MODULE_DEFINITIONS[selectedModuleId];
  const displayTitle = isCustomBank ? (customBankTitle || 'Test Personnalisé') : currentMod?.name;

  // Stepper state (1 to 5)
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Settings states
  const [questionCountLimit, setQuestionCountLimit] = useState<number>(0); // 0 = all
  const [selectedIds, setSelectedIds] = useState<string[]>(chapters.map((c) => c.id));
  const initialDuration = isCustomBank 
    ? Math.max(15, Math.ceil((chapters.reduce((acc, c) => acc + c.questions.length, 0) * 1.5))) 
    : (currentMod?.defaultTimeMinutes || 60);

  const [duration, setDuration] = useState<number>(initialDuration);
  const [isCustomDuration, setIsCustomDuration] = useState<boolean>(
    ![30, 60, 90, 0].includes(initialDuration)
  );
  const [customMinutesInput, setCustomMinutesInput] = useState<string>(
    ![30, 60, 90, 0].includes(initialDuration) ? String(initialDuration) : '45'
  );

  const selectPresetDuration = (val: number) => {
    setIsCustomDuration(false);
    setDuration(val);
  };

  const activateCustomDuration = (initialVal?: number) => {
    setIsCustomDuration(true);
    const target = initialVal ?? (parseInt(customMinutesInput, 10) || 45);
    const valid = Math.max(1, Math.min(360, target));
    setDuration(valid);
    setCustomMinutesInput(String(valid));
  };

  const handleCustomInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valStr = e.target.value;
    setCustomMinutesInput(valStr);
    const num = parseInt(valStr, 10);
    if (!isNaN(num) && num > 0) {
      setDuration(Math.min(360, Math.max(1, num)));
    }
  };

  const adjustCustomMinutes = (delta: number) => {
    const current = duration > 0 ? duration : (parseInt(customMinutesInput, 10) || 45);
    const next = Math.max(1, Math.min(360, current + delta));
    setIsCustomDuration(true);
    setDuration(next);
    setCustomMinutesInput(String(next));
  };
  const [isPracticeMode, setIsPracticeMode] = useState<boolean>(false);
  const [threshold, setThreshold] = useState<number>(85);
  const [shuffle, setShuffle] = useState<boolean>(false);
  const [shuffleAnswers, setShuffleAnswers] = useState<boolean>(false);

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

  const selectedChapters = chapters.filter((c) => selectedIds.includes(c.id));
  const totalAvailableInSelectedChapters = selectedChapters.reduce(
    (acc, curr) => acc + curr.questions.length,
    0
  );

  const effectiveQuestionCount = 
    questionCountLimit > 0 
      ? Math.min(questionCountLimit, totalAvailableInSelectedChapters)
      : totalAvailableInSelectedChapters;

  // "Paramètres recommandés" / "Default settings" button
  const handleApplyDefaults = () => {
    setQuestionCountLimit(0); // All questions
    setSelectedIds(chapters.map((c) => c.id));
    setDuration(
      isCustomBank
        ? Math.max(15, Math.ceil(totalAvailableInSelectedChapters * 1.5))
        : (currentMod?.defaultTimeMinutes || 60)
    );
    setIsPracticeMode(false);
    setThreshold(85);
    setShuffle(false);
    setShuffleAnswers(false);
    setCurrentStep(5); // Jump directly to final confirmation step
  };

  const handleStart = () => {
    onStartQuiz({
      moduleId: selectedModuleId,
      selectedChapterIds: selectedIds,
      durationMinutes: duration,
      passThresholdPercent: threshold,
      shuffleQuestions: shuffle,
      shuffleAnswers: shuffleAnswers,
      questionCountLimit: questionCountLimit,
      isPracticeMode: isPracticeMode,
      isCustomBank: isCustomBank,
      customBankTitle: customBankTitle
    });
  };

  // Presets for Step 2
  const renderChapterPresets = () => {
    if (isCustomBank) {
      return (
        <div className="flex flex-wrap items-center gap-2 mb-4 text-xs">
          <button
            type="button"
            onClick={() => setSelectedIds(chapters.map((c) => c.id))}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer ${
              isAllSelected ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Tous les thèmes importés ({chapters.length})
          </button>
        </div>
      );
    }

    if (selectedModuleId === 'module-1') {
      return (
        <div className="flex flex-wrap items-center gap-2 mb-4 text-xs">
          <button
            type="button"
            onClick={() => setSelectedIds(chapters.map((c) => c.id))}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer ${
              isAllSelected ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Tous les chapitres ({chapters.length})
          </button>
          <button
            type="button"
            onClick={() => setSelectedIds(chapters.slice(0, 3).map((c) => c.id))}
            className="px-3 py-1.5 rounded-md font-medium bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors cursor-pointer"
          >
            Partie 1 (1.1 à 1.3)
          </button>
          <button
            type="button"
            onClick={() => setSelectedIds(chapters.slice(3, 6).map((c) => c.id))}
            className="px-3 py-1.5 rounded-md font-medium bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors cursor-pointer"
          >
            Partie 2 (1.4 à 1.6)
          </button>
        </div>
      );
    }

    if (selectedModuleId === 'module-2') {
      return (
        <div className="flex flex-wrap items-center gap-2 mb-4 text-xs">
          <button
            type="button"
            onClick={() => setSelectedIds(chapters.map((c) => c.id))}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer ${
              isAllSelected ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Tous les chapitres (12)
          </button>
          <button
            type="button"
            onClick={() => setSelectedIds(chapters.slice(0, 6).map((c) => c.id))}
            className="px-3 py-1.5 rounded-md font-medium bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors cursor-pointer"
          >
            Aérodynamique (2.1 à 2.6)
          </button>
          <button
            type="button"
            onClick={() => setSelectedIds(chapters.slice(6, 12).map((c) => c.id))}
            className="px-3 py-1.5 rounded-md font-medium bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors cursor-pointer"
          >
            Systèmes & Contrôle (2.7 à 2.12)
          </button>
        </div>
      );
    }

    // module-all
    const mod1Chapters = chapters.filter((c) => c.code.startsWith('1.'));
    const mod2Chapters = chapters.filter((c) => c.code.startsWith('2.'));
    return (
      <div className="flex flex-wrap items-center gap-2 mb-4 text-xs">
        <button
          type="button"
          onClick={() => setSelectedIds(chapters.map((c) => c.id))}
          className={`px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer ${
            isAllSelected ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          Tous les chapitres ({chapters.length})
        </button>
        <button
          type="button"
          onClick={() => setSelectedIds(mod1Chapters.map((c) => c.id))}
          className="px-3 py-1.5 rounded-md font-medium bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors cursor-pointer"
        >
          Module 1 seul ({mod1Chapters.length})
        </button>
        <button
          type="button"
          onClick={() => setSelectedIds(mod2Chapters.map((c) => c.id))}
          className="px-3 py-1.5 rounded-md font-medium bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors cursor-pointer"
        >
          Module 2 seul ({mod2Chapters.length})
        </button>
      </div>
    );
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-10 sm:py-12">
      {/* Top row: Back link + "Default settings" button */}
      <div className="flex items-center justify-between gap-4 mb-6">
        <button
          id="btn-back-home"
          type="button"
          onClick={onBackToHome}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Retour au choix du module</span>
        </button>

        <button
          id="btn-apply-defaults"
          type="button"
          onClick={handleApplyDefaults}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-md transition-colors cursor-pointer"
          title="Appliquer tous les paramètres officiels par défaut"
        >
          <Sparkles className="w-3.5 h-3.5 text-slate-700" />
          <span>Paramètres recommandés</span>
        </button>
      </div>

      {/* Stepper Progress Bar */}
      <div className="mb-8 pb-6 border-b border-slate-100">
        <div className="flex items-center justify-between text-xs text-slate-500 font-medium mb-3">
          <span>Étape {currentStep} sur 5</span>
          <span className="text-slate-900 font-semibold">{currentMod.badge}</span>
        </div>

        <div className="grid grid-cols-5 gap-1.5">
          {[1, 2, 3, 4, 5].map((stepNum) => (
            <button
              key={stepNum}
              type="button"
              onClick={() => setCurrentStep(stepNum)}
              className={`h-1.5 rounded-full transition-all cursor-pointer ${
                stepNum === currentStep
                  ? 'bg-slate-900'
                  : stepNum < currentStep
                  ? 'bg-slate-400'
                  : 'bg-slate-200 hover:bg-slate-300'
              }`}
              title={`Aller à l'étape ${stepNum}`}
            />
          ))}
        </div>

        <div className="hidden sm:grid grid-cols-5 gap-1.5 text-[11px] text-slate-500 mt-2 font-medium">
          {STEP_LABELS.map((label, idx) => (
            <span
              key={label}
              className={`truncate ${
                idx + 1 === currentStep ? 'text-slate-900 font-semibold' : ''
              }`}
            >
              {label}
            </span>
          ))}
        </div>
      </div>

      {/* STEP 1: NOMBRE DE QUESTIONS */}
      {currentStep === 1 && (
        <div className="space-y-6">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
              Étape 1 sur 5
            </div>
            <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">
              Nombre de questions
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Choisissez le volume de questions pour votre session d'entraînement.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              {
                value: 0,
                title: 'Toutes les questions',
                desc: `L'intégralité du module (${totalAvailableInSelectedChapters} questions)`,
                badge: 'Recommandé'
              },
              {
                value: 10,
                title: '10 questions',
                desc: 'Session express rapide (~10-15 minutes)',
                badge: 'Express'
              },
              {
                value: 20,
                title: '20 questions',
                desc: 'Format intermédiaire équilibré (~20-25 minutes)',
                badge: 'Standard'
              },
              {
                value: 30,
                title: '30 questions',
                desc: 'Évaluation approfondie (~30-40 minutes)',
                badge: 'Intensif'
              }
            ].map((item) => {
              const isSelected = questionCountLimit === item.value;
              return (
                <button
                  key={item.value}
                  type="button"
                  id={`btn-step1-count-${item.value}`}
                  onClick={() => setQuestionCountLimit(item.value)}
                  className={`p-4 rounded-xl text-left border transition-all cursor-pointer relative ${
                    isSelected
                      ? 'border-slate-900 bg-slate-900 text-white shadow-xs'
                      : 'border-slate-200 bg-white hover:border-slate-300 text-slate-800'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-semibold">{item.title}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${
                        isSelected ? 'bg-slate-800 text-slate-200' : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {item.badge}
                    </span>
                  </div>
                  <p
                    className={`text-xs ${
                      isSelected ? 'text-slate-300' : 'text-slate-500'
                    }`}
                  >
                    {item.desc}
                  </p>
                </button>
              );
            })}
          </div>

          <div className="p-3.5 rounded-lg bg-slate-50 text-xs text-slate-600 border border-slate-100">
            Total sélectionné :{' '}
            <strong className="text-slate-900 font-semibold">{effectiveQuestionCount}</strong>{' '}
            questions sur un total disponible de{' '}
            <strong className="text-slate-900">{totalAvailableInSelectedChapters}</strong>.
          </div>
        </div>
      )}

      {/* STEP 2: SÉLECTION DES CHAPITRES */}
      {currentStep === 2 && (
        <div className="space-y-6">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
              Étape 2 sur 5
            </div>
            <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">
              Chapitres et sections
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Sélectionnez les thèmes du cours sur lesquels vous souhaitez être évalué.
            </p>
          </div>

          {/* Quick presets */}
          {renderChapterPresets()}

          {/* Toggle all */}
          <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-100">
            <button
              type="button"
              onClick={toggleAll}
              className="font-medium text-slate-700 hover:text-slate-900 cursor-pointer"
            >
              {isAllSelected ? 'Décocher tous les chapitres' : 'Sélectionner tous les chapitres'}
            </button>
            <span className="text-slate-500">
              {selectedIds.length} sur {chapters.length} chapitres retenus
            </span>
          </div>

          {/* Chapter list */}
          <div className="divide-y divide-slate-100 max-h-[380px] overflow-y-auto pr-1">
            {chapters.map((chapter) => {
              const isChecked = selectedIds.includes(chapter.id);
              return (
                <div
                  key={chapter.id}
                  onClick={() => toggleChapter(chapter.id)}
                  className={`py-3 px-2 flex items-center justify-between rounded-md cursor-pointer transition-colors ${
                    isChecked ? 'bg-slate-50/80 hover:bg-slate-100/70' : 'hover:bg-slate-50/50'
                  }`}
                >
                  <div className="flex items-center gap-3 pr-4">
                    <div
                      className={`w-4 h-4 rounded flex items-center justify-center transition-colors shrink-0 ${
                        isChecked ? 'bg-slate-900 text-white' : 'border border-slate-300'
                      }`}
                    >
                      {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-slate-900 mr-2">
                        {chapter.shortTitle}
                      </span>
                      <span className="text-xs text-slate-600">
                        {chapter.title.replace(`${chapter.shortTitle} — `, '')}
                      </span>
                    </div>
                  </div>
                  <span className="text-xs text-slate-400 shrink-0 font-mono">
                    {chapter.questions.length} Q
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* STEP 3: LIMITE DE TEMPS */}
      {currentStep === 3 && (
        <div className="space-y-6">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
              Étape 3 sur 5
            </div>
            <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">
              Limite de temps
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Choisissez la durée allouée pour compléter l'épreuve.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              {
                value: 30,
                label: '30 minutes',
                desc: 'Rythme rapide • Recommandé pour le Module 1'
              },
              {
                value: 60,
                label: '60 minutes',
                desc: 'Standard conseillé • Idéal pour le Module 2'
              },
              {
                value: 90,
                label: '90 minutes',
                desc: 'Format approfondi • Adapté à l\'examen intégral'
              },
              {
                value: 0,
                label: 'Illimité (sans minuterie)',
                desc: 'Entraînez-vous sans contrainte de temps'
              }
            ].map((opt) => {
              const isSelected = !isCustomDuration && duration === opt.value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  id={`btn-step3-time-${opt.value}`}
                  onClick={() => selectPresetDuration(opt.value)}
                  className={`p-4 rounded-xl text-left border transition-all cursor-pointer ${
                    isSelected
                      ? 'border-slate-900 bg-slate-900 text-white shadow-xs'
                      : 'border-slate-200 bg-white hover:border-slate-300 text-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Clock
                      className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-slate-500'}`}
                    />
                    <span className="text-sm font-semibold">{opt.label}</span>
                  </div>
                  <p
                    className={`text-xs ${
                      isSelected ? 'text-slate-300' : 'text-slate-500'
                    }`}
                  >
                    {opt.desc}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Bouton & Interface pour mettre son temps voulu */}
          <div
            className={`p-4 rounded-xl border transition-all ${
              isCustomDuration
                ? 'border-slate-900 bg-white ring-1 ring-slate-900/10 shadow-xs'
                : 'border-slate-200 bg-slate-50/50 hover:bg-slate-50'
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <button
                  type="button"
                  id="btn-step3-time-custom"
                  onClick={() => activateCustomDuration()}
                  className="flex items-center gap-2 text-left cursor-pointer group"
                >
                  <Sliders className={`w-4 h-4 ${isCustomDuration ? 'text-slate-900' : 'text-slate-500 group-hover:text-slate-800'}`} />
                  <span className="text-sm font-semibold text-slate-900">
                    Définir mon temps voulu (personnalisé)
                  </span>
                </button>
                <p className="text-xs text-slate-500 mt-0.5">
                  Spécifiez une durée exacte en minutes selon vos objectifs d'entraînement.
                </p>
              </div>

              {!isCustomDuration ? (
                <button
                  type="button"
                  id="btn-activate-custom-time"
                  onClick={() => activateCustomDuration()}
                  className="px-3.5 py-2 rounded-lg bg-white border border-slate-300 hover:border-slate-400 text-slate-700 text-xs font-semibold self-start sm:self-auto cursor-pointer transition-colors shadow-2xs"
                >
                  Choisir une durée libre
                </button>
              ) : (
                <span className="px-2.5 py-1 rounded-md bg-slate-900 text-white text-xs font-mono font-medium self-start sm:self-auto">
                  {duration} minute{duration > 1 ? 's' : ''}
                </span>
              )}
            </div>

            {/* Formulaire de saisie du temps voulu si actif */}
            {isCustomDuration && (
              <div className="mt-4 pt-4 border-t border-slate-100 space-y-3">
                <div className="flex flex-wrap items-center gap-2">
                  <label htmlFor="input-custom-duration" className="text-xs font-medium text-slate-700">
                    Temps souhaité :
                  </label>

                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      id="btn-custom-time-minus-5"
                      onClick={() => adjustCustomMinutes(-5)}
                      className="p-2 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 cursor-pointer transition-colors"
                      title="- 5 minutes"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>

                    <div className="relative flex items-center">
                      <input
                        id="input-custom-duration"
                        type="number"
                        min="1"
                        max="360"
                        value={customMinutesInput}
                        onChange={handleCustomInputChange}
                        className="w-24 px-3 py-1.5 text-center text-sm font-semibold font-mono rounded-lg border border-slate-300 focus:outline-hidden focus:border-slate-900 focus:ring-1 focus:ring-slate-900 text-slate-900 bg-white"
                        placeholder="Ex: 45"
                      />
                      <span className="ml-1.5 text-xs font-medium text-slate-500">min</span>
                    </div>

                    <button
                      type="button"
                      id="btn-custom-time-plus-5"
                      onClick={() => adjustCustomMinutes(5)}
                      className="p-2 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 cursor-pointer transition-colors"
                      title="+ 5 minutes"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <span className="text-xs text-slate-400 hidden sm:inline ml-1">•</span>

                  {/* Quick duration presets chips */}
                  <div className="flex flex-wrap items-center gap-1.5 ml-auto">
                    {[15, 20, 45, 75, 120, 150].map((mins) => (
                      <button
                        key={mins}
                        type="button"
                        id={`btn-chip-time-${mins}`}
                        onClick={() => activateCustomDuration(mins)}
                        className={`px-2 py-1 rounded text-[11px] font-medium transition-colors cursor-pointer ${
                          duration === mins
                            ? 'bg-slate-900 text-white font-semibold'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        {mins} min
                      </button>
                    ))}
                  </div>
                </div>

                <div className="text-[11px] text-slate-500 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>
                    Équivaut à{' '}
                    <strong className="text-slate-800">
                      {Math.floor(duration / 60) > 0 ? `${Math.floor(duration / 60)} heure${Math.floor(duration / 60) > 1 ? 's' : ''} ` : ''}
                      {duration % 60 > 0 ? `${duration % 60} minute${duration % 60 > 1 ? 's' : ''}` : ''}
                    </strong>
                    {duration < 60 && ` (${duration} minutes)`}.
                  </span>
                </div>
              </div>
            )}
          </div>

          <div className="p-3.5 rounded-lg bg-slate-50 text-xs text-slate-600 border border-slate-100">
            {duration > 0 ? (
              <span>
                Un compte à rebours de <strong className="text-slate-900">{duration} minutes</strong>{' '}
                sera affiché. En cas de dépassement, la session sera automatiquement soumise.
              </span>
            ) : (
              <span>
                Le quiz se déroulera à votre propre rythme, sans interruption de temps.
              </span>
            )}
          </div>
        </div>
      )}

      {/* STEP 4: MODE & RÈGLES */}
      {currentStep === 4 && (
        <div className="space-y-6">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
              Étape 4 sur 5
            </div>
            <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">
              Mode d'évaluation & Ordre
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Configurez le barème de notation et l'ordre d'affichage des questions.
            </p>
          </div>

          {/* Mode selector */}
          <div>
            <div className="text-xs font-semibold text-slate-900 mb-2">
              Barème de notation :
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                id="btn-mode-official"
                onClick={() => {
                  setIsPracticeMode(false);
                  setThreshold(85);
                }}
                className={`p-4 rounded-xl text-left border transition-all cursor-pointer ${
                  !isPracticeMode
                    ? 'border-slate-900 bg-slate-900 text-white shadow-xs'
                    : 'border-slate-200 bg-white hover:border-slate-300 text-slate-800'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-semibold">Mode Examen Officiel</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${
                      !isPracticeMode ? 'bg-slate-800 text-slate-200' : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    Standard
                  </span>
                </div>
                <div
                  className={`text-xs ${
                    !isPracticeMode ? 'text-slate-300' : 'text-slate-500'
                  }`}
                >
                  • Bonne réponse : <strong>+2 points</strong><br />
                  • Réponse fausse : <strong>-1 point (pénalité)</strong><br />
                  • Seuil requis : <strong>85%</strong>
                </div>
              </button>

              <button
                type="button"
                id="btn-mode-practice"
                onClick={() => {
                  setIsPracticeMode(true);
                  setThreshold(75);
                }}
                className={`p-4 rounded-xl text-left border transition-all cursor-pointer ${
                  isPracticeMode
                    ? 'border-slate-900 bg-slate-900 text-white shadow-xs'
                    : 'border-slate-200 bg-white hover:border-slate-300 text-slate-800'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-semibold">Entraînement Pédagogique</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${
                      isPracticeMode ? 'bg-slate-800 text-slate-200' : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    Bienveillant
                  </span>
                </div>
                <div
                  className={`text-xs ${
                    isPracticeMode ? 'text-slate-300' : 'text-slate-500'
                  }`}
                >
                  • Bonne réponse : <strong>+2 points</strong><br />
                  • Réponse fausse : <strong>0 point (pas de pénalité)</strong><br />
                  • Seuil requis : <strong>75%</strong>
                </div>
              </button>
            </div>
          </div>

          {/* Question order */}
          <div>
            <div className="text-xs font-semibold text-slate-900 mb-2">
              Ordre de défilement des questions :
            </div>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                id="btn-order-sequential"
                onClick={() => setShuffle(false)}
                className={`p-3 rounded-lg text-xs font-medium border text-center transition-colors cursor-pointer ${
                  !shuffle
                    ? 'border-slate-900 bg-slate-100 text-slate-900 font-semibold'
                    : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                Chronologique (du cours)
              </button>
              <button
                type="button"
                id="btn-order-shuffle"
                onClick={() => setShuffle(true)}
                className={`p-3 rounded-lg text-xs font-medium border text-center transition-colors cursor-pointer ${
                  shuffle
                    ? 'border-slate-900 bg-slate-100 text-slate-900 font-semibold'
                    : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                Aléatoire (mélangé)
              </button>
            </div>
          </div>

          {/* Answer choices order (Requirement 11) */}
          <div>
            <div className="text-xs font-semibold text-slate-900 mb-2">
              Ordre des propositions de réponses (A, B, C, D) :
            </div>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                id="btn-answers-sequential"
                onClick={() => setShuffleAnswers(false)}
                className={`p-3 rounded-lg text-xs font-medium border text-center transition-colors cursor-pointer ${
                  !shuffleAnswers
                    ? 'border-slate-900 bg-slate-100 text-slate-900 font-semibold'
                    : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                Ordre standard
              </button>
              <button
                type="button"
                id="btn-answers-shuffle"
                onClick={() => setShuffleAnswers(true)}
                className={`p-3 rounded-lg text-xs font-medium border text-center transition-colors cursor-pointer ${
                  shuffleAnswers
                    ? 'border-slate-900 bg-slate-100 text-slate-900 font-semibold'
                    : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                Mélanger les choix (A, B, C, D)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* STEP 5: CONFIRMATION FINALE */}
      {currentStep === 5 && (
        <div className="space-y-6">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
              Étape 5 sur 5
            </div>
            <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">
              Confirmation avant le départ
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Vérifiez votre configuration et prenez note des consignes d'examen.
            </p>
          </div>

          {/* Summary table */}
          <div className="p-5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-3 text-xs">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200">
              <span className="text-slate-500">Module / Sujet</span>
              <span className="font-semibold text-slate-900">{displayTitle}</span>
            </div>
            <div className="flex items-center justify-between pb-2 border-b border-slate-200">
              <span className="text-slate-500">Nombre de questions</span>
              <span className="font-semibold text-slate-900">
                {effectiveQuestionCount} questions ({effectiveQuestionCount * 2} points max)
              </span>
            </div>
            <div className="flex items-center justify-between pb-2 border-b border-slate-200">
              <span className="text-slate-500">Chapitres inclus</span>
              <span className="font-semibold text-slate-900">
                {selectedChapters.length} chapitres
              </span>
            </div>
            <div className="flex items-center justify-between pb-2 border-b border-slate-200">
              <span className="text-slate-500">Durée de l'épreuve</span>
              <span className="font-semibold text-slate-900">
                {duration > 0 ? `${duration} minutes` : 'Temps libre (illimité)'}
              </span>
            </div>
            <div className="flex items-center justify-between pb-2 border-b border-slate-200">
              <span className="text-slate-500">Mode & Barème</span>
              <span className="font-semibold text-slate-900">
                {isPracticeMode ? 'Entraînement (+2 / 0 pt)' : 'Officiel (+2 / -1 pt)'} • Seuil {threshold}%
              </span>
            </div>
            <div className="flex items-center justify-between pb-2 border-b border-slate-200">
              <span className="text-slate-500">Ordre des questions</span>
              <span className="font-semibold text-slate-900">
                {shuffle ? 'Aléatoire (mélangé)' : 'Chronologique'}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Ordre des propositions</span>
              <span className="font-semibold text-slate-900">
                {shuffleAnswers ? 'Aléatoire (A, B, C, D mélangés)' : 'Ordre initial'}
              </span>
            </div>
          </div>

          {/* CRITICAL WARNING CARD (Requirement 1 & 2) */}
          <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200/80 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
            <div className="text-xs text-amber-900 leading-relaxed">
              <strong className="font-semibold block mb-0.5">
                Consigne stricte de surveillance de session :
              </strong>
              Toute sortie de l'interface d'examen (fermeture de l'onglet, rechargement de la page, navigation externe ou basculement de fenêtre) entraînera <strong>l'annulation automatique et immédiate de votre session</strong>. Vos réponses ne seront ni enregistrées ni comptabilisées.
            </div>
          </div>

          {/* COPY-PASTE RESTRICTION NOTICE (Requirement 2) */}
          <div className="p-3.5 rounded-lg bg-slate-100 text-xs text-slate-600 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-slate-700 shrink-0" />
            <span>
              Pendant l'épreuve active, le copier-coller et le clic droit sont désactivés pour garantir l'intégrité de l'évaluation.
            </span>
          </div>
        </div>
      )}

      {/* Stepper Navigation Buttons */}
      <div className="pt-8 border-t border-slate-100 flex items-center justify-between gap-3 mt-8">
        {currentStep > 1 ? (
          <button
            type="button"
            id="btn-stepper-prev"
            onClick={() => setCurrentStep((s) => s - 1)}
            className="px-4 py-2.5 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-100 text-xs font-medium transition-colors inline-flex items-center gap-1.5 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Précédent</span>
          </button>
        ) : (
          <div />
        )}

        <div className="flex items-center gap-3">
          {currentStep < 5 ? (
            <button
              type="button"
              id="btn-stepper-next"
              onClick={() => setCurrentStep((s) => s + 1)}
              className="px-6 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-medium transition-colors inline-flex items-center gap-1.5 cursor-pointer"
            >
              <span>Étape suivante</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              type="button"
              id="btn-stepper-start-quiz"
              onClick={handleStart}
              className="px-8 py-3 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition-colors inline-flex items-center gap-2 cursor-pointer shadow-sm"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>Démarrer l'examen maintenant</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
