import React from 'react';
import { Competition, ViewMode } from '../types/competition';
import { StatusBadge } from '../components/StatusBadge';
import {
  Trophy,
  CheckCircle,
  Clock,
  FileText,
  Calendar,
  ArrowRight,
  MapPin,
  Users,
  ChevronRight,
  AlertTriangle,
  Sparkles,
  Search,
  BookOpen,
} from 'lucide-react';

interface DashboardViewProps {
  competitions: Competition[];
  onNavigate: (view: ViewMode) => void;
  onSelectCompetition: (comp: Competition) => void;
}

interface DeadlineItem {
  id: string;
  competitionId: string;
  competitionName: string;
  abbreviation: string;
  type: 'Registration' | 'Memorial/Brief';
  deadlineText: string;
  deadlineIso: string;
  registeredStatus: boolean;
  daysRemaining: number;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  competitions,
  onNavigate,
  onSelectCompetition,
}) => {
  // Compute stats
  const totalCompetitions = competitions.length;
  const registeredCompetitions = competitions.filter((c) => c.registeredStatus).length;
  const registeredPercentage = Math.round((registeredCompetitions / totalCompetitions) * 100) || 0;

  // Let's compute upcoming deadlines
  // Based on current local time in metadata (approx late 2026, Oct 27, 2026)
  const today = new Date('2026-10-27');

  const allDeadlines: DeadlineItem[] = [];

  competitions.forEach((c) => {
    // Reg deadline
    const regDate = new Date(c.registrationDeadlineIso);
    const regDiffDays = Math.ceil((regDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    allDeadlines.push({
      id: `${c.id}-reg`,
      competitionId: c.id,
      competitionName: c.name,
      abbreviation: c.abbreviation,
      type: 'Registration',
      deadlineText: c.registrationDeadline,
      deadlineIso: c.registrationDeadlineIso,
      registeredStatus: c.registeredStatus,
      daysRemaining: regDiffDays,
    });

    // Memorial deadline
    const memDate = new Date(c.memorialDeadlineIso);
    const memDiffDays = Math.ceil((memDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    allDeadlines.push({
      id: `${c.id}-mem`,
      competitionId: c.id,
      competitionName: c.name,
      abbreviation: c.abbreviation,
      type: 'Memorial/Brief',
      deadlineText: c.memorialDeadline,
      deadlineIso: c.memorialDeadlineIso,
      registeredStatus: c.registeredStatus,
      daysRemaining: memDiffDays,
    });
  });

  // Filter only upcoming or future deadlines, sorted by closest date
  const upcomingDeadlines = allDeadlines
    .filter((d) => d.daysRemaining >= 0)
    .sort((a, b) => a.daysRemaining - b.daysRemaining);

  const upcomingRegistrationCount = upcomingDeadlines.filter((d) => d.type === 'Registration').length;
  const upcomingMemorialCount = upcomingDeadlines.filter((d) => d.type === 'Memorial/Brief').length;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Welcome & University Banner */}
      <div className="bg-gradient-to-r from-[#0B2545] via-[#103565] to-[#164785] rounded-2xl p-6 sm:p-8 text-white shadow-md relative overflow-hidden border border-blue-900/50">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-72 h-72 bg-white/5 rounded-full blur-2xl pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-xs text-amber-300 text-xs font-semibold tracking-wide border border-white/15">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Competitions Information Portal</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              Team Uniuyo Competitions Hub
            </h1>
            <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
              Welcome to the official competitions hub for the Faculty of Law, University of Uyo. Explore upcoming national and international moot courts, access case problems and rules, track deadlines, and follow our student advocacy delegations.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavigate('competitions')}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-[#0B2545] font-bold text-sm shadow-sm transition-all duration-150 cursor-pointer"
            >
              <span>Explore Competitions</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onNavigate('calendar')}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/15 hover:bg-white/20 text-white font-semibold text-sm border border-white/20 transition-all duration-150 cursor-pointer"
            >
              <Calendar className="w-4 h-4 text-amber-300" />
              <span>Competitions Calendar</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4 Required Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Metric 1: Total Competitions */}
        <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-xs hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Total Competitions
            </p>
            <div className="w-10 h-10 rounded-lg bg-blue-50 text-[#0B2545] flex items-center justify-center border border-blue-100">
              <Trophy className="w-5 h-5 text-[#0B2545]" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-[#0B2545]">{totalCompetitions}</span>
            <span className="text-xs text-slate-500 font-medium">on official roster</span>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
            <span className="text-slate-500">International & National</span>
            <button
              onClick={() => onNavigate('competitions')}
              className="font-semibold text-[#0B2545] hover:underline"
            >
              Explore &rarr;
            </button>
          </div>
        </div>

        {/* Metric 2: Competitions Registered For */}
        <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-xs hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Competitions Registered For
            </p>
            <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center border border-emerald-100">
              <CheckCircle className="w-5 h-5 text-emerald-600" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-emerald-700">{registeredCompetitions}</span>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
              {registeredPercentage}% Confirmed
            </span>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
            <span className="text-slate-500">{totalCompetitions - registeredCompetitions} pending registration</span>
            <span className="font-semibold text-emerald-700">Team Uniuyo Active</span>
          </div>
        </div>

        {/* Metric 3: Upcoming Registration Deadlines */}
        <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-xs hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Upcoming Reg. Deadlines
            </p>
            <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center border border-amber-100">
              <Clock className="w-5 h-5 text-amber-600" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-amber-700">{upcomingRegistrationCount}</span>
            <span className="text-xs text-slate-500 font-medium">pending closures</span>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
            <span className="text-slate-500">Nearest:</span>
            <span className="font-semibold text-amber-700">Oct 31, 2026 (Price Moot)</span>
          </div>
        </div>

        {/* Metric 4: Upcoming Memorial/Brief Deadlines */}
        <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-xs hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Upcoming Memorial Deadlines
            </p>
            <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center border border-indigo-100">
              <FileText className="w-5 h-5 text-indigo-600" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-indigo-700">{upcomingMemorialCount}</span>
            <span className="text-xs text-slate-500 font-medium">brief submissions</span>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
            <span className="text-slate-500">Nearest:</span>
            <span className="font-semibold text-indigo-700">Nov 25, 2026 (Price)</span>
          </div>
        </div>
      </div>

      {/* Main Content Grid: Upcoming Deadlines List & Registered Competitions Quick View */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Required: List of Upcoming Deadlines (2 cols on large screen) */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-[#0B2545]" />
                <h2 className="text-lg font-bold text-[#0B2545]">List of Upcoming Deadlines</h2>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Chronological timeline of institutional registrations and legal brief submissions
              </p>
            </div>
            <button
              onClick={() => onNavigate('calendar')}
              className="text-xs font-bold text-[#0B2545] hover:text-[#133E7C] inline-flex items-center gap-1 hover:underline"
            >
              <span>View Full Calendar</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="divide-y divide-slate-100 mt-3">
            {upcomingDeadlines.slice(0, 7).map((item) => {
              const matchedComp = competitions.find((c) => c.id === item.competitionId);

              // Countdown badge style
              let urgencyColor = 'bg-slate-100 text-slate-700 border-slate-200';
              if (item.daysRemaining <= 7) {
                urgencyColor = 'bg-rose-50 text-rose-800 border-rose-200 font-bold';
              } else if (item.daysRemaining <= 21) {
                urgencyColor = 'bg-amber-50 text-amber-800 border-amber-200 font-bold';
              } else {
                urgencyColor = 'bg-blue-50 text-blue-800 border-blue-200';
              }

              return (
                <div
                  key={item.id}
                  onClick={() => matchedComp && onSelectCompetition(matchedComp)}
                  className="py-3.5 px-3 hover:bg-slate-50/90 rounded-xl transition-all duration-150 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 cursor-pointer group"
                >
                  <div className="flex items-start gap-3.5">
                    <div
                      className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 border ${
                        item.type === 'Registration'
                          ? 'bg-amber-50 text-amber-700 border-amber-200'
                          : 'bg-indigo-50 text-indigo-700 border-indigo-200'
                      }`}
                    >
                      {item.type === 'Registration' ? (
                        <Calendar className="w-4.5 h-4.5" />
                      ) : (
                        <FileText className="w-4.5 h-4.5" />
                      )}
                    </div>

                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-sm font-bold text-slate-900 group-hover:text-[#0B2545] transition-colors">
                          {item.competitionName}
                        </span>
                        <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                          {item.abbreviation}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-500 mt-1 flex-wrap">
                        <span
                          className={`font-semibold px-2 py-0.5 rounded text-[11px] ${
                            item.type === 'Registration'
                              ? 'bg-amber-100/70 text-amber-900'
                              : 'bg-indigo-100/70 text-indigo-900'
                          }`}
                        >
                          {item.type} Deadline
                        </span>
                        <span>•</span>
                        <span className="font-medium text-slate-700">{item.deadlineText}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0 self-end sm:self-center">
                    <span
                      className={`text-xs px-2.5 py-1 rounded-full border inline-flex items-center gap-1 ${urgencyColor}`}
                    >
                      {item.daysRemaining === 0 ? (
                        'Due Today'
                      ) : (
                        <>
                          <span>In {item.daysRemaining} days</span>
                        </>
                      )}
                    </span>
                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#0B2545] group-hover:translate-x-0.5 transition-all" />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-4 pt-4 border-t border-slate-100 text-center">
            <button
              onClick={() => onNavigate('competitions')}
              className="text-xs font-semibold text-slate-600 hover:text-[#0B2545] transition-colors"
            >
              Viewing {Math.min(7, upcomingDeadlines.length)} of {upcomingDeadlines.length} tracked deadlines
            </button>
          </div>
        </div>

        {/* Right Sidebar: Registered Competitions Quick View & Board Directives */}
        <div className="space-y-6">
          {/* Registered Competitions Roster Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-emerald-600" />
                <h3 className="font-bold text-slate-900 text-base">Active Registrations</h3>
              </div>
              <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                {registeredCompetitions} of {totalCompetitions}
              </span>
            </div>

            <p className="text-xs text-slate-500 mb-4">
              Competitions where University of Uyo has formalized registration and assigned delegate rosters.
            </p>

            <div className="space-y-3">
              {competitions
                .filter((c) => c.registeredStatus)
                .map((comp) => (
                  <div
                    key={comp.id}
                    onClick={() => onSelectCompetition(comp)}
                    className="p-3 rounded-xl border border-slate-100 bg-slate-50/70 hover:bg-slate-100 hover:border-slate-300 transition-all cursor-pointer group"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h4 className="text-xs font-bold text-slate-900 group-hover:text-[#0B2545] transition-colors">
                          {comp.abbreviation}
                        </h4>
                        <p className="text-[11px] text-slate-600 line-clamp-1 mt-0.5 font-medium">
                          {comp.name}
                        </p>
                      </div>
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 shrink-0">
                        Active
                      </span>
                    </div>

                    <div className="mt-2 flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-200/50">
                      <span className="text-slate-600 font-medium truncate max-w-[170px]">
                        Rounds: {comp.finalRoundsLocation.split(',')[0]}
                      </span>
                      <span className="text-[#0B2545] font-semibold group-hover:underline">
                        Details &rarr;
                      </span>
                    </div>
                  </div>
                ))}
            </div>

            <button
              onClick={() => onNavigate('competitions')}
              className="mt-4 w-full py-2 px-3 text-xs font-semibold text-center rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
            >
              Browse Unregistered Opportunities ({totalCompetitions - registeredCompetitions})
            </button>
          </div>

          {/* Student Advocacy & Guidance Card */}
          <div className="bg-gradient-to-br from-slate-50 to-blue-50/50 rounded-2xl border border-blue-100 p-5 space-y-3">
            <div className="flex items-center gap-2 text-[#0B2545] font-bold text-sm">
              <BookOpen className="w-4 h-4 text-amber-600" />
              <span>Student Advocacy & Preparation</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Students and prospective delegates preparing for competitions are encouraged to review problem briefs early and ensure legal memorials conform to official citation standards (OSCOLA or Bluebook).
            </p>
            <div className="text-[11px] text-slate-500 bg-white p-2.5 rounded-lg border border-slate-200 space-y-1">
              <div className="font-semibold text-slate-700">Faculty Coordination & Contacts:</div>
              <div>• Faculty Advisor: Dr. E. J. Akpan</div>
              <div>• Secretariat: Faculty of Law, Town Campus</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
