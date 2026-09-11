import React from 'react';
import { FileCode, RotateCcw } from 'lucide-react';
import { ModuleId } from '../types';
import { MODULE_DEFINITIONS } from '../utils/quizDataLoader';

interface NavbarProps {
  currentView: 'home' | 'setup' | 'quiz' | 'results' | 'correction';
  selectedModuleId: ModuleId;
  onSelectModule: (moduleId: ModuleId) => void;
  onNavigateHome: () => void;
  onOpenSourceInspector: () => void;
  isQuizActive: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  selectedModuleId,
  onSelectModule,
  onNavigateHome,
  onOpenSourceInspector,
  isQuizActive
}) => {
  const currentMod = MODULE_DEFINITIONS[selectedModuleId];

  return (
    <header className="bg-white border-b border-slate-100 sticky top-0 z-30">
      <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
        <div 
          id="app-logo-brand" 
          onClick={() => {
            if (!isQuizActive) {
              onNavigateHome();
            }
          }}
          className={`flex items-center gap-3 ${!isQuizActive ? 'cursor-pointer' : ''}`}
        >
          <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center text-white shrink-0">
            <svg 
              className="w-4 h-4" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="3" />
              <path d="M4 8l5 2m6 4l5 2" />
              <path d="M20 8l-5 2m-6 4l-5 2" />
              <circle cx="4" cy="7" r="2" />
              <circle cx="20" cy="7" r="2" />
              <circle cx="4" cy="17" r="2" />
              <circle cx="20" cy="17" r="2" />
            </svg>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-slate-900 tracking-tight block leading-tight">
                Simulateur d'Examen Drone
              </span>
              <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                {currentMod.badge}
              </span>
            </div>
            <span className="text-xs text-slate-500 block">
              Formation télépilote professionnel
            </span>
          </div>
        </div>

        {/* Module Switcher & Controls */}
        <div className="flex items-center gap-2">
          {!isQuizActive && currentView !== 'quiz' && (
            <div className="hidden sm:flex items-center bg-slate-100 p-0.5 rounded-lg text-xs font-medium text-slate-600">
              <button
                id="nav-select-module-1"
                type="button"
                onClick={() => onSelectModule('module-1')}
                className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                  selectedModuleId === 'module-1'
                    ? 'bg-white text-slate-900 shadow-xs font-semibold'
                    : 'hover:text-slate-900'
                }`}
              >
                Module 1
              </button>
              <button
                id="nav-select-module-2"
                type="button"
                onClick={() => onSelectModule('module-2')}
                className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                  selectedModuleId === 'module-2'
                    ? 'bg-white text-slate-900 shadow-xs font-semibold'
                    : 'hover:text-slate-900'
                }`}
              >
                Module 2
              </button>
              <button
                id="nav-select-module-all"
                type="button"
                onClick={() => onSelectModule('module-all')}
                className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                  selectedModuleId === 'module-all'
                    ? 'bg-white text-slate-900 shadow-xs font-semibold'
                    : 'hover:text-slate-900'
                }`}
              >
                Tous (1+2)
              </button>
            </div>
          )}

          {currentView !== 'home' && !isQuizActive && (
            <button
              id="btn-nav-home"
              onClick={onNavigateHome}
              className="px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-md transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Accueil</span>
            </button>
          )}

          <button
            id="btn-open-source-inspector"
            onClick={onOpenSourceInspector}
            className="px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-md transition-colors flex items-center gap-1.5 cursor-pointer"
            title="Consulter le fichier source Markdown"
          >
            <FileCode className="w-3.5 h-3.5 text-slate-500" />
            <span className="hidden sm:inline">Markdown</span>
          </button>
        </div>
      </div>
    </header>
  );
};
