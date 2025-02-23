// src/pages/ForgotPassword.jsx
import React from "react";
import { useState } from "react";
import axios from "axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${import.meta.env.VITE_SERVER_URL}auth/forgot-password`, { email });
      alert("Password reset link sent to email.");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Forgot Password</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="email" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-2 border rounded" />
        <button type="submit" className="bg-orange-500 text-white px-4 py-2 rounded">Send Reset Link</button>
      </form>
    </div>
  );
};

export default ForgotPassword;
