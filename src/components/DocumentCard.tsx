import React, { useState } from 'react';
import { CompetitionDocument } from '../types/competition';
import { FileText, Download, Check, AlertCircle, FileCheck2, Scale } from 'lucide-react';

interface DocumentCardProps {
  document: CompetitionDocument;
}

export const DocumentCard: React.FC<DocumentCardProps> = ({ document }) => {
  const [downloadState, setDownloadState] = useState<'idle' | 'simulating' | 'notice'>('idle');

  const handleDownloadClick = () => {
    setDownloadState('simulating');
    setTimeout(() => {
      setDownloadState('notice');
      setTimeout(() => {
        setDownloadState('idle');
      }, 4000);
    }, 400);
  };

  const getBadgeStyle = (type: CompetitionDocument['type']) => {
    switch (type) {
      case 'Moot Problem':
        return 'bg-amber-50 text-amber-900 border-amber-300';
      case 'Competition Rules':
        return 'bg-blue-50 text-blue-900 border-blue-200';
      case 'Clarifications':
        return 'bg-purple-50 text-purple-900 border-purple-200';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-4.5 hover:shadow-md transition-all duration-200 flex flex-col justify-between">
      <div>
        <div className="flex items-start justify-between gap-3 mb-2.5">
          <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-[#0B2545] shrink-0 border border-slate-200/80">
            {document.type === 'Moot Problem' ? (
              <Scale className="w-5 h-5 text-amber-600" />
            ) : (
              <FileCheck2 className="w-5 h-5 text-[#0B2545]" />
            )}
          </div>
          <span
            className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border ${getBadgeStyle(
              document.type
            )}`}
          >
            {document.type}
          </span>
        </div>

        <h4 className="text-sm font-bold text-slate-900 line-clamp-2 leading-snug mb-1">
          {document.title}
        </h4>

        {document.description && (
          <p className="text-xs text-slate-500 line-clamp-2 mb-3 leading-relaxed">
            {document.description}
          </p>
        )}
      </div>

      <div className="mt-3 pt-3 border-t border-slate-100">
        <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
          <span className="font-mono text-[11px] text-slate-600 truncate max-w-[170px]" title={document.filename}>
            {document.filename}
          </span>
          <span className="font-medium text-slate-400 shrink-0">
            {document.size}
          </span>
        </div>

        {downloadState === 'notice' ? (
          <div className="bg-amber-50 border border-amber-200 text-amber-900 rounded-lg p-2.5 text-xs flex items-start gap-2 animate-fadeIn">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-[11px]">Placeholder Download</p>
              <p className="text-[10px] text-amber-800 leading-tight">
                Live document download & file uploads will be connected in Stage 2.
              </p>
            </div>
          </div>
        ) : (
          <button
            onClick={handleDownloadClick}
            disabled={downloadState === 'simulating'}
            className="w-full inline-flex items-center justify-center gap-2 px-3 py-2 text-xs font-semibold rounded-lg bg-slate-50 hover:bg-[#0B2545] hover:text-white text-[#0B2545] border border-slate-200 hover:border-[#0B2545] transition-all duration-150 cursor-pointer shadow-2xs group"
          >
            {downloadState === 'simulating' ? (
              <>
                <span className="w-3.5 h-3.5 border-2 border-[#0B2545] border-t-transparent rounded-full animate-spin"></span>
                <span>Opening...</span>
              </>
            ) : (
              <>
                <Download className="w-3.5 h-3.5 text-slate-500 group-hover:text-amber-400 transition-colors" />
                <span>Download Document</span>
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
};
