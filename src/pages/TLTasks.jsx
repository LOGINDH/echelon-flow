import { Link } from 'react-router-dom';
import EmptyState from '../components/EmptyState';
import { CheckSquare, PlusCircle, Info } from 'lucide-react';

export default function TLTasks() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800 }}>Project Tasks</h1>
          <p className="subtext">Assign and track task deliverables across your team.</p>
        </div>

        <Link to="/tl/create-task" className="btn-primary" style={{ textDecoration: 'none' }}>
          <PlusCircle size={18} />
          <span>Create Task</span>
        </Link>
      </div>

      <div
        className="glass-card"
        style={{
          padding: '16px 20px',
          borderRadius: '14px',
          background: 'rgba(56, 189, 248, 0.1)',
          border: '1px solid rgba(56, 189, 248, 0.25)',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          fontSize: '0.85rem',
          color: 'var(--text-secondary)',
        }}
      >
        <Info size={20} color="#38bdf8" style={{ shrink: 0 }} />
        <div>
          <strong style={{ color: '#fff' }}>API Contract Info:</strong> Create and assign new tasks to employees via{' '}
          <code style={{ background: 'rgba(0,0,0,0.4)', padding: '2px 6px', borderRadius: '4px', color: '#38bdf8' }}>
            POST /tl/tasks/create/
          </code>
          . Note: The backend spec exposes task listing only for Employee role (
          <code style={{ background: 'rgba(0,0,0,0.4)', padding: '2px 6px', borderRadius: '4px', color: '#38bdf8' }}>
            GET /employee/tasks/
          </code>
          ).
        </div>
      </div>

      <EmptyState
        title="Assign Project Tasks"
        description="Select an assigned project and assign tasks to employees with start/due dates."
        icon={CheckSquare}
        actionButton={
          <Link to="/tl/create-task" className="btn-primary" style={{ textDecoration: 'none' }}>
            <PlusCircle size={18} />
            <span>Create First Task</span>
          </Link>
        }
      />
    </div>
  );
}
