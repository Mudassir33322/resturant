import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  BarChart3,
  Download,
  Calendar,
  DollarSign,
  TrendingUp,
  Percent,
  Clock,
  Flame,
  CheckCircle2,
  FileSpreadsheet,
} from 'lucide-react';

export const ReportsAndAnalyticsView: React.FC = () => {
  const { orders, ingredients, staff, expenses } = useApp();
  const [reportType, setReportType] = useState<'sales' | 'products' | 'kitchen' | 'pnl'>('sales');

  const totalSales = orders.reduce((s, o) => s + o.total, 0);
  const totalTax = orders.reduce((s, o) => s + o.tax, 0);
  const totalDiscounts = orders.reduce((s, o) => s + o.discount, 0);
  const totalExpenses = expenses.reduce((s, e) => s + e.amountPKR, 0);
  const netProfit = totalSales - totalExpenses;

  const exportCSV = () => {
    const headers = ['Order Number', 'Date', 'Customer', 'Channel', 'Subtotal', 'Tax', 'Discount', 'Total', 'Payment'];
    const rows = orders.map((o) => [
      o.orderNumber,
      new Date(o.createdAt).toLocaleDateString(),
      `"${o.customerName}"`,
      o.orderType,
      o.subtotal,
      o.tax,
      o.discount,
      o.total,
      o.paymentMethod,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `SAVORE_Sales_Report_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#25221e] pb-6">
        <div>
          <span className="text-xs uppercase font-bold tracking-widest text-amber-500">
            Financial & Performance Intelligence
          </span>
          <h1 className="font-serif-luxury text-3xl font-bold text-white mt-1">
            Enterprise Reports & Analytics
          </h1>
        </div>

        <button
          onClick={exportCSV}
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer shadow-md"
        >
          <FileSpreadsheet className="w-4 h-4" />
          <span>Export Excel / CSV</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-neutral-800 gap-6 text-xs uppercase tracking-wider font-semibold">
        {[
          { id: 'sales' as const, label: 'Sales & Revenue Ledger' },
          { id: 'products' as const, label: 'Product Profitability' },
          { id: 'kitchen' as const, label: 'Kitchen & Prep Metrics' },
          { id: 'pnl' as const, label: 'Operating P&L Summary' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setReportType(tab.id)}
            className={`pb-3 transition-colors cursor-pointer ${
              reportType === tab.id
                ? 'text-amber-400 border-b-2 border-amber-500 font-bold'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 1. SALES REPORT */}
      {reportType === 'sales' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-[#141210] border border-neutral-800">
              <span className="text-[10px] uppercase text-neutral-400">Gross Sales</span>
              <div className="text-xl font-bold font-serif-luxury text-white mt-1">
                PKR {totalSales.toLocaleString()}
              </div>
            </div>
            <div className="p-4 rounded-xl bg-[#141210] border border-neutral-800">
              <span className="text-[10px] uppercase text-neutral-400">Total Tax Captured (GST)</span>
              <div className="text-xl font-bold font-serif-luxury text-blue-400 mt-1">
                PKR {totalTax.toLocaleString()}
              </div>
            </div>
            <div className="p-4 rounded-xl bg-[#141210] border border-neutral-800">
              <span className="text-[10px] uppercase text-neutral-400">Discounts Conceded</span>
              <div className="text-xl font-bold font-serif-luxury text-amber-400 mt-1">
                PKR {totalDiscounts.toLocaleString()}
              </div>
            </div>
            <div className="p-4 rounded-xl bg-[#141210] border border-neutral-800">
              <span className="text-[10px] uppercase text-neutral-400">Transactions Recorded</span>
              <div className="text-xl font-bold font-serif-luxury text-emerald-400 mt-1">
                {orders.length} Orders
              </div>
            </div>
          </div>

          <div className="bg-[#141210] border border-[#25221e] rounded-2xl overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#181512] text-neutral-400 uppercase text-[10px] font-bold tracking-wider border-b border-neutral-800">
                <tr>
                  <th className="py-3 px-4">Order #</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Customer</th>
                  <th className="py-3 px-4">Channel</th>
                  <th className="py-3 px-4">Subtotal</th>
                  <th className="py-3 px-4">Discount</th>
                  <th className="py-3 px-4">GST (16%)</th>
                  <th className="py-3 px-4">Net Total</th>
                  <th className="py-3 px-4">Payment</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-900 text-neutral-300">
                {orders.map((o) => (
                  <tr key={o.id} className="hover:bg-[#181512]/50">
                    <td className="py-3 px-4 font-mono font-bold text-white">#{o.orderNumber}</td>
                    <td className="py-3 px-4 text-neutral-400">{new Date(o.createdAt).toLocaleDateString()}</td>
                    <td className="py-3 px-4 font-semibold text-white">{o.customerName}</td>
                    <td className="py-3 px-4 uppercase text-[10px]">{o.orderType}</td>
                    <td className="py-3 px-4 font-mono">PKR {o.subtotal.toLocaleString()}</td>
                    <td className="py-3 px-4 font-mono text-amber-400">- PKR {o.discount.toLocaleString()}</td>
                    <td className="py-3 px-4 font-mono">PKR {o.tax.toLocaleString()}</td>
                    <td className="py-3 px-4 font-mono font-bold text-emerald-400">PKR {o.total.toLocaleString()}</td>
                    <td className="py-3 px-4 uppercase font-semibold text-[10px] text-neutral-400">{o.paymentMethod}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 2. PRODUCT PROFITABILITY */}
      {reportType === 'products' && (
        <div className="space-y-4">
          <div className="bg-[#141210] border border-[#25221e] rounded-2xl overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#181512] text-neutral-400 uppercase text-[10px] font-bold tracking-wider border-b border-neutral-800">
                <tr>
                  <th className="py-3 px-4">Culinary Dish</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Menu Price</th>
                  <th className="py-3 px-4">Cost of Goods</th>
                  <th className="py-3 px-4">Unit Gross Margin</th>
                  <th className="py-3 px-4">Margin %</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-900 text-neutral-300">
                {[
                  { name: 'SAVORÉ Signature Truffle Beef Burger', cat: 'Burgers', price: 1250, cost: 420 },
                  { name: 'Nashville Hot Crispy Chicken Burger', cat: 'Burgers', price: 950, cost: 310 },
                  { name: 'Fire-Roasted Margherita Di Bufala', cat: 'Pizza', price: 1450, cost: 380 },
                  { name: 'Silk Fettuccine Alfredo con Pollo', cat: 'Pasta', price: 1350, cost: 410 },
                  { name: 'Shinwari Desi Ghee Mutton Karahi', cat: 'Pakistani', price: 2200, cost: 920 },
                  { name: 'SAVORÉ Royal Charcoal Platter', cat: 'BBQ', price: 3450, cost: 1250 },
                  { name: 'Molten Belgian Chocolate Lava Cake', cat: 'Desserts', price: 650, cost: 190 },
                  { name: 'Electric Mint Margarita', cat: 'Beverages', price: 420, cost: 75 },
                ].map((item, i) => {
                  const grossProfit = item.price - item.cost;
                  const marginPct = Math.round((grossProfit / item.price) * 100);
                  return (
                    <tr key={i} className="hover:bg-[#181512]/50">
                      <td className="py-3 px-4 font-bold text-white">{item.name}</td>
                      <td className="py-3 px-4 text-neutral-400">{item.cat}</td>
                      <td className="py-3 px-4 font-mono font-bold text-white">PKR {item.price.toLocaleString()}</td>
                      <td className="py-3 px-4 font-mono text-neutral-400">PKR {item.cost.toLocaleString()}</td>
                      <td className="py-3 px-4 font-mono font-bold text-emerald-400">+ PKR {grossProfit.toLocaleString()}</td>
                      <td className="py-3 px-4 font-bold text-amber-400">{marginPct}%</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 3. KITCHEN PREP METRICS */}
      {reportType === 'kitchen' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-[#141210] border border-neutral-800 space-y-2">
            <span className="text-xs uppercase font-bold text-neutral-400">Average Preparation Time</span>
            <div className="font-brand text-3xl font-bold text-amber-400">13.8 Mins</div>
            <p className="text-[11px] text-neutral-500">Benchmark target is under 18 minutes.</p>
          </div>
          <div className="p-6 rounded-2xl bg-[#141210] border border-neutral-800 space-y-2">
            <span className="text-xs uppercase font-bold text-neutral-400">On-Time Ticket Fulfilment</span>
            <div className="font-brand text-3xl font-bold text-emerald-400">96.4%</div>
            <p className="text-[11px] text-neutral-500">Only 3 delayed tickets during Friday peak.</p>
          </div>
          <div className="p-6 rounded-2xl bg-[#141210] border border-neutral-800 space-y-2">
            <span className="text-xs uppercase font-bold text-neutral-400">Fastest Station</span>
            <div className="font-brand text-3xl font-bold text-white">Bar & Beverages</div>
            <p className="text-[11px] text-neutral-500">Avg ticket turnaround 3.5 minutes.</p>
          </div>
        </div>
      )}

      {/* 4. OPERATING P&L */}
      {reportType === 'pnl' && (
        <div className="p-6 rounded-2xl bg-[#141210] border border-neutral-800 max-w-xl mx-auto space-y-4">
          <h2 className="font-serif-luxury text-xl font-bold text-white text-center">
            P&L Snapshot (PKR)
          </h2>
          <div className="space-y-2 text-xs border-y border-neutral-800 py-4">
            <div className="flex justify-between text-white font-bold text-sm">
              <span>Total Revenue:</span>
              <span className="text-emerald-400">PKR {totalSales.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-neutral-400">
              <span>Total Operating Expenses:</span>
              <span className="text-red-400">- PKR {totalExpenses.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-neutral-400">
              <span>Estimated Raw Ingredients Cost (COGS):</span>
              <span className="text-red-400">- PKR {Math.round(totalSales * 0.34).toLocaleString()}</span>
            </div>
          </div>
          <div className="flex justify-between text-base font-bold text-white pt-2">
            <span>Estimated Operating Net:</span>
            <span className="text-amber-400 font-serif-luxury">
              PKR {(totalSales - Math.round(totalSales * 0.34)).toLocaleString()}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
