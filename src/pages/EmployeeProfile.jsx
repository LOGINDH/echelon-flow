import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  User, 
  Shield, 
  Bell, 
  Settings, 
  Save, 
  Smartphone, 
  Laptop,
  CheckCircle2,
  Lock,
  Globe,
  Moon,
  Sun
} from 'lucide-react';
import Toast from '../components/Toast';

export default function EmployeeProfile() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('account');
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('info');

  const showToast = (msg, type = 'success') => {
    setToastMessage(msg);
    setToastType(type);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleSave = (e) => {
    e.preventDefault();
    showToast('Settings saved successfully (Mock)');
  };

  const getInitials = (name) => {
    if (!name) return 'U';
    const parts = name.split(' ');
    if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
    return name.slice(0, 2).toUpperCase();
  };

  const glassPanelClass = "bg-[rgba(40,20,5,0.4)] backdrop-blur-xl border border-[rgba(255,140,0,0.1)] rounded-[24px]";
  const inputClass = "w-full bg-[rgba(0,0,0,0.3)] border border-[rgba(255,255,255,0.1)] rounded-[12px] px-4 py-3 text-sm text-white focus:outline-none focus:border-[#ff8c00]/50 transition-all";

  return (
    <div className={`w-full h-full p-6 md:p-8 flex flex-col ${glassPanelClass} relative overflow-hidden`}>
      <div className="absolute top-0 right-0 w-[300px] h-[300px] rounded-full blur-[120px] bg-[#ff6b00] opacity-20 pointer-events-none"></div>

      <div className="flex justify-between items-end mb-8 relative z-10 border-b border-[rgba(255,255,255,0.05)] pb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold mb-2">Profile & Settings</h1>
          <p className="text-sm text-[rgba(255,255,255,0.6)]">Manage your account details and preferences.</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8 relative z-10 flex-1 overflow-hidden">
        
        {/* Settings Navigation */}
        <div className="w-full md:w-64 shrink-0 flex md:flex-col gap-2 overflow-x-auto pb-4 md:pb-0 hide-scrollbar">
          <button 
            onClick={() => setActiveTab('account')}
            className={`flex items-center gap-3 px-4 py-3 rounded-[12px] transition-all text-sm font-medium whitespace-nowrap ${activeTab === 'account' ? 'bg-[#ff8c00]/20 text-white border border-[#ff8c00]/30' : 'text-[rgba(255,255,255,0.6)] hover:bg-white/5 border border-transparent'}`}
          >
            <User size={18} /> Account Details
          </button>
          <button 
            onClick={() => setActiveTab('notifications')}
            className={`flex items-center gap-3 px-4 py-3 rounded-[12px] transition-all text-sm font-medium whitespace-nowrap ${activeTab === 'notifications' ? 'bg-[#ff8c00]/20 text-white border border-[#ff8c00]/30' : 'text-[rgba(255,255,255,0.6)] hover:bg-white/5 border border-transparent'}`}
          >
            <Bell size={18} /> Notifications
          </button>
          <button 
            onClick={() => setActiveTab('preferences')}
            className={`flex items-center gap-3 px-4 py-3 rounded-[12px] transition-all text-sm font-medium whitespace-nowrap ${activeTab === 'preferences' ? 'bg-[#ff8c00]/20 text-white border border-[#ff8c00]/30' : 'text-[rgba(255,255,255,0.6)] hover:bg-white/5 border border-transparent'}`}
          >
            <Settings size={18} /> Preferences
          </button>
        </div>

        {/* Settings Content Area */}
        <div className="flex-1 overflow-y-auto pr-4 custom-scrollbar">
          
          {/* ACCOUNT TAB */}
          {activeTab === 'account' && (
            <div className="animate-fade-in space-y-8">
              <div className="flex items-center gap-6">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#ff8c00] to-[#cc4400] flex items-center justify-center text-white font-bold text-3xl shadow-[0_10px_30px_rgba(255,107,0,0.4)] border-2 border-[rgba(255,255,255,0.1)]">
                  {getInitials(user?.full_name || user?.name)}
                </div>
                <div>
                  <h3 className="text-xl font-bold">{user?.full_name || user?.name}</h3>
                  <p className="text-[rgba(255,255,255,0.5)] text-sm mb-3 capitalize">{user?.role} Workspace</p>
                  <button className="px-4 py-1.5 rounded-full text-xs font-semibold bg-[rgba(255,255,255,0.1)] hover:bg-[rgba(255,255,255,0.2)] transition-all">
                    Change Avatar
                  </button>
                </div>
              </div>

              <form onSubmit={handleSave} className="space-y-6 max-w-2xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-medium text-[rgba(255,255,255,0.6)] mb-2">Full Name</label>
                    <input type="text" defaultValue={user?.full_name || user?.name} className={inputClass} />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[rgba(255,255,255,0.6)] mb-2">Username</label>
                    <input type="text" defaultValue={user?.username} disabled className={`${inputClass} opacity-50 cursor-not-allowed`} />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[rgba(255,255,255,0.6)] mb-2">Email Address</label>
                    <input type="email" defaultValue={`${user?.username}@echelonflow.com`} className={inputClass} />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[rgba(255,255,255,0.6)] mb-2">Phone Number</label>
                    <input type="tel" placeholder="+1 (555) 000-0000" className={inputClass} />
                  </div>
                </div>
                
                <div className="pt-4 border-t border-[rgba(255,255,255,0.05)]">
                  <button type="submit" className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-[#ff8c00] to-[#e65c00] rounded-[12px] text-white font-bold hover:shadow-[0_0_20px_rgba(255,140,0,0.4)] transition-all">
                    <Save size={18} /> Save Changes
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* NOTIFICATIONS TAB */}
          {activeTab === 'notifications' && (
            <div className="animate-fade-in space-y-6 max-w-2xl">
              <h3 className="text-lg font-bold mb-4">Notification Preferences</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-[16px] bg-[rgba(0,0,0,0.3)] border border-[rgba(255,255,255,0.05)]">
                  <div>
                    <p className="font-semibold text-sm">Email Notifications</p>
                    <p className="text-xs text-[rgba(255,255,255,0.5)] mt-1">Receive daily digests and critical alerts via email.</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-[rgba(255,255,255,0.1)] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#ff8c00]"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 rounded-[16px] bg-[rgba(0,0,0,0.3)] border border-[rgba(255,255,255,0.05)]">
                  <div>
                    <p className="font-semibold text-sm">Push Notifications</p>
                    <p className="text-xs text-[rgba(255,255,255,0.5)] mt-1">Get instant alerts in your browser when assigned a task.</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-[rgba(255,255,255,0.1)] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#ff8c00]"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 rounded-[16px] bg-[rgba(0,0,0,0.3)] border border-[rgba(255,255,255,0.05)]">
                  <div>
                    <p className="font-semibold text-sm">Task Updates</p>
                    <p className="text-xs text-[rgba(255,255,255,0.5)] mt-1">Notify me when my task status changes or gets reviewed.</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-[rgba(255,255,255,0.1)] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#ff8c00]"></div>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* PREFERENCES TAB */}
          {activeTab === 'preferences' && (
            <div className="animate-fade-in space-y-8 max-w-2xl">
              <div>
                <h3 className="text-lg font-bold mb-4">Appearance</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-[16px] border-2 border-[#ff8c00] bg-[rgba(255,140,0,0.05)] cursor-pointer flex items-center gap-4">
                    <Moon size={24} className="text-[#ff8c00]" />
                    <div>
                      <p className="font-semibold text-sm">Dark Theme</p>
                      <p className="text-xs text-[rgba(255,255,255,0.5)]">Currently active</p>
                    </div>
                  </div>
                  <div className="p-4 rounded-[16px] border-2 border-transparent bg-[rgba(0,0,0,0.3)] cursor-pointer flex items-center gap-4 opacity-50">
                    <Sun size={24} />
                    <div>
                      <p className="font-semibold text-sm">Light Theme</p>
                      <p className="text-xs text-[rgba(255,255,255,0.5)]">Not supported yet</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-8 border-t border-[rgba(255,255,255,0.05)]">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2"><Globe size={20} /> Language & Region</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-medium text-[rgba(255,255,255,0.6)] mb-2">Display Language</label>
                    <select className={inputClass}>
                      <option value="en" className="bg-slate-900 text-white">English (US)</option>
                      <option value="es" className="bg-slate-900 text-white">Español</option>
                      <option value="fr" className="bg-slate-900 text-white">Français</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[rgba(255,255,255,0.6)] mb-2">Time Zone</label>
                    <select className={inputClass}>
                      <option value="est" className="bg-slate-900 text-white">Eastern Time (ET)</option>
                      <option value="pst" className="bg-slate-900 text-white">Pacific Time (PT)</option>
                      <option value="utc" className="bg-slate-900 text-white">Coordinated Universal Time (UTC)</option>
                    </select>
                  </div>
                </div>
                <div className="mt-6">
                  <button onClick={handleSave} className="flex items-center gap-2 px-6 py-2.5 bg-[rgba(255,255,255,0.1)] hover:bg-[rgba(255,255,255,0.2)] rounded-[12px] text-white font-bold transition-all text-sm">
                    <Save size={18} /> Save Preferences
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .animate-fade-in { animation: fadeIn 0.3s ease-out forwards; }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(5px); }
          to { opacity: 1; transform: translateY(0); }
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
