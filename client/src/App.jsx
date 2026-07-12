import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
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
import RestaurantDashboardPage from './pages/dashboard/RestaurantDashboard'
import RestaurantOverView from './components/restaurantDashboard/RestaurantOverView'
import RestaurantOrder from './components/restaurantDashboard/RestaurantOrder'
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



const App = () => {
  return (
    <BrowserRouter>
      <Toaster />
      <Header />
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
          <Route path='setting' element={<UserSetting />} />
        </Route>

        <Route path='/restaurant-dashboard' element={<RestaurantDashboardPage />}>
          <Route index element={<Navigate to="overview" replace />} />
          <Route path='overview' element={<RestaurantOverView />} />
          <Route path='order' element={<RestaurantOrder />} />
          <Route path='wishlist' element={<RestaurantWishlist />} />
          <Route path='setting' element={<RestaurantSetting />} />
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
      <Footer />
    </BrowserRouter>
  )
}

export default App
