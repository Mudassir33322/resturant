export type OrderType = 'dine_in' | 'takeaway' | 'delivery' | 'online' | 'qr';

export type OrderStatus =
  | 'pending'
  | 'accepted'
  | 'preparing'
  | 'ready'
  | 'out_for_delivery'
  | 'delivered'
  | 'completed'
  | 'cancelled';

export type PaymentMethod =
  | 'cash'
  | 'card'
  | 'bank_transfer'
  | 'easypaisa'
  | 'jazzcash'
  | 'mixed';

export type PaymentStatus = 'unpaid' | 'paid' | 'partial' | 'refunded';

export type TableStatus =
  | 'available'
  | 'reserved'
  | 'occupied'
  | 'waiting'
  | 'billing'
  | 'cleaning';

export type KitchenStation =
  | 'all'
  | 'grill'
  | 'fryer'
  | 'pizza'
  | 'pasta'
  | 'salad'
  | 'dessert'
  | 'beverage'
  | 'main';

export type UserRole =
  | 'super_admin'
  | 'manager'
  | 'cashier'
  | 'waiter'
  | 'kitchen_staff'
  | 'inventory_manager'
  | 'accountant'
  | 'delivery_rider';

export type BranchId = 'karachi_clifton' | 'lahore_gulberg' | 'islamabad_f7';

export interface Branch {
  id: BranchId;
  name: string;
  city: string;
  address: string;
  phone: string;
  email: string;
  openingHours: string;
  rating: number;
  deliveryZones: { name: string; radius: string; fee: number }[];
}

export interface MenuItemModifier {
  id: string;
  name: string;
  price: number; // in PKR
}

export interface ModifierGroup {
  id: string;
  name: string;
  required: boolean;
  minSelections?: number;
  maxSelections?: number;
  options: MenuItemModifier[];
}

export interface MenuItemVariant {
  id: string;
  name: string; // e.g. Small, Medium, Large
  price: number;
}

export interface RecipeIngredientRef {
  ingredientId: string;
  quantity: number; // in ingredient's base unit (e.g. 0.15 kg, 1 pc, 0.05 L)
}

export interface MenuItem {
  id: string;
  name: string;
  slug: string;
  category: string;
  description: string;
  basePrice: number; // in PKR
  costPrice: number; // calculated from recipe
  image: string;
  rating: number;
  reviewsCount: number;
  prepTimeMinutes: number;
  calories: number;
  isVegetarian?: boolean;
  isSpicy?: boolean;
  isBestseller?: boolean;
  isFeatured?: boolean;
  available: boolean;
  kitchenStation: KitchenStation;
  variants?: MenuItemVariant[];
  modifierGroups?: ModifierGroup[];
  allergens?: string[];
  recipe: RecipeIngredientRef[];
}

export interface CartItemModifier {
  groupId: string;
  groupName: string;
  modifierId: string;
  name: string;
  price: number;
}

export interface CartItem {
  cartItemId: string;
  menuItem: MenuItem;
  variant?: MenuItemVariant;
  selectedModifiers: CartItemModifier[];
  quantity: number;
  spiceLevel?: 'Mild' | 'Medium' | 'Hot' | 'Extra Hot';
  specialInstructions?: string;
  itemTotal: number;
}

export interface OrderItem {
  id: string;
  menuItemId: string;
  name: string;
  variantName?: string;
  unitPrice: number;
  quantity: number;
  modifiers: { name: string; price: number }[];
  spiceLevel?: string;
  notes?: string;
  totalPrice: number;
  kitchenStation: KitchenStation;
}

export interface Order {
  id: string;
  orderNumber: string; // e.g. SAV-1042
  branchId: BranchId;
  orderType: OrderType;
  status: OrderStatus;
  createdAt: string; // ISO string
  updatedAt: string;
  customerId?: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  tableNumber?: string;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  tax: number; // GST 15% or 16%
  deliveryFee: number;
  total: number;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  paymentBreakdown?: {
    cash?: number;
    card?: number;
    easypaisa?: number;
    jazzcash?: number;
  };
  deliveryAddress?: {
    street: string;
    area: string;
    city: string;
    instructions?: string;
  };
  assignedRiderId?: string;
  riderName?: string;
  riderPhone?: string;
  notes?: string;
  couponCode?: string;
  loyaltyPointsEarned: number;
}

export interface RestaurantTable {
  id: string;
  number: string;
  floor: number;
  section: 'Main Dining' | 'Family Hall' | 'Outdoor Terrace' | 'VIP Lounge' | 'Rooftop';
  capacity: number;
  status: TableStatus;
  currentOrderId?: string;
  branchId: BranchId;
  guestCount?: number;
  mergedWith?: string[];
  serverName?: string;
}

