import React from 'react';
import { Order } from '../../types';
import { X, Printer, Share2, CheckCircle2, Download } from 'lucide-react';

interface ReceiptModalProps {
  order: Order | null;
  onClose: () => void;
}

export const ReceiptModal: React.FC<ReceiptModalProps> = ({ order, onClose }) => {
  if (!order) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleShareWhatsApp = () => {
    const text = `*SAVORÉ Restaurant Digital Receipt*\nOrder: #${order.orderNumber}\nAmount: PKR ${order.total.toLocaleString()}\nThank you for dining with us!`;
    const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="w-full max-w-sm bg-white text-neutral-900 rounded-xl shadow-2xl overflow-hidden font-mono text-xs flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Printable Paper Area */}
        <div id="printable-receipt" className="p-6 space-y-4 overflow-y-auto">
          {/* Header */}
          <div className="text-center space-y-1 border-b border-dashed border-neutral-300 pb-4">
            <h2 className="font-serif-luxury text-xl font-bold tracking-widest text-black font-sans">
              SAVORÉ
            </h2>
            <p className="text-[10px] uppercase tracking-wider text-neutral-600">
              Good Food. Great Moments.
            </p>
            <p className="text-[10px] text-neutral-500">
              Marine Promenade, Clifton, Karachi
            </p>
            <p className="text-[10px] text-neutral-500">
              Tel: +92 21 3587 9901 · NTN: 9482019-4
            </p>
          </div>

          {/* Metadata */}
          <div className="space-y-1 text-[11px] border-b border-dashed border-neutral-300 pb-3">
            <div className="flex justify-between">
              <span className="text-neutral-500">Receipt / Order:</span>
              <span className="font-bold">#{order.orderNumber}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-500">Date & Time:</span>
              <span>{new Date(order.createdAt).toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-500">Service Mode:</span>
              <span className="uppercase font-semibold">{order.orderType}</span>
            </div>
            {order.tableNumber && (
              <div className="flex justify-between">
                <span className="text-neutral-500">Table:</span>
                <span className="font-bold">{order.tableNumber}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-neutral-500">Guest:</span>
              <span>{order.customerName}</span>
            </div>
          </div>

          {/* Items */}
          <div className="space-y-2 border-b border-dashed border-neutral-300 pb-3">
            <div className="grid grid-cols-12 text-[10px] uppercase font-bold text-neutral-500">
              <span className="col-span-2">Qty</span>
              <span className="col-span-7">Item</span>
              <span className="col-span-3 text-right">Price</span>
            </div>

            {order.items.map((item) => (
              <div key={item.id} className="grid grid-cols-12 text-[11px]">
                <span className="col-span-2 font-bold">{item.quantity}×</span>
                <div className="col-span-7">
                  <div className="font-semibold text-black">{item.name}</div>
                  {item.modifiers.length > 0 && (
                    <div className="text-[9px] text-neutral-500">
                      {item.modifiers.map((m) => m.name).join(', ')}
                    </div>
                  )}
                </div>
                <span className="col-span-3 text-right font-medium">
                  {item.totalPrice.toLocaleString()}
                </span>
              </div>
            ))}
          </div>

          {/* Financial Breakdown */}
          <div className="space-y-1 text-[11px] border-b border-dashed border-neutral-300 pb-3">
            <div className="flex justify-between">
              <span className="text-neutral-600">Subtotal:</span>
              <span>PKR {order.subtotal.toLocaleString()}</span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between text-neutral-700">
                <span>Discount Privilege:</span>
                <span>- PKR {order.discount.toLocaleString()}</span>
              </div>
            )}
            <div className="flex justify-between text-neutral-600">
              <span>Sindh Sales Tax (16%):</span>
              <span>PKR {order.tax.toLocaleString()}</span>
            </div>
            {order.deliveryFee > 0 && (
              <div className="flex justify-between text-neutral-600">
                <span>Delivery:</span>
                <span>PKR {order.deliveryFee.toLocaleString()}</span>
              </div>
            )}
            <div className="flex justify-between text-sm font-bold text-black pt-1 border-t border-neutral-200">
              <span>TOTAL (PKR):</span>
              <span>{order.total.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-[10px] text-neutral-600 pt-1">
              <span>Payment Mode:</span>
              <span className="uppercase font-semibold">{order.paymentMethod}</span>
            </div>
          </div>

          {/* Footer note */}
          <div className="text-center space-y-1 pt-1">
            <p className="text-[10px] font-bold">SAVORÉ Rewards Points Earned: +{order.loyaltyPointsEarned}</p>
            <p className="text-[9px] text-neutral-500">Thank you for dining with us! Come back soon.</p>
            <p className="text-[9px] text-neutral-400">www.savore.pk</p>
          </div>
        </div>

        {/* Modal Controls */}
        <div className="p-4 bg-neutral-100 border-t border-neutral-200 flex items-center justify-between gap-2 font-sans">
          <button
            onClick={onClose}
            className="px-3 py-2 rounded-lg bg-neutral-200 hover:bg-neutral-300 text-neutral-800 text-xs font-semibold cursor-pointer"
          >
            Close
          </button>
          <div className="flex items-center gap-2">
            <button
              onClick={handleShareWhatsApp}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </button>
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-neutral-900 hover:bg-black text-white text-xs font-semibold cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
