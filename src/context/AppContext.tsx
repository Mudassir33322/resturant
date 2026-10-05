import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  BranchId,
  UserRole,
  MenuItem,
  IngredientInventoryItem,
  RestaurantTable,
  Order,
  OrderStatus,
  CustomerProfile,
  StaffMember,
  Rider,
  Supplier,
  Coupon,
  ExpenseRecord,
  Reservation,
  StockMovement,
  AuditLog,
  NotificationItem,
  CartItem,
  OrderType,
  PaymentMethod,
} from '../types';
import {
  INITIAL_BRANCHES,
  INITIAL_MENU_ITEMS,
  INITIAL_INGREDIENTS,
  INITIAL_TABLES,
  INITIAL_ORDERS,
  INITIAL_CUSTOMERS,
  INITIAL_STAFF,
  INITIAL_RIDERS,
  INITIAL_SUPPLIERS,
  INITIAL_COUPONS,
  INITIAL_RESERVATIONS,
  INITIAL_EXPENSES,
  INITIAL_AUDIT_LOGS,
  INITIAL_NOTIFICATIONS,
} from '../data/initialData';

export type AppView =
  | 'website'
  | 'menu'
  | 'offers'
  | 'reservation'
  | 'order_tracking'
  | 'qr_dining'
  | 'customer_account'
  | 'pos'
  | 'kitchen'
  | 'tables'
  | 'delivery'
  | 'rider_portal'
  | 'inventory'
  | 'recipes'
  | 'suppliers'
  | 'crm'
  | 'admin_dashboard'
  | 'menu_cms'
  | 'staff'
  | 'expenses'
  | 'reports'
  | 'multi_branch'
  | 'restaurant_cms'
  | 'audit_logs'
  | 'settings';

interface AppContextType {
  currentBranch: BranchId;
  setCurrentBranch: (branch: BranchId) => void;
  currentRole: UserRole;
  setCurrentRole: (role: UserRole) => void;
  activeView: AppView;
  setActiveView: (view: AppView) => void;

  // Selected item / modal controllers
  selectedFoodForModal: MenuItem | null;
  setSelectedFoodForModal: (item: MenuItem | null) => void;
  trackingOrderId: string;
  setTrackingOrderId: (id: string) => void;
  qrTableNumber: string;
  setQrTableNumber: (tableNum: string) => void;

  // Entities
  menuItems: MenuItem[];
  setMenuItems: React.Dispatch<React.SetStateAction<MenuItem[]>>;
  ingredients: IngredientInventoryItem[];
  setIngredients: React.Dispatch<React.SetStateAction<IngredientInventoryItem[]>>;
  stockMovements: StockMovement[];
  tables: RestaurantTable[];
  orders: Order[];
  customers: CustomerProfile[];
  staff: StaffMember[];
  riders: Rider[];
  suppliers: Supplier[];
  coupons: Coupon[];
  reservations: Reservation[];
  expenses: ExpenseRecord[];
  auditLogs: AuditLog[];
  notifications: NotificationItem[];

  // Cart
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (cartItemId: string) => void;
  updateCartQty: (cartItemId: string, qty: number) => void;
  clearCart: () => void;
  cartSubtotal: number;
  appliedCoupon: Coupon | null;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  discountAmount: number;