export interface Reservation {
  id: string;
  reservationNumber: string;
  branchId: BranchId;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  date: string;
  time: string;
  guestsCount: number;
  seatingPreference: 'Indoor' | 'Outdoor' | 'Window' | 'Private Area' | 'Family Section';
  specialRequests?: string;
  status: 'Requested' | 'Confirmed' | 'Seated' | 'Completed' | 'Cancelled' | 'No-show';
  assignedTableId?: string;
  createdAt: string;
}

export interface IngredientInventoryItem {
  id: string;
  name: string;
  sku: string;
  category: 'Meat & Poultry' | 'Dairy & Cheese' | 'Produce & Veggies' | 'Baking & Grains' | 'Oils & Sauces' | 'Spices' | 'Beverages' | 'Packaging';
  unit: 'KG' | 'L' | 'G' | 'PCS' | 'BOX';
  currentStock: number;
  minimumStock: number;
  reorderLevel: number;
  unitCostPKR: number;
  supplierId: string;
  supplierName: string;
  branchId: BranchId;
  expiryDate: string;
  batchNumber: string;
}

export interface StockMovement {
  id: string;
  date: string;
  ingredientId: string;
  ingredientName: string;
  type: 'Purchase' | 'Sale Consumption' | 'Adjustment' | 'Waste' | 'Transfer In' | 'Transfer Out';
  quantityChange: number; // positive or negative
  unit: string;
  reason: string;
  performedBy: string;
  referenceId?: string; // Order # or PO #
  branchId: BranchId;
}

export interface Supplier {
  id: string;
  name: string;
  company: string;
  phone: string;
  email: string;
  city: string;
  category: string;
  outstandingBalancePKR: number;
  paymentTerms: string;
}

export interface PurchaseOrder {
  id: string;
  poNumber: string;
  supplierId: string;
  supplierName: string;
  branchId: BranchId;
  items: {
    ingredientId: string;
    name: string;
    unit: string;
    quantity: number;
    unitCost: number;
    total: number;
  }[];
  totalAmount: number;
  status: 'Draft' | 'Sent' | 'Received' | 'Cancelled';
  date: string;
  notes?: string;
}

export interface ExpenseRecord {
  id: string;
  title: string;
  category: 'Rent' | 'Electricity' | 'Gas' | 'Salaries' | 'Ingredients' | 'Maintenance' | 'Marketing' | 'Delivery' | 'Packaging' | 'Miscellaneous';
  amountPKR: number;
  date: string;
  branchId: BranchId;
  paymentMethod: PaymentMethod;
  paidTo: string;
  createdBy: string;
}

export interface CustomerProfile {
  id: string;
  name: string;
  phone: string;
  email: string;
  addresses: { id: string; label: string; address: string; area: string; isDefault: boolean }[];
  totalOrders: number;
  totalSpentPKR: number;
  averageOrderValue: number;
  loyaltyPoints: number;
  tier: 'Silver' | 'Gold' | 'Platinum' | 'Black Elite';
  favoriteDishes: string[];
  lastOrderDate: string;
  segment: 'VIP' | 'Regular' | 'New' | 'High Value' | 'Inactive';
}

export interface Coupon {
  code: string;
  title: string;
  description: string;
  type: 'percentage' | 'fixed' | 'bogo' | 'free_delivery';
  discountValue: number; // e.g. 20 for 20%, or 300 for PKR 300
  minimumOrderPKR: number;
  validUntil: string;
  active: boolean;
  usageCount: number;
}

export interface StaffMember {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  branchId: BranchId;
  active: boolean;
  shift: 'Morning (8 AM - 4 PM)' | 'Evening (4 PM - 12 AM)' | 'Night (12 AM - 8 AM)';
  avatar: string;
}

export interface Rider {
  id: string;
  name: string;
  phone: string;
  vehicle: 'Honda 125' | 'Yamaha YBR' | 'Suzuki GD110' | 'Electric Scooter';
  plateNumber: string;
  status: 'available' | 'busy' | 'offline' | 'on_break';
  currentActiveOrderId?: string;
  completedDeliveriesToday: number;
  rating: number;
  branchId: BranchId;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  user: string;
  role: string;
  action: string;
  details: string;
  branchId: BranchId;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: 'order' | 'kitchen' | 'stock' | 'reservation' | 'system';
  linkRoute?: string;
}
