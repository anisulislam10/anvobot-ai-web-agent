import React from 'react';
import { FaFacebookF, FaXTwitter, FaLinkedinIn } from "react-icons/fa6";
import { FaRobot } from "react-icons/fa6";
import { Link } from "react-router-dom";


const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-[#1e3a8a] to-[#9333ea] text-white py-10">
      <div className="container mx-auto px-6 md:px-12 lg:px-24 flex flex-col md:flex-row justify-between items-center text-center md:text-left">

        {/* Left Section - Title & Intro */}
        <div className="mb-6 md:mb-0 max-w-sm">
        <Link to='/'> 
        <h1 className="text-2xl md:text-3xl font-extrabold flex items-center gap-2">
          <FaRobot className="text-3xl md:text-4xl text-white" /> Anvobot
        </h1>
        </Link>         
         <p className="text-sm text-gray-200 mt-2 leading-relaxed">
            Just  add your site, get a  magic link, paste it into your Code,  
            and let our AI agent handle all your valuable visitors queries 24/7!  
          </p>
        </div>

        {/* Center Section - Contact Us */}
        <div className="mb-6 md:mb-0">
          <h3 className="text-lg font-semibold">Contact Us</h3>
          <p className="text-sm text-gray-300">📍 Bahria Town Civic Center, Islamabad</p>
          <p className="text-sm text-gray-300">📞 +92 3543 92 75550</p>
          <p className="text-sm text-gray-300">📧 anis.inbox10@gmail.com</p>
        </div>

        {/* Right Section - Follow Us */}
        <div>
          <h3 className="text-lg font-semibold">Follow Us</h3>
          <div className="flex justify-center md:justify-start space-x-4 mt-3">
            <a href="#" className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition duration-300">
              <FaFacebookF size={18} />
            </a>
            <a href="#" className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition duration-300">
              <FaXTwitter size={18} />
            </a>
            <a href="#" className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition duration-300">
              <FaLinkedinIn size={18} />
            </a>
          </div>
        </div>

      </div>

      {/* Copyright Section */}
      <div className="mt-6 text-center text-sm text-gray-300">
        &copy; {new Date().getFullYear()} Anvobot Web AI agent. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
