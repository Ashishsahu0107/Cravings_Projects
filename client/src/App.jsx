import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Home from './pages/Hero/Home'
import Header from './components/Header'
import Footer from './components/Footer'
import Login from './pages/Login'
import Register from './pages/Register'
import Contact from './pages/Contact'
import About from './pages/About'
import Feedback from './pages/Feedback'
import HelpCenter from './pages/HelpCenter'
import OrderNow from './pages/OrderNow'
import Projects from './pages/Projects'
import Skills from './pages/Skills'
import PartnerWithUs from './pages/PartnerWithUs'
import BecomeARider from './pages/BecomeARider'
import PrivacyPolicy from './pages/PrivacyPolicy'
import TermsOfService from './pages/TermsOfService'
import SiteMap from './pages/SiteMap'
import { Toaster } from 'react-hot-toast';
import UserDashboard from './pages/dashboard/UserDashboard'
import UserOverView from './components/userDashboard/UserOverView'
import UserOrder from './components/userDashboard/UserOrder'
import UserWishlist from './components/userDashboard/UserWishlist'
import UserSetting from './components/userDashboard/UserSetting'
import UserAddress from './components/userDashboard/UserAddress'
import RestaurantDashboardPage from './pages/dashboard/RestaurantDashboard'
import RestaurantOverView from './components/restaurantDashboard/RestaurantOverView'
import RestaurantWishlist from './components/restaurantDashboard/RestaurantWishlist'
import RestaurantSetting from './components/restaurantDashboard/RestaurantSetting'
import RiderDashboardPage from './pages/dashboard/RiderDashboard'
import RiderOverView from './components/riderDashboard/RiderOverView'
import RiderOrder from './components/riderDashboard/RiderOrder'
import RiderWishlist from './components/riderDashboard/RiderWishlist'
import RiderSetting from './components/riderDashboard/RiderSetting'
import AdminDashboardPage from './pages/dashboard/AdminDashboard'
import AdminOverView from './components/adminDashboard/AdminOverView'
import AdminOrder from './components/adminDashboard/AdminOrder'
import AdminWishlist from './components/adminDashboard/AdminWishlist'
import AdminSetting from './components/adminDashboard/AdminSetting'

import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './config/queryClient';
import OrdersList from './components/restaurantDashboard/modules/orders/OrdersList';
import MenuManager from './components/restaurantDashboard/modules/menu/MenuManager';
import WalletManager from './components/restaurantDashboard/modules/wallet/WalletManager';
import AnalyticsManager from './components/restaurantDashboard/modules/analytics/AnalyticsManager';
import EmptyState from './components/ui/EmptyState';
import { Construction } from 'lucide-react';

const PlaceholderModule = ({ title }) => (
  <div className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-2xl shadow-sm h-[50vh]">
    <EmptyState 
      title={`${title} Module`} 
      description="This enterprise module is currently under construction and will be deployed in the next phase." 
      icon={Construction} 
    />
  </div>
);

const AppLayout = () => {
  const location = useLocation();
  const isDashboard = location.pathname.includes('dashboard');

  return (
    <>
      <Toaster />
      {!isDashboard && <Header />}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/home' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/about' element={<About />} />
        <Route path='/feedback' element={<Feedback />} />
        <Route path='/helpcenter' element={<HelpCenter />} />
        <Route path='/help-center' element={<HelpCenter />} />
        <Route path='/ordernow' element={<OrderNow />} />
        <Route path='/order-now' element={<OrderNow />} />
        <Route path='/projects' element={<Projects />} />
        <Route path='/skills' element={<Skills />} />
        <Route path='/partner-with-us' element={<PartnerWithUs />} />
        <Route path='/become-a-rider' element={<BecomeARider />} />
        <Route path='/privacy-policy' element={<PrivacyPolicy />} />
        <Route path='/terms-of-service' element={<TermsOfService />} />
        <Route path='/site-map' element={<SiteMap />} />

        {/* Dashboard routes  */}
        <Route path='/user/dashboard' element={<UserDashboard />}>
          <Route index element={<Navigate to="overview" replace />} />
          <Route path='overview' element={<UserOverView />} />
          <Route path='order' element={<UserOrder />} />
          <Route path='wishlist' element={<UserWishlist />} />
          <Route path='address' element={<UserAddress />} />
          <Route path='setting' element={<UserSetting />} />
        </Route>

        <Route path='/restaurant-dashboard' element={<RestaurantDashboardPage />}>
          <Route index element={<Navigate to="overview" replace />} />
          <Route path='overview' element={<RestaurantOverView />} />
          <Route path='order' element={<OrdersList />} />
          <Route path='menu' element={<MenuManager />} />
          <Route path='wishlist' element={<RestaurantWishlist />} />
          <Route path='setting' element={<RestaurantSetting />} />
          
          {/* New Sidebar Placeholder Routes */}
          <Route path='categories' element={<PlaceholderModule title="Categories Management" />} />
          <Route path='inventory' element={<PlaceholderModule title="Inventory Management" />} />
          <Route path='customers' element={<PlaceholderModule title="Customer Insights" />} />
          <Route path='reviews' element={<PlaceholderModule title="Review Management" />} />
          <Route path='promotions' element={<PlaceholderModule title="Promotions & Campaigns" />} />
          <Route path='analytics' element={<AnalyticsManager />} />
          <Route path='wallet' element={<WalletManager />} />
          <Route path='reports' element={<PlaceholderModule title="Data Reports & Exports" />} />
          <Route path='help' element={<PlaceholderModule title="Help Center" />} />
        </Route>

        <Route path='/rider-dashboard' element={<RiderDashboardPage />}>
          <Route index element={<Navigate to="overview" replace />} />
          <Route path='overview' element={<RiderOverView />} />
          <Route path='order' element={<RiderOrder />} />
          <Route path='wishlist' element={<RiderWishlist />} />
          <Route path='setting' element={<RiderSetting />} />
        </Route>

        <Route path='/admin-dashboard' element={<AdminDashboardPage />}>
          <Route index element={<Navigate to="overview" replace />} />
          <Route path='overview' element={<AdminOverView />} />
          <Route path='order' element={<AdminOrder />} />
          <Route path='wishlist' element={<AdminWishlist />} />
          <Route path='setting' element={<AdminSetting />} />
        </Route>

      </Routes>
      {!isDashboard && <Footer />}
    </>
  );
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AppLayout />
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