  // Operations
  createOrder: (orderData: Partial<Order>) => Order;
  updateOrderStatus: (orderId: string, newStatus: OrderStatus) => void;
  updateTableStatus: (tableId: string, status: RestaurantTable['status']) => void;
  mergeTables: (tableIdA: string, tableIdB: string) => void;
  assignRiderToOrder: (orderId: string, riderId: string) => void;
  createReservation: (data: Omit<Reservation, 'id' | 'reservationNumber' | 'createdAt' | 'status'>) => Reservation;
  updateReservationStatus: (id: string, status: Reservation['status']) => void;
  adjustInventoryStock: (ingredientId: string, adjustmentQty: number, reason: string) => void;
  addExpense: (expense: Omit<ExpenseRecord, 'id'>) => void;
  markNotificationAsRead: (id: string) => void;
  recordAuditLog: (action: string, details: string) => void;
  resetAllDemoData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentBranch, setCurrentBranch] = useState<BranchId>('karachi_clifton');
  const [currentRole, setCurrentRole] = useState<UserRole>('super_admin');
  const [activeView, setActiveView] = useState<AppView>('website');

  const [selectedFoodForModal, setSelectedFoodForModal] = useState<MenuItem | null>(null);
  const [trackingOrderId, setTrackingOrderId] = useState<string>('SAV-1043');
  const [qrTableNumber, setQrTableNumber] = useState<string>('T-04');

  // Load from local storage or use initial
  const [menuItems, setMenuItems] = useState<MenuItem[]>(() => {
    const saved = localStorage.getItem('savore_menu');
    return saved ? JSON.parse(saved) : INITIAL_MENU_ITEMS;
  });

  const [ingredients, setIngredients] = useState<IngredientInventoryItem[]>(() => {
    const saved = localStorage.getItem('savore_ingredients');
    return saved ? JSON.parse(saved) : INITIAL_INGREDIENTS;
  });

  const [tables, setTables] = useState<RestaurantTable[]>(() => {
    const saved = localStorage.getItem('savore_tables');
    return saved ? JSON.parse(saved) : INITIAL_TABLES;
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('savore_orders');
    return saved ? JSON.parse(saved) : INITIAL_ORDERS;
  });

  const [customers, setCustomers] = useState<CustomerProfile[]>(INITIAL_CUSTOMERS);
  const [staff, setStaff] = useState<StaffMember[]>(INITIAL_STAFF);
  const [riders, setRiders] = useState<Rider[]>(INITIAL_RIDERS);
  const [suppliers, setSuppliers] = useState<Supplier[]>(INITIAL_SUPPLIERS);
  const [coupons, setCoupons] = useState<Coupon[]>(INITIAL_COUPONS);
  const [reservations, setReservations] = useState<Reservation[]>(INITIAL_RESERVATIONS);
  const [expenses, setExpenses] = useState<ExpenseRecord[]>(INITIAL_EXPENSES);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(INITIAL_AUDIT_LOGS);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [stockMovements, setStockMovements] = useState<StockMovement[]>([]);

  // Cart State
  const [cart, setCart] = useState<CartItem[]>([]);
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);

  // Sync state to localStorage
  useEffect(() => {
    localStorage.setItem('savore_menu', JSON.stringify(menuItems));
  }, [menuItems]);

  useEffect(() => {
    localStorage.setItem('savore_ingredients', JSON.stringify(ingredients));
  }, [ingredients]);

  useEffect(() => {
    localStorage.setItem('savore_tables', JSON.stringify(tables));
  }, [tables]);

  useEffect(() => {
    localStorage.setItem('savore_orders', JSON.stringify(orders));
  }, [orders]);

  // Cart operations
  const addToCart = (item: CartItem) => {
    setCart((prev) => {
      const existingIdx = prev.findIndex(
        (ci) =>
          ci.menuItem.id === item.menuItem.id &&
          ci.variant?.id === item.variant?.id &&
          JSON.stringify(ci.selectedModifiers) === JSON.stringify(item.selectedModifiers)
      );
      if (existingIdx > -1) {
        const copy = [...prev];
        copy[existingIdx].quantity += item.quantity;
        copy[existingIdx].itemTotal =
          copy[existingIdx].quantity *
          ((copy[existingIdx].variant ? copy[existingIdx].variant!.price : copy[existingIdx].menuItem.basePrice) +
            copy[existingIdx].selectedModifiers.reduce((acc, m) => acc + m.price, 0));
        return copy;
      }
      return [...prev, item];
    });
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((ci) => ci.cartItemId !== cartItemId));
  };

  const updateCartQty = (cartItemId: string, qty: number) => {
    if (qty <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart((prev) =>
      prev.map((ci) => {
        if (ci.cartItemId === cartItemId) {
          const unit = (ci.variant ? ci.variant.price : ci.menuItem.basePrice) + ci.selectedModifiers.reduce((a, b) => a + b.price, 0);
          return { ...ci, quantity: qty, itemTotal: unit * qty };
        }
        return ci;
      })
    );
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  const cartSubtotal = cart.reduce((sum, ci) => sum + ci.itemTotal, 0);

  const applyCoupon = (code: string) => {
    const found = coupons.find((c) => c.code.toUpperCase() === code.trim().toUpperCase() && c.active);
    if (!found) {
      return { success: false, message: 'Invalid or inactive promotional code.' };
    }
    if (cartSubtotal < found.minimumOrderPKR) {
      return { success: false, message: `Minimum cart value of PKR ${found.minimumOrderPKR.toLocaleString()} required.` };
    }
    setAppliedCoupon(found);
    return { success: true, message: `Coupon ${found.code} applied successfully!` };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
  };

  let discountAmount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.type === 'percentage') {
      discountAmount = Math.round((cartSubtotal * appliedCoupon.discountValue) / 100);
    } else if (appliedCoupon.type === 'fixed') {
      discountAmount = appliedCoupon.discountValue;
    }
  }

  // Audit Log helper
  const recordAuditLog = (action: string, details: string) => {
    const newLog: AuditLog = {
      id: `aud_${Date.now()}`,
      timestamp: new Date().toISOString(),
      user: staff.find((s) => s.role === currentRole)?.name || 'Admin',
      role: currentRole.replace('_', ' ').toUpperCase(),
      action,
      details,
      branchId: currentBranch,
    };
    setAuditLogs((prev) => [newLog, ...prev.slice(0, 99)]);
  };

  // Recipe-triggered automatic inventory deduction
  const deductIngredientsForOrder = (order: Order) => {
    const updatedIngredients = [...ingredients];
    const newMovements: StockMovement[] = [];

    order.items.forEach((item) => {
      const foundMenuItem = menuItems.find((m) => m.id === item.menuItemId);
      if (foundMenuItem && foundMenuItem.recipe) {
        foundMenuItem.recipe.forEach((ingRef) => {
          const ingIndex = updatedIngredients.findIndex((ing) => ing.id === ingRef.ingredientId);
          if (ingIndex > -1) {
            const consumedQty = Number((ingRef.quantity * item.quantity).toFixed(3));
            updatedIngredients[ingIndex].currentStock = Math.max(
              0,
              Number((updatedIngredients[ingIndex].currentStock - consumedQty).toFixed(3))
            );

            newMovements.push({
              id: `mov_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
              date: new Date().toISOString(),
              ingredientId: updatedIngredients[ingIndex].id,
              ingredientName: updatedIngredients[ingIndex].name,
              type: 'Sale Consumption',
              quantityChange: -consumedQty,
              unit: updatedIngredients[ingIndex].unit,
              reason: `Order #${order.orderNumber} (${item.name} × ${item.quantity})`,
              performedBy: 'Automated Kitchen KDS',
              referenceId: order.orderNumber,
              branchId: order.branchId,
            });
          }
        });
      }
    });

    setIngredients(updatedIngredients);
    setStockMovements((prev) => [...newMovements, ...prev]);
  };

  // Create Order
  const createOrder = (orderData: Partial<Order>): Order => {
    const newOrderNumber = `SAV-${Math.floor(1000 + Math.random() * 9000)}`;
    const points = Math.floor((orderData.total || 0) / 100);

    const newOrder: Order = {
      id: `ord_${Date.now()}`,
      orderNumber: newOrderNumber,
      branchId: currentBranch,
      orderType: orderData.orderType || 'online',
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      customerName: orderData.customerName || 'Guest Diner',
      customerPhone: orderData.customerPhone || '+92 300 0000000',
      customerEmail: orderData.customerEmail,
      tableNumber: orderData.tableNumber,
      items: orderData.items || [],
      subtotal: orderData.subtotal || 0,
      discount: orderData.discount || 0,
      tax: orderData.tax || 0,
      deliveryFee: orderData.deliveryFee || 0,
      total: orderData.total || 0,
      paymentMethod: orderData.paymentMethod || 'cash',
      paymentStatus: orderData.paymentStatus || 'unpaid',
      deliveryAddress: orderData.deliveryAddress,
      loyaltyPointsEarned: points,
      notes: orderData.notes,
      couponCode: orderData.couponCode,
    };

    setOrders((prev) => [newOrder, ...prev]);

    // Update table status if dine in
    if (orderData.tableNumber) {
      setTables((prev) =>
        prev.map((t) =>
          t.number.toLowerCase() === orderData.tableNumber?.toLowerCase()
            ? { ...t, status: 'occupied', currentOrderId: newOrderNumber }
            : t
        )
      );
    }

    // Add Notification
    setNotifications((prev) => [
      {
        id: `notif_${Date.now()}`,
        title: `New ${newOrder.orderType.toUpperCase()} Order #${newOrderNumber}`,
        message: `${newOrder.customerName} placed an order worth PKR ${newOrder.total.toLocaleString()}.`,
        timestamp: 'Just now',
        read: false,
        type: 'order',
      },
      ...prev,
    ]);

    recordAuditLog('Order Created', `Order #${newOrderNumber} created (${newOrder.orderType}, PKR ${newOrder.total.toLocaleString()})`);
    return newOrder;
  };

  // Update Order Status
  const updateOrderStatus = (orderId: string, newStatus: OrderStatus) => {
    let targetOrder: Order | undefined;

    setOrders((prev) =>
      prev.map((o) => {
        if (o.id === orderId || o.orderNumber === orderId) {
          targetOrder = { ...o, status: newStatus, updatedAt: new Date().toISOString() };
          return targetOrder;
        }
        return o;
      })
    );

    if (targetOrder) {
      // Automatic recipe deduction when preparing
      if (newStatus === 'preparing') {
        deductIngredientsForOrder(targetOrder);
      }

      // If dine in and completed, free table
      if (newStatus === 'completed' && targetOrder.tableNumber) {
        setTables((prev) =>
          prev.map((t) =>
            t.number.toLowerCase() === targetOrder?.tableNumber?.toLowerCase()
              ? { ...t, status: 'available', currentOrderId: undefined }
              : t
          )
        );
      }

      // If delivery completed, free rider
      if ((newStatus === 'delivered' || newStatus === 'completed') && targetOrder.assignedRiderId) {
        setRiders((prev) =>
          prev.map((r) =>
            r.id === targetOrder?.assignedRiderId
              ? { ...r, status: 'available', completedDeliveriesToday: r.completedDeliveriesToday + 1, currentActiveOrderId: undefined }
              : r
          )
        );
      }

      recordAuditLog('Order Status Updated', `Order #${targetOrder.orderNumber} moved to '${newStatus.toUpperCase()}'`);
    }
  };

  // Table Management
  const updateTableStatus = (tableId: string, status: RestaurantTable['status']) => {
    setTables((prev) => prev.map((t) => (t.id === tableId ? { ...t, status } : t)));
    recordAuditLog('Table Status Changed', `Table ${tableId} updated to ${status}`);
  };

  const mergeTables = (tableIdA: string, tableIdB: string) => {
    setTables((prev) =>
      prev.map((t) => {
        if (t.id === tableIdA) {
          return { ...t, mergedWith: [...(t.mergedWith || []), tableIdB], capacity: t.capacity + 4 };
        }
        if (t.id === tableIdB) {
          return { ...t, status: 'occupied' };
        }
        return t;
      })
    );
    recordAuditLog('Tables Merged', `Merged ${tableIdA} with ${tableIdB}`);
  };

  // Delivery rider assignment
  const assignRiderToOrder = (orderId: string, riderId: string) => {
    const rider = riders.find((r) => r.id === riderId);
    if (!rider) return;

    setOrders((prev) =>
      prev.map((o) =>
        o.id === orderId
          ? {
              ...o,
              assignedRiderId: rider.id,
              riderName: rider.name,
              riderPhone: rider.phone,
              status: 'out_for_delivery',
              updatedAt: new Date().toISOString(),
            }
          : o
      )
    );

    setRiders((prev) =>
      prev.map((r) => (r.id === riderId ? { ...r, status: 'busy', currentActiveOrderId: orderId } : r))
    );

    recordAuditLog('Rider Assigned', `Assigned ${rider.name} to order #${orderId}`);
  };

  // Reservations
  const createReservation = (data: Omit<Reservation, 'id' | 'reservationNumber' | 'createdAt' | 'status'>): Reservation => {
    const newRes: Reservation = {
      ...data,
      id: `res_${Date.now()}`,
      reservationNumber: `RES-${Math.floor(1000 + Math.random() * 9000)}`,
      createdAt: new Date().toISOString(),
      status: 'Confirmed',
    };
    setReservations((prev) => [newRes, ...prev]);

    setNotifications((prev) => [
      {
        id: `notif_${Date.now()}`,
        title: `New Reservation #${newRes.reservationNumber}`,
        message: `${newRes.customerName} reserved for ${newRes.guestsCount} guests at ${newRes.time} on ${newRes.date}.`,
        timestamp: 'Just now',
        read: false,
        type: 'reservation',
      },
      ...prev,
    ]);

    recordAuditLog('Reservation Created', `Reservation #${newRes.reservationNumber} for ${newRes.customerName}`);
    return newRes;
  };

  const updateReservationStatus = (id: string, status: Reservation['status']) => {
    setReservations((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
    recordAuditLog('Reservation Status', `Reservation ${id} updated to ${status}`);
  };

  // Inventory adjustment
  const adjustInventoryStock = (ingredientId: string, adjustmentQty: number, reason: string) => {
    setIngredients((prev) =>
      prev.map((ing) => {
        if (ing.id === ingredientId) {
          const newStock = Math.max(0, Number((ing.currentStock + adjustmentQty).toFixed(3)));
          return { ...ing, currentStock: newStock };
        }
        return ing;
      })
    );

    const ing = ingredients.find((i) => i.id === ingredientId);
    if (ing) {
      setStockMovements((prev) => [
        {
          id: `mov_${Date.now()}`,
          date: new Date().toISOString(),
          ingredientId: ing.id,
          ingredientName: ing.name,
          type: adjustmentQty >= 0 ? 'Adjustment' : 'Waste',
          quantityChange: adjustmentQty,
          unit: ing.unit,
          reason,
          performedBy: staff.find((s) => s.role === currentRole)?.name || 'Manager',
          branchId: currentBranch,
        },
        ...prev,
      ]);
    }

    recordAuditLog('Stock Adjusted', `${ing?.name || ingredientId}: ${adjustmentQty > 0 ? '+' : ''}${adjustmentQty} (${reason})`);
  };

  // Expenses
  const addExpense = (expense: Omit<ExpenseRecord, 'id'>) => {
    const newExp: ExpenseRecord = { ...expense, id: `exp_${Date.now()}` };
    setExpenses((prev) => [newExp, ...prev]);
    recordAuditLog('Expense Recorded', `${newExp.title}: PKR ${newExp.amountPKR.toLocaleString()}`);
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  // Reset demo
  const resetAllDemoData = () => {
    localStorage.clear();
    setMenuItems(INITIAL_MENU_ITEMS);
    setIngredients(INITIAL_INGREDIENTS);
    setTables(INITIAL_TABLES);
    setOrders(INITIAL_ORDERS);
    setCustomers(INITIAL_CUSTOMERS);
    setStaff(INITIAL_STAFF);
    setRiders(INITIAL_RIDERS);
    setSuppliers(INITIAL_SUPPLIERS);
    setCoupons(INITIAL_COUPONS);
    setReservations(INITIAL_RESERVATIONS);
    setExpenses(INITIAL_EXPENSES);
    setAuditLogs(INITIAL_AUDIT_LOGS);
    setNotifications(INITIAL_NOTIFICATIONS);
    setCart([]);
    setAppliedCoupon(null);
    setCurrentBranch('karachi_clifton');
    setCurrentRole('super_admin');
    setActiveView('website');
  };

  return (
    <AppContext.Provider
      value={{
        currentBranch,
        setCurrentBranch,
        currentRole,
        setCurrentRole,
        activeView,
        setActiveView,
        selectedFoodForModal,
        setSelectedFoodForModal,
        trackingOrderId,
        setTrackingOrderId,
        qrTableNumber,
        setQrTableNumber,
        menuItems,
        setMenuItems,
        ingredients,
        setIngredients,
        stockMovements,
        tables,
        orders,
        customers,
        staff,
        riders,
        suppliers,
        coupons,
        reservations,
        expenses,
        auditLogs,
        notifications,
        cart,
        addToCart,
        removeFromCart,
        updateCartQty,
        clearCart,
        cartSubtotal,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        discountAmount,
        createOrder,
        updateOrderStatus,
        updateTableStatus,
        mergeTables,
        assignRiderToOrder,
        createReservation,
        updateReservationStatus,
        adjustInventoryStock,
        addExpense,
        markNotificationAsRead,
        recordAuditLog,
        resetAllDemoData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};
