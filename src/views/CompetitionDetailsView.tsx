import React, { useState } from 'react';
import { Competition, ViewMode } from '../types/competition';
import { StatusBadge } from '../components/StatusBadge';
import { DocumentCard } from '../components/DocumentCard';
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Clock,
  FileText,
  DollarSign,
  Users,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  FileCheck,
  Building,
  Scale,
  Award,
  ChevronRight,
  ShieldAlert,
  Download,
  Share2,
} from 'lucide-react';

interface CompetitionDetailsViewProps {
  competition: Competition;
  onBack: () => void;
  onNavigate: (view: ViewMode) => void;
}

export const CompetitionDetailsView: React.FC<CompetitionDetailsViewProps> = ({
  competition,
  onBack,
  onNavigate,
}) => {
  const [copyFeedback, setCopyFeedback] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopyFeedback(true);
    setTimeout(() => setCopyFeedback(false), 2500);
  };

  // Group documents by category
  const mootProblems = competition.documents.filter(
    (d) => d.type === 'Moot Problem' || d.type === 'Clarifications'
  );
  const competitionRules = competition.documents.filter(
    (d) => d.type === 'Competition Rules' || d.type === 'Memorial Template' || d.type === 'Scoresheet Guidelines'
  );

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Navigation and Breadcrumbs */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
          <button
            onClick={() => onNavigate('dashboard')}
            className="hover:text-[#0B2545] transition-colors"
          >
            Dashboard
          </button>
          <span>/</span>
          <button
            onClick={() => onNavigate('competitions')}
            className="hover:text-[#0B2545] transition-colors"
          >
            All Competitions
          </button>
          <span>/</span>
          <span className="text-slate-800 font-bold truncate max-w-[200px]">
            {competition.abbreviation}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyLink}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors shadow-2xs"
          >
            <Share2 className="w-3.5 h-3.5 text-slate-500" />
            <span>{copyFeedback ? 'Link Copied!' : 'Share Record'}</span>
          </button>

          <button
            onClick={onBack}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors shadow-2xs"
          >
            <ArrowLeft className="w-4 h-4 text-slate-600" />
            <span>Back to Competitions</span>
          </button>
        </div>
      </div>

      {/* Hero Header Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-md font-mono text-xs font-bold bg-[#0B2545] text-white">
                {competition.abbreviation}
              </span>
              <span className="px-2.5 py-0.5 rounded-md text-xs font-semibold bg-amber-50 text-amber-900 border border-amber-200">
                {competition.edition}
              </span>
              <span className="px-2.5 py-0.5 rounded-md text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200">
                {competition.category}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0B2545] tracking-tight leading-tight">
              {competition.name}
            </h1>

            <p className="text-sm text-slate-500 font-medium">
              {competition.fullName}
            </p>

            <p className="text-sm text-slate-600 leading-relaxed pt-1">
              {competition.description}
            </p>
          </div>

          {/* Right Status Block */}
          <div className="flex lg:flex-col items-center lg:items-end justify-between gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200/90 shrink-0">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block lg:text-right mb-1">
                University Registration Status
              </span>
              <div className="flex items-center gap-2 lg:justify-end">
                <StatusBadge registered={competition.registeredStatus} size="lg" />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <a
                href={competition.officialWebsite}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold rounded-lg bg-[#0B2545] hover:bg-[#133E7C] text-white transition-all shadow-2xs"
              >
                <span>Official Website</span>
                <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* 2-Column Layout: Dates & Registration on Left, Timeline on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Dates and Registration Requirements (2 cols) */}
        <div className="lg:col-span-2 space-y-8">
          {/* Section: Dates and Rounds */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-[#0B2545]" />
                <h2 className="text-lg font-bold text-slate-900">Dates & Locations</h2>
              </div>
              <span className="text-xs font-semibold text-slate-500">Official Schedule</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Registration Deadline */}
              <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200/80 space-y-1">
                <div className="flex items-center gap-1.5 text-amber-900 font-bold text-xs">
                  <Clock className="w-4 h-4 text-amber-600" />
                  <span>Registration Deadline</span>
                </div>
                <p className="text-base font-extrabold text-slate-900">
                  {competition.registrationDeadline}
                </p>
                <p className="text-xs text-amber-800 font-medium">
                  Official team entry & roster closure
                </p>
              </div>

              {/* Memorial/Brief Deadline */}
              <div className="p-4 rounded-xl bg-indigo-50/70 border border-indigo-200/80 space-y-1">
                <div className="flex items-center gap-1.5 text-indigo-900 font-bold text-xs">
                  <FileText className="w-4 h-4 text-indigo-600" />
                  <span>Memorial / Brief Deadline</span>
                </div>
                <p className="text-base font-extrabold text-slate-900">
                  {competition.memorialDeadline}
                </p>
                <p className="text-xs text-indigo-800 font-medium">
                  Applicant & Respondent written briefs due
                </p>
              </div>

              {/* National/Elimination Rounds */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <div className="flex items-center gap-1.5 text-slate-700 font-bold text-xs">
                  <MapPin className="w-4 h-4 text-[#0B2545]" />
                  <span>National / Elimination Rounds</span>
                </div>
                <p className="text-sm font-bold text-slate-900">
                  {competition.nationalRoundsDate}
                </p>
                <p className="text-xs text-slate-600 flex items-start gap-1">
                  <Building className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                  <span>{competition.nationalRoundsLocation}</span>
                </p>
              </div>

              {/* Final Rounds */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <div className="flex items-center gap-1.5 text-slate-700 font-bold text-xs">
                  <Award className="w-4 h-4 text-amber-600" />
                  <span>Final Rounds</span>
                </div>
                <p className="text-sm font-bold text-slate-900">
                  {competition.finalRoundsDate}
                </p>
                <p className="text-xs text-slate-600 flex items-start gap-1">
                  <Building className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                  <span>{competition.finalRoundsLocation}</span>
                </p>
              </div>
            </div>
          </div>

          {/* Section: Registration Requirements, Fee & Participants */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <FileCheck className="w-5 h-5 text-[#0B2545]" />
                <h2 className="text-lg font-bold text-slate-900">Registration Details & Requirements</h2>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Registration Fee */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 uppercase tracking-wide">
                  <DollarSign className="w-4 h-4 text-emerald-600" />
                  <span>Registration Fee</span>
                </div>
                <p className="text-sm font-extrabold text-slate-900">
                  {competition.registrationFee}
                </p>
                <p className="text-xs text-slate-500">
                  Subject to faculty bursary sponsorship
                </p>
              </div>

              {/* Number of Participants */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 uppercase tracking-wide">
                  <Users className="w-4 h-4 text-[#0B2545]" />
                  <span>Team Delegation Size</span>
                </div>
                <p className="text-sm font-extrabold text-slate-900">
                  {competition.numberOfParticipants}
                </p>
                <p className="text-xs text-slate-500">
                  Max allowable university delegates
                </p>
              </div>
            </div>

            {/* Checklist of Registration Requirements */}
            <div className="space-y-3 pt-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-600">
                Institutional Eligibility & Registration Requirements
              </h3>
              <ul className="space-y-2.5">
                {competition.registrationRequirements.map((req, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2.5 text-xs text-slate-700 bg-slate-50/80 p-2.5 rounded-lg border border-slate-200/80"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{req}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Right Column: Competition Timeline */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-[#0B2545]" />
                <h3 className="font-bold text-slate-900 text-base">Competition Timeline</h3>
              </div>
              <span className="text-[11px] font-semibold text-slate-500">Key Milestones</span>
            </div>

            {/* Stepper Timeline */}
            <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-slate-200">
              {competition.timeline.map((step, idx) => {
                let badgeDot = 'bg-slate-300 border-white ring-2 ring-slate-100';
                let textColor = 'text-slate-500';

                if (step.status === 'completed') {
                  badgeDot = 'bg-emerald-600 border-white ring-2 ring-emerald-100';
                  textColor = 'text-emerald-800';
                } else if (step.status === 'current') {
                  badgeDot = 'bg-amber-500 border-white ring-4 ring-amber-100 animate-pulse';
                  textColor = 'text-amber-900 font-bold';
                }

                return (
                  <div key={idx} className="relative">
                    {/* Node Dot */}
                    <div
                      className={`absolute -left-6 top-1 w-3.5 h-3.5 rounded-full border-2 ${badgeDot}`}
                    />

                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-bold text-slate-900 leading-snug">
                          {step.phase}
                        </span>
                        <span
                          className={`text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.2 rounded ${textColor} ${
                            step.status === 'current'
                              ? 'bg-amber-100 text-amber-900'
                              : step.status === 'completed'
                              ? 'bg-emerald-50 text-emerald-700'
                              : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          {step.status}
                        </span>
                      </div>
                      <p className="text-xs font-semibold text-[#0B2545] mt-0.5">
                        {step.date}
                      </p>
                      <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Faculty Advisory & Team Information */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600">
              Faculty Advisors & Team Coordination
            </h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Faculty Advisor:</span>
                <span className="font-semibold text-slate-800">{competition.boardContactPerson || 'Dr. E. J. Akpan'}</span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Team Coach:</span>
                <span className="font-semibold text-slate-800">{competition.teamCoach || 'Appointed by Dean'}</span>
              </div>
              <div className="flex items-center justify-between py-1">
                <span className="text-slate-500">Competition Priority:</span>
                <span className="font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 text-[11px]">
                  {competition.priorityLevel || 'High Priority'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Required Section 3: Documents (Moot problem, Competition rules) */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <Scale className="w-5 h-5 text-[#0B2545]" />
              <h2 className="text-lg font-bold text-slate-900">
                Official Competition Documents & Materials
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Download the official moot problem, case dossier, and rules of procedure.
            </p>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-[#0B2545] border border-blue-200 text-xs font-semibold self-start sm:self-auto">
            <AlertCircle className="w-3.5 h-3.5 text-blue-600" />
            <span>Stage 1 Download Placeholders</span>
          </div>
        </div>

        {/* Moot Problem Sub-section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-500"></span>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800">
              1. Moot Problem & Case Record
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mootProblems.length > 0 ? (
              mootProblems.map((doc) => <DocumentCard key={doc.id} document={doc} />)
            ) : (
              <div className="col-span-full p-4 rounded-xl bg-slate-50 text-slate-500 text-xs border border-dashed border-slate-300 text-center">
                Moot problem pending official publication by organizers.
              </div>
            )}
          </div>
        </div>

        {/* Competition Rules Sub-section */}
        <div className="space-y-4 pt-4 border-t border-slate-100">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#0B2545]"></span>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800">
              2. Competition Rules, Regulations & Templates
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {competitionRules.length > 0 ? (
              competitionRules.map((doc) => <DocumentCard key={doc.id} document={doc} />)
            ) : (
              <div className="col-span-full p-4 rounded-xl bg-slate-50 text-slate-500 text-xs border border-dashed border-slate-300 text-center">
                Rules file pending release.
              </div>
            )}
          </div>
        </div>

        {/* Explanatory banner regarding Stage 1 & Stage 2 implementation */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 flex items-start gap-3">
          <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="font-semibold text-slate-800">
              Document Access & Upload Status (Stage 1 Notice)
            </p>
            <p className="text-slate-600 leading-relaxed">
              In this visual demonstration phase, document download buttons operate as placeholders with authentic document metadata (file sizes, revisions, and problem citations). Direct PDF file streaming and administrative upload capabilities will be enabled during Stage 2 database and cloud storage integration.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
