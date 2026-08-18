import StatusBadge from './StatusBadge';
import { CheckSquare, Calendar, User, FolderKanban } from 'lucide-react';

/**
 * TaskCard displaying task details according to Section 5.3 and Section 6.1
 */
export default function TaskCard({ task }) {
  const formatDate = (dateStr) => {
    if (!dateStr) return 'N/A';
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    } catch {
      return dateStr;
    }
  };

  return (
    <div
      className="glass-card glass-card-hover"
      style={{
        padding: '20px 24px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        gap: '16px',
      }}
    >
      <div>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px', marginBottom: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                padding: '8px',
                borderRadius: '10px',
                background: 'rgba(56, 189, 248, 0.15)',
                border: '1px solid rgba(56, 189, 248, 0.3)',
              }}
            >
              <CheckSquare size={18} color="#38bdf8" />
            </div>
            <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
              {task.title || 'Untitled Task'}
            </h4>
          </div>

          <StatusBadge status={task.status} />
        </div>

        {/* Project & Employee Meta */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '14px' }}>
          {task.project_name || task.project ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              <FolderKanban size={15} color="var(--accent-amber-light)" />
              <span>Project: <strong style={{ color: '#fff' }}>{task.project_name || `Project #${task.project}`}</strong></span>
            </div>
          ) : null}

          {task.employee_name || task.assigned_to_employee ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              <User size={15} color="var(--accent-amber-light)" />
              <span>Assigned to: <strong style={{ color: '#fff' }}>{task.employee_name || `Employee #${task.assigned_to_employee}`}</strong></span>
            </div>
          ) : null}
        </div>
      </div>

      {/* Dates Timeline */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '10px 14px',
          borderRadius: '10px',
          background: 'rgba(15, 9, 6, 0.5)',
          border: '1px solid var(--glass-border)',
          fontSize: '0.8rem',
          color: 'var(--text-muted)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Calendar size={14} color="var(--text-muted)" />
          <span>Start: <strong style={{ color: 'var(--text-secondary)' }}>{formatDate(task.start_date)}</strong></span>
        </div>

        <span>→</span>

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Calendar size={14} color="var(--text-muted)" />
          <span>Due: <strong style={{ color: 'var(--text-secondary)' }}>{formatDate(task.end_date)}</strong></span>
        </div>
      </div>
    </div>
  );
}
