
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import HomePage from "./pages/Homepage";
import ChatbotWidget from "./components/ChatbotWidget";

const App = () => {
  return (
    <Router>
      
      <div className="h-screen">
        {/* <Navbar /> */}
        <div className="p-6">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />} />  
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/chat" element={<ChatbotWidget />} />

          
          </Routes>
        </div>
      </div>
      
    </Router>
  );
};

export default App;
