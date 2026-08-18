import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getTLProjects, updateProjectStatus } from '../api/tl';
import ProjectCard from '../components/ProjectCard';
import Loading from '../components/Loading';
import EmptyState from '../components/EmptyState';
import toast from 'react-hot-toast';
import { FolderKanban, RefreshCw, Filter, Search } from 'lucide-react';

export default function TLProjects() {
  const { user } = useAuth();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const fetchProjects = async (showToast = false) => {
    if (!user?.id) return;
    setError(null);
    try {
      if (showToast) setRefreshing(true);
      const data = await getTLProjects(user.id);
      const list = Array.isArray(data) ? data : data.projects || [];
      setProjects(list);
      if (showToast) toast.success('Projects list updated');
    } catch (err) {
      setError(err.message || 'Failed to fetch assigned projects');
      toast.error(`Error: ${err.message}`);
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

  // Filter projects by status and search query
  const filteredProjects = projects.filter((project) => {
    const pStatus = (project.status || 'pending').toLowerCase();
    const matchesFilter = statusFilter === 'all' || pStatus === statusFilter;
    const pName = (project.name || project.title || '').toLowerCase();
    const pDesc = (project.description || '').toLowerCase();
    const matchesSearch =
      !searchQuery.trim() ||
      pName.includes(searchQuery.toLowerCase()) ||
      pDesc.includes(searchQuery.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800 }}>My Assigned Projects</h1>
          <p className="subtext" style={{ marginTop: '4px' }}>
            View and manage all projects assigned to you by Admin.
          </p>
        </div>

        <button
          onClick={() => fetchProjects(true)}
          disabled={refreshing}
          className="btn-secondary"
          style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
        >
          <RefreshCw size={16} className={refreshing ? 'spin-icon' : ''} />
          <span>Refresh</span>
        </button>
      </div>

      {/* Controls Bar: Search & Status Filter */}
      <div
        className="glass-card"
        style={{
          padding: '16px 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px',
        }}
      >
        {/* Search input */}
        <div style={{ position: 'relative', flex: '1 1 260px', maxWidth: '380px' }}>
          <Search size={18} color="var(--text-muted)" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="text"
            className="glass-input"
            style={{ paddingLeft: '42px' }}
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Status Filter Pills */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          <Filter size={16} color="var(--text-muted)" />
          {[
            { id: 'all', label: `All (${projects.length})` },
            { id: 'pending', label: `Pending (${projects.filter((p) => (p.status || '').toLowerCase() === 'pending').length})` },
            { id: 'in_progress', label: `In Progress (${projects.filter((p) => (p.status || '').toLowerCase() === 'in_progress').length})` },
            { id: 'completed', label: `Completed (${projects.filter((p) => (p.status || '').toLowerCase() === 'completed').length})` },
          ].map((tab) => {
            const active = statusFilter === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setStatusFilter(tab.id)}
                style={{
                  padding: '7px 14px',
                  borderRadius: '10px',
                  fontSize: '0.825rem',
                  fontWeight: active ? 700 : 500,
                  cursor: 'pointer',
                  border: active ? '1px solid rgba(249, 115, 22, 0.5)' : '1px solid var(--glass-border)',
                  background: active ? 'rgba(249, 115, 22, 0.25)' : 'rgba(255, 255, 255, 0.05)',
                  color: active ? '#ffffff' : 'var(--text-secondary)',
                  transition: 'all 0.2s ease',
                }}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content Area */}
      {loading ? (
        <Loading message="Loading assigned projects..." />
      ) : error ? (
        <EmptyState
          title="Failed to Load Projects"
          description={error}
          icon={FolderKanban}
          actionButton={
            <button onClick={() => fetchProjects(true)} className="btn-primary">
              Retry Loading
            </button>
          }
        />
      ) : filteredProjects.length === 0 ? (
        <EmptyState
          title={searchQuery || statusFilter !== 'all' ? 'No Matching Projects' : 'No Assigned Projects'}
          description={
            searchQuery || statusFilter !== 'all'
              ? 'No projects match your current search query or status filter.'
              : 'You do not have any projects assigned to you at the moment.'
          }
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
          {filteredProjects.map((project, idx) => (
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
  );
}
