import React from 'react';
import { FileCode, RotateCcw } from 'lucide-react';

interface NavbarProps {
  currentView: 'home' | 'setup' | 'quiz' | 'results' | 'correction';
  onNavigateHome: () => void;
  onOpenSourceInspector: () => void;
  isQuizActive: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigateHome,
  onOpenSourceInspector,
  isQuizActive
}) => {
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
          <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center text-white">
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
            <span className="text-sm font-semibold text-slate-900 tracking-tight block leading-tight">
              Module 2 — Simulation d'examen
            </span>
            <span className="text-xs text-slate-500 block">
              Formation télépilote drone
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {currentView !== 'home' && !isQuizActive && (
            <button
              id="btn-nav-home"
              onClick={onNavigateHome}
              className="px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-md transition-colors flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Accueil</span>
            </button>
          )}

          <button
            id="btn-open-source-inspector"
            onClick={onOpenSourceInspector}
            className="px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-md transition-colors flex items-center gap-1.5"
            title="Consulter le fichier source Markdown"
          >
            <FileCode className="w-3.5 h-3.5 text-slate-500" />
            <span>Fichier Markdown</span>
          </button>
        </div>
      </div>
    </header>
  );
};
