import React from 'react';
import StatusBadge from './StatusBadge';
import { Clock, CheckSquare, UserCheck } from 'lucide-react';

/**
 * Reusable Task Card Component
 * @param {Object} props
 * @param {Object} props.task - Task entity object
 * @param {Function} [props.onStatusChange] - Optional handler when status is updated
 */
export default function TaskCard({ task, onStatusChange }) {
  if (!task) return null;

  const {
    title = 'Untitled Task',
    description = 'No task description provided.',
    status = 'pending',
    priority = 'Medium',
    assigneeName = 'Unassigned',
    dueDate = 'N/A',
  } = task;

  const priorityStyles = {
    High: 'text-rose-400 bg-rose-950/40 border-rose-500/20',
    Medium: 'text-amber-400 bg-amber-950/40 border-amber-500/20',
    Low: 'text-emerald-400 bg-emerald-950/40 border-emerald-500/20',
  };

  return (
    <div className="glass-card p-4 rounded-xl border border-slate-800 hover:border-slate-700 transition">
      <div className="flex items-start justify-between gap-2 mb-2">
        <h4 className="text-sm font-bold text-slate-100 flex items-center gap-2">
          <CheckSquare className="w-4 h-4 text-indigo-400 flex-shrink-0" />
          <span>{title}</span>
        </h4>
        <StatusBadge status={status} />
      </div>

      <p className="text-xs text-slate-400 mb-3 line-clamp-2 leading-relaxed">
        {description}
      </p>

      <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-800">
        <div className="flex items-center gap-2">
          <span className={`px-2 py-0.5 rounded text-[10px] font-semibold border ${priorityStyles[priority] || priorityStyles.Medium}`}>
            {priority} Priority
          </span>
          <span className="flex items-center gap-1 text-slate-400">
            <UserCheck className="w-3 h-3 text-slate-500" />
            {assigneeName}
          </span>
        </div>

        <div className="flex items-center gap-1 text-slate-500 text-[11px]">
          <Clock className="w-3 h-3" />
          <span>{dueDate}</span>
        </div>
      </div>
    </div>
  );
}
