import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../src/App.css'
import UserContextProvider from './context/UserContext';
import LandingPage from './pages/LandingPage';
import ProtectedRoutes from './functions/ProtectedRoutes';
import Invalid from './pages/Invalid';
import NotFound from './pages/NotFound';

export default function () {  





  return (
<BrowserRouter>
 <UserContextProvider>
    <Routes>
      <Route element={<ProtectedRoutes />}>
        <Route path='/home' element={<HomePage/>}></Route>
      </Route>
        <Route path='/login' element={<LoginPage/>}></Route>
        <Route path='/invalid' element={<Invalid/>}></Route>
        <Route path='/' element={<LandingPage/>}></Route>
        <Route path='*' element={<NotFound/>}></Route>
    </Routes>
  </UserContextProvider>
</BrowserRouter>
  )
}
