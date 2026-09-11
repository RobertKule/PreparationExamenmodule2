import React from 'react';
import { ArrowRight, Clock } from 'lucide-react';
import { Chapter } from '../types';

interface HomeViewProps {
  chapters: Chapter[];
  totalQuestions: number;
  onStartConfig: () => void;
  onQuickStartAll: (durationMinutes: number) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  chapters,
  totalQuestions,
  onStartConfig,
  onQuickStartAll
}) => {
  return (
    <div className="max-w-3xl mx-auto px-6 py-12 sm:py-16">
      {/* Intro section */}
      <div className="mb-12">
        <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3">
          Formation Télépilote Professionnel • Module 2
        </div>

        <h1 className="text-3xl sm:text-4xl font-semibold text-slate-900 tracking-tight leading-tight mb-4">
          Simulation d'examen théorique
        </h1>

        <p className="text-base text-slate-600 leading-relaxed max-w-2xl mb-8">
          Évaluez votre maîtrise des 12 chapitres du module dans les conditions réelles d'examen. 
          Notation officielle avec pénalité sur les mauvaises réponses et correction détaillée à l'issue de l'épreuve.
        </p>

        <div className="flex flex-wrap items-center gap-3">
          <button
            id="btn-home-start-quiz"
            onClick={onStartConfig}
            className="px-6 py-3 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-medium text-sm transition-colors inline-flex items-center gap-2 cursor-pointer"
          >
            <span>Démarrer le quiz</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            id="btn-home-quick-start-60"
            onClick={() => onQuickStartAll(60)}
            className="px-5 py-3 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium text-sm transition-colors inline-flex items-center gap-2 cursor-pointer"
          >
            <Clock className="w-4 h-4 text-slate-500" />
            <span>Session standard 60 min</span>
          </button>
        </div>
      </div>

      {/* Overview metrics (minimalist, flat text list) */}
      <div className="py-6 border-y border-slate-100 grid grid-cols-2 sm:grid-cols-4 gap-6 text-sm mb-12">
        <div>
          <div className="text-2xl font-semibold text-slate-900">{chapters.length}</div>
          <div className="text-xs text-slate-500 mt-1">Chapitres (2.1 à 2.12)</div>
        </div>
        <div>
          <div className="text-2xl font-semibold text-slate-900">{totalQuestions}</div>
          <div className="text-xs text-slate-500 mt-1">Questions au total</div>
        </div>
        <div>
          <div className="text-2xl font-semibold text-slate-900">60 min</div>
          <div className="text-xs text-slate-500 mt-1">Durée conseillée</div>
        </div>
        <div>
          <div className="text-2xl font-semibold text-slate-900">85%</div>
          <div className="text-xs text-slate-500 mt-1">Seuil de validation</div>
        </div>
      </div>

      {/* Bare, sober scoring rules note */}
      <div className="mb-12">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3">
          Barème de notation
        </h2>
        <div className="space-y-2 text-sm text-slate-600 leading-relaxed">
          <p>
            <strong className="text-slate-900 font-semibold">+2 points</strong> par réponse exacte
          </p>
          <p>
            <strong className="text-slate-900 font-semibold">-1 point</strong> par réponse inexacte (pénalité)
          </p>
          <p>
            <strong className="text-slate-900 font-semibold">0 point</strong> en l'absence de réponse (neutre)
          </p>
        </div>
        <p className="text-xs text-slate-500 mt-3">
          Le score final correspond à la somme des points divisée par la note maximale possible, exprimé en pourcentage.
        </p>
      </div>

      {/* Chapters list (sober, clean, unbordered rows) */}
      <div className="mb-12">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-2">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Programme des chapitres
          </h2>
          <span className="text-xs text-slate-500">
            {totalQuestions} questions
          </span>
        </div>

        <div className="divide-y divide-slate-100">
          {chapters.map((ch) => (
            <div 
              key={ch.id} 
              className="py-3.5 flex items-center justify-between hover:bg-slate-50/60 px-2 rounded-md transition-colors"
            >
              <div className="pr-4">
                <span className="text-xs font-semibold text-slate-900 mr-3">
                  {ch.shortTitle}
                </span>
                <span className="text-sm text-slate-600">
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

      {/* Simple Bottom CTA */}
      <div className="pt-4">
        <button
          id="btn-home-start-quiz-bottom"
          onClick={onStartConfig}
          className="px-6 py-3 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-medium text-sm transition-colors inline-flex items-center gap-2 cursor-pointer"
        >
          <span>Configurer et lancer l'examen</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
