import React from 'react';
import { ViewMode } from '../types/competition';
import { Trophy, School, MapPin, Shield, Info } from 'lucide-react';

interface FooterProps {
  onNavigate: (view: ViewMode) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-[#0B2545] text-slate-300 border-t border-slate-800 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Column 1: Institutional info */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center border border-white/20">
                <School className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <h3 className="text-white font-bold text-base tracking-tight">
                  Team Uniuyo Competitions Hub
                </h3>
                <p className="text-xs text-slate-300">
                  Faculty of Law • University of Uyo
                </p>
              </div>
            </div>

            <p className="text-sm text-slate-400 max-w-md leading-relaxed">
              Official university portal to discover, prepare for, and track legal moot courts, client consultations, and academic advocacy competitions for students, researchers, and university delegations.
            </p>

            <div className="flex items-center gap-2 text-xs text-slate-400 pt-1">
              <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>Town Campus, Faculty of Law, University of Uyo, Akwa Ibom State, Nigeria</span>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold text-xs tracking-wider uppercase border-b border-white/10 pb-2">
              Navigation
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => onNavigate('dashboard')}
                  className="hover:text-amber-400 transition-colors text-slate-300 hover:underline"
                >
                  Dashboard Overview
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('competitions')}
                  className="hover:text-amber-400 transition-colors text-slate-300 hover:underline"
                >
                  All Competitions List
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('calendar')}
                  className="hover:text-amber-400 transition-colors text-slate-300 hover:underline"
                >
                  Calendar & Deadlines
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Roadmap & Stage Notice */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold text-xs tracking-wider uppercase border-b border-white/10 pb-2 flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-amber-400" />
              Implementation Status
            </h4>
            <div className="bg-[#07172C] p-3 rounded-lg border border-white/10 text-xs space-y-1.5 text-slate-300">
              <div className="flex items-center gap-1.5 font-semibold text-amber-300">
                <Info className="w-3.5 h-3.5 shrink-0" />
                <span>Stage 1: Frontend Prototype</span>
              </div>
              <p className="text-slate-400 text-[11px] leading-snug">
                Demonstrating full visual layouts, deadline tracking, search, and competition details. Document uploads and database syncing will follow in Stage 2.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© {new Date().getFullYear()} University of Uyo Competitions Board. All rights reserved.</p>
          <div className="flex items-center gap-4 text-xs">
            <span className="inline-flex items-center gap-1 text-slate-400">
              <Trophy className="w-3 h-3 text-amber-400" />
              Excellence in Advocacy
            </span>
            <span>•</span>
            <span className="text-slate-400">Unity, Faith, Peace and Progress</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
