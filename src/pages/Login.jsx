import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { FaRobot } from "react-icons/fa";
import Footer from "../components/Footer";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate("/dashboard");
    } catch (error) {
      console.error("Login Failed:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      
      {/* Navbar */}
      <nav className="bg-gradient-to-r from-blue-600 to-purple-500 text-white p-5 flex justify-between items-center shadow-lg">
      <Link to='/'>  <h1 className="text-2xl md:text-3xl font-extrabold flex items-center gap-2">
        <FaRobot className="text-3xl md:text-4xl text-white" /> Anvobot
        </h1>
        </Link>
        <Link to="/signup" className="px-4 md:px-6 py-2 border border-white rounded-lg hover:bg-white hover:text-blue-600 transition">
          Signup
        </Link>
        
      </nav>

      {/* Main Content */}
      <div className="flex-grow flex items-center justify-center px-6 md:px-8 py-8 md:py-12">
        <div className="w-full max-w-5xl bg-white shadow-lg rounded-lg flex flex-col md:flex-row overflow-hidden">
            {/* Right - App Introduction */}
            <div className="w-full md:w-1/2 bg-gradient-to-r from-blue-600 to-purple-500 text-white flex flex-col items-center justify-center p-6 md:p-10 text-center">
            <FaRobot className="text-5xl md:text-6xl mb-4" />
            <h2 className="text-2xl md:text-3xl font-bold">Welcome to Anvobot!</h2>
            <p className="mt-3 md:mt-4 text-base md:text-lg">
              Your AI-powered assistant to boost productivity and automate tasks.  
              Login now to explore the future of smart automation!
            </p>
          </div>
          {/* Left - Login Form */}
          <div className="w-full md:w-1/2 p-6 md:p-10">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 md:mb-6 text-center">Welcome Back!</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input 
                type="email" placeholder="Email" value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500" required
              />
              <input 
                type="password" placeholder="Password" value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500" required
              />
              <button 
                type="submit" 
                className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg font-semibold text-lg shadow-md hover:bg-blue-700 transition"
              >
                Login
              </button>
            </form>
            <p className="text-center text-gray-600 mt-4">
              Don't have an account? <Link to="/signup" className="text-blue-600 font-semibold">Signup</Link>
            </p>
          </div>

        

        </div>
      </div>

      {/* Footer */}
   <Footer/>
      
    </div>
  );
};

export default Login;
