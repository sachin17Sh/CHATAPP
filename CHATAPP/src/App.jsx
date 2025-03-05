import React from 'react'
import SignUp from './pages/SignUp'
import "./App.css"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignIn from './pages/SignIn';
import Home from "./pages/Home.jsx"
import Error from './pages/Error.jsx';
import ForgotPassword from './pages/ForgotPassword.jsx';
import OTP from './pages/OTP.jsx';
import ConfirmPsw from './pages/ConfirmPsw.jsx';


export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp/>} />  
        <Route path="/forgotPassword" element={<ForgotPassword/>} />   
        <Route path="/home" element={<Home/>} />
        <Route path="/otp" element={<OTP/>} />
        <Route path="/confirmpassword" element={<ConfirmPsw/>} />
        <Route path='*'  element={<Error/>}/>
      </Routes>
    </Router>
  )
}
