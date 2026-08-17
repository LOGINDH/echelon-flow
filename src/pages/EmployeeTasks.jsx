import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  ClipboardList, Search, Filter, X, Clock, CheckCircle2, RefreshCw,
  AlertCircle, Calendar, Tag, User, ChevronRight, ArrowLeft
} from 'lucide-react';

const DUMMY_TASKS = [
  {
    id: 1,
    title: 'Design new dashboard wireframes',
    description: 'Create detailed wireframes for the revamped employee dashboard including mobile responsiveness, dark mode support, and accessibility improvements. Coordinate with the UX team to ensure brand consistency.',
    status: 'in_progress',
    priority: 'high',
    due_date: '2026-08-20',
    assigned_by: 'Arjun Mehta',
    project: 'Echelon Flow v2',
    tags: ['Design', 'UI/UX'],
  },
  {
    id: 2,
    title: 'Fix login page validation bug',
    description: 'Users are reporting that the login page does not display error messages properly when incorrect credentials are entered. Investigate the form validation logic and ensure proper error states are shown.',
    status: 'pending',
    priority: 'high',
    due_date: '2026-08-18',
    assigned_by: 'Priya Sharma',
    project: 'Echelon Flow v2',
    tags: ['Bug Fix', 'Frontend'],
  },
  {
    id: 3,
    title: 'Write unit tests for auth module',
    description: 'Cover the authentication API with comprehensive unit tests including edge cases for token expiry, invalid credentials, and concurrent session handling.',
    status: 'pending',
    priority: 'medium',
    due_date: '2026-08-22',
    assigned_by: 'Arjun Mehta',
    project: 'Auth Service',
    tags: ['Testing', 'Backend'],
  },
  {
    id: 4,
    title: 'Migrate database to PostgreSQL',
    description: 'The current SQLite database needs to be migrated to a production-ready PostgreSQL instance. This includes schema migrations, data validation scripts and regression testing.',
    status: 'completed',
    priority: 'high',
    due_date: '2026-08-15',
    assigned_by: 'Kiran Das',
    project: 'Infrastructure',
    tags: ['Database', 'DevOps'],
  },
  {
    id: 5,
    title: 'Update API documentation',
    description: 'Ensure all REST API endpoints are documented in Swagger/OpenAPI format with sample request and response payloads, authentication requirements, and error codes.',
    status: 'completed',
    priority: 'low',
    due_date: '2026-08-14',
    assigned_by: 'Priya Sharma',
    project: 'Auth Service',
    tags: ['Documentation'],
  },
  {
    id: 6,
    title: 'Implement task notification system',
    description: 'Build an in-app and email notification system that alerts employees when new tasks are assigned to them, or when the status of their tasks is updated by the Team Lead.',
    status: 'in_progress',
    priority: 'medium',
    due_date: '2026-08-25',
    assigned_by: 'Kiran Das',
    project: 'Echelon Flow v2',
    tags: ['Backend', 'Feature'],
  },
];

const statusConfig = {
  pending: { label: 'Pending', color: 'text-amber-400', bg: 'bg-amber-400/10 border-amber-400/20', icon: <Clock size={14} /> },
  in_progress: { label: 'In Progress', color: 'text-blue-400', bg: 'bg-blue-400/10 border-blue-400/20', icon: <RefreshCw size={14} /> },
  completed: { label: 'Completed', color: 'text-emerald-400', bg: 'bg-emerald-400/10 border-emerald-400/20', icon: <CheckCircle2 size={14} /> },
};

const priorityConfig = {
  high: { label: 'High', color: 'text-rose-400', bg: 'bg-rose-400/10 border-rose-400/20' },
  medium: { label: 'Medium', color: 'text-amber-400', bg: 'bg-amber-400/10 border-amber-400/20' },
  low: { label: 'Low', color: 'text-emerald-400', bg: 'bg-emerald-400/10 border-emerald-400/20' },
};

