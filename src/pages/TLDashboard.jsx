import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getTLProjects, updateProjectStatus } from '../api/tl';
import ProjectCard from '../components/ProjectCard';
import Loading from '../components/Loading';
import EmptyState from '../components/EmptyState';
import StatusBadge from '../components/StatusBadge';
import toast from 'react-hot-toast';
import {
  FolderKanban,
  Clock,
  PlayCircle,
  CheckCircle2,
  Users,
  CheckSquare,
  AlertTriangle,
  RefreshCw,
  Plus,
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function TLDashboard() {
  const { user } = useAuth();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchProjects = async (showToast = false) => {
    if (!user?.id) return;
    try {
      if (showToast) setRefreshing(true);
      const data = await getTLProjects(user.id);
      // Ensure projects array format handling
      const projectsList = Array.isArray(data) ? data : data.projects || [];
      setProjects(projectsList);
      if (showToast) toast.success('Projects refreshed');
    } catch (err) {
      toast.error(`Failed to load projects: ${err.message}`);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [user?.id]);

  const handleStatusChange = async (projectId, newStatus) => {
    try {
      await updateProjectStatus(projectId, { tl_id: user.id, status: newStatus });
      toast.success('Project status updated!');
      fetchProjects();
    } catch (err) {
      toast.error(`Failed to update status: ${err.message}`);
    }
  };

  // Derive counts client-side from TL's project list
  const totalProjects = projects.length;
  const activeProjects = projects.filter((p) => (p.status || '').toLowerCase() === 'in_progress').length;
  const pendingProjects = projects.filter((p) => (p.status || '').toLowerCase() === 'pending').length;
  const completedProjects = projects.filter((p) => (p.status || '').toLowerCase() === 'completed').length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      {/* Top Welcome Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800 }}>
            Hello, {user?.full_name || user?.username} 👋
          </h1>
          <p className="subtext" style={{ marginTop: '4px' }}>
            Here is an overview of your assigned projects and team activities.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button
            onClick={() => fetchProjects(true)}
            disabled={refreshing}
            className="btn-secondary"
            style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 16px' }}
          >
            <RefreshCw size={16} className={refreshing ? 'spin-icon' : ''} />
            <span>Refresh</span>
          </button>

          <Link to="/tl/create-task" className="btn-primary" style={{ textDecoration: 'none' }}>
            <Plus size={18} />
            <span>Assign New Task</span>
          </Link>
        </div>
      </div>

      {/* Flag Notice for Missing GET Endpoints in Backend Contract */}
      <div
        className="glass-card"
        style={{
          padding: '14px 20px',
          borderRadius: '14px',
          background: 'rgba(249, 115, 22, 0.12)',
          border: '1px solid rgba(249, 115, 22, 0.3)',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          fontSize: '0.85rem',
          color: 'var(--text-secondary)',
        }}
      >
        <AlertTriangle size={20} color="#f97316" style={{ shrink: 0 }} />
        <div>
          <strong style={{ color: '#fff' }}>API Contract Note:</strong> Client-side stats derived from{' '}
          <code style={{ background: 'rgba(0,0,0,0.4)', padding: '2px 6px', borderRadius: '4px', color: '#fb923c' }}>
            GET /tl/projects/
          </code>
          . Employee and Task counts show N/A because the Django API contract (Sections 5 & 7) does not expose GET endpoints for Team Leads to list all employees or tasks.
        </div>
      </div>

      {/* Summary Cards Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '20px',
        }}
      >
        {/* Total Assigned Projects */}
        <div className="glass-card glass-card-hover" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Assigned Projects
            </span>
            <div style={{ padding: '8px', borderRadius: '10px', background: 'rgba(249, 115, 22, 0.15)', border: '1px solid rgba(249, 115, 22, 0.3)' }}>
              <FolderKanban size={20} color="#f97316" />
            </div>
          </div>
          <div style={{ fontSize: '2.5rem', fontWeight: 800, color: '#ffffff', lineHeight: 1 }}>
            {loading ? '—' : totalProjects}
          </div>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '8px', display: 'block' }}>
            Total assigned to you
          </span>
        </div>

        {/* Active Projects (In Progress) */}
        <div className="glass-card glass-card-hover" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Active Projects
            </span>
            <div style={{ padding: '8px', borderRadius: '10px', background: 'rgba(56, 189, 248, 0.15)', border: '1px solid rgba(56, 189, 248, 0.3)' }}>
              <PlayCircle size={20} color="#38bdf8" />
            </div>
          </div>
          <div style={{ fontSize: '2.5rem', fontWeight: 800, color: '#38bdf8', lineHeight: 1 }}>
            {loading ? '—' : activeProjects}
          </div>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '8px', display: 'block' }}>
            In Progress status
          </span>
        </div>

        {/* Completed Projects */}
        <div className="glass-card glass-card-hover" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Completed Projects
            </span>
            <div style={{ padding: '8px', borderRadius: '10px', background: 'rgba(52, 211, 153, 0.15)', border: '1px solid rgba(52, 211, 153, 0.3)' }}>
              <CheckCircle2 size={20} color="#34d399" />
            </div>
          </div>
          <div style={{ fontSize: '2.5rem', fontWeight: 800, color: '#34d399', lineHeight: 1 }}>
            {loading ? '—' : completedProjects}
          </div>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '8px', display: 'block' }}>
            Successfully finished
          </span>
        </div>

        {/* Employees Summary Card */}
        <div className="glass-card glass-card-hover" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Employees
            </span>
            <div style={{ padding: '8px', borderRadius: '10px', background: 'rgba(168, 85, 247, 0.15)', border: '1px solid rgba(168, 85, 247, 0.3)' }}>
              <Users size={20} color="#c084fc" />
            </div>
          </div>
          <div style={{ fontSize: '2.5rem', fontWeight: 800, color: '#c084fc', lineHeight: 1 }}>
            N/A
          </div>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '8px', display: 'block' }}>
            No GET endpoint in spec
          </span>
        </div>

        {/* Tasks Summary Card */}
        <div className="glass-card glass-card-hover" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Tasks
            </span>
            <div style={{ padding: '8px', borderRadius: '10px', background: 'rgba(236, 72, 153, 0.15)', border: '1px solid rgba(236, 72, 153, 0.3)' }}>
              <CheckSquare size={20} color="#f472b6" />
            </div>
          </div>
          <div style={{ fontSize: '2.5rem', fontWeight: 800, color: '#f472b6', lineHeight: 1 }}>
            N/A
          </div>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '8px', display: 'block' }}>
            No GET endpoint in spec
          </span>
        </div>
      </div>

      {/* Projects List Section */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
          <div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 700 }}>Assigned Projects</h2>
            <p className="subtext" style={{ fontSize: '0.875rem' }}>Manage project statuses assigned to you.</p>
          </div>
        </div>

        {loading ? (
          <Loading message="Fetching assigned projects from backend..." />
        ) : projects.length === 0 ? (
          <EmptyState
            title="No Projects Assigned"
            description="You do not currently have any projects assigned by Admin."
            icon={FolderKanban}
          />
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
              gap: '24px',
            }}
          >
            {projects.map((project, idx) => (
              <ProjectCard
                key={project.id || idx}
                project={project}
                onStatusChange={handleStatusChange}
                currentTlId={user.id}
              />
            ))}
          </div>
        )}
      </div>

      <style>{`
        .spin-icon {
          animation: spin 1s linear infinite;
        }
      `}</style>

    </div>
  );
}
