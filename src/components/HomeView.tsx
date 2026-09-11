import React from 'react';
import { 
  AlertCircle, 
  ArrowDown, 
  ArrowRight, 
  BookOpen, 
  CheckCircle2, 
  Clock, 
  History, 
  Layers, 
  Sparkles, 
  Trash2, 
  X, 
  XCircle 
} from 'lucide-react';
import { Chapter, ModuleId, QuizHistoryEntry } from '../types';
import { MODULE_DEFINITIONS } from '../utils/quizDataLoader';

interface HomeViewProps {
  selectedModuleId: ModuleId;
  onSelectModule: (moduleId: ModuleId) => void;
  chapters: Chapter[];
  totalQuestions: number;
  onStartConfig: () => void;
  onQuickStartAll: (durationMinutes: number) => void;
  onNavigateToCustomImport: () => void;
  sessionCancellationNotice?: string | null;
  onDismissCancellationNotice?: () => void;
  localHistory?: QuizHistoryEntry[];
  onClearHistory?: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  selectedModuleId,
  onSelectModule,
  chapters,
  totalQuestions,
  onStartConfig,
  onQuickStartAll,
  onNavigateToCustomImport,
  sessionCancellationNotice,
  onDismissCancellationNotice,
  localHistory = [],
  onClearHistory
}) => {
  const currentMod = MODULE_DEFINITIONS[selectedModuleId];
  const advisedDuration = currentMod.defaultTimeMinutes;

  return (
    <div className="max-w-3xl mx-auto px-6 py-10 sm:py-14">
      {/* Session Cancellation Notice (Requirement 1) */}
      {sessionCancellationNotice && (
        <div className="mb-8 p-4 rounded-xl bg-slate-900 text-white flex items-start justify-between gap-3 shadow-sm">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <div className="text-xs font-semibold text-white mb-0.5">
                Session d'examen interrompue
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {sessionCancellationNotice}
              </p>
            </div>
          </div>
          {onDismissCancellationNotice && (
            <button
              type="button"
              onClick={onDismissCancellationNotice}
              className="text-slate-400 hover:text-white p-1 rounded transition-colors cursor-pointer shrink-0"
              title="Fermer l'alerte"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      )}

      {/* Two Clear Learning Paths (Requirement 1) */}
      <div className="mb-10">
        <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3">
          Choisir votre parcours d'évaluation
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Path 1: Existing Modules */}
          <div
            id="path-card-existing-modules"
            className="p-5 rounded-2xl border border-slate-900 bg-white shadow-xs text-left relative flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2.5">
                <span className="text-[11px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-900 text-white">
                  Parcours 1 • Référentiel
                </span>
                <BookOpen className="w-4 h-4 text-slate-700" />
              </div>
              <h2 className="text-base font-semibold text-slate-900 mb-1">
                Modules Spécialisés Officiels
              </h2>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                Pratiquez les questions officielles issues des Modules 1 et 2 (18 chapitres au total), avec explications du cours et barème officiel.
              </p>
            </div>

            <div className="text-xs font-medium text-slate-800 inline-flex items-center gap-1.5 pt-2 border-t border-slate-100">
              <span>Sélectionner un module ci-dessous</span>
              <ArrowDown className="w-3.5 h-3.5 text-slate-600" />
            </div>
          </div>

          {/* Path 2: Custom Test / Import */}
          <div
            id="path-card-custom-test"
            className="p-5 rounded-2xl border border-slate-200 hover:border-slate-400 bg-white hover:bg-slate-50/40 transition-all text-left relative flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2.5">
                <span className="text-[11px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-800">
                  Parcours 2 • Sur-mesure
                </span>
                <Sparkles className="w-4 h-4 text-slate-700" />
              </div>
              <h2 className="text-base font-semibold text-slate-900 mb-1">
                Créer un Test Personnalisé
              </h2>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                Importez votre propre banque de questions au format CSV (modèle fourni à télécharger) ou Markdown et configurez votre examen personnalisé.
              </p>
            </div>

            <button
              id="btn-home-create-custom-test"
              type="button"
              onClick={onNavigateToCustomImport}
              className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition-colors inline-flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Importer vos questions (CSV / MD)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

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

      {/* Local History Section (Requirement 16) */}
      {localHistory.length > 0 && (
        <div className="mb-10 pt-6 border-t border-slate-100">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
            <div className="flex items-center gap-2">
              <History className="w-4 h-4 text-slate-700" />
              <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-700">
                Historique local des sessions ({localHistory.length})
              </h2>
            </div>

            {onClearHistory && (
              <button
                type="button"
                id="btn-clear-history"
                onClick={() => {
                  if (window.confirm("Êtes-vous sûr de vouloir effacer l'historique de vos sessions locales ?")) {
                    onClearHistory();
                  }
                }}
                className="text-xs text-slate-500 hover:text-rose-600 transition-colors flex items-center gap-1 cursor-pointer"
                title="Effacer tout l'historique de ce navigateur"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Effacer l'historique</span>
              </button>
            )}
          </div>

          <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden bg-white">
            {localHistory.slice(0, 5).map((entry) => (
              <div key={entry.id} className="p-3.5 flex items-center justify-between gap-3 text-xs">
                <div>
                  <div className="font-semibold text-slate-900">{entry.title}</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    {entry.dateFormatted} • {entry.totalQuestions} questions • {entry.timeSpentFormatted}
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <div className="text-right">
                    <div className="font-mono font-semibold text-slate-900">
                      {entry.percentage}%
                    </div>
                    <div className="text-[10px] text-slate-500 font-mono">
                      {entry.rawScore}/{entry.maxScore} pts
                    </div>
                  </div>

                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider ${
                      entry.isPassed
                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                        : 'bg-rose-50 text-rose-800 border border-rose-200'
                    }`}
                  >
                    {entry.isPassed ? 'Réussi' : 'Échec'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

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