export default function EmployeeTasksPage() {
  const { user } = useAuth();
  const [tasks, setTasks] = useState(DUMMY_TASKS);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedTask, setSelectedTask] = useState(null);

  const glassPanelClass = "bg-[rgba(40,20,5,0.4)] backdrop-blur-xl border border-[rgba(255,140,0,0.1)] rounded-[24px]";
  const glassCardClass = "bg-[rgba(255,100,0,0.05)] border border-[rgba(255,140,0,0.1)] rounded-[16px]";

  const filtered = tasks.filter(t => {
    const matchesSearch = t.title.toLowerCase().includes(search.toLowerCase()) ||
      t.project.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = filterStatus === 'all' || t.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = (taskId, newStatus) => {
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, status: newStatus } : t));
    if (selectedTask?.id === taskId) setSelectedTask(prev => ({ ...prev, status: newStatus }));
  };

  // Task Detail View
  if (selectedTask) {
    const sc = statusConfig[selectedTask.status];
    const pc = priorityConfig[selectedTask.priority];
    return (
      <div className={`w-full h-full flex flex-col p-6 md:p-8 ${glassPanelClass} relative overflow-hidden`}>
        <div className="absolute top-0 right-0 w-[300px] h-[300px] rounded-full blur-[120px] bg-[#ff6b00] opacity-20 pointer-events-none"></div>

        {/* Back button + title */}
        <div className="flex items-center gap-4 mb-8 relative z-10">
          <button
            onClick={() => setSelectedTask(null)}
            className="flex items-center gap-2 px-4 py-2 rounded-[12px] bg-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.1)] border border-[rgba(255,255,255,0.1)] text-sm font-medium transition-all"
          >
            <ArrowLeft size={16} /> Back to Tasks
          </button>
          <div className="h-6 w-px bg-[rgba(255,255,255,0.1)]"></div>
          <div className="flex items-center gap-2">
            <span className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${sc.bg} ${sc.color}`}>
              {sc.icon} {sc.label}
            </span>
            <span className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${pc.bg} ${pc.color}`}>
              <AlertCircle size={12} /> {pc.label} Priority
            </span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar relative z-10 pr-2">
          <div className="max-w-3xl space-y-6">
            {/* Task Title */}
            <div>
              <h1 className="text-2xl md:text-3xl font-bold mb-2 leading-tight">{selectedTask.title}</h1>
              <p className="text-sm text-[rgba(255,255,255,0.5)]">{selectedTask.project}</p>
            </div>

            {/* Meta info row */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className={`p-4 rounded-[16px] ${glassCardClass}`}>
                <div className="flex items-center gap-2 text-[rgba(255,255,255,0.5)] mb-2 text-xs font-medium">
                  <Calendar size={14} /> Due Date
                </div>
                <p className="font-semibold text-sm">{new Date(selectedTask.due_date).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
              </div>
              <div className={`p-4 rounded-[16px] ${glassCardClass}`}>
                <div className="flex items-center gap-2 text-[rgba(255,255,255,0.5)] mb-2 text-xs font-medium">
                  <User size={14} /> Assigned By
                </div>
                <p className="font-semibold text-sm">{selectedTask.assigned_by}</p>
              </div>
              <div className={`p-4 rounded-[16px] ${glassCardClass}`}>
                <div className="flex items-center gap-2 text-[rgba(255,255,255,0.5)] mb-2 text-xs font-medium">
                  <Tag size={14} /> Tags
                </div>
                <div className="flex flex-wrap gap-1">
                  {selectedTask.tags.map(tag => (
                    <span key={tag} className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#ff8c00]/15 text-[#ff8c00] border border-[#ff8c00]/20">{tag}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Description */}
            <div className={`p-6 rounded-[20px] ${glassCardClass}`}>
              <h3 className="font-bold mb-3 text-sm text-[rgba(255,255,255,0.7)] uppercase tracking-wider">Description</h3>
              <p className="text-sm leading-relaxed text-[rgba(255,255,255,0.85)]">{selectedTask.description}</p>
            </div>

            {/* Update Status */}
            <div className={`p-6 rounded-[20px] ${glassCardClass}`}>
              <h3 className="font-bold mb-4 text-sm text-[rgba(255,255,255,0.7)] uppercase tracking-wider">Update Status</h3>
              <div className="flex flex-wrap gap-3">
                {['pending', 'in_progress', 'completed'].map(s => {
                  const cfg = statusConfig[s];
                  const isActive = selectedTask.status === s;
                  return (
                    <button
                      key={s}
                      onClick={() => handleStatusChange(selectedTask.id, s)}
                      className={`flex items-center gap-2 px-5 py-2.5 rounded-[12px] text-sm font-semibold border transition-all ${isActive
                        ? `${cfg.bg} ${cfg.color} shadow-[0_0_15px_rgba(255,140,0,0.1)]`
                        : 'bg-[rgba(255,255,255,0.03)] border-[rgba(255,255,255,0.08)] text-[rgba(255,255,255,0.5)] hover:bg-[rgba(255,255,255,0.08)]'
                      }`}
                    >
                      {cfg.icon} {cfg.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <style dangerouslySetInnerHTML={{__html: `
          .custom-scrollbar::-webkit-scrollbar { width: 4px; }
          .custom-scrollbar::-webkit-scrollbar-track { background: rgba(255,255,255,0.05); border-radius: 10px; }
          .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,140,0,0.5); border-radius: 10px; }
        `}} />
      </div>
    );
  }

  // Tasks List View
  return (
    <div className={`w-full h-full flex flex-col p-6 md:p-8 ${glassPanelClass} relative overflow-hidden`}>
      <div className="absolute top-0 right-0 w-[300px] h-[300px] rounded-full blur-[120px] bg-[#ff6b00] opacity-20 pointer-events-none"></div>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 relative z-10 border-b border-[rgba(255,255,255,0.05)] pb-6 shrink-0">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold mb-1">My Tasks</h1>
          <p className="text-sm text-[rgba(255,255,255,0.6)]">{filtered.length} task{filtered.length !== 1 ? 's' : ''} assigned to you</p>
        </div>
        <div className="flex gap-3">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[rgba(255,255,255,0.4)]" />
            <input
              type="text"
              placeholder="Search tasks..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="bg-[rgba(0,0,0,0.3)] border border-[rgba(255,255,255,0.1)] rounded-[12px] pl-9 pr-4 py-2.5 text-sm text-white placeholder-[rgba(255,255,255,0.4)] focus:outline-none focus:border-[#ff8c00]/50 w-52"
            />
          </div>
        </div>
      </div>

      {/* Status filter pills */}
      <div className="flex gap-2 mb-6 relative z-10 shrink-0 overflow-x-auto pb-1">
        {[{ key: 'all', label: 'All Tasks' }, { key: 'pending', label: 'Pending' }, { key: 'in_progress', label: 'In Progress' }, { key: 'completed', label: 'Completed' }].map(f => (
          <button
            key={f.key}
            onClick={() => setFilterStatus(f.key)}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold border whitespace-nowrap transition-all ${filterStatus === f.key
              ? 'bg-[#ff8c00]/20 text-[#ff8c00] border-[#ff8c00]/30'
              : 'bg-transparent text-[rgba(255,255,255,0.5)] border-[rgba(255,255,255,0.1)] hover:bg-[rgba(255,255,255,0.05)]'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Tasks list */}
      <div className="flex-1 overflow-y-auto space-y-3 pr-2 custom-scrollbar relative z-10">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-[rgba(255,255,255,0.4)]">
            <ClipboardList size={48} className="mb-4 opacity-40" />
            <p className="text-sm">No tasks found</p>
          </div>
        ) : (
          filtered.map(task => {
            const sc = statusConfig[task.status];
            const pc = priorityConfig[task.priority];
            return (
              <div
                key={task.id}
                onClick={() => setSelectedTask(task)}
                className={`p-5 flex items-center justify-between gap-4 ${glassCardClass} hover:bg-[rgba(255,140,0,0.08)] hover:border-[rgba(255,140,0,0.2)] cursor-pointer transition-all group`}
              >
                <div className="flex items-start gap-4 flex-1 min-w-0">
                  <div className={`mt-0.5 p-2 rounded-[10px] border ${sc.bg} ${sc.color} shrink-0`}>
                    {sc.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm truncate">{task.title}</p>
                    <p className="text-xs text-[rgba(255,255,255,0.5)] mt-0.5 truncate">{task.project} • Due {new Date(task.due_date).toLocaleDateString('en-US', { day: 'numeric', month: 'short' })}</p>
                    <div className="flex gap-1.5 mt-2 flex-wrap">
                      {task.tags.map(tag => (
                        <span key={tag} className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-[#ff8c00]/10 text-[#ff8c00] border border-[#ff8c00]/15">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className={`hidden md:flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold border ${pc.bg} ${pc.color}`}>
                    {pc.label}
                  </span>
                  <span className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold border ${sc.bg} ${sc.color}`}>
                    {sc.label}
                  </span>
                  <ChevronRight size={18} className="text-[rgba(255,255,255,0.3)] group-hover:text-[#ff8c00] transition-colors" />
                </div>
              </div>
            );
          })
        )}
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: rgba(255,255,255,0.05); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,140,0,0.5); border-radius: 10px; }
      `}} />
    </div>
  );
}
