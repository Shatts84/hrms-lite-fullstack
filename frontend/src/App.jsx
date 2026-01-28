import React from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Employees from './pages/Employees'
import Attendance from './pages/Attendance'

export default function App(){
  return (
    <BrowserRouter>
      <nav style={{padding:20, background:'#f5f5f5'}}>
        <Link to="/" style={{marginRight:15}}>Employees</Link>
        <Link to="/attendance">Attendance</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Employees />} />
        <Route path="/attendance" element={<Attendance />} />
      </Routes>
    </BrowserRouter>
  )
}
