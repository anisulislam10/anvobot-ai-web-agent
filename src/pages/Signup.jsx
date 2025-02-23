import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { FaRobot } from "react-icons/fa";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [successMessage, setSuccessMessage] = useState(""); // Success message state

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${import.meta.env.VITE_SERVER_URL}auth/signup`, formData);
      
      // Show success message
      setSuccessMessage("Please check your inbox to activate your account.");
      
      // Hide message after 5 seconds
      setTimeout(() => {
        setSuccessMessage("");
        navigate("/login");
      }, 5000);

    } catch (error) {
      console.error("Signup Failed:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      
      {/* Navbar */}
      <nav className="bg-gradient-to-r from-blue-600 to-purple-500 text-white p-5 flex justify-between items-center shadow-lg">
        <h1 className="text-2xl md:text-3xl font-extrabold flex items-center gap-2">
          <FaRobot className="text-3xl md:text-4xl text-white" /> Anvobot
        </h1>
        <Link to="/login" className="px-4 py-2 md:px-6 md:py-2 border border-white rounded-lg hover:bg-white hover:text-blue-600 transition">
          Login
        </Link>
      </nav>

      {/* Main Content */}
      <div className="flex-grow flex items-center justify-center px-6 sm:px-8 py-8">
        <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg flex flex-col md:flex-row overflow-hidden">
              {/* Right - App Introduction */}
              <div className="w-full md:w-1/2 bg-gradient-to-r from-blue-600 to-purple-500 text-white flex flex-col items-center justify-center p-6 sm:p-10 text-center">
            <FaRobot className="text-5xl sm:text-6xl mb-4" />
            <h2 className="text-2xl sm:text-3xl font-bold">Welcome to Anvobot!</h2>
            <p className="mt-4 text-sm sm:text-lg">
              Anvobot is your AI-powered assistant, helping you stay productive and connected.  
              Sign up now and start experiencing the future of automation!
            </p>
          </div>
          {/* Left - Signup Form */}
          <div className="w-full md:w-1/2 p-6 sm:p-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 text-center">Create an Account</h2>

            {/* Success Message */}
            {successMessage && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4 text-center">
                {successMessage}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <input 
                type="text" placeholder="Name" value={formData.name} 
                onChange={(e) => setFormData({ ...formData, name: e.target.value })} 
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500" required
              />
              <input 
                type="email" placeholder="Email" value={formData.email} 
                onChange={(e) => setFormData({ ...formData, email: e.target.value })} 
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500" required
              />
              <input 
                type="password" placeholder="Password" value={formData.password} 
                onChange={(e) => setFormData({ ...formData, password: e.target.value })} 
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500" required
              />
              <button 
                type="submit" 
                className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg font-semibold text-lg shadow-md hover:bg-blue-700 transition"
              >
                Signup
              </button>
            </form>
            <p className="text-center text-gray-600 mt-4">
              Already have an account? <Link to="/login" className="text-blue-600 font-semibold">Login</Link>
            </p>
          </div>

      

        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-blue-600 to-purple-500 text-white text-center py-4 sm:py-6 text-sm sm:text-lg font-medium">
        &copy; 2025 Anvobot. All rights reserved.
      </footer>
      
    </div>
  );
};

export default Signup;
