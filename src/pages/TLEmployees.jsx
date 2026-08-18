import { Link } from 'react-router-dom';
import EmptyState from '../components/EmptyState';
import { Users, UserPlus, Info } from 'lucide-react';

export default function TLEmployees() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800 }}>Team Employees</h1>
          <p className="subtext">Manage employees created under your Team Lead account.</p>
        </div>

        <Link to="/tl/create-employee" className="btn-primary" style={{ textDecoration: 'none' }}>
          <UserPlus size={18} />
          <span>Create Employee</span>
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
          <strong style={{ color: '#fff' }}>API Contract Info:</strong> Use the button above to register new employee credentials via{' '}
          <code style={{ background: 'rgba(0,0,0,0.4)', padding: '2px 6px', borderRadius: '4px', color: '#38bdf8' }}>
            POST /tl/create-employee/
          </code>
          . Note: The backend spec does not provide a GET endpoint to fetch a list of employees for TLs.
        </div>
      </div>

      <EmptyState
        title="Create Team Employees"
        description="Add new employee credentials so team members can log into their workspace and manage assigned tasks."
        icon={Users}
        actionButton={
          <Link to="/tl/create-employee" className="btn-primary" style={{ textDecoration: 'none' }}>
            <UserPlus size={18} />
            <span>Create First Employee</span>
          </Link>
        }
      />
    </div>
  );
}
