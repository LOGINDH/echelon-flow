import React from 'react';

/**
 * Reusable Status Badge Component
 * @param {Object} props
 * @param {'pending'|'in_progress'|'completed'|string} props.status - Status string
 * @param {string} [props.className] - Additional CSS classes
 */
export default function StatusBadge({ status, className = '' }) {
  const normalizedStatus = (status || '').toLowerCase().trim();

  let colorStyles = 'bg-slate-800 text-slate-300 border-slate-700';
  let label = status || 'Unknown';
  let dotColor = 'bg-slate-400';

  if (normalizedStatus === 'pending') {
    label = 'Pending';
    colorStyles = 'bg-amber-950/60 text-amber-300 border-amber-500/30';
    dotColor = 'bg-amber-400';
  } else if (normalizedStatus === 'in_progress' || normalizedStatus === 'in progress') {
    label = 'In Progress';
    colorStyles = 'bg-indigo-950/60 text-indigo-300 border-indigo-500/30';
    dotColor = 'bg-indigo-400 animate-pulse';
  } else if (normalizedStatus === 'completed') {
    label = 'Completed';
    colorStyles = 'bg-emerald-950/60 text-emerald-300 border-emerald-500/30';
    dotColor = 'bg-emerald-400';
  }

  return (
    <inline-span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${colorStyles} ${className}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${dotColor}`} />
      <span>{label}</span>
    </inline-span>
  );
}
