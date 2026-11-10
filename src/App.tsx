/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Competition, ViewMode } from './types/competition';
import { SAMPLE_COMPETITIONS } from './data/competitions';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { DashboardView } from './views/DashboardView';
import { CompetitionsListView } from './views/CompetitionsListView';
import { CompetitionDetailsView } from './views/CompetitionDetailsView';
import { CalendarView } from './views/CalendarView';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewMode>('dashboard');
  const [selectedCompetition, setSelectedCompetition] = useState<Competition | null>(
    SAMPLE_COMPETITIONS[0]
  );
  const [competitions] = useState<Competition[]>(SAMPLE_COMPETITIONS);

  const handleNavigate = (view: ViewMode) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectCompetition = (comp: Competition) => {
    setSelectedCompetition(comp);
    setCurrentView('details');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans antialiased selection:bg-[#0B2545] selection:text-white">
      {/* Institutional Top Navbar */}
      <Navbar
        currentView={currentView}
        onNavigate={handleNavigate}
        totalCompetitionsCount={competitions.length}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {currentView === 'dashboard' && (
          <DashboardView
            competitions={competitions}
            onNavigate={handleNavigate}
            onSelectCompetition={handleSelectCompetition}
          />
        )}

        {currentView === 'competitions' && (
          <CompetitionsListView
            competitions={competitions}
            onSelectCompetition={handleSelectCompetition}
            onNavigate={handleNavigate}
          />
        )}

        {currentView === 'details' && selectedCompetition && (
          <CompetitionDetailsView
            competition={selectedCompetition}
            onBack={() => handleNavigate('competitions')}
            onNavigate={handleNavigate}
          />
        )}

        {currentView === 'calendar' && (
          <CalendarView
            competitions={competitions}
            onSelectCompetition={handleSelectCompetition}
            onNavigate={handleNavigate}
          />
        )}
      </main>

      {/* University Institutional Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
