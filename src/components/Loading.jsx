import { Loader2 } from 'lucide-react';

/**
 * Subtle glass loading component.
 */
export default function Loading({ message = 'Loading workspace data...' }) {
  return (
    <div
      className="glass-card"
      style={{
        padding: '48px 24px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '16px',
        textAlign: 'center',
        minHeight: '220px',
      }}
    >
      <div
        style={{
          width: '48px',
          height: '48px',
          borderRadius: '50%',
          background: 'rgba(249, 115, 22, 0.15)',
          border: '1px solid rgba(249, 115, 22, 0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Loader2 size={24} color="#f97316" style={{ animation: 'spin 1.2s linear infinite' }} />
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>

      <p className="subtext" style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
        {message}
      </p>
    </div>
  );
}
