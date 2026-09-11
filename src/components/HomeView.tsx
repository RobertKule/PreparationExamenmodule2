import React from 'react';
import { ArrowRight, BookOpen, CheckCircle2, Clock, Layers } from 'lucide-react';
import { Chapter, ModuleId } from '../types';
import { MODULE_DEFINITIONS } from '../utils/quizDataLoader';

interface HomeViewProps {
  selectedModuleId: ModuleId;
  onSelectModule: (moduleId: ModuleId) => void;
  chapters: Chapter[];
  totalQuestions: number;
  onStartConfig: () => void;
  onQuickStartAll: (durationMinutes: number) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  selectedModuleId,
  onSelectModule,
  chapters,
  totalQuestions,
  onStartConfig,
  onQuickStartAll
}) => {
  const currentMod = MODULE_DEFINITIONS[selectedModuleId];
  const advisedDuration = currentMod.defaultTimeMinutes;

  return (
    <div className="max-w-3xl mx-auto px-6 py-10 sm:py-14">
      {/* Module Selector Segmented Cards */}
      <div className="mb-10">
        <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3">
          1. Choisir le module de formation
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {(['module-1', 'module-2', 'module-all'] as ModuleId[]).map((mId) => {
            const mod = MODULE_DEFINITIONS[mId];
            const isSelected = selectedModuleId === mId;
            return (
              <button
                key={mId}
                type="button"
                id={`btn-select-mod-${mId}`}
                onClick={() => onSelectModule(mId)}
                className={`p-4 rounded-xl text-left transition-all border cursor-pointer relative ${
                  isSelected
                    ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                    : 'bg-white text-slate-800 border-slate-200 hover:border-slate-300 hover:bg-slate-50/70'
                }`}
              >
                {isSelected && (
                  <div className="absolute top-3.5 right-3.5 text-white">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                )}
                <div className={`text-xs font-semibold uppercase tracking-wider ${isSelected ? 'text-slate-300' : 'text-slate-500'}`}>
                  {mod.badge}
                </div>
                <div className="text-sm font-semibold mt-1 pr-4 leading-snug">
                  {mId === 'module-1' && 'Fondamentaux & Réglementation'}
                  {mId === 'module-2' && 'Mécanique du vol & Systèmes'}
                  {mId === 'module-all' && 'Examen Intégral (1 + 2)'}
                </div>
                <div className={`text-xs mt-2 ${isSelected ? 'text-slate-300' : 'text-slate-500'}`}>
                  {mod.subtitle}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Intro section for active module */}
      <div className="mb-10 pt-4 border-t border-slate-100">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
          <span>Formation Télépilote Drone</span>
          <span>•</span>
          <span className="text-slate-900">{currentMod.badge}</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-semibold text-slate-900 tracking-tight leading-tight mb-3">
          {currentMod.name}
        </h1>

        <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mb-6">
          {currentMod.description} Évaluez vos compétences dans les conditions de l'examen théorique officiel avec notation +2 / -1 / 0 et explications complètes.
        </p>

        <div className="flex flex-wrap items-center gap-3">
          <button
            id="btn-home-start-quiz"
            onClick={onStartConfig}
            className="px-6 py-3 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-medium text-sm transition-colors inline-flex items-center gap-2 cursor-pointer"
          >
            <span>Configurer et tester</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            id={`btn-home-quick-start-${advisedDuration}`}
            onClick={() => onQuickStartAll(advisedDuration)}
            className="px-5 py-3 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium text-sm transition-colors inline-flex items-center gap-2 cursor-pointer"
          >
            <Clock className="w-4 h-4 text-slate-500" />
            <span>Lancer direct ({advisedDuration} min)</span>
          </button>
        </div>
      </div>

      {/* Overview metrics */}
      <div className="py-5 border-y border-slate-100 grid grid-cols-2 sm:grid-cols-4 gap-6 text-sm mb-10">
        <div>
          <div className="text-2xl font-semibold text-slate-900">{chapters.length}</div>
          <div className="text-xs text-slate-500 mt-1">
            {selectedModuleId === 'module-1' && 'Chapitres (1.1 à 1.6)'}
            {selectedModuleId === 'module-2' && 'Chapitres (2.1 à 2.12)'}
            {selectedModuleId === 'module-all' && 'Chapitres (18 au total)'}
          </div>
        </div>
        <div>
          <div className="text-2xl font-semibold text-slate-900">{totalQuestions}</div>
          <div className="text-xs text-slate-500 mt-1">Questions au total</div>
        </div>
        <div>
          <div className="text-2xl font-semibold text-slate-900">{advisedDuration} min</div>
          <div className="text-xs text-slate-500 mt-1">Durée conseillée</div>
        </div>
        <div>
          <div className="text-2xl font-semibold text-slate-900">85%</div>
          <div className="text-xs text-slate-500 mt-1">Seuil de validation</div>
        </div>
      </div>

      {/* Barème officiel */}
      <div className="mb-10">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3">
          Règles d'évaluation officielles
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
          <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
            <div className="font-semibold text-slate-900">+2 points</div>
            <div className="text-xs text-slate-600 mt-0.5">Par réponse correcte</div>
          </div>
          <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
            <div className="font-semibold text-slate-900">-1 point</div>
            <div className="text-xs text-slate-600 mt-0.5">Par réponse fausse (pénalité)</div>
          </div>
          <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
            <div className="font-semibold text-slate-900">0 point</div>
            <div className="text-xs text-slate-600 mt-0.5">En l'absence de réponse</div>
          </div>
        </div>
        <p className="text-xs text-slate-500 mt-2.5">
          Le calcul du score total divise les points obtenus par la note maximale possible ({totalQuestions * 2} points).
        </p>
      </div>

      {/* Chapters list for active module */}
      <div className="mb-10">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-2">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Chapitres du {currentMod.badge}
          </h2>
          <span className="text-xs text-slate-500">
            {chapters.length} chapitres • {totalQuestions} questions
          </span>
        </div>

        <div className="divide-y divide-slate-100">
          {chapters.map((ch) => (
            <div 
              key={ch.id} 
              className="py-3 px-2 flex items-center justify-between hover:bg-slate-50/60 rounded-md transition-colors"
            >
              <div className="pr-4">
                <span className="text-xs font-semibold text-slate-900 mr-3 inline-block min-w-[75px]">
                  {ch.shortTitle}
                </span>
                <span className="text-sm text-slate-700">
                  {ch.title.replace(`${ch.shortTitle} — `, '')}
                </span>
              </div>

              <span className="text-xs text-slate-500 font-mono shrink-0">
                {ch.questions.length} Q
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="pt-2">
        <button
          id="btn-home-start-quiz-bottom"
          onClick={onStartConfig}
          className="px-6 py-3 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-medium text-sm transition-colors inline-flex items-center gap-2 cursor-pointer"
        >
          <span>Configurer et lancer l'examen ({currentMod.badge})</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
