import React from 'react'
import SignUp from './pages/SignUp'
import "./App.css"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignIn from './pages/SignIn';
import Home from "./pages/Home.jsx"
import Modal from './pages/modal/Modal.jsx';


export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp/>} />   
        <Route path="/home" element={<Home/>} />


      </Routes>
    </Router>
  )
}
