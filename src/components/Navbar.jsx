// src/components/Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-blue-500 text-white p-4 flex justify-between">
      <h1 className="text-xl">Chatbot Dashboard</h1>
      {user ? (
        <button onClick={logout} className="bg-red-500 px-4 py-2 rounded">Logout</button>
      ) : (
        <div>
          <Link to="/login" className="mr-4">Login</Link>
          <Link to="/signup" className="bg-green-500 px-4 py-2 rounded">Signup</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
