import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { StaffMember, UserRole } from '../../types';
import { UserCheck, Plus, Search, Shield, Clock, CheckCircle2 } from 'lucide-react';

export const StaffView: React.FC = () => {
  const { staff, currentRole, setCurrentRole } = useApp();
  const [search, setSearch] = useState('');

  const filteredStaff = staff.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.role.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#25221e] pb-6">
        <div>
          <span className="text-xs uppercase font-bold tracking-widest text-amber-500">
            Human Resources & RBAC
          </span>
          <h1 className="font-serif-luxury text-3xl font-bold text-white mt-1">
            Staff & Role-Scoped Permissions
          </h1>
        </div>

        <div className="text-xs text-neutral-400">
          <strong>{staff.length} Active Personnel</strong> across brigade
        </div>
      </div>

      {/* Role explanation bar */}
      <div className="p-4 rounded-xl bg-[#141210] border border-neutral-800 text-xs text-neutral-300 leading-relaxed">
        <strong className="text-amber-400">Role-Scoped Access Control (RBAC):</strong> Each staff member only sees tools pertinent to their operational responsibilities: Cashiers access POS, Kitchen Chefs see KDS, Riders see deliveries, and Managers see operational analytics.
      </div>

      {/* Staff Table */}
      <div className="bg-[#141210] border border-[#25221e] rounded-2xl overflow-hidden shadow-xl">
        <table className="w-full text-left text-xs">
          <thead className="bg-[#181512] text-neutral-400 uppercase text-[10px] font-bold tracking-wider border-b border-neutral-800">
            <tr>
              <th className="py-3 px-4">Staff Member</th>
              <th className="py-3 px-4">Assigned Role</th>
              <th className="py-3 px-4">Shift Timings</th>
              <th className="py-3 px-4">Contact</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 text-right">Impersonate</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-900 text-neutral-300">
            {filteredStaff.map((member) => (
              <tr key={member.id} className="hover:bg-[#181512]/50">
                <td className="py-3 px-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="w-9 h-9 rounded-full object-cover bg-neutral-900"
                    />
                    <div>
                      <div className="font-bold text-white text-xs">{member.name}</div>
                      <div className="text-[10px] text-neutral-500">{member.email}</div>
                    </div>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    {member.role.replace(/_/g, ' ')}
                  </span>
                </td>
                <td className="py-3 px-4 text-neutral-400 flex items-center gap-1 mt-2.5">
                  <Clock className="w-3.5 h-3.5 text-neutral-500" />
                  <span>{member.shift}</span>
                </td>
                <td className="py-3 px-4 font-mono text-[11px] text-neutral-400">{member.phone}</td>
                <td className="py-3 px-4">
                  <span className="text-[10px] font-bold uppercase text-emerald-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    On Duty
                  </span>
                </td>
                <td className="py-3 px-4 text-right">
                  <button
                    onClick={() => setCurrentRole(member.role)}
                    className="px-2.5 py-1 rounded bg-[#1e1b18] hover:bg-neutral-800 text-xs font-semibold text-neutral-300 hover:text-white cursor-pointer"
                  >
                    Switch to Role
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
