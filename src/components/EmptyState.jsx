import { FolderOpen } from 'lucide-react';

/**
 * Reusable Glass Empty State component.
 */
export default function EmptyState({
  title = 'No Data Found',
  description = 'There are no items to display right now.',
  icon: Icon = FolderOpen,
  actionButton,
}) {
  return (
    <div
      className="glass-card"
      style={{
        padding: '56px 24px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        gap: '16px',
        maxWidth: '520px',
        margin: '0 auto',
      }}
    >
      <div
        style={{
          width: '64px',
          height: '64px',
          borderRadius: '20px',
          background: 'rgba(249, 115, 22, 0.12)',
          border: '1px solid rgba(249, 115, 22, 0.25)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 8px 24px rgba(249, 115, 22, 0.1)',
        }}
      >
        <Icon size={32} color="#f97316" />
      </div>

      <div>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '6px' }}>{title}</h3>
        <p className="subtext" style={{ fontSize: '0.9rem', maxWidth: '380px', margin: '0 auto' }}>
          {description}
        </p>
      </div>

      {actionButton && <div style={{ marginTop: '8px' }}>{actionButton}</div>}
    </div>
  );
}
