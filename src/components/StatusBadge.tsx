import React from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';

interface StatusBadgeProps {
  registered: boolean;
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  registered,
  size = 'md',
  showIcon = true,
}) => {
  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-xs px-2.5 py-1',
    lg: 'text-sm px-3.5 py-1.5 font-medium',
  }[size];

  const iconSizes = {
    sm: 'w-3 h-3',
    md: 'w-3.5 h-3.5',
    lg: 'w-4 h-4',
  }[size];

  if (registered) {
    return (
      <span
        className={`inline-flex items-center gap-1.5 rounded-full font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200/80 shadow-xs ${sizeClasses}`}
      >
        {showIcon && <CheckCircle2 className={`${iconSizes} text-emerald-600 shrink-0`} />}
        <span>Registered</span>
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full font-medium bg-slate-100 text-slate-700 border border-slate-200 shadow-xs ${sizeClasses}`}
    >
      {showIcon && <XCircle className={`${iconSizes} text-slate-400 shrink-0`} />}
      <span>Not Registered</span>
    </span>
  );
};
