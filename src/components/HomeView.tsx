import React from 'react';
import { 
  AlertCircle, 
  AlertTriangle,
  ArrowDown, 
  ArrowRight, 
  BookOpen, 
  CheckCircle2, 
  Clock, 
  History, 
  Layers, 
  Play,
  Sparkles, 
  Trash2, 
  X, 
  XCircle 
} from 'lucide-react';
import { ActiveExamSession, Chapter, ModuleId, QuizHistoryEntry } from '../types';
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
  activeSession?: ActiveExamSession | null;
  onResumeActiveSession?: () => void;
  onViewInterruptedSession?: () => void;
  onDiscardActiveSession?: () => void;
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
  onClearHistory,
  activeSession,
  onResumeActiveSession,
  onViewInterruptedSession,
  onDiscardActiveSession
}) => {
  const currentMod = MODULE_DEFINITIONS[selectedModuleId] || MODULE_DEFINITIONS['module-1'];
  const advisedDuration = currentMod.defaultTimeMinutes;

  const answeredActiveCount = activeSession ? Object.keys(activeSession.answers || {}).length : 0;
  const totalActiveCount = activeSession?.questions?.length || 0;

  return (
    <div className="max-w-3xl mx-auto px-6 py-10 sm:py-14">
      
      {/* Active / Interrupted Exam Session Banner (Preservation & Resumption) */}
      {activeSession && (
        <div className="mb-8 p-5 rounded-2xl bg-amber-50 border-2 border-amber-300 text-amber-950 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-amber-100 rounded-xl text-amber-800 shrink-0 mt-0.5">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-200 text-amber-900">
                    Session {activeSession.status === 'INTERRUPTED' ? 'Interrompue' : 'En cours'}
                  </span>
                  <span className="text-xs font-semibold text-amber-900">
                    {activeSession.moduleName}
                  </span>
                </div>
                <p className="text-xs text-amber-900/90 leading-relaxed">
                  Progression enregistrée : <strong>{answeredActiveCount}</strong> / {totalActiveCount} questions répondues.
                  Vos réponses ont été conservées et vous pouvez reprendre l'examen ou consulter le bilan partiel.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 shrink-0">
              {onResumeActiveSession && (
                <button
                  type="button"
                  id="btn-resume-active-session"
                  onClick={onResumeActiveSession}
                  className="px-3.5 py-2 rounded-lg bg-amber-700 hover:bg-amber-800 text-white text-xs font-bold transition-colors inline-flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Reprendre</span>
                </button>
              )}

              {onViewInterruptedSession && (
                <button
                  type="button"
                  id="btn-view-interrupted-report"
                  onClick={onViewInterruptedSession}
                  className="px-3 py-2 rounded-lg bg-white hover:bg-amber-100 text-amber-900 border border-amber-300 text-xs font-semibold transition-colors cursor-pointer"
                >
                  Voir le bilan
                </button>
              )}

              {onDiscardActiveSession && (
                <button
                  type="button"
                  id="btn-discard-active-session"
                  onClick={() => {
                    if (window.confirm("Êtes-vous sûr de vouloir abandonner définitivement cette session en cours ?")) {
                      onDiscardActiveSession();
                    }
                  }}
                  className="px-2.5 py-2 rounded-lg text-amber-800 hover:text-rose-700 text-xs font-medium transition-colors cursor-pointer"
                  title="Effacer la session"
                >
                  Abandonner
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Session Cancellation Notice */}
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

      {/* Two Clear Learning Paths */}
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
                Pratiquez les questions officielles issues des Modules 1, 2 et 5 (26 chapitres au total), avec explications du cours et barème officiel (+2 / -1 / 0).
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {(['module-1', 'module-2', 'module-5', 'module-all'] as ModuleId[]).map((mId) => {
            const mod = MODULE_DEFINITIONS[mId];
            const isSelected = selectedModuleId === mId;
            return (
              <button
                key={mId}
                type="button"
                id={`btn-select-mod-${mId}`}
                onClick={() => onSelectModule(mId)}
                className={`p-4 rounded-xl text-left transition-all border cursor-pointer relative flex flex-col justify-between ${
                  isSelected
                    ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                    : 'bg-white text-slate-800 border-slate-200 hover:border-slate-300 hover:bg-slate-50/70'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <div className={`text-[11px] font-bold uppercase tracking-wider ${isSelected ? 'text-slate-300' : 'text-slate-500'}`}>
                      {mod.badge}
                    </div>
                    {isSelected && (
                      <div className="text-white">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                    )}
                  </div>
                  <div className="text-sm font-semibold leading-snug">
                    {mId === 'module-1' && 'Fondamentaux & Réglementation'}
                    {mId === 'module-2' && 'Mécanique du vol & Systèmes'}
                    {mId === 'module-5' && 'Conception & Dimensionnement'}
                    {mId === 'module-all' && 'Examen Intégral (1, 2 & 5)'}
                  </div>
                </div>
                <div className={`text-xs mt-3 pt-2 border-t ${isSelected ? 'border-slate-800 text-slate-300' : 'border-slate-100 text-slate-500'}`}>
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
            {selectedModuleId === 'module-5' && 'Chapitres (5.1 à 5.8)'}
            {selectedModuleId === 'module-all' && 'Chapitres (26 au total)'}
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
          <div className="text-xs text-slate-500 mt-1">Seuil officiel DGAC</div>
        </div>
      </div>

      {/* Chapters list preview */}
      <div className="mb-10">
        <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-4">
          Chapitres inclus dans ce module ({chapters.length})
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {chapters.map((ch) => (
            <div
              key={ch.id}
              className="p-3 rounded-lg border border-slate-100 bg-slate-50/50 flex items-center justify-between text-xs"
            >
              <div className="truncate pr-2">
                <span className="font-semibold text-slate-900 mr-2">{ch.code}</span>
                <span className="text-slate-600 truncate">
                  {ch.title.replace(`${ch.code} — `, '')}
                </span>
              </div>
              <span className="font-mono text-slate-500 shrink-0 font-medium">
                {ch.questions.length} Q
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Local History Section */}
      {localHistory.length > 0 && (
        <div className="mb-10 pt-6 border-t border-slate-100">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
            <div className="flex items-center gap-2">
              <History className="w-4 h-4 text-slate-700" />
              <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-700">
                Historique des sessions ({localHistory.length})
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
            {localHistory.slice(0, 5).map((entry) => {
              const isInterruptedEntry = entry.status === 'INTERRUPTED' || entry.isInterrupted;
              return (
                <div key={entry.id} className="p-3.5 flex items-center justify-between gap-3 text-xs">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-slate-900">{entry.title}</span>
                      {isInterruptedEntry && (
                        <span className="px-1.5 py-0.2 rounded text-[10px] font-bold uppercase tracking-wider bg-amber-100 text-amber-900 border border-amber-300">
                          Interrompu
                        </span>
                      )}
                    </div>
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
                        isInterruptedEntry
                          ? 'bg-amber-50 text-amber-900 border border-amber-300'
                          : entry.isPassed
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                          : 'bg-rose-50 text-rose-800 border border-rose-200'
                      }`}
                    >
                      {isInterruptedEntry ? 'Interrompu' : entry.isPassed ? 'Réussi' : 'Échec'}
                    </span>
                  </div>
                </div>
              );
            })}
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
