import { useAuth } from '../context/AuthContext';
import { Menu, LogOut, ShieldCheck, User } from 'lucide-react';

export default function Navbar({ onMenuToggle }) {
  const { user, logout } = useAuth();

  const getInitials = (name) => {
    if (!name) return 'TL';
    return name
      .split(' ')
      .map((part) => part[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <header
      className="glass-card navbar-container"
      style={{
        padding: '14px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '28px',
        position: 'sticky',
        top: '20px',
        zIndex: 30,
      }}
    >
      {/* Left: Mobile Toggle & Page Identifier */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <button
          onClick={onMenuToggle}
          className="mobile-menu-btn"
          style={{
            background: 'rgba(255, 255, 255, 0.06)',
            border: '1px solid var(--glass-border)',
            borderRadius: '10px',
            padding: '8px',
            color: 'var(--text-primary)',
            cursor: 'pointer',
            display: 'none',
          }}
          aria-label="Toggle Navigation Menu"
        >
          <Menu size={20} />
        </button>

        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, margin: 0 }}>Team Lead Dashboard</h3>
            <span style={{
              fontSize: '0.7rem',
              fontWeight: 700,
              padding: '2px 8px',
              borderRadius: '9999px',
              background: 'rgba(249, 115, 22, 0.2)',
              color: 'var(--accent-amber-light)',
              border: '1px solid rgba(249, 115, 22, 0.4)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}>
              TL Active
            </span>
          </div>
        </div>
      </div>

      {/* Right: User Profile & Actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
              color: '#ffffff',
              fontWeight: 700,
              fontSize: '0.9rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '2px solid rgba(255, 255, 255, 0.3)',
              boxShadow: '0 4px 12px rgba(249, 115, 22, 0.35)',
            }}
          >
            {getInitials(user?.full_name || user?.username)}
          </div>
          
          <div className="nav-user-info" style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-primary)' }}>
              {user?.full_name || user?.username || 'Team Lead'}
            </span>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              ID: #{user?.id || '—'}
            </span>
          </div>
        </div>

        <div style={{ height: '24px', width: '1px', background: 'var(--glass-border)' }} />

        <button
          onClick={logout}
          title="Logout"
          className="btn-secondary"
          style={{
            padding: '8px 14px',
            fontSize: '0.825rem',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            borderRadius: '10px',
          }}
        >
          <LogOut size={16} />
          <span className="logout-text">Logout</span>
        </button>
      </div>
    </header>
  );
}
