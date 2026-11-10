import React, { useState } from 'react';
import { ViewMode } from '../types/competition';
import { LayoutDashboard, Trophy, Calendar as CalendarIcon, Menu, X, ShieldCheck, ExternalLink, School } from 'lucide-react';

interface NavbarProps {
  currentView: ViewMode;
  onNavigate: (view: ViewMode) => void;
  totalCompetitionsCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  totalCompetitionsCount,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    {
      id: 'dashboard' as ViewMode,
      label: 'Dashboard',
      icon: LayoutDashboard,
    },
    {
      id: 'competitions' as ViewMode,
      label: 'All Competitions',
      icon: Trophy,
      badge: totalCompetitionsCount,
    },
    {
      id: 'calendar' as ViewMode,
      label: 'Calendar',
      icon: CalendarIcon,
      isNew: true,
    },
  ];

  const handleNavClick = (view: ViewMode) => {
    onNavigate(view);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200/90 shadow-xs">
      {/* Top institutional strip */}
      <div className="bg-[#0A192F] text-slate-200 text-xs py-1.5 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-amber-400"></span>
            <span className="font-semibold tracking-wide text-white">UNIVERSITY OF UYO</span>
          </div>
          <div className="flex items-center gap-3 text-xs text-slate-300">
            <span className="text-amber-300 font-medium">Academic Year 2026/2027</span>
            <span className="text-slate-500 hidden md:inline">|</span>
            <span className="hidden md:inline text-slate-400">Public Information Portal</span>
          </div>
        </div>
      </div>

      {/* Main navigation container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Brand Logo & Title */}
          <div 
            onClick={() => handleNavClick('dashboard')}
            className="flex items-center gap-3.5 cursor-pointer group select-none"
          >
            <div className="w-11 h-11 rounded-lg bg-gradient-to-br from-[#0B2545] to-[#133E7C] flex items-center justify-center text-white shadow-md border border-[#1E3A8A]/30 group-hover:shadow-lg transition-all duration-200">
              <School className="w-6 h-6 text-amber-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold tracking-tight text-[#0B2545] group-hover:text-[#133E7C] transition-colors">
                  Team Uniuyo
                </span>
                <span className="bg-amber-100/80 text-amber-900 border border-amber-300/60 text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded">
                  Hub
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">Faculty of Law Competitions Portal</p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id || (item.id === 'competitions' && currentView === 'details');

              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-150 ${
                    isActive
                      ? 'bg-[#0B2545] text-white shadow-sm'
                      : 'text-slate-700 hover:text-[#0B2545] hover:bg-slate-100/80'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-amber-400' : 'text-slate-500'}`} />
                  <span>{item.label}</span>
                  {item.badge !== undefined && (
                    <span
                      className={`text-xs px-1.5 py-0.2 rounded-full font-bold ml-0.5 ${
                        isActive
                          ? 'bg-amber-400 text-[#0B2545]'
                          : 'bg-slate-200 text-slate-700'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                  {item.isNew && !isActive && (
                    <span className="text-[10px] bg-sky-50 text-sky-700 border border-sky-200 px-1.5 py-0.2 rounded font-medium">
                      Preview
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action: Official Uniuyo Portal link and Mobile hamburger */}
          <div className="flex items-center gap-2">
            <a
              href="https://uniuyo.edu.ng"
              target="_blank"
              rel="noreferrer"
              className="hidden lg:inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-[#0B2545] font-medium px-3 py-1.5 rounded-md hover:bg-slate-100 transition-colors"
            >
              <span>uniuyo.edu.ng</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
            </a>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-[#0B2545]"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-5 space-y-1 shadow-lg">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id || (item.id === 'competitions' && currentView === 'details');

            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-[#0B2545] text-white'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-amber-400' : 'text-slate-500'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge !== undefined && (
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                      isActive ? 'bg-amber-400 text-[#0B2545]' : 'bg-slate-200 text-slate-700'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
                {item.isNew && (
                  <span className={`text-[10px] px-1.5 py-0.5 rounded ${isActive ? 'bg-white/20 text-white' : 'bg-sky-50 text-sky-700'}`}>
                    Preview
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
