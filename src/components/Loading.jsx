import React from 'react';
import { Loader2 } from 'lucide-react';

/**
 * Reusable Loading Spinner Component
 * @param {Object} props
 * @param {string} [props.message='Loading...'] - Loading text to display
 * @param {boolean} [props.fullScreen=false] - Whether to occupy entire viewport
 * @param {string} [props.className=''] - Additional custom container styling
 */
export default function Loading({ message = 'Loading...', fullScreen = false, className = '' }) {
  const containerClasses = fullScreen
    ? 'fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex flex-col items-center justify-center'
    : 'py-12 flex flex-col items-center justify-center w-full';

  return (
    <div className={`${containerClasses} ${className}`}>
      <Loader2 className="w-8 h-8 text-indigo-500 animate-spin mb-3" />
      {message && <p className="text-sm font-medium text-slate-400">{message}</p>}
    </div>
  );
}
