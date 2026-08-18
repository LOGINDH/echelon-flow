import { AlertCircle, CheckCircle, X } from 'lucide-react';

/**
 * Reusable Glassmorphism Confirmation Modal component.
 */
export default function ConfirmModal({
  isOpen,
  title = 'Confirm Status Change',
  message,
  confirmText = 'Confirm Update',
  cancelText = 'Cancel',
  onConfirm,
  onCancel,
  loading = false,
  variant = 'amber',
}) {
  if (!isOpen) return null;

  const isCompletedChange = variant === 'completed';

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        background: 'rgba(0, 0, 0, 0.75)',
        backdropFilter: 'blur(8px)',
      }}
      onClick={onCancel}
    >
      <div
        className="glass-card"
        style={{
          maxWidth: '460px',
          width: '100%',
          padding: '32px 28px',
          background: 'rgba(28, 18, 13, 0.95)',
          border: '1px solid rgba(255, 170, 110, 0.35)',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.8), 0 0 30px rgba(249, 115, 22, 0.15)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '16px', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '14px',
                background: isCompletedChange ? 'rgba(52, 211, 153, 0.15)' : 'rgba(249, 115, 22, 0.15)',
                border: isCompletedChange ? '1px solid rgba(52, 211, 153, 0.3)' : '1px solid rgba(249, 115, 22, 0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {isCompletedChange ? <CheckCircle size={22} color="#34d399" /> : <AlertCircle size={22} color="#f97316" />}
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>{title}</h3>
          </div>

          <button
            onClick={onCancel}
            disabled={loading}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-muted)',
              cursor: 'pointer',
              padding: '4px',
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Message */}
        <p className="subtext" style={{ fontSize: '0.925rem', lineHeight: 1.5, marginBottom: '28px' }}>
          {message}
        </p>

        {/* Buttons */}
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="btn-secondary"
          >
            {cancelText}
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className="btn-primary"
            style={{
              background: isCompletedChange
                ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
                : undefined,
              boxShadow: isCompletedChange ? '0 4px 20px rgba(16, 185, 129, 0.4)' : undefined,
            }}
          >
            {loading ? 'Updating...' : confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
