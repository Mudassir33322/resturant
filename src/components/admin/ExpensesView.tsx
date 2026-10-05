import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ExpenseRecord, PaymentMethod } from '../../types';
import { Receipt, Plus, DollarSign, Calendar, X, CheckCircle2 } from 'lucide-react';

export const ExpensesView: React.FC = () => {
  const { expenses, addExpense, currentBranch } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<ExpenseRecord['category']>('Ingredients');
  const [amount, setAmount] = useState<number>(25000);
  const [paidTo, setPaidTo] = useState('Al-Kabeer Prime Meats');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('bank_transfer');

  const totalExpenses = expenses.reduce((s, e) => s + e.amountPKR, 0);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;

    addExpense({
      title,
      category,
      amountPKR: amount,
      date: new Date().toISOString().slice(0, 10),
      branchId: currentBranch,
      paymentMethod,
      paidTo,
      createdBy: 'Mustafa Kamal',
    });

    setTitle('');
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#25221e] pb-6">
        <div>
          <span className="text-xs uppercase font-bold tracking-widest text-amber-500">
            Accounts & Outflow
          </span>
          <h1 className="font-serif-luxury text-3xl font-bold text-white mt-1">
            Operating Expenses & Overhead Ledger
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-3.5 py-1.5 rounded-lg bg-[#141210] border border-neutral-800 text-xs">
            <span className="text-neutral-400">Total Outflow:</span>{' '}
            <strong className="text-amber-400 font-mono">
              PKR {totalExpenses.toLocaleString()}
            </strong>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Record Expense</span>
          </button>
        </div>
      </div>

      {/* Expenses Table */}
      <div className="bg-[#141210] border border-[#25221e] rounded-2xl overflow-hidden shadow-xl">
        <table className="w-full text-left text-xs">
          <thead className="bg-[#181512] text-neutral-400 uppercase text-[10px] font-bold tracking-wider border-b border-neutral-800">
            <tr>
              <th className="py-3 px-4">Voucher Title</th>
              <th className="py-3 px-4">Category</th>
              <th className="py-3 px-4">Amount</th>
              <th className="py-3 px-4">Date</th>
              <th className="py-3 px-4">Beneficiary / Paid To</th>
              <th className="py-3 px-4">Method</th>
              <th className="py-3 px-4">Approved By</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-900 text-neutral-300">
            {expenses.map((exp) => (
              <tr key={exp.id} className="hover:bg-[#181512]/50">
                <td className="py-3 px-4 font-bold text-white">{exp.title}</td>
                <td className="py-3 px-4">
                  <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-neutral-800 text-neutral-300 uppercase">
                    {exp.category}
                  </span>
                </td>
                <td className="py-3 px-4 font-mono font-bold text-red-400">
                  PKR {exp.amountPKR.toLocaleString()}
                </td>
                <td className="py-3 px-4 text-neutral-400">{exp.date}</td>
                <td className="py-3 px-4 font-semibold text-neutral-200">{exp.paidTo}</td>
                <td className="py-3 px-4 uppercase text-[10px] text-neutral-400">{exp.paymentMethod}</td>
                <td className="py-3 px-4 text-neutral-400">{exp.createdBy}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Record Expense Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <form
            onSubmit={handleCreate}
            className="w-full max-w-md bg-[#141210] border border-[#2c2824] rounded-2xl p-6 space-y-4 shadow-2xl text-neutral-200"
          >
            <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
              <h2 className="font-serif-luxury text-xl font-bold text-white">
                Record Operating Expense
              </h2>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-full text-neutral-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-[11px] text-neutral-400 mb-1">Description / Title</label>
                <input
                  type="text"
                  placeholder="e.g. Weekly Organic Produce Invoice"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full p-2.5 bg-[#181512] border border-neutral-800 rounded text-xs text-white outline-none focus:border-amber-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] text-neutral-400 mb-1">Expense Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full p-2.5 bg-[#181512] border border-neutral-800 rounded text-xs text-white outline-none"
                  >
                    <option value="Rent">Commercial Rent</option>
                    <option value="Electricity">Electricity & Power</option>
                    <option value="Gas">Gas Utilities</option>
                    <option value="Salaries">Staff Payroll</option>
                    <option value="Ingredients">Raw Ingredients</option>
                    <option value="Maintenance">Maintenance & Sanitization</option>
                    <option value="Marketing">Marketing & PR</option>
                    <option value="Packaging">Packaging</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] text-neutral-400 mb-1">Amount (PKR)</label>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    className="w-full p-2.5 bg-[#181512] border border-neutral-800 rounded text-xs text-white outline-none font-mono"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] text-neutral-400 mb-1">Beneficiary (Vendor/Entity)</label>
                <input
                  type="text"
                  value={paidTo}
                  onChange={(e) => setPaidTo(e.target.value)}
                  className="w-full p-2.5 bg-[#181512] border border-neutral-800 rounded text-xs text-white outline-none"
                  required
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-neutral-800">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 rounded bg-neutral-800 text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold cursor-pointer"
              >
                Save Voucher
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
