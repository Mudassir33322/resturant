import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { DemoControlBar } from './components/showcase/DemoControlBar';
import { Navbar } from './components/website/Navbar';
import { HeroSection } from './components/website/HeroSection';
import { FeaturedDishesSection } from './components/website/FeaturedDishesSection';
import { SpecialOffersSection } from './components/website/SpecialOffersSection';
import { ChefAndReviewsSection } from './components/website/ChefAndReviewsSection';
import { LocationsAndFooter } from './components/website/LocationsAndFooter';
import { FullMenuView } from './components/website/FullMenuView';
import { ReservationSection } from './components/website/ReservationSection';
import { FoodDetailModal } from './components/website/FoodDetailModal';
import { CartDrawer } from './components/ordering/CartDrawer';
import { CheckoutModal } from './components/ordering/CheckoutModal';
import { SearchModal } from './components/common/SearchModal';
import { OrderTrackingView } from './components/ordering/OrderTrackingView';
import { QRTableExperience } from './components/ordering/QRTableExperience';
import { CustomerAccountView } from './components/crm/CustomerAccountView';
import { POSView } from './components/pos/POSView';
import { KitchenDisplayView } from './components/kitchen/KitchenDisplayView';
import { FloorPlanView } from './components/tables/FloorPlanView';
import { DeliveryDashboard } from './components/delivery/DeliveryDashboard';
import { InventoryAndRecipesView } from './components/inventory/InventoryAndRecipesView';
import { CustomerCRMView } from './components/admin/CustomerCRMView';
import { AdminLayout } from './components/admin/AdminLayout';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { MenuCMSView } from './components/admin/MenuCMSView';
import { StaffView } from './components/admin/StaffView';
import { ExpensesView } from './components/admin/ExpensesView';
import { ReportsAndAnalyticsView } from './components/admin/ReportsAndAnalyticsView';
import { MultiBranchView } from './components/admin/MultiBranchView';
import { RestaurantCMSView } from './components/admin/RestaurantCMSView';
import { AuditLogsView } from './components/admin/AuditLogsView';
import { SettingsView } from './components/admin/SettingsView';
import { MenuItem } from './types';

