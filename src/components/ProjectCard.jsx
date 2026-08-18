import { useState } from 'react';
import StatusBadge from './StatusBadge';
import ConfirmModal from './ConfirmModal';
import { Calendar, Folder, ArrowRight } from 'lucide-react';

/**
 * ProjectCard displaying project fields according to Section 5.1 & 5.4
 * Features confirmation modal before submitting status changes.
 */
export default function ProjectCard({ project, onStatusChange, currentTlId }) {
  const [updating, setUpdating] = useState(false);
  const [pendingStatus, setPendingStatus] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSelectChange = (e) => {
    const newStatus = e.target.value;
    if (newStatus === project.status) return;

    setPendingStatus(newStatus);
    setShowConfirm(true);
  };

  const handleConfirmUpdate = async () => {
    if (!pendingStatus) return;

    setUpdating(true);
    try {
      if (onStatusChange) {
        await onStatusChange(project.id, pendingStatus);
      }
    } finally {
      setUpdating(false);
      setShowConfirm(false);
      setPendingStatus(null);
    }
  };

  const handleCancelUpdate = () => {
    setShowConfirm(false);
    setPendingStatus(null);
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return 'N/A';
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    } catch {
      return dateStr;
    }
  };

  const formatStatusLabel = (st) => {
    if (st === 'in_progress') return 'In Progress';
    if (st === 'completed') return 'Completed';
    return 'Pending';
  };

  return (
    <>
      <div
        className="glass-card glass-card-hover"
        style={{
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          height: '100%',
          gap: '20px',
        }}
      >
        <div>
          {/* Top Header */}
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px', marginBottom: '14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div
                style={{
                  padding: '8px',
                  borderRadius: '10px',
                  background: 'rgba(249, 115, 22, 0.15)',
                  border: '1px solid rgba(249, 115, 22, 0.3)',
                }}
              >
                <Folder size={20} color="#f97316" />
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
                {project.name || project.title || 'Untitled Project'}
              </h3>
            </div>

            <StatusBadge status={project.status} />
          </div>

          {/* Description */}
          <p
            className="subtext"
            style={{
              fontSize: '0.9rem',
              lineHeight: 1.5,
              marginBottom: '20px',
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {project.description || 'No project description provided.'}
          </p>
        </div>

        <div>
          {/* Metadata Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '12px',
              padding: '12px 14px',
              borderRadius: '12px',
              background: 'rgba(15, 9, 6, 0.5)',
              border: '1px solid var(--glass-border)',
              marginBottom: '16px',
              fontSize: '0.825rem',
            }}
          >
            <div>
              <span style={{ color: 'var(--text-muted)', display: 'block', marginBottom: '2px' }}>Start Date</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)', fontWeight: 600 }}>
                <Calendar size={14} color="var(--accent-amber-light)" />
                <span>{formatDate(project.start_date)}</span>
              </div>
            </div>

            <div>
              <span style={{ color: 'var(--text-muted)', display: 'block', marginBottom: '2px' }}>End Date</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--accent-amber-light)', fontWeight: 600 }}>
                <Calendar size={14} color="var(--accent-amber-light)" />
                <span>{formatDate(project.end_date)}</span>
              </div>
            </div>
          </div>

          {/* Quick Status Update Selector */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>Update Status:</span>
            <div style={{ position: 'relative', flex: 1, maxWidth: '160px' }}>
              <select
                value={pendingStatus || project.status || 'pending'}
                onChange={handleSelectChange}
                disabled={updating}
                className="glass-input"
                style={{
                  padding: '6px 12px',
                  fontSize: '0.825rem',
                  fontWeight: 600,
                  borderRadius: '10px',
                  cursor: 'pointer',
                  borderColor: updating ? 'var(--accent-amber)' : undefined,
                }}
              >
                <option value="pending" style={{ background: '#1c120d', color: '#fff' }}>Pending</option>
                <option value="in_progress" style={{ background: '#1c120d', color: '#fff' }}>In Progress</option>
                <option value="completed" style={{ background: '#1c120d', color: '#fff' }}>Completed</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Status Change Confirmation Modal */}
      <ConfirmModal
        isOpen={showConfirm}
        title="Confirm Status Change"
        message={
          <>
            Are you sure you want to update project status for{' '}
            <strong style={{ color: '#fff' }}>"{project.name || project.title}"</strong> from{' '}
            <strong style={{ color: 'var(--accent-amber-light)' }}>{formatStatusLabel(project.status)}</strong> to{' '}
            <strong style={{ color: '#34d399' }}>{formatStatusLabel(pendingStatus)}</strong>?
          </>
        }
        confirmText="Yes, Update Status"
        cancelText="Cancel"
        onConfirm={handleConfirmUpdate}
        onCancel={handleCancelUpdate}
        loading={updating}
        variant={pendingStatus === 'completed' ? 'completed' : 'amber'}
      />
    </>
  );
}
