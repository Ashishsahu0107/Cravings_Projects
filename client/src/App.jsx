import React from 'react'
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

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/about' element={<About />} />
        <Route path='/feedback' element={<Feedback />} />
        <Route path='/helpcenter' element={<HelpCenter />} />
        <Route path='/ordernow' element={<OrderNow />} />
        <Route path='/projects' element={<Projects />} />
        <Route path='/skills' element={<Skills />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App