const MainAppContent: React.FC = () => {
  const {
    activeView,
    setActiveView,
    selectedFoodForModal,
    setSelectedFoodForModal,
    setTrackingOrderId,
  } = useApp();

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Check if currently on Customer-Facing Web vs Back-Office / Admin Screen
  const isCustomerWebsiteView =
    activeView === 'website' ||
    activeView === 'menu' ||
    activeView === 'offers' ||
    activeView === 'reservation' ||
    activeView === 'order_tracking' ||
    activeView === 'qr_dining' ||
    activeView === 'customer_account';

  const isFullOperationsView =
    activeView === 'pos' ||
    activeView === 'kitchen' ||
    activeView === 'tables' ||
    activeView === 'delivery';

  return (
    <div className="min-h-screen bg-[#0f0e0d] text-[#e8e4df] flex flex-col font-sans selection:bg-amber-600/30 selection:text-amber-200">
      {/* Portfolio Showcase Floating Control Bar */}
      <DemoControlBar />

      {/* Standard Customer Navbar (shown on customer website views) */}
      {isCustomerWebsiteView && (
        <Navbar
          onOpenCart={() => setIsCartOpen(true)}
          onOpenSearch={() => setIsSearchOpen(true)}
        />
      )}

      {/* Main Content Router */}
      <main className="flex-1">
        {/* 1. HOMEPAGE */}
        {activeView === 'website' && (
          <div>
            <HeroSection onOpenReservation={() => setActiveView('reservation')} />
            <FeaturedDishesSection onSelectFood={(item) => setSelectedFoodForModal(item)} />
            <SpecialOffersSection />
            <ChefAndReviewsSection />
            <LocationsAndFooter onOpenReservation={() => setActiveView('reservation')} />
          </div>
        )}

        {/* 2. FULL ARTISANAL MENU */}
        {activeView === 'menu' && (
          <div>
            <FullMenuView onSelectFood={(item) => setSelectedFoodForModal(item)} />
            <LocationsAndFooter onOpenReservation={() => setActiveView('reservation')} />
          </div>
        )}

        {/* 3. OFFERS */}
        {activeView === 'offers' && (
          <div className="py-8">
            <SpecialOffersSection />
            <LocationsAndFooter onOpenReservation={() => setActiveView('reservation')} />
          </div>
        )}

        {/* 4. TABLE RESERVATIONS */}
        {activeView === 'reservation' && (
          <div>
            <ReservationSection />
            <LocationsAndFooter onOpenReservation={() => setActiveView('reservation')} />
          </div>
        )}

        {/* 5. LIVE ORDER TRACKING */}
        {activeView === 'order_tracking' && <OrderTrackingView />}

        {/* 6. DINE-IN TABLE QR EXPERIENCE */}
        {activeView === 'qr_dining' && (
          <QRTableExperience
            onSelectFood={(item) => setSelectedFoodForModal(item)}
            onOpenCart={() => setIsCartOpen(true)}
          />
        )}

        {/* 7. CUSTOMER ACCOUNT & REWARDS */}
        {activeView === 'customer_account' && <CustomerAccountView />}

        {/* 8. RESTAURANT POS (Point of Sale) */}
        {activeView === 'pos' && <POSView />}

        {/* 9. KITCHEN DISPLAY SYSTEM (KDS) */}
        {activeView === 'kitchen' && <KitchenDisplayView />}

        {/* 10. FLOOR & TABLE MANAGEMENT */}
        {activeView === 'tables' && (
          <div className="py-6">
            <FloorPlanView />
          </div>
        )}

        {/* 11. DELIVERY & FLEET DISPATCH */}
        {activeView === 'delivery' && (
          <div className="py-6">
            <DeliveryDashboard />
          </div>
        )}

        {/* 12. INVENTORY & RECIPES */}
        {activeView === 'inventory' && (
          <div className="py-6">
            <InventoryAndRecipesView />
          </div>
        )}

        {/* 13. CRM */}
        {activeView === 'crm' && (
          <div className="py-6 max-w-[1440px] mx-auto px-4">
            <CustomerCRMView />
          </div>
        )}

        {/* 14. ADMIN COMMAND CENTER PORTALS (Wrapped in AdminLayout) */}
        {activeView === 'admin_dashboard' && (
          <AdminLayout>
            <AdminDashboard />
          </AdminLayout>
        )}

        {activeView === 'menu_cms' && (
          <AdminLayout>
            <MenuCMSView />
          </AdminLayout>
        )}

        {activeView === 'staff' && (
          <AdminLayout>
            <StaffView />
          </AdminLayout>
        )}

        {activeView === 'expenses' && (
          <AdminLayout>
            <ExpensesView />
          </AdminLayout>
        )}

        {activeView === 'reports' && (
          <AdminLayout>
            <ReportsAndAnalyticsView />
          </AdminLayout>
        )}

        {activeView === 'multi_branch' && (
          <AdminLayout>
            <MultiBranchView />
          </AdminLayout>
        )}

        {activeView === 'restaurant_cms' && (
          <AdminLayout>
            <RestaurantCMSView />
          </AdminLayout>
        )}

        {activeView === 'audit_logs' && (
          <AdminLayout>
            <AuditLogsView />
          </AdminLayout>
        )}

        {activeView === 'settings' && (
          <AdminLayout>
            <SettingsView />
          </AdminLayout>
        )}
      </main>

      {/* Global Modals & Drawers */}
      <FoodDetailModal
        item={selectedFoodForModal}
        onClose={() => setSelectedFoodForModal(null)}
        onOpenCart={() => setIsCartOpen(true)}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onProceedToCheckout={() => setIsCheckoutOpen(true)}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        onSuccess={(orderNumber) => {
          setIsCheckoutOpen(false);
          setTrackingOrderId(orderNumber);
          setActiveView('order_tracking');
        }}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectFood={(item) => setSelectedFoodForModal(item)}
      />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainAppContent />
    </AppProvider>
  );
}
