import React, { useState } from 'react';
import { Competition, ViewMode } from '../types/competition';
import {
  Calendar as CalendarIcon,
  Clock,
  FileText,
  MapPin,
  ChevronRight,
  Info,
  CalendarDays,
  Sparkles,
  ArrowRight,
} from 'lucide-react';

interface CalendarViewProps {
  competitions: Competition[];
  onSelectCompetition: (comp: Competition) => void;
  onNavigate: (view: ViewMode) => void;
}

interface CalendarEvent {
  id: string;
  dateStr: string;
  month: string;
  day: string;
  year: string;
  title: string;
  type: 'Registration' | 'Memorial' | 'Oral Rounds' | 'Finals';
  competition: Competition;
  description: string;
}

export const CalendarView: React.FC<CalendarViewProps> = ({
  competitions,
  onSelectCompetition,
  onNavigate,
}) => {
  const [filterType, setFilterType] = useState<string>('all');

  // Build list of calendar milestone events
  const events: CalendarEvent[] = [];

  competitions.forEach((comp) => {
    // Reg Deadline
    events.push({
      id: `${comp.id}-reg`,
      dateStr: comp.registrationDeadline,
      month: comp.registrationDeadline.split(' ')[0],
      day: comp.registrationDeadline.split(' ')[1]?.replace(',', '') || '01',
      year: comp.registrationDeadline.split(' ')[2] || '2026',
      title: `${comp.abbreviation}: Registration Closes`,
      type: 'Registration',
      competition: comp,
      description: `Institutional delegate registration closure for ${comp.name}`,
    });

    // Memorial Deadline
    events.push({
      id: `${comp.id}-mem`,
      dateStr: comp.memorialDeadline,
      month: comp.memorialDeadline.split(' ')[0],
      day: comp.memorialDeadline.split(' ')[1]?.replace(',', '') || '01',
      year: comp.memorialDeadline.split(' ')[2] || '2026',
      title: `${comp.abbreviation}: Memorial Submissions Due`,
      type: 'Memorial',
      competition: comp,
      description: `Written legal briefs submission deadline for ${comp.edition}`,
    });

    // Final Rounds
    events.push({
      id: `${comp.id}-final`,
      dateStr: comp.finalRoundsDate,
      month: comp.finalRoundsDate.split(' ')[0] || 'TBD',
      day: comp.finalRoundsDate.split(' ')[1]?.replace(',', '') || '15',
      year: comp.finalRoundsDate.split(' ')[3] || comp.finalRoundsDate.split(' ')[2] || '2027',
      title: `${comp.abbreviation}: Championship Final Rounds`,
      type: 'Finals',
      competition: comp,
      description: `Held at: ${comp.finalRoundsLocation}`,
    });
  });

  const filteredEvents = events.filter((evt) => {
    if (filterType === 'all') return true;
    return evt.type.toLowerCase() === filterType.toLowerCase();
  });

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#0B2545] uppercase tracking-wider mb-1">
            <CalendarIcon className="w-4 h-4 text-amber-500" />
            <span>Academic Year 2026/2027</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0B2545] tracking-tight">
            Competitions Calendar
          </h1>
          <p className="text-sm text-slate-500 mt-1 max-w-2xl">
            Master chronological schedule for registration milestones, memorial deadlines, and oral round championships.
          </p>
        </div>

        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-amber-50 border border-amber-200 text-amber-900 text-xs font-semibold">
          <Info className="w-4 h-4 text-amber-600 shrink-0" />
          <span>Stage 1: Calendar Placeholder Page</span>
        </div>
      </div>

      {/* Placeholder Banner Notice as required */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/80 rounded-2xl p-6 sm:p-7">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-0.5 rounded-full bg-blue-100 text-[#0B2545]">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Calendar Module Placeholder</span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-[#0B2545]">
              Faculty Competitions Academic Timeline
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              This preview placeholder outlines upcoming competition dates. Full iCalendar (.ics) synchronization, interactive multi-view month grids, and outlook reminders will be activated in Stage 2.
            </p>
          </div>

          <button
            onClick={() => onNavigate('competitions')}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0B2545] hover:bg-[#133E7C] text-white font-bold text-xs shadow-xs transition-colors shrink-0"
          >
            <span>Browse Competitions Table</span>
            <ArrowRight className="w-4 h-4 text-amber-400" />
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        <button
          onClick={() => setFilterType('all')}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 ${
            filterType === 'all'
              ? 'bg-[#0B2545] text-white shadow-xs'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          All Key Milestones ({events.length})
        </button>
        <button
          onClick={() => setFilterType('registration')}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 ${
            filterType === 'registration'
              ? 'bg-amber-500 text-white shadow-xs'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          Registration Deadlines
        </button>
        <button
          onClick={() => setFilterType('memorial')}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 ${
            filterType === 'memorial'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          Memorial / Brief Deadlines
        </button>
        <button
          onClick={() => setFilterType('finals')}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 ${
            filterType === 'finals'
              ? 'bg-emerald-600 text-white shadow-xs'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          Championship Finals
        </button>
      </div>

      {/* Events Schedule List */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs divide-y divide-slate-100 overflow-hidden">
        {filteredEvents.map((evt) => {
          let typeBadge = 'bg-blue-50 text-blue-800 border-blue-200';
          if (evt.type === 'Registration') {
            typeBadge = 'bg-amber-50 text-amber-900 border-amber-200 font-bold';
          } else if (evt.type === 'Memorial') {
            typeBadge = 'bg-indigo-50 text-indigo-900 border-indigo-200 font-bold';
          } else if (evt.type === 'Finals') {
            typeBadge = 'bg-emerald-50 text-emerald-900 border-emerald-200 font-bold';
          }

          return (
            <div
              key={evt.id}
              onClick={() => onSelectCompetition(evt.competition)}
              className="p-4 sm:p-5 hover:bg-slate-50/80 transition-colors cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
            >
              <div className="flex items-start gap-4">
                {/* Date stamp box */}
                <div className="w-14 h-14 rounded-xl bg-slate-100 border border-slate-200 flex flex-col items-center justify-center shrink-0 group-hover:bg-[#0B2545] group-hover:text-white transition-colors">
                  <span className="text-[10px] font-bold uppercase tracking-wider group-hover:text-amber-400">
                    {evt.month.slice(0, 3)}
                  </span>
                  <span className="text-base font-extrabold group-hover:text-white">
                    {evt.day}
                  </span>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`text-[11px] px-2 py-0.5 rounded-full border ${typeBadge}`}>
                      {evt.type}
                    </span>
                    <h3 className="text-sm font-bold text-slate-900 group-hover:text-[#0B2545] transition-colors">
                      {evt.title}
                    </h3>
                  </div>

                  <p className="text-xs text-slate-500 font-medium">
                    {evt.description}
                  </p>
                  <p className="text-xs text-slate-400">
                    Full Date: <strong className="text-slate-700">{evt.dateStr}</strong>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0 self-end sm:self-center">
                <span className="text-xs font-bold text-[#0B2545] group-hover:underline flex items-center gap-1">
                  <span>View Competition</span>
                  <ChevronRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
