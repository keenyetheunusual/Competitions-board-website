import React, { useState, useMemo } from 'react';
import { Competition, ViewMode } from '../types/competition';
import { StatusBadge } from '../components/StatusBadge';
import {
  Search,
  Filter,
  ArrowUpDown,
  Trophy,
  Calendar,
  FileText,
  ChevronRight,
  ExternalLink,
  MapPin,
  CheckCircle2,
  XCircle,
  Clock,
  Sparkles,
} from 'lucide-react';

interface CompetitionsListViewProps {
  competitions: Competition[];
  onSelectCompetition: (comp: Competition) => void;
  onNavigate: (view: ViewMode) => void;
}

type RegistrationFilter = 'all' | 'registered' | 'not-registered';
type SortField = 'name' | 'regDeadline' | 'memDeadline' | 'edition';
type SortOrder = 'asc' | 'desc';

export const CompetitionsListView: React.FC<CompetitionsListViewProps> = ({
  competitions,
  onSelectCompetition,
  onNavigate,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<RegistrationFilter>('all');
  const [sortField, setSortField] = useState<SortField>('regDeadline');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
  const [viewFormat, setViewFormat] = useState<'table' | 'cards'>('table');

  // Filter and sort competitions
  const filteredCompetitions = useMemo(() => {
    let result = [...competitions];

    // Filter by search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.abbreviation.toLowerCase().includes(q) ||
          c.edition.toLowerCase().includes(q) ||
          c.fullName.toLowerCase().includes(q) ||
          c.description.toLowerCase().includes(q) ||
          c.finalRoundsLocation.toLowerCase().includes(q)
      );
    }

    // Filter by registration status
    if (statusFilter === 'registered') {
      result = result.filter((c) => c.registeredStatus === true);
    } else if (statusFilter === 'not-registered') {
      result = result.filter((c) => c.registeredStatus === false);
    }

    // Sort
    result.sort((a, b) => {
      let comparison = 0;
      if (sortField === 'name') {
        comparison = a.name.localeCompare(b.name);
      } else if (sortField === 'edition') {
        comparison = a.edition.localeCompare(b.edition);
      } else if (sortField === 'regDeadline') {
        comparison = a.registrationDeadlineIso.localeCompare(b.registrationDeadlineIso);
      } else if (sortField === 'memDeadline') {
        comparison = a.memorialDeadlineIso.localeCompare(b.memorialDeadlineIso);
      }

      return sortOrder === 'asc' ? comparison : -comparison;
    });

    return result;
  }, [competitions, searchQuery, statusFilter, sortField, sortOrder]);

  const handleSortToggle = (field: SortField) => {
    if (sortField === field) {
      setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const totalRegistered = competitions.filter((c) => c.registeredStatus).length;
  const totalNotRegistered = competitions.length - totalRegistered;

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#0B2545] uppercase tracking-wider mb-1">
            <Trophy className="w-4 h-4 text-amber-500" />
            <span>Official University Roster</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0B2545] tracking-tight">
            All Competitions
          </h1>
          <p className="text-sm text-slate-500 mt-1 max-w-2xl">
            Browse, filter, and review details for all legal moot courts and academic advocacy competitions available to University of Uyo law students and delegations.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start md:self-auto">
          {/* Format toggle: Table vs Card */}
          <div className="inline-flex rounded-lg border border-slate-200 bg-white p-0.5 text-xs font-semibold shadow-2xs">
            <button
              onClick={() => setViewFormat('table')}
              className={`px-3 py-1.5 rounded-md transition-all ${
                viewFormat === 'table'
                  ? 'bg-[#0B2545] text-white'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Table View
            </button>
            <button
              onClick={() => setViewFormat('cards')}
              className={`px-3 py-1.5 rounded-md transition-all ${
                viewFormat === 'cards'
                  ? 'bg-[#0B2545] text-white'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Card View
            </button>
          </div>
        </div>
      </div>

      {/* Search Bar & Filters Controls Bar */}
      <div className="bg-white p-4 sm:p-5 rounded-xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by competition name, abbreviation, edition..."
              className="w-full pl-10 pr-4 py-2.5 text-sm rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0B2545] focus:border-transparent bg-slate-50/50 hover:bg-white transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-slate-400 hover:text-slate-700 bg-slate-100 px-1.5 py-0.5 rounded"
              >
                Clear
              </button>
            )}
          </div>

          {/* Registration Status Filter Tabs */}
          <div className="flex items-center gap-1.5 bg-slate-100/90 p-1 rounded-lg shrink-0">
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all ${
                statusFilter === 'all'
                  ? 'bg-white text-[#0B2545] shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All ({competitions.length})
            </button>
            <button
              onClick={() => setStatusFilter('registered')}
              className={`px-3 py-1.5 rounded-md text-xs font-bold inline-flex items-center gap-1 transition-all ${
                statusFilter === 'registered'
                  ? 'bg-white text-emerald-800 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Registered ({totalRegistered})</span>
            </button>
            <button
              onClick={() => setStatusFilter('not-registered')}
              className={`px-3 py-1.5 rounded-md text-xs font-bold inline-flex items-center gap-1 transition-all ${
                statusFilter === 'not-registered'
                  ? 'bg-white text-slate-800 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <XCircle className="w-3.5 h-3.5 text-slate-400" />
              <span>Not Registered ({totalNotRegistered})</span>
            </button>
          </div>
        </div>

        {/* Status bar info */}
        <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100 flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <span>Showing <strong className="text-slate-800">{filteredCompetitions.length}</strong> of {competitions.length} competitions</span>
            {searchQuery && (
              <span className="text-amber-700 font-medium">
                (filtered by &ldquo;{searchQuery}&rdquo;)
              </span>
            )}
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-400">Sort:</span>
            <button
              onClick={() => handleSortToggle('name')}
              className={`hover:text-[#0B2545] font-semibold ${sortField === 'name' ? 'text-[#0B2545] underline' : 'text-slate-600'}`}
            >
              Name {sortField === 'name' && (sortOrder === 'asc' ? '↑' : '↓')}
            </button>
            <span>•</span>
            <button
              onClick={() => handleSortToggle('regDeadline')}
              className={`hover:text-[#0B2545] font-semibold ${sortField === 'regDeadline' ? 'text-[#0B2545] underline' : 'text-slate-600'}`}
            >
              Reg Deadline {sortField === 'regDeadline' && (sortOrder === 'asc' ? '↑' : '↓')}
            </button>
            <span>•</span>
            <button
              onClick={() => handleSortToggle('memDeadline')}
              className={`hover:text-[#0B2545] font-semibold ${sortField === 'memDeadline' ? 'text-[#0B2545] underline' : 'text-slate-600'}`}
            >
              Memorial Deadline {sortField === 'memDeadline' && (sortOrder === 'asc' ? '↑' : '↓')}
            </button>
          </div>
        </div>
      </div>

      {/* Main Table View */}
      {viewFormat === 'table' ? (
        <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/90 text-slate-700 text-xs uppercase tracking-wider font-bold border-b border-slate-200">
                  <th
                    scope="col"
                    className="py-3.5 px-4 sm:px-6 cursor-pointer hover:bg-slate-100 transition-colors"
                    onClick={() => handleSortToggle('name')}
                  >
                    <div className="flex items-center gap-1.5">
                      <span>Competition Name</span>
                      <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
                    </div>
                  </th>
                  <th scope="col" className="py-3.5 px-3">
                    Abbreviation
                  </th>
                  <th
                    scope="col"
                    className="py-3.5 px-3 cursor-pointer hover:bg-slate-100 transition-colors"
                    onClick={() => handleSortToggle('edition')}
                  >
                    <div className="flex items-center gap-1.5">
                      <span>Edition</span>
                      <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="py-3.5 px-3 cursor-pointer hover:bg-slate-100 transition-colors"
                    onClick={() => handleSortToggle('regDeadline')}
                  >
                    <div className="flex items-center gap-1.5">
                      <span>Registration Deadline</span>
                      <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="py-3.5 px-3 cursor-pointer hover:bg-slate-100 transition-colors"
                    onClick={() => handleSortToggle('memDeadline')}
                  >
                    <div className="flex items-center gap-1.5">
                      <span>Memorial / Brief Deadline</span>
                      <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
                    </div>
                  </th>
                  <th scope="col" className="py-3.5 px-3 text-center">
                    Registration Status
                  </th>
                  <th scope="col" className="py-3.5 px-4 sm:px-6 text-right">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {filteredCompetitions.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-slate-500">
                      <div className="max-w-sm mx-auto space-y-2">
                        <Trophy className="w-8 h-8 text-slate-300 mx-auto" />
                        <p className="font-semibold text-slate-800">No competitions found</p>
                        <p className="text-xs text-slate-500">
                          Try adjusting your search criteria or resetting the registration status filter.
                        </p>
                        <button
                          onClick={() => {
                            setSearchQuery('');
                            setStatusFilter('all');
                          }}
                          className="mt-2 text-xs font-bold text-[#0B2545] hover:underline"
                        >
                          Reset Filters
                        </button>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredCompetitions.map((comp) => (
                    <tr
                      key={comp.id}
                      onClick={() => onSelectCompetition(comp)}
                      className="hover:bg-blue-50/40 transition-colors cursor-pointer group"
                    >
                      {/* Column 1: Competition Name */}
                      <td className="py-4 px-4 sm:px-6">
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#0B2545] flex items-center justify-center shrink-0 border border-blue-100/80 group-hover:bg-[#0B2545] group-hover:text-white transition-colors">
                            <Trophy className="w-4 h-4" />
                          </div>
                          <div>
                            <span className="font-bold text-slate-900 group-hover:text-[#0B2545] transition-colors leading-snug block">
                              {comp.name}
                            </span>
                            <span className="text-xs text-slate-500 font-medium block mt-0.5 line-clamp-1 max-w-md">
                              {comp.fullName}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Column 2: Abbreviation */}
                      <td className="py-4 px-3 font-semibold text-slate-800 whitespace-nowrap">
                        <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-xs font-mono font-bold border border-slate-200">
                          {comp.abbreviation}
                        </span>
                      </td>

                      {/* Column 3: Edition */}
                      <td className="py-4 px-3 text-slate-600 text-xs whitespace-nowrap font-medium">
                        {comp.edition}
                      </td>

                      {/* Column 4: Registration Deadline */}
                      <td className="py-4 px-3 whitespace-nowrap">
                        <div className="flex items-center gap-1.5 text-xs font-medium text-slate-800">
                          <Calendar className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                          <span>{comp.registrationDeadline}</span>
                        </div>
                      </td>

                      {/* Column 5: Memorial/Brief Deadline */}
                      <td className="py-4 px-3 whitespace-nowrap">
                        <div className="flex items-center gap-1.5 text-xs font-medium text-slate-800">
                          <FileText className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                          <span>{comp.memorialDeadline}</span>
                        </div>
                      </td>

                      {/* Column 6: Registration Status */}
                      <td className="py-4 px-3 text-center whitespace-nowrap">
                        <StatusBadge registered={comp.registeredStatus} size="sm" />
                      </td>

                      {/* Column 7: Action */}
                      <td className="py-4 px-4 sm:px-6 text-right whitespace-nowrap">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelectCompetition(comp);
                          }}
                          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0B2545] hover:text-white hover:bg-[#0B2545] px-3 py-1.5 rounded-lg border border-slate-200 hover:border-[#0B2545] transition-all duration-150 cursor-pointer shadow-2xs"
                        >
                          <span>View Details</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* Alternative Card View */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredCompetitions.map((comp) => (
            <div
              key={comp.id}
              onClick={() => onSelectCompetition(comp)}
              className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs hover:shadow-md hover:border-slate-300 transition-all cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                      {comp.abbreviation}
                    </span>
                    <span className="text-xs text-slate-500 font-medium">
                      {comp.edition}
                    </span>
                  </div>
                  <StatusBadge registered={comp.registeredStatus} size="sm" />
                </div>

                <h3 className="font-bold text-base text-slate-900 group-hover:text-[#0B2545] transition-colors line-clamp-2 leading-snug">
                  {comp.name}
                </h3>
                <p className="text-xs text-slate-500 line-clamp-2 mt-2 leading-relaxed">
                  {comp.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 space-y-2">
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="bg-amber-50/60 p-2 rounded-lg border border-amber-100">
                    <span className="text-[10px] uppercase font-bold text-amber-900 block">
                      Reg Deadline
                    </span>
                    <span className="font-semibold text-slate-800 text-xs">
                      {comp.registrationDeadline}
                    </span>
                  </div>
                  <div className="bg-indigo-50/60 p-2 rounded-lg border border-indigo-100">
                    <span className="text-[10px] uppercase font-bold text-indigo-900 block">
                      Memorial Deadline
                    </span>
                    <span className="font-semibold text-slate-800 text-xs">
                      {comp.memorialDeadline}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
                  <span className="truncate max-w-[200px]">
                    Finals: {comp.finalRoundsLocation}
                  </span>
                  <span className="font-bold text-[#0B2545] group-hover:underline flex items-center gap-1">
                    Details <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
