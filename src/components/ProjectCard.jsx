import React from 'react';
import StatusBadge from './StatusBadge';
import { Calendar, User, ArrowRight } from 'lucide-react';

/**
 * Reusable Project Card Component
 * @param {Object} props
 * @param {Object} props.project - Project entity object
 * @param {Function} [props.onClick] - Click handler for opening project detail
 */
export default function ProjectCard({ project, onClick }) {
  if (!project) return null;

  const {
    name = 'Untitled Project',
    description = 'No description provided for this project.',
    status = 'pending',
    teamLeadName = 'Unassigned',
    deadline = 'N/A',
    progress = 0,
  } = project;

  return (
    <div
      onClick={onClick}
      className={`glass-card p-5 rounded-2xl border border-slate-800 hover:border-indigo-500/40 transition-all duration-200 group ${
        onClick ? 'cursor-pointer hover:shadow-indigo-500/10 hover:shadow-lg' : ''
      }`}
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <h3 className="text-base font-bold text-slate-100 group-hover:text-indigo-400 transition-colors line-clamp-1">
          {name}
        </h3>
        <StatusBadge status={status} />
      </div>

      <p className="text-xs text-slate-400 mb-4 line-clamp-2 leading-relaxed">
        {description}
      </p>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex justify-between text-xs text-slate-400 mb-1">
          <span>Progress</span>
          <span className="font-semibold text-slate-300">{progress}%</span>
        </div>
        <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden border border-slate-800">
          <div
            className="bg-indigo-500 h-full rounded-full transition-all duration-300"
            style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
          />
        </div>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-slate-800/80 text-xs text-slate-400">
        <div className="flex items-center gap-1.5">
          <User className="w-3.5 h-3.5 text-indigo-400" />
          <span>{teamLeadName}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Calendar className="w-3.5 h-3.5 text-slate-500" />
          <span>{deadline}</span>
        </div>
      </div>
    </div>
  );
}
