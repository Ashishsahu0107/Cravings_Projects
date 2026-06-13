import React from 'react'
import { BrowserRouter, Router } from 'react-router-dom'

const App = () => {
  return (
    <BrowserRouter>
      <Router>
        <Route path='/' element={ <Home/> } />
      </Router>
    </BrowserRouter>
  )
}

export default App