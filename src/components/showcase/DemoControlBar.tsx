import React, { useState } from 'react';
import { useApp, AppView } from '../../context/AppContext';
import { UserRole, BranchId } from '../../types';
import {
  Sparkles,
  Store,
  MonitorCheck,
  Flame,
  LayoutGrid,
  Bike,
  Boxes,
  Users,
  BarChart3,
  Building2,
  UserCheck,
  ChevronDown,
  RotateCcw,
  QrCode,
  FileSpreadsheet,
} from 'lucide-react';

export const DemoControlBar: React.FC = () => {
  const {
    activeView,
    setActiveView,
    currentBranch,
    setCurrentBranch,
    currentRole,
    setCurrentRole,
    resetAllDemoData,
    setQrTableNumber,
  } = useApp();

  const [collapsed, setCollapsed] = useState(false);

  const demoFlows: { id: AppView; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'website', label: '1. Customer Web', icon: <Store className="w-3.5 h-3.5" /> },
    { id: 'qr_dining', label: '2. Table QR Menu', icon: <QrCode className="w-3.5 h-3.5 text-amber-400" /> },
    { id: 'pos', label: '3. POS Terminal', icon: <MonitorCheck className="w-3.5 h-3.5 text-emerald-400" /> },
    { id: 'kitchen', label: '4. Kitchen KDS', icon: <Flame className="w-3.5 h-3.5 text-orange-400" /> },
    { id: 'tables', label: '5. Floor Tables', icon: <LayoutGrid className="w-3.5 h-3.5 text-cyan-400" /> },
    { id: 'delivery', label: '6. Delivery & Rider', icon: <Bike className="w-3.5 h-3.5 text-amber-300" /> },
    { id: 'inventory', label: '7. Inventory & Recipes', icon: <Boxes className="w-3.5 h-3.5 text-purple-400" /> },
    { id: 'crm', label: '8. CRM & Loyalty', icon: <Users className="w-3.5 h-3.5 text-pink-400" /> },
    { id: 'admin_dashboard', label: '9. Admin Command', icon: <BarChart3 className="w-3.5 h-3.5 text-yellow-300" /> },
    { id: 'multi_branch', label: '10. Multi-Branch', icon: <Building2 className="w-3.5 h-3.5 text-blue-400" /> },
  ];

  const roles: { role: UserRole; label: string }[] = [
    { role: 'super_admin', label: 'Super Admin' },
    { role: 'manager', label: 'Manager' },
    { role: 'cashier', label: 'Cashier' },
    { role: 'kitchen_staff', label: 'Kitchen Chef' },
    { role: 'waiter', label: 'Waiter' },
    { role: 'delivery_rider', label: 'Rider' },
    { role: 'inventory_manager', label: 'Inventory' },
    { role: 'accountant', label: 'Accountant' },
  ];

  const branches: { id: BranchId; label: string; city: string }[] = [
    { id: 'karachi_clifton', label: 'SAVORÉ Karachi', city: 'Clifton' },
    { id: 'lahore_gulberg', label: 'SAVORÉ Lahore', city: 'Gulberg' },
    { id: 'islamabad_f7', label: 'SAVORÉ Islamabad', city: 'F-7' },
  ];

  if (collapsed) {
    return (
      <div className="fixed top-3 right-4 z-50">
        <button
          onClick={() => setCollapsed(false)}
          className="flex items-center gap-2 px-3 py-1.5 bg-[#181512]/95 backdrop-blur-md border border-amber-500/40 text-amber-300 text-xs font-medium rounded-full shadow-2xl hover:bg-amber-950/40 transition-all cursor-pointer"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
          <span>Showcase Bar</span>
          <ChevronDown className="w-3 h-3" />
        </button>
      </div>
    );
  }

  return (
    <aside aria-label="SAVORÉ Ecosystem Demo Bar" className="sticky top-0 z-50 w-full bg-[#12100e]/95 backdrop-blur-md border-b border-amber-900/30 text-xs text-[#d6d0c7] shadow-xl">
      <div className="max-w-[1720px] mx-auto px-3 py-1.5 flex flex-wrap items-center justify-between gap-2">
        {/* Brand & Client Demo label */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/30 text-amber-400 font-semibold tracking-wider uppercase text-[10px]">
            <Sparkles className="w-3 h-3 text-amber-400" />
            <span>PORTFOLIO SHOWCASE</span>
          </div>
          <span className="hidden sm:inline text-neutral-400 text-[11px]">
            Complete Connected Restaurant Ecosystem
          </span>
        </div>

        {/* Demo Fast Navigation Flow */}
        <div className="flex items-center gap-1 overflow-x-auto py-0.5 max-w-full scrollbar-none">
          {demoFlows.map((flow) => {
            const isActive = activeView === flow.id;
            return (
              <button
                key={flow.id}
                onClick={() => {
                  if (flow.id === 'qr_dining') {
                    setQrTableNumber('T-04');
                  }
                  setActiveView(flow.id);
                }}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-[11px] font-medium transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-amber-600 text-white shadow-sm ring-1 ring-amber-400/50'
                    : 'bg-[#1e1b18] hover:bg-[#282420] text-neutral-300 hover:text-white border border-neutral-800'
                }`}
              >
                {flow.icon}
                <span>{flow.label}</span>
              </button>
            );
          })}
        </div>

        {/* Selectors: Branch & Role & Reset */}
        <div className="flex items-center gap-2 ml-auto">
          {/* Branch Switcher */}
          <div className="flex items-center gap-1 bg-[#1a1714] border border-neutral-800 rounded px-2 py-0.5">
            <Building2 className="w-3 h-3 text-amber-400" />
            <select
              value={currentBranch}
              onChange={(e) => setCurrentBranch(e.target.value as BranchId)}
              className="bg-transparent text-amber-200 text-[11px] outline-none cursor-pointer"
            >
              {branches.map((b) => (
                <option key={b.id} value={b.id} className="bg-[#1a1714] text-neutral-200">
                  {b.label} ({b.city})
                </option>
              ))}
            </select>
          </div>

          {/* Role Switcher */}
          <div className="flex items-center gap-1 bg-[#1a1714] border border-neutral-800 rounded px-2 py-0.5">
            <UserCheck className="w-3 h-3 text-emerald-400" />
            <select
              value={currentRole}
              onChange={(e) => setCurrentRole(e.target.value as UserRole)}
              className="bg-transparent text-emerald-300 text-[11px] outline-none cursor-pointer"
            >
              {roles.map((r) => (
                <option key={r.role} value={r.role} className="bg-[#1a1714] text-neutral-200">
                  Role: {r.label}
                </option>
              ))}
            </select>
          </div>

          {/* Reset Demo Data */}
          <button
            onClick={() => {
              if (window.confirm('Reset all demo orders, tables, and stock back to original state?')) {
                resetAllDemoData();
              }
            }}
            title="Reset All Fictional Demo Data"
            className="p-1 rounded bg-[#1f1c19] hover:bg-neutral-800 text-neutral-400 hover:text-amber-300 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          {/* Minimize */}
          <button
            onClick={() => setCollapsed(true)}
            className="text-[10px] text-neutral-500 hover:text-neutral-300 px-1 py-0.5 hover:underline cursor-pointer"
          >
            Hide
          </button>
        </div>
      </div>
    </aside>
  );
};
