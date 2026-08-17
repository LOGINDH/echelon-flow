import React from 'react';
import { AlertCircle, CheckCircle2, Info, AlertTriangle, X } from 'lucide-react';

/**
 * Reusable Toast Notification Banner
 * @param {Object} props
 * @param {string} props.message - Notification text message
 * @param {'success'|'error'|'warning'|'info'} [props.type='info'] - Notification alert style
 * @param {Function} [props.onClose] - Optional close button callback function
 */
export default function Toast({ message, type = 'info', onClose }) {
  if (!message) return null;

  const styles = {
    success: 'bg-emerald-950/90 border-emerald-500/40 text-emerald-200',
    error: 'bg-rose-950/90 border-rose-500/40 text-rose-200',
    warning: 'bg-amber-950/90 border-amber-500/40 text-amber-200',
    info: 'bg-indigo-950/90 border-indigo-500/40 text-indigo-200',
  };

  const icons = {
    success: CheckCircle2,
    error: AlertCircle,
    warning: AlertTriangle,
    info: Info,
  };

  const IconComponent = icons[type] || Info;

  return (
    <div className={`flex items-center gap-3 px-4 py-3 rounded-xl border backdrop-blur-md shadow-xl transition-all ${styles[type]}`}>
      <IconComponent className="w-5 h-5 flex-shrink-0" />
      <span className="text-sm font-medium leading-snug flex-1">{message}</span>
      {onClose && (
        <button
          onClick={onClose}
          className="p-1 rounded-lg hover:bg-white/10 text-current transition"
          aria-label="Dismiss toast"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
