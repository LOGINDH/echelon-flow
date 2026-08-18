import { useAuth } from '../context/AuthContext';
import { User, ShieldCheck, Mail, Calendar, Key } from 'lucide-react';

export default function TLProfile() {
  const { user } = useAuth();

  return (
    <div style={{ maxWidth: '640px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 800 }}>Team Lead Profile</h1>
        <p className="subtext">View your account details and assigned role access.</p>
      </div>

      <div className="glass-card" style={{ padding: '36px 32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '32px' }}>
          <div
            style={{
              width: '72px',
              height: '72px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
              color: '#ffffff',
              fontWeight: 800,
              fontSize: '1.75rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '3px solid rgba(255, 255, 255, 0.3)',
              boxShadow: '0 8px 24px rgba(249, 115, 22, 0.35)',
            }}
          >
            {(user?.full_name || user?.username || 'TL').slice(0, 2).toUpperCase()}
          </div>

          <div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>{user?.full_name || user?.username}</h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
              <span className="status-badge pending" style={{ background: 'rgba(249, 115, 22, 0.2)', color: '#fb923c', borderColor: 'rgba(249, 115, 22, 0.4)' }}>
                <ShieldCheck size={14} /> Team Lead
              </span>
              <span style={{ fontSize: '0.825rem', color: 'var(--text-muted)' }}>ID: #{user?.id}</span>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ padding: '16px', borderRadius: '12px', background: 'rgba(15, 9, 6, 0.5)', border: '1px solid var(--glass-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Username</span>
            <span style={{ fontWeight: 700, color: '#fff' }}>{user?.username || 'Logindh'}</span>
          </div>

          <div style={{ padding: '16px', borderRadius: '12px', background: 'rgba(15, 9, 6, 0.5)', border: '1px solid var(--glass-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Full Name</span>
            <span style={{ fontWeight: 700, color: '#fff' }}>{user?.full_name || 'Team Lead'}</span>
          </div>

          <div style={{ padding: '16px', borderRadius: '12px', background: 'rgba(15, 9, 6, 0.5)', border: '1px solid var(--glass-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Workspace Role</span>
            <span style={{ fontWeight: 700, color: 'var(--accent-amber-light)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Team Lead (TL)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
