import React, { useState, useRef, useEffect } from 'react';
import { FileCode, RotateCcw, Menu, X, ChevronDown, Check } from 'lucide-react';
import { ModuleId } from '../types';
import { MODULE_DEFINITIONS } from '../utils/quizDataLoader';

interface NavbarProps {
  currentView: 'home' | 'setup' | 'quiz' | 'results' | 'correction' | 'custom-import';
  selectedModuleId: ModuleId;
  onSelectModule: (moduleId: ModuleId) => void;
  onNavigateHome: () => void;
  onOpenSourceInspector: () => void;
  isQuizActive: boolean;
}

const MODULE_LIST: { id: ModuleId; shortLabel: string; fullLabel: string }[] = [
  { id: 'module-5', shortLabel: 'Mod 5 (10 q)', fullLabel: 'Module 5 — Format Standard (10 q/ch • 60 Q)' },
  { id: 'module-5-all', shortLabel: 'Mod 5 (Intégral)', fullLabel: 'Module 5 — Banque Intégrale (439 Q)' },
  { id: 'module-1', shortLabel: 'Mod 1', fullLabel: 'Module 1 — Fondamentaux & Réglementation (30 Q)' },
  { id: 'module-2', shortLabel: 'Mod 2', fullLabel: 'Module 2 — Mécanique du vol & Systèmes (60 Q)' },
  { id: 'module-all', shortLabel: 'Tous', fullLabel: 'Examen Global — Tous les Modules (150 Q)' }
];

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  selectedModuleId,
  onSelectModule,
  onNavigateHome,
  onOpenSourceInspector,
  isQuizActive
}) => {
  const currentMod = MODULE_DEFINITIONS[selectedModuleId];
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const menuPanelRef = useRef<HTMLDivElement>(null);

  // Fermer les menus lors d'un clic extérieur ou appui sur Escape
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (dropdownRef.current && !dropdownRef.current.contains(target)) {
        setIsDropdownOpen(false);
      }
      if (menuPanelRef.current && !menuPanelRef.current.contains(target)) {
        const toggleBtn = document.getElementById('btn-menubar-toggle');
        if (toggleBtn && !toggleBtn.contains(target)) {
          setIsMenuOpen(false);
        }
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false);
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleSelectModuleAndClose = (modId: ModuleId) => {
    onSelectModule(modId);
    setIsDropdownOpen(false);
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3">
        {/* Brand / Logo */}
        <div 
          id="app-logo-brand" 
          onClick={() => {
            if (!isQuizActive) {
              onNavigateHome();
              setIsMenuOpen(false);
              setIsDropdownOpen(false);
            }
          }}
          className={`flex items-center gap-3 shrink-0 ${!isQuizActive ? 'cursor-pointer' : ''}`}
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
                Simulateur Drone
              </span>
              <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                {currentMod.badge}
              </span>
            </div>
            <span className="text-xs text-slate-500 hidden sm:block">
              Formation télépilote professionnel
            </span>
          </div>
        </div>

        {/* Desktop & Compact Controls */}
        <div className="flex items-center gap-2">
          {!isQuizActive && currentView !== 'quiz' && (
            <>
              {/* Desktop Segmented Menubar Toggle (Grand écran) */}
              <div className="hidden lg:flex items-center bg-slate-100 p-0.5 rounded-lg text-xs font-medium text-slate-600">
                {MODULE_LIST.map((item) => (
                  <button
                    key={item.id}
                    id={`nav-select-${item.id}`}
                    type="button"
                    onClick={() => onSelectModule(item.id)}
                    className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                      selectedModuleId === item.id
                        ? 'bg-white text-slate-900 shadow-xs font-semibold'
                        : 'hover:text-slate-900'
                    }`}
                    title={item.fullLabel}
                  >
                    {item.shortLabel}
                  </button>
                ))}
              </div>

              {/* Tablet/Medium Dropdown Menubar Toggle */}
              <div className="relative hidden sm:block lg:hidden" ref={dropdownRef}>
                <button
                  id="btn-module-dropdown-toggle"
                  type="button"
                  onClick={() => setIsDropdownOpen((prev) => !prev)}
                  className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                  aria-expanded={isDropdownOpen}
                >
                  <span>{currentMod.badge}</span>
                  <ChevronDown className={`w-3.5 h-3.5 text-slate-500 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-1.5 w-64 bg-white border border-slate-200 rounded-xl shadow-lg py-1.5 z-40">
                    <div className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-500 border-b border-slate-100">
                      Changer de module
                    </div>
                    {MODULE_LIST.map((item) => {
                      const isSelected = selectedModuleId === item.id;
                      return (
                        <button
                          key={item.id}
                          id={`dropdown-opt-${item.id}`}
                          type="button"
                          onClick={() => handleSelectModuleAndClose(item.id)}
                          className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-slate-50 cursor-pointer ${
                            isSelected ? 'font-semibold text-slate-900 bg-slate-50' : 'text-slate-700'
                          }`}
                        >
                          <span className="truncate mr-2">{item.fullLabel}</span>
                          {isSelected && <Check className="w-3.5 h-3.5 text-slate-900 shrink-0" />}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </>
          )}

          {/* Quick Actions (Accueil & Markdown) */}
          {currentView !== 'home' && !isQuizActive && (
            <button
              id="btn-nav-home"
              onClick={onNavigateHome}
              className="hidden sm:flex px-2.5 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-md transition-colors items-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Accueil</span>
            </button>
          )}

          <button
            id="btn-open-source-inspector"
            onClick={onOpenSourceInspector}
            className="hidden sm:flex px-2.5 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-md transition-colors items-center gap-1.5 cursor-pointer"
            title="Consulter le fichier source"
          >
            <FileCode className="w-3.5 h-3.5 text-slate-500" />
            <span>Markdown</span>
          </button>

          {/* Menubar Toggle Button (Hamburger / Close) */}
          {!isQuizActive && (
            <button
              id="btn-menubar-toggle"
              type="button"
              onClick={() => setIsMenuOpen((prev) => !prev)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer flex items-center gap-1.5"
              aria-label="Basculer le menu de navigation"
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? (
                <X className="w-5 h-5 text-slate-900" />
              ) : (
                <Menu className="w-5 h-5 text-slate-700" />
              )}
              <span className="text-xs font-semibold hidden md:inline">Menu</span>
            </button>
          )}
        </div>
      </div>

      {/* Collapsible Menubar Toggle Panel (Ouvert lors du clic sur le menubar toggle) */}
      {isMenuOpen && !isQuizActive && (
        <div 
          id="menubar-toggle-panel"
          ref={menuPanelRef}
          className="border-t border-slate-200 bg-white shadow-lg animate-in fade-in slide-in-from-top-2 duration-150"
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 space-y-4">
            {/* Section Module Selector */}
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
                Sélection du Module
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {MODULE_LIST.map((item) => {
                  const isSelected = selectedModuleId === item.id;
                  return (
                    <button
                      key={item.id}
                      id={`menubar-toggle-mod-${item.id}`}
                      type="button"
                      onClick={() => handleSelectModuleAndClose(item.id)}
                      className={`p-2.5 rounded-lg text-left text-xs font-medium transition-all flex items-center justify-between border cursor-pointer ${
                        isSelected
                          ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50 hover:border-slate-300'
                      }`}
                    >
                      <span>{item.fullLabel}</span>
                      {isSelected && <Check className="w-4 h-4 text-white shrink-0 ml-2" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Actions Rapides */}
            <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                {currentView !== 'home' && (
                  <button
                    id="btn-menubar-nav-home"
                    type="button"
                    onClick={() => {
                      onNavigateHome();
                      setIsMenuOpen(false);
                    }}
                    className="px-3 py-1.5 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Retour à l'accueil</span>
                  </button>
                )}

                <button
                  id="btn-menubar-nav-source"
                  type="button"
                  onClick={() => {
                    onOpenSourceInspector();
                    setIsMenuOpen(false);
                  }}
                  className="px-3 py-1.5 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <FileCode className="w-3.5 h-3.5 text-slate-600" />
                  <span>Inspecteur de source</span>
                </button>
              </div>

              <div className="text-[11px] text-slate-400 font-medium">
                {currentMod.subtitle}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

