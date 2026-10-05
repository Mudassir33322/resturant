import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MenuItem, OrderItem, OrderType, PaymentMethod, Order } from '../../types';
import { ReceiptModal } from './ReceiptModal';
import { SplitBillModal } from './SplitBillModal';
import {
  Search,
  Plus,
  Minus,
  Trash2,
  Printer,
  CreditCard,
  Banknote,
  Smartphone,
  Layers,
  PauseCircle,
  PlayCircle,
  UtensilsCrossed,
  Bike,
  Store,
  QrCode,
  Globe,
  Divide,
  User,
  CheckCircle2,
  RotateCcw,
} from 'lucide-react';

export const POSView: React.FC = () => {
  const {
    menuItems,
    tables,
    customers,
    currentBranch,
    createOrder,
    orders,
    setActiveView,
  } = useApp();

  const [posOrderType, setPosOrderType] = useState<OrderType>('dine_in');
  const [selectedTable, setSelectedTable] = useState<string>('T-01');
  const [selectedCustomer, setSelectedCustomer] = useState<string>('Walk-in Diner');
  const [customerPhone, setCustomerPhone] = useState<string>('+92 300 1234567');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [posSearch, setPosSearch] = useState<string>('');

  // Current POS ticket items
  const [ticketItems, setTicketItems] = useState<OrderItem[]>([
    {
      id: 'ti_1',
      menuItemId: 'food_1',
      name: 'SAVORÉ Signature Truffle Beef Burger',
      unitPrice: 1250,
      quantity: 1,
      modifiers: [{ name: 'Extra Aged Cheddar Slice', price: 150 }],
      totalPrice: 1400,
      kitchenStation: 'grill',
    },
    {
      id: 'ti_2',
      menuItemId: 'food_19',
      name: 'Gourmet Truffle Parmesan Skin-On Fries',
      unitPrice: 580,
      quantity: 1,
      modifiers: [],
      totalPrice: 580,
      kitchenStation: 'fryer',
    },
    {
      id: 'ti_3',
      menuItemId: 'food_17',
      name: 'SAVORÉ Signature Electric Mint Margarita',
      unitPrice: 420,
      quantity: 2,
      modifiers: [],
      totalPrice: 840,
      kitchenStation: 'beverage',
    },
  ]);

  // Discount %
  const [discountPercent, setDiscountPercent] = useState<number>(0);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('card');

  // Modals
  const [receiptOrder, setReceiptOrder] = useState<Order | null>(null);
  const [isSplitModalOpen, setIsSplitModalOpen] = useState(false);
  const [heldOrders, setHeldOrders] = useState<{ id: string; table: string; items: OrderItem[] }[]>([]);
  const [notificationBanner, setNotificationBanner] = useState<string | null>(null);

  const categories = ['All', 'Burgers', 'Pizza', 'Pasta', 'BBQ', 'Pakistani', 'Chinese', 'Seafood', 'Desserts', 'Beverages'];

  const filteredMenuItems = menuItems.filter((item) => {
    const matchCat = activeCategory === 'All' || item.category.toLowerCase() === activeCategory.toLowerCase();
    const matchSearch = item.name.toLowerCase().includes(posSearch.toLowerCase()) || item.category.toLowerCase().includes(posSearch.toLowerCase());
    return matchCat && matchSearch;
  });

  const subtotal = ticketItems.reduce((sum, item) => sum + item.totalPrice, 0);
  const discountAmount = Math.round((subtotal * discountPercent) / 100);
  const tax = Math.round((subtotal - discountAmount) * 0.16);
  const totalAmount = Math.max(0, subtotal - discountAmount + tax);

  // Add Item to ticket
  const handleAddItem = (item: MenuItem) => {
    setTicketItems((prev) => {
      const existingIdx = prev.findIndex((ti) => ti.menuItemId === item.id);
      if (existingIdx > -1) {
        const copy = [...prev];
        copy[existingIdx].quantity += 1;
        copy[existingIdx].totalPrice = copy[existingIdx].quantity * copy[existingIdx].unitPrice;
        return copy;
      }
      return [
        ...prev,
        {
          id: `ti_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
          menuItemId: item.id,
          name: item.name,
          unitPrice: item.basePrice,
          quantity: 1,
          modifiers: [],
          totalPrice: item.basePrice,
          kitchenStation: item.kitchenStation,
        },
      ];
    });
  };

  const handleUpdateQty = (id: string, qty: number) => {
    if (qty <= 0) {
      setTicketItems((prev) => prev.filter((ti) => ti.id !== id));
      return;
    }
    setTicketItems((prev) =>
      prev.map((ti) => (ti.id === id ? { ...ti, quantity: qty, totalPrice: ti.unitPrice * qty } : ti))
    );
  };

  const handleHoldOrder = () => {
    if (ticketItems.length === 0) return;
    setHeldOrders((prev) => [
      ...prev,
      { id: `hold_${Date.now()}`, table: selectedTable, items: ticketItems },
    ]);
    setTicketItems([]);
    setNotificationBanner(`Order for Table ${selectedTable} held.`);
    setTimeout(() => setNotificationBanner(null), 3000);
  };

  const handleResumeOrder = (heldId: string) => {
    const found = heldOrders.find((h) => h.id === heldId);
    if (found) {
      setTicketItems(found.items);
      setSelectedTable(found.table);
      setHeldOrders((prev) => prev.filter((h) => h.id !== heldId));
    }
  };

  const handleCompletePayment = () => {
    if (ticketItems.length === 0) return;

    const created = createOrder({
      orderType: posOrderType,
      customerName: selectedCustomer,
      customerPhone,
      tableNumber: posOrderType === 'dine_in' ? selectedTable : undefined,
      items: ticketItems,
      subtotal,
      discount: discountAmount,
      tax,
      deliveryFee: 0,
      total: totalAmount,
      paymentMethod,
      paymentStatus: 'paid',
    });

    setReceiptOrder(created);
    setTicketItems([]);
    setDiscountPercent(0);
    setNotificationBanner(`Order #${created.orderNumber} successfully processed! Transmitted to KDS.`);
    setTimeout(() => setNotificationBanner(null), 4000);
  };

  return (
    <div className="h-[calc(100vh-7rem)] flex flex-col bg-[#0d0c0a] text-neutral-200 overflow-hidden">
      {/* POS Top Navigation Bar */}
      <div className="bg-[#141210] border-b border-[#25221e] px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 shrink-0">
        <div className="flex items-center gap-2">
          <span className="font-brand font-bold text-lg text-white">SAVORÉ POS</span>
          <span className="text-xs text-neutral-500">|</span>
          <span className="text-xs text-amber-400 font-semibold uppercase">Flagship Clifton Terminal 01</span>
        </div>

        {/* Order Types */}
        <div className="flex items-center gap-1 bg-[#1a1714] p-1 rounded-lg border border-neutral-800">
          {[
            { id: 'dine_in' as const, label: 'Dine-In', icon: <UtensilsCrossed className="w-3.5 h-3.5" /> },
            { id: 'takeaway' as const, label: 'Takeaway', icon: <Store className="w-3.5 h-3.5" /> },
            { id: 'delivery' as const, label: 'Delivery', icon: <Bike className="w-3.5 h-3.5" /> },
            { id: 'online' as const, label: 'Online App', icon: <Globe className="w-3.5 h-3.5" /> },
            { id: 'qr' as const, label: 'Table QR', icon: <QrCode className="w-3.5 h-3.5" /> },
          ].map((type) => (
            <button
              key={type.id}
              onClick={() => setPosOrderType(type.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                posOrderType === type.id
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              {type.icon}
              <span>{type.label}</span>
            </button>
          ))}
        </div>

        {/* Quick Action Helpers */}
        <div className="flex items-center gap-2">
          {heldOrders.length > 0 && (
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-amber-950/40 border border-amber-800 text-amber-300 text-xs">
              <PauseCircle className="w-3.5 h-3.5 text-amber-400" />
              <span>{heldOrders.length} Held</span>
              <button
                onClick={() => handleResumeOrder(heldOrders[0].id)}
                className="underline font-bold ml-1 cursor-pointer"
              >
                Resume
              </button>
            </div>
          )}
          <button
            onClick={() => setActiveView('kitchen')}
            className="px-3 py-1.5 rounded bg-[#1e1b18] hover:bg-neutral-800 border border-neutral-700 text-neutral-300 hover:text-white text-xs font-medium cursor-pointer"
          >
            Kitchen Display →
          </button>
        </div>
      </div>

      {/* Notification banner if any */}
      {notificationBanner && (
        <div className="bg-emerald-950/80 border-b border-emerald-600/40 px-4 py-1.5 text-xs text-emerald-300 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{notificationBanner}</span>
          </div>
          <span className="text-[10px] text-emerald-400 font-mono uppercase">POS SYNCHRONIZED</span>
        </div>
      )}

      {/* Main Workspace (Left 65% Items Grid, Right 35% Ticket) */}
      <div className="flex-1 flex overflow-hidden">
        {/* LEFT COLUMN: Categories & Items */}
        <div className="flex-1 flex flex-col border-r border-[#25221e] overflow-hidden bg-[#100e0c]">
          {/* Categories Bar & Search */}
          <div className="p-3 border-b border-[#25221e] flex items-center gap-3 shrink-0 bg-[#141210]">
            <div className="relative flex-1 max-w-xs">
              <Search className="w-3.5 h-3.5 text-neutral-500 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search food by name / station..."
                value={posSearch}
                onChange={(e) => setPosSearch(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 bg-[#1a1714] border border-neutral-800 rounded-lg text-xs text-white placeholder-neutral-500 outline-none focus:border-amber-500"
              />
            </div>

            <div className="flex items-center gap-1 overflow-x-auto scrollbar-none flex-1">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                    activeCategory === cat
                      ? 'bg-amber-600 text-white font-semibold'
                      : 'bg-[#181512] text-neutral-400 hover:text-white border border-neutral-800'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Menu Items Grid */}
          <div className="flex-1 overflow-y-auto p-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {filteredMenuItems.map((item) => (
              <div
                key={item.id}
                onClick={() => handleAddItem(item)}
                className="group bg-[#161311] border border-[#26221e] hover:border-amber-600/60 rounded-xl p-3 flex flex-col justify-between transition-all hover:bg-[#1a1714] cursor-pointer shadow-sm select-none"
              >
                <div className="space-y-2">
                  <div className="relative h-24 rounded-lg overflow-hidden bg-neutral-900">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className="absolute top-1 left-1 px-1.5 py-0.5 rounded bg-black/80 text-[9px] uppercase font-bold text-amber-300">
                      {item.kitchenStation}
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-white line-clamp-1 group-hover:text-amber-400">
                    {item.name}
                  </h4>
                  <p className="text-[10px] text-neutral-400 line-clamp-1">
                    {item.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-neutral-800/80 flex items-center justify-between mt-2">
                  <span className="text-xs font-bold text-amber-400">
                    PKR {item.basePrice.toLocaleString()}
                  </span>
                  <div className="p-1 rounded bg-neutral-800 group-hover:bg-amber-600 group-hover:text-white transition-colors">
                    <Plus className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN: Current Ticket & Fast Payment */}
        <div className="w-96 flex flex-col bg-[#141210] shrink-0 border-l border-[#25221e]">
          {/* Header Ticket Controls */}
          <div className="p-3.5 border-b border-[#25221e] space-y-2.5 shrink-0 bg-[#12100e]">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase font-bold tracking-wider text-amber-400">
                Current Order
              </span>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={handleHoldOrder}
                  className="px-2 py-1 rounded bg-[#1c1916] hover:bg-neutral-800 border border-neutral-800 text-[11px] text-neutral-300 cursor-pointer"
                >
                  Hold
                </button>
                <button
                  onClick={() => setIsSplitModalOpen(true)}
                  className="px-2 py-1 rounded bg-[#1c1916] hover:bg-neutral-800 border border-neutral-800 text-[11px] text-amber-300 cursor-pointer flex items-center gap-1"
                >
                  <Divide className="w-3 h-3" />
                  <span>Split</span>
                </button>
                <button
                  onClick={() => setTicketItems([])}
                  className="p-1 rounded text-neutral-400 hover:text-red-400 cursor-pointer"
                  title="Clear Ticket"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Table & Customer Row */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <span className="block text-[10px] text-neutral-400">Dine-In Table</span>
                <select
                  value={selectedTable}
                  onChange={(e) => setSelectedTable(e.target.value)}
                  className="w-full mt-0.5 p-1.5 bg-[#1a1714] border border-neutral-800 rounded text-xs text-amber-300 font-semibold outline-none"
                >
                  {tables.map((t) => (
                    <option key={t.id} value={t.number}>
                      {t.number} ({t.section} - {t.status})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <span className="block text-[10px] text-neutral-400">Customer</span>
                <select
                  value={selectedCustomer}
                  onChange={(e) => setSelectedCustomer(e.target.value)}
                  className="w-full mt-0.5 p-1.5 bg-[#1a1714] border border-neutral-800 rounded text-xs text-white outline-none"
                >
                  <option value="Walk-in Guest">Walk-in Guest</option>
                  {customers.map((c) => (
                    <option key={c.id} value={c.name}>
                      {c.name} ({c.tier})
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Ticket Items List */}
          <div className="flex-1 overflow-y-auto p-3 space-y-2">
            {ticketItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center text-neutral-500 text-xs">
                <UtensilsCrossed className="w-8 h-8 opacity-40 mb-2" />
                <p>No items added to ticket.</p>
                <p className="text-[10px] mt-0.5">Click any menu item to start order.</p>
              </div>
            ) : (
              ticketItems.map((item) => (
                <div
                  key={item.id}
                  className="p-2.5 rounded-lg bg-[#181512] border border-neutral-800 space-y-1.5"
                >
                  <div className="flex items-start justify-between">
                    <div className="font-semibold text-xs text-white max-w-[200px]">
                      {item.name}
                    </div>
                    <span className="font-bold text-xs text-amber-400">
                      PKR {item.totalPrice.toLocaleString()}
                    </span>
                  </div>

                  {item.modifiers.length > 0 && (
                    <div className="text-[10px] text-neutral-400">
                      + {item.modifiers.map((m) => m.name).join(', ')}
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[10px] text-neutral-500 uppercase font-mono">
                      Station: {item.kitchenStation}
                    </span>
                    <div className="flex items-center border border-neutral-800 rounded bg-[#12100e]">
                      <button
                        onClick={() => handleUpdateQty(item.id, item.quantity - 1)}
                        className="px-1.5 py-0.5 text-neutral-400 hover:text-white"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2 text-xs font-bold text-white">{item.quantity}</span>
                      <button
                        onClick={() => handleUpdateQty(item.id, item.quantity + 1)}
                        className="px-1.5 py-0.5 text-neutral-400 hover:text-white"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Ticket Calculations & Payment */}
          <div className="p-3.5 border-t border-[#25221e] bg-[#110f0d] space-y-3 shrink-0">
            {/* Discount selector */}
            <div className="flex items-center justify-between text-xs">
              <span className="text-neutral-400">Discount Privilege</span>
              <div className="flex items-center gap-1">
                {[0, 10, 15, 20].map((pct) => (
                  <button
                    key={pct}
                    onClick={() => setDiscountPercent(pct)}
                    className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      discountPercent === pct
                        ? 'bg-amber-600 text-white'
                        : 'bg-neutral-800 text-neutral-400 hover:text-white'
                    }`}
                  >
                    {pct}%
                  </button>
                ))}
              </div>
            </div>

            {/* Calculations Breakdown */}
            <div className="space-y-1 text-xs text-neutral-300 pt-1">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>PKR {subtotal.toLocaleString()}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-amber-400">
                  <span>Discount ({discountPercent}%)</span>
                  <span>- PKR {discountAmount.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Sales Tax (16% GST)</span>
                <span>PKR {tax.toLocaleString()}</span>
              </div>
              <div className="flex justify-between pt-1 border-t border-neutral-800 font-bold text-base text-white">
                <span>Total Amount Due</span>
                <span className="text-amber-400 font-serif-luxury">
                  PKR {totalAmount.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Payment Mode Selector */}
            <div className="grid grid-cols-4 gap-1.5 pt-1">
              {[
                { method: 'cash' as const, label: 'Cash', icon: <Banknote className="w-3.5 h-3.5" /> },
                { method: 'card' as const, label: 'Card', icon: <CreditCard className="w-3.5 h-3.5" /> },
                { method: 'easypaisa' as const, label: 'EasyP', icon: <Smartphone className="w-3.5 h-3.5 text-emerald-400" /> },
                { method: 'jazzcash' as const, label: 'JazzC', icon: <Smartphone className="w-3.5 h-3.5 text-red-400" /> },
              ].map((p) => (
                <button
                  key={p.method}
                  onClick={() => setPaymentMethod(p.method)}
                  className={`p-1.5 rounded-lg border text-center flex flex-col items-center gap-0.5 text-[10px] font-semibold transition-all cursor-pointer ${
                    paymentMethod === p.method
                      ? 'border-amber-500 bg-amber-950/40 text-amber-300'
                      : 'border-neutral-800 bg-[#161311] text-neutral-400 hover:text-white'
                  }`}
                >
                  {p.icon}
                  <span>{p.label}</span>
                </button>
              ))}
            </div>

            {/* Settle & Charge Button */}
            <button
              onClick={handleCompletePayment}
              disabled={ticketItems.length === 0}
              className={`w-full py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
                ticketItems.length > 0
                  ? 'bg-amber-600 hover:bg-amber-500 text-white shadow-lg shadow-amber-950/60'
                  : 'bg-neutral-800 text-neutral-500 cursor-not-allowed'
              }`}
            >
              <span>Process Payment & Send KOT</span>
              <CheckCircle2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Receipt Modal */}
      <ReceiptModal order={receiptOrder} onClose={() => setReceiptOrder(null)} />

      {/* Split Bill Modal */}
      <SplitBillModal
        isOpen={isSplitModalOpen}
        onClose={() => setIsSplitModalOpen(false)}
        totalAmount={totalAmount}
        items={ticketItems}
        onConfirmSplit={(summary) => {
          setNotificationBanner(summary);
          setTimeout(() => setNotificationBanner(null), 4000);
        }}
      />
    </div>
  );
};
