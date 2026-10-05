import React from 'react';
import { AdminSidebar } from './AdminSidebar';
import { useApp } from '../../context/AppContext';
import { Bell, Search, Building2, Store } from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const { currentBranch, notifications, markNotificationAsRead, setActiveView } = useApp();
  const unreadNotifs = notifications.filter((n) => !n.read);

  return (
    <div className="flex h-[calc(100vh-2.75rem)] bg-[#0d0c0a] text-neutral-200 overflow-hidden">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Admin Content Container */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Admin Top Utility Bar */}
        <header className="h-14 bg-[#141210] border-b border-[#25221e] px-6 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <span className="text-xs uppercase font-bold text-neutral-400">Context:</span>
            <span className="px-2.5 py-1 rounded bg-[#1c1916] border border-neutral-800 text-xs font-semibold text-amber-300 flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-amber-400" />
              <span>{currentBranch.replace('_', ' ').toUpperCase()}</span>
            </span>
          </div>

          <div className="flex items-center gap-4">
            {/* Notifications icon */}
            <div className="relative group">
              <button
                className="p-1.5 rounded-lg bg-[#1a1714] text-neutral-300 hover:text-white border border-neutral-800 cursor-pointer relative"
                title="Notifications"
              >
                <Bell className="w-4 h-4" />
                {unreadNotifs.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-amber-500 text-black font-bold text-[9px] flex items-center justify-center">
                    {unreadNotifs.length}
                  </span>
                )}
              </button>

              {/* Notification Popover Dropdown */}
              <div className="hidden group-hover:block absolute right-0 top-full mt-2 w-80 bg-[#161311] border border-neutral-800 rounded-xl p-3 space-y-2 shadow-2xl z-50">
                <div className="flex justify-between items-center text-xs font-bold text-white border-b border-neutral-800 pb-2">
                  <span>Recent Events ({unreadNotifs.length} Unread)</span>
                </div>
                <div className="max-h-60 overflow-y-auto space-y-2 text-xs">
                  {notifications.slice(0, 5).map((n) => (
                    <div
                      key={n.id}
                      onClick={() => markNotificationAsRead(n.id)}
                      className={`p-2 rounded-lg cursor-pointer ${
                        n.read ? 'bg-[#12100e] text-neutral-400' : 'bg-amber-950/20 border border-amber-900/30 text-amber-200'
                      }`}
                    >
                      <div className="font-bold text-[11px]">{n.title}</div>
                      <div className="text-[10px] text-neutral-400">{n.message}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Jump to Customer Website */}
            <button
              onClick={() => setActiveView('website')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1e1b18] hover:bg-neutral-800 text-xs text-neutral-300 hover:text-white border border-neutral-700 cursor-pointer"
            >
              <Store className="w-3.5 h-3.5 text-amber-400" />
              <span>Customer Website</span>
            </button>
          </div>
        </header>

        {/* Scrollable Content Body */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
};
