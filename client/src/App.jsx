import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../src/App.css'
import UserContextProvider from './context/UserContext';
import LandingPage from './pages/LandingPage';



export default function () {  





  return (
<BrowserRouter>
 <UserContextProvider>
    <Routes>
      <Route path='/login' element={<LoginPage/>}></Route>
      <Route path='/home' element={<HomePage/>}></Route>
      <Route path='/' element={<LandingPage/>}></Route>
    </Routes>
  </UserContextProvider>
</BrowserRouter>
  )
}
