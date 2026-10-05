import React from 'react';
import { useApp, AppView } from '../../context/AppContext';
import {
  LayoutDashboard,
  ShoppingBag,
  MonitorCheck,
  Flame,
  LayoutGrid,
  CalendarDays,
  Bike,
  UtensilsCrossed,
  Boxes,
  Users,
  Tag,
  UserCheck,
  Receipt,
  BarChart3,
  Building2,
  FileEdit,
  ShieldAlert,
  Settings,
  ChevronRight,
  LogOut,
  Sparkles,
} from 'lucide-react';

export const AdminSidebar: React.FC = () => {
  const { activeView, setActiveView, currentRole, currentBranch } = useApp();

  const menuSections = [
    {
      title: 'OVERVIEW',
      items: [
        { id: 'admin_dashboard' as AppView, label: 'Command Center', icon: <LayoutDashboard className="w-4 h-4" /> },
      ],
    },
    {
      title: 'OPERATIONS',
      items: [
        { id: 'pos' as AppView, label: 'POS Terminal', icon: <MonitorCheck className="w-4 h-4 text-emerald-400" /> },
        { id: 'kitchen' as AppView, label: 'Kitchen KDS', icon: <Flame className="w-4 h-4 text-orange-400" /> },
        { id: 'tables' as AppView, label: 'Floor & Tables', icon: <LayoutGrid className="w-4 h-4 text-cyan-400" /> },
        { id: 'delivery' as AppView, label: 'Delivery & Fleet', icon: <Bike className="w-4 h-4 text-amber-400" /> },
        { id: 'reservation' as AppView, label: 'Reservations', icon: <CalendarDays className="w-4 h-4 text-purple-400" /> },
      ],
    },
    {
      title: 'CATALOG & COSTING',
      items: [
        { id: 'menu_cms' as AppView, label: 'Menu & Dishes', icon: <UtensilsCrossed className="w-4 h-4" /> },
        { id: 'inventory' as AppView, label: 'Inventory & Recipes', icon: <Boxes className="w-4 h-4 text-purple-300" /> },
      ],
    },
    {
      title: 'CUSTOMERS & CRM',
      items: [
        { id: 'crm' as AppView, label: 'Customer CRM', icon: <Users className="w-4 h-4 text-pink-400" /> },
        { id: 'customer_account' as AppView, label: 'SAVORÉ Rewards', icon: <Tag className="w-4 h-4 text-yellow-400" /> },
      ],
    },
    {
      title: 'ENTERPRISE & FINANCE',
      items: [
        { id: 'staff' as AppView, label: 'Staff & Roles', icon: <UserCheck className="w-4 h-4" /> },
        { id: 'expenses' as AppView, label: 'Expenses & Ledger', icon: <Receipt className="w-4 h-4" /> },
        { id: 'reports' as AppView, label: 'Sales Reports & P&L', icon: <BarChart3 className="w-4 h-4 text-emerald-300" /> },
        { id: 'multi_branch' as AppView, label: 'Multi-Branch HQ', icon: <Building2 className="w-4 h-4 text-blue-400" /> },
      ],
    },
    {
      title: 'SYSTEM & CMS',
      items: [
        { id: 'restaurant_cms' as AppView, label: 'Website CMS', icon: <FileEdit className="w-4 h-4" /> },
        { id: 'audit_logs' as AppView, label: 'Audit Logs', icon: <ShieldAlert className="w-4 h-4" /> },
        { id: 'settings' as AppView, label: 'Settings', icon: <Settings className="w-4 h-4" /> },
      ],
    },
  ];

  return (
    <aside className="w-64 bg-[#110f0d] border-r border-[#24201c] flex flex-col shrink-0 overflow-y-auto">
      {/* Brand Header */}
      <div className="p-5 border-b border-[#24201c] flex items-center justify-between">
        <div>
          <div className="flex items-center gap-1.5">
            <span className="font-brand font-bold text-lg tracking-wider text-white">
              SAVORÉ
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mb-0.5" />
          </div>
          <p className="text-[9px] uppercase tracking-widest text-neutral-400">
            Enterprise Portal
          </p>
        </div>
        <span className="text-[10px] font-mono uppercase bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded">
          HQ
        </span>
      </div>

      {/* Navigation Groups */}
      <div className="flex-1 p-3 space-y-6">
        {menuSections.map((group) => (
          <div key={group.title} className="space-y-1">
            <h4 className="px-3 text-[10px] font-bold uppercase tracking-wider text-neutral-400">
              {group.title}
            </h4>
            <div className="space-y-0.5">
              {group.items.map((item) => {
                const isActive = activeView === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveView(item.id)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                      isActive
                        ? 'bg-amber-600 text-white font-semibold shadow-md'
                        : 'text-neutral-400 hover:text-white hover:bg-[#1a1714]'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      {item.icon}
                      <span>{item.label}</span>
                    </div>
                    {isActive && <ChevronRight className="w-3.5 h-3.5" />}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Footer Role Banner */}
      <div className="p-3 border-t border-[#24201c] bg-[#0d0c0a] text-xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-amber-600 flex items-center justify-center font-bold text-xs text-white">
              MK
            </div>
            <div>
              <div className="font-bold text-white text-[11px]">Mustafa Kamal</div>
              <div className="text-[10px] text-amber-400 uppercase font-mono">{currentRole.replace('_', ' ')}</div>
            </div>
          </div>
          <button
            onClick={() => setActiveView('website')}
            className="p-1.5 rounded hover:bg-neutral-800 text-neutral-400 hover:text-white cursor-pointer"
            title="Return to Customer Website"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
};
