import React from 'react';
import { useApp } from '../../context/AppContext';
import { ShieldAlert, Clock, UserCheck, CheckCircle2 } from 'lucide-react';

export const AuditLogsView: React.FC = () => {
  const { auditLogs } = useApp();

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#25221e] pb-6">
        <div>
          <span className="text-xs uppercase font-bold tracking-widest text-amber-500">
            Compliance & Security
          </span>
          <h1 className="font-serif-luxury text-3xl font-bold text-white mt-1">
            System Audit Trail & Security Logs
          </h1>
        </div>

        <div className="text-xs text-neutral-400">
          Showing <strong>{auditLogs.length} Events</strong> captured
        </div>
      </div>

      <div className="bg-[#141210] border border-[#25221e] rounded-2xl overflow-hidden shadow-xl">
        <table className="w-full text-left text-xs">
          <thead className="bg-[#181512] text-neutral-400 uppercase text-[10px] font-bold tracking-wider border-b border-neutral-800">
            <tr>
              <th className="py-3 px-4">Timestamp</th>
              <th className="py-3 px-4">Operator</th>
              <th className="py-3 px-4">Role</th>
              <th className="py-3 px-4">Operation</th>
              <th className="py-3 px-4">Audit Details</th>
              <th className="py-3 px-4">Branch</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-900 text-neutral-300">
            {auditLogs.map((log) => (
              <tr key={log.id} className="hover:bg-[#181512]/50">
                <td className="py-3 px-4 font-mono text-[11px] text-neutral-400">
                  {new Date(log.timestamp).toLocaleTimeString()} · {new Date(log.timestamp).toLocaleDateString()}
                </td>
                <td className="py-3 px-4 font-bold text-white">{log.user}</td>
                <td className="py-3 px-4">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-neutral-800 text-neutral-300">
                    {log.role}
                  </span>
                </td>
                <td className="py-3 px-4 font-semibold text-amber-400">{log.action}</td>
                <td className="py-3 px-4 text-neutral-300 max-w-md">{log.details}</td>
                <td className="py-3 px-4 font-mono text-[11px] text-neutral-500">{log.branchId}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
