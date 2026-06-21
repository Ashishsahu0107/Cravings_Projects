import { BrowserRouter, Routes, Route } from 'react-router-dom'
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
import RestaurantDashboard from './pages/RestaurantDashboard'
import BecomeARider from './pages/BecomeARider'
import RiderDashboard from './pages/RiderDashboard'
import PrivacyPolicy from './pages/PrivacyPolicy'
import TermsOfService from './pages/TermsOfService'
import SiteMap from './pages/SiteMap'

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/home' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/register/:userType' element={<Register />} />
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
        <Route path='/restaurant-dashboard' element={<RestaurantDashboard />} />
        <Route path='/become-a-rider' element={<BecomeARider />} />
        <Route path='/rider-dashboard' element={<RiderDashboard />} />
        <Route path='/privacy-policy' element={<PrivacyPolicy />} />
        <Route path='/terms-of-service' element={<TermsOfService />} />
        <Route path='/site-map' element={<SiteMap />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
