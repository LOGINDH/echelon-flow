import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import EmployeeProfile from './EmployeeProfile';
import EmployeeTasks from './EmployeeTasks';
import { useAuth } from '../context/AuthContext';
import { getEmployeeTasks, updateTaskStatus } from '../api/employee';
import { 
  LayoutDashboard, 
  ClipboardList, 
  User, 
  LogOut, 
  Bell, 
  ChevronDown,
  ClipboardCheck,
  Clock,
  RefreshCw,
  CheckCircle2,
  Code2,
  Bug,
  FileText,
  Search,
  Filter
} from 'lucide-react';
import Toast from '../components/Toast';

export default function EmployeeDashboard({ defaultTab = 'dashboard' }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [activeTab, setActiveTab] = useState(defaultTab);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('info');

  useEffect(() => {
    // If URL changes, update tab state
    if (location.pathname === '/employee') setActiveTab('dashboard');
    else if (location.pathname === '/employee/tasks') setActiveTab('tasks');
    else if (location.pathname === '/employee/profile') setActiveTab('profile');
  }, [location.pathname]);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const data = await getEmployeeTasks(user.id);
      // The django API will return an array directly, or an object { tasks: [] }. Assume array for now, or fallback.
      if (Array.isArray(data)) {
        setTasks(data);
      } else if (data && data.tasks) {
        setTasks(data.tasks);
      } else {
        setTasks([]);
      }
    } catch (err) {
      console.error(err);
      showToast('Failed to load tasks.', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.id) {
      fetchTasks();
    }
  }, [user]);

  const showToast = (msg, type = 'info') => {
    setToastMessage(msg);
    setToastType(type);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleStatusChange = async (taskId, newStatus) => {
    // confirmation for completed
    if (newStatus === 'completed') {
      const confirm = window.confirm('Are you sure you want to mark this task as completed?');
      if (!confirm) return;
    }

    try {
      setLoading(true);
      await updateTaskStatus(taskId, user.id, newStatus);
      showToast('Task status updated successfully', 'success');
      await fetchTasks();
    } catch (err) {
      console.error(err);
      showToast('Failed to update task status.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Stats computation
  const totalTasks = tasks.length;
  const pendingTasks = tasks.filter(t => t.status === 'pending').length;
  const inProgressTasks = tasks.filter(t => t.status === 'in_progress').length;
  const completedTasks = tasks.filter(t => t.status === 'completed').length;

  const navigateTab = (tab) => {
    setActiveTab(tab);
    if (tab === 'dashboard') navigate('/employee');
    if (tab === 'tasks') navigate('/employee/tasks');
    if (tab === 'profile') navigate('/employee/profile');
  };

  // Glassmorphism classes matching the image
  const glassPanelClass = "bg-[rgba(40,20,5,0.4)] backdrop-blur-xl border border-[rgba(255,140,0,0.1)] rounded-[24px]";
  const glassCardClass = "bg-[rgba(255,100,0,0.05)] border border-[rgba(255,140,0,0.1)] rounded-[16px]";

  const getInitials = (name) => {
    if (!name) return 'U';
    const parts = name.split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  return (
    <div className="min-h-screen w-full bg-[#120702] text-white flex overflow-hidden font-['Inter',sans-serif] relative">
      {/* Background gradients */}
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full blur-[150px] opacity-40 bg-[#d96606] pointer-events-none"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full blur-[150px] opacity-50 bg-[#ff4500] pointer-events-none"></div>

      {/* Main Container */}
      <div className="flex w-full h-screen p-4 gap-4 relative z-10">
        
        {/* Sidebar */}
        <div className={`w-[260px] h-full flex flex-col p-6 ${glassPanelClass} shrink-0 relative overflow-hidden`}>
          <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-[#ff5500]/30 to-transparent blur-xl pointer-events-none"></div>
          
          <div className="flex items-center gap-3 mb-10 z-10">
            <div className="w-8 h-8 rounded bg-[#ff8c00] flex items-center justify-center text-black font-black">
              EF
            </div>
            <div>
              <h2 className="font-bold text-[15px] leading-tight">Echelon Flow</h2>
              <p className="text-[11px] text-[rgba(255,255,255,0.5)]">Employee Workspace</p>
            </div>
          </div>

          <nav className="flex flex-col gap-2 z-10 flex-1">
            <button 
              onClick={() => navigateTab('dashboard')}
              className={`flex items-center gap-3 px-4 py-3 rounded-[12px] transition-all text-sm font-medium ${activeTab === 'dashboard' ? 'bg-gradient-to-r from-[#ff8c00]/30 to-transparent text-white border border-[#ff8c00]/30 shadow-[0_0_15px_rgba(255,140,0,0.1)]' : 'text-[rgba(255,255,255,0.6)] hover:bg-white/5'}`}
            >
              <LayoutDashboard size={18} /> Dashboard
            </button>
            <button 
              onClick={() => navigateTab('tasks')}
              className={`flex items-center gap-3 px-4 py-3 rounded-[12px] transition-all text-sm font-medium ${activeTab === 'tasks' ? 'bg-gradient-to-r from-[#ff8c00]/30 to-transparent text-white border border-[#ff8c00]/30 shadow-[0_0_15px_rgba(255,140,0,0.1)]' : 'text-[rgba(255,255,255,0.6)] hover:bg-white/5'}`}
            >
              <ClipboardList size={18} /> My Tasks
            </button>
            <button 
              onClick={() => navigateTab('profile')}
              className={`flex items-center gap-3 px-4 py-3 rounded-[12px] transition-all text-sm font-medium ${activeTab === 'profile' ? 'bg-gradient-to-r from-[#ff8c00]/30 to-transparent text-white border border-[#ff8c00]/30 shadow-[0_0_15px_rgba(255,140,0,0.1)]' : 'text-[rgba(255,255,255,0.6)] hover:bg-white/5'}`}
            >
              <User size={18} /> Profile
            </button>

            <div className="mt-auto border-t border-[rgba(255,255,255,0.1)] pt-4">
              <button 
                onClick={handleLogout}
                className="flex items-center gap-3 px-4 py-3 rounded-[12px] transition-all text-sm font-medium text-[rgba(255,255,255,0.6)] hover:bg-white/5 w-full text-left"
              >
                <LogOut size={18} /> Logout
              </button>
            </div>
          </nav>

          <div className="mt-6 flex items-center gap-3 p-3 rounded-[16px] bg-[rgba(0,0,0,0.3)] border border-[rgba(255,255,255,0.05)] z-10">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#ff8c00] to-[#e65c00] flex items-center justify-center text-white font-bold text-sm shadow-[0_4px_10px_rgba(255,140,0,0.4)]">
              {getInitials(user?.full_name || user?.name)}
            </div>
            <div className="flex-1 overflow-hidden">
              <h4 className="text-[13px] font-bold truncate">{user?.full_name || user?.name || 'Employee'}</h4>
              <p className="text-[11px] text-[rgba(255,255,255,0.5)] truncate">{user?.role}</p>
            </div>
            <ChevronDown size={14} className="text-[rgba(255,255,255,0.5)]" />
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col h-full overflow-hidden">
          
          {activeTab === 'profile' ? (
            <EmployeeProfile />
          ) : activeTab === 'tasks' ? (
            <EmployeeTasks />
          ) : (
            <>
              {/* Top Dashboard Header & Stats */}
              <div className={`p-6 md:p-8 mb-4 shrink-0 ${glassPanelClass}`}>
            <div className="flex justify-between items-start mb-6">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold mb-1 flex items-center gap-2">
                  Welcome back, {user?.full_name || user?.name} <span className="text-xl">👋</span>
                </h1>
                <p className="text-sm text-[rgba(255,255,255,0.6)]">Here's an overview of your tasks and progress.</p>
              </div>
              <div className="flex items-center gap-4">
                <button className="relative p-2 rounded-full bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] hover:bg-[rgba(255,255,255,0.1)] transition-all">
                  <Bell size={20} />
                  <span className="absolute top-0 right-0 w-4 h-4 bg-[#ff6b00] rounded-full text-[9px] flex items-center justify-center font-bold border-2 border-[#1a0f0a]">3</span>
                </button>
                <div className="flex items-center gap-3 pl-2">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#ff8c00] to-[#e65c00] flex items-center justify-center text-white font-bold text-xs shadow-[0_4px_10px_rgba(255,140,0,0.4)]">
                    {getInitials(user?.full_name || user?.name)}
                  </div>
                  <div className="hidden md:block">
                    <h4 className="text-[13px] font-bold leading-tight">{user?.full_name || user?.name}</h4>
                    <p className="text-[11px] text-[rgba(255,255,255,0.5)]">{user?.role}</p>
                  </div>
                  <ChevronDown size={14} className="text-[rgba(255,255,255,0.5)] ml-2" />
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className={`p-5 flex items-center gap-4 ${glassCardClass}`}>
                <div className="w-12 h-12 rounded-[12px] bg-[rgba(255,140,0,0.15)] text-[#ff8c00] flex items-center justify-center border border-[rgba(255,140,0,0.2)] shadow-inner">
                  <ClipboardCheck size={24} />
                </div>
                <div>
                  <p className="text-[11px] font-medium text-[rgba(255,255,255,0.6)] mb-0.5">Total Tasks</p>
                  <h3 className="text-2xl font-bold">{totalTasks}</h3>
                </div>
              </div>
              <div className={`p-5 flex items-center gap-4 ${glassCardClass}`}>
                <div className="w-12 h-12 rounded-[12px] bg-[rgba(255,140,0,0.15)] text-[#ff8c00] flex items-center justify-center border border-[rgba(255,140,0,0.2)] shadow-inner">
                  <Clock size={24} />
                </div>
                <div>
                  <p className="text-[11px] font-medium text-[rgba(255,255,255,0.6)] mb-0.5">Pending Tasks</p>
                  <h3 className="text-2xl font-bold">{pendingTasks}</h3>
                </div>
              </div>
              <div className={`p-5 flex items-center gap-4 ${glassCardClass}`}>
                <div className="w-12 h-12 rounded-[12px] bg-[rgba(255,140,0,0.15)] text-[#ff8c00] flex items-center justify-center border border-[rgba(255,140,0,0.2)] shadow-inner">
                  <RefreshCw size={24} />
                </div>
                <div>
                  <p className="text-[11px] font-medium text-[rgba(255,255,255,0.6)] mb-0.5">In Progress</p>
                  <h3 className="text-2xl font-bold">{inProgressTasks}</h3>
                </div>
              </div>
              <div className={`p-5 flex items-center gap-4 ${glassCardClass}`}>
                <div className="w-12 h-12 rounded-[12px] bg-[rgba(255,140,0,0.15)] text-[#ff8c00] flex items-center justify-center border border-[rgba(255,140,0,0.2)] shadow-inner">
                  <CheckCircle2 size={24} />
                </div>
                <div>
                  <p className="text-[11px] font-medium text-[rgba(255,255,255,0.6)] mb-0.5">Completed</p>
                  <h3 className="text-2xl font-bold">{completedTasks}</h3>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Grid (Tasks + Profile) */}
          <div className="flex-1 flex flex-col md:flex-row gap-4 min-h-0">
            
            {/* My Tasks Section */}
            <div className={`flex-1 flex flex-col p-6 md:p-8 ${glassPanelClass}`}>
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-xl font-bold">My Tasks</h2>
                  <p className="text-xs text-[rgba(255,255,255,0.6)]">Here are the tasks assigned to you.</p>
                </div>
                <div className="flex gap-2">
                  <div className="relative">
                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[rgba(255,255,255,0.4)]" />
                    <input 
                      type="text" 
                      placeholder="Search tasks..." 
                      className="bg-[rgba(0,0,0,0.3)] border border-[rgba(255,255,255,0.1)] rounded-[12px] pl-9 pr-4 py-2 text-sm text-white placeholder-[rgba(255,255,255,0.4)] focus:outline-none focus:border-[#ff8c00]/50"
                    />
                  </div>
                  <button className="p-2 bg-[rgba(0,0,0,0.3)] border border-[rgba(255,255,255,0.1)] rounded-[12px] text-[rgba(255,255,255,0.7)] hover:text-white hover:bg-[rgba(255,255,255,0.05)] transition-all">
                    <Filter size={18} />
                  </button>
                </div>
              </div>

              {/* Task List */}
              <div className="flex-1 overflow-y-auto pr-2 space-y-3 custom-scrollbar">
                {loading && tasks.length === 0 ? (
                  <div className="flex justify-center py-10">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#ff8c00]"></div>
                  </div>
                ) : tasks.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12 text-[rgba(255,255,255,0.5)]">
                    <ClipboardList size={48} className="mb-4 opacity-50" />
                    <p>No tasks assigned yet</p>
                  </div>
                ) : (
                  tasks.map((task) => (
                    <div key={task.id} className={`p-4 flex items-center justify-between gap-4 ${glassCardClass} hover:bg-[rgba(255,140,0,0.08)] transition-all`}>
                      <div className="flex items-center gap-4 flex-1">
                        <div className="w-10 h-10 rounded-[10px] bg-[rgba(255,140,0,0.15)] text-[#ff8c00] flex items-center justify-center shrink-0 border border-[rgba(255,140,0,0.2)]">
                          {task.title.toLowerCase().includes('ui') || task.title.toLowerCase().includes('design') ? <Bug size={20} /> : 
                           task.title.toLowerCase().includes('api') || task.title.toLowerCase().includes('backend') ? <Code2 size={20} /> : 
                           <FileText size={20} />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-sm text-white truncate">{task.title}</h4>
                          <p className="text-[11px] text-[rgba(255,255,255,0.5)] truncate">Project: {task.project_name || 'Echelon Website'}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-8 text-[11px] text-[rgba(255,255,255,0.6)] shrink-0 hidden lg:flex">
                        <div>
                          <p className="mb-0.5 opacity-70">Start</p>
                          <p className="font-medium text-white">{task.start_date || 'N/A'}</p>
                        </div>
                        <div>
                          <p className="mb-0.5 opacity-70">Due</p>
                          <p className="font-medium text-white">{task.end_date || 'N/A'}</p>
                        </div>
                      </div>

                      <div className="shrink-0 relative">
                        <select 
                          value={task.status}
                          onChange={(e) => handleStatusChange(task.id, e.target.value)}
                          disabled={loading}
                          className={`appearance-none outline-none cursor-pointer pl-3 pr-8 py-1.5 rounded-full text-[11px] font-bold border transition-all ${
                            task.status === 'pending' ? 'bg-[#ff8c00]/10 text-[#ff8c00] border-[#ff8c00]/30 hover:bg-[#ff8c00]/20' :
                            task.status === 'in_progress' ? 'bg-[#3b82f6]/10 text-[#3b82f6] border-[#3b82f6]/30 hover:bg-[#3b82f6]/20' :
                            'bg-[#10b981]/10 text-[#10b981] border-[#10b981]/30 hover:bg-[#10b981]/20'
                          }`}
                        >
                          <option value="pending" className="bg-slate-900 text-white">Pending</option>
                          <option value="in_progress" className="bg-slate-900 text-white">In Progress</option>
                          <option value="completed" className="bg-slate-900 text-white">Completed</option>
                        </select>
                        <ChevronDown size={12} className={`absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none ${
                          task.status === 'pending' ? 'text-[#ff8c00]' :
                          task.status === 'in_progress' ? 'text-[#3b82f6]' :
                          'text-[#10b981]'
                        }`} />
                      </div>
                    </div>
                  ))
                )}
              </div>
              <div className="pt-4 text-center text-[11px] text-[rgba(255,255,255,0.4)]">
                Showing {tasks.length} of {totalTasks} tasks
              </div>
            </div>

            {/* Profile Section */}
            <div 
              onClick={() => navigateTab('profile')}
              className={`w-full md:w-[280px] lg:w-[320px] p-6 md:p-8 flex flex-col shrink-0 ${glassPanelClass} relative overflow-hidden cursor-pointer hover:border-[#ff8c00]/40 transition-all group`}
            >
               {/* Bright orange blur inside profile card */}
               <div className="absolute top-1/4 right-[-20%] w-[150px] h-[150px] rounded-full blur-[80px] bg-[#ff6b00] opacity-40 pointer-events-none"></div>

               <h2 className="text-xl font-bold mb-1 relative z-10">Profile</h2>
               <p className="text-xs text-[rgba(255,255,255,0.6)] mb-8 relative z-10">Your account information</p>

               <div className="flex flex-col items-center mb-10 relative z-10">
                 <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#ff8c00] to-[#cc4400] flex items-center justify-center text-white font-bold text-3xl shadow-[0_10px_30px_rgba(255,107,0,0.4)] mb-4 border-2 border-[rgba(255,255,255,0.1)]">
                   {getInitials(user?.full_name || user?.name)}
                 </div>
               </div>

               <div className="space-y-4 relative z-10 flex-1">
                 <div className="flex items-center gap-4 pb-4 border-b border-[rgba(255,255,255,0.05)]">
                   <div className="text-[rgba(255,255,255,0.4)] flex items-center justify-center w-8 h-8 rounded-full bg-[rgba(255,255,255,0.05)]">
                     <User size={16} />
                   </div>
                   <div>
                     <p className="text-[11px] text-[rgba(255,255,255,0.5)] mb-0.5">Full Name</p>
                     <p className="text-[13px] font-semibold">{user?.full_name || user?.name}</p>
                   </div>
                 </div>
                 
                 <div className="flex items-center gap-4 pb-4 border-b border-[rgba(255,255,255,0.05)]">
                   <div className="text-[rgba(255,255,255,0.4)] flex items-center justify-center w-8 h-8 rounded-full bg-[rgba(255,255,255,0.05)]">
                     <FileText size={16} />
                   </div>
                   <div>
                     <p className="text-[11px] text-[rgba(255,255,255,0.5)] mb-0.5">Username</p>
                     <p className="text-[13px] font-semibold">{user?.username}</p>
                   </div>
                 </div>

                 <div className="flex items-center gap-4 pb-4 border-b border-[rgba(255,255,255,0.05)]">
                   <div className="text-[rgba(255,255,255,0.4)] flex items-center justify-center w-8 h-8 rounded-full bg-[rgba(255,255,255,0.05)]">
                     <User size={16} />
                   </div>
                   <div>
                     <p className="text-[11px] text-[rgba(255,255,255,0.5)] mb-0.5">Role</p>
                     <p className="text-[13px] font-semibold">{user?.role}</p>
                   </div>
                 </div>
               </div>
            </div>

          </div>
            </>
          )}
        </div>
      </div>

      {/* Custom Scrollbar Styles for Task List */}
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 140, 0, 0.5);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 140, 0, 0.8);
        }
      `}} />

      {/* Toast Overlay */}
      {toastMessage && (
        <div className="absolute bottom-6 right-6 z-50">
          <Toast message={toastMessage} type={toastType} onClose={() => setToastMessage('')} />
        </div>
      )}
    </div>
  );
}
