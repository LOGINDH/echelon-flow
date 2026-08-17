import React from 'react';
import { FolderKanban } from 'lucide-react';

/**
 * Reusable Empty State Card Component
 * @param {Object} props
 * @param {string} [props.title='No Items Found'] - Main title string
 * @param {string} [props.description='There is no data to display right now.'] - Subtitle text
 * @param {React.ReactNode} [props.icon] - Optional custom Lucide icon
 * @param {React.ReactNode} [props.action] - Optional button or call-to-action component
 */
export default function EmptyState({
  title = 'No Items Found',
  description = 'There is no data to display right now.',
  icon: Icon = FolderKanban,
  action = null,
}) {
  return (
    <div className="glass-card p-10 rounded-2xl border border-slate-800 text-center flex flex-col items-center justify-center max-w-md mx-auto my-8">
      <div className="w-14 h-14 rounded-2xl bg-indigo-950/60 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-4 shadow-inner">
        <Icon className="w-7 h-7" />
      </div>
      <h3 className="text-lg font-bold text-slate-100 mb-1">{title}</h3>
      <p className="text-sm text-slate-400 mb-6 leading-relaxed">{description}</p>
      {action && <div>{action}</div>}
    </div>
  );
}
