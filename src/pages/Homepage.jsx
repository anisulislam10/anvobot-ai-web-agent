import React, { useRef } from "react";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { AiOutlineUserAdd, AiOutlineLink, AiOutlineCode } from "react-icons/ai";
import { FaRobot } from "react-icons/fa6";
import { IoIosSend } from "react-icons/io";
import Footer from "../components/Footer";

const HomePage = () => {
  const howItWorksRef = useRef(null);

  const scrollToHowItWorks = () => {
    howItWorksRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-100 to-gray-300">
      {/* Navbar */}
      <nav className="bg-gradient-to-r from-blue-600 to-purple-500 text-white p-4 md:p-5 flex justify-between items-center shadow-lg">
        <h1 className="text-2xl md:text-3xl font-extrabold flex items-center gap-2">
          <FaRobot className="text-3xl md:text-4xl text-white" /> Anvobot
        </h1>
        <div className="flex gap-3 md:gap-4">
          <Link to='/signup' className="px-4 md:px-6 py-2 border border-white rounded-lg hover:bg-white hover:text-blue-600 transition">
            Sign Up
          </Link>
          <Link to='/login' className="px-4 md:px-6 py-2 bg-white text-blue-600 rounded-lg hover:bg-blue-700 hover:text-white transition">
            Login
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="text-center py-16 md:py-24 flex flex-col items-center bg-gradient-to-r from-blue-50 to-white shadow-lg px-4">
        <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 leading-tight drop-shadow-lg">
          AI Chatbot for Your Website 🚀
        </h2>
        <p className="mt-4 text-lg md:text-xl text-gray-600 max-w-3xl">
          Enhance customer engagement with an AI-powered chatbot for seamless communication. Let our AI agent handle all visitor queries 24/7!
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <Link to='/login' className="px-6 md:px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold text-lg shadow-md hover:bg-blue-700 transition">
            Login
          </Link>
          <button
            className="px-6 md:px-8 py-3 bg-gray-800 text-white rounded-lg font-semibold text-lg flex items-center gap-2 shadow-md hover:bg-gray-900 transition"
            onClick={scrollToHowItWorks}
          >
            Learn More <FaArrowRight />
          </button>
        </div>
      </header>

      {/* How It Works */}
      <section ref={howItWorksRef} className="py-16 md:py-20 bg-white text-center px-4">
        <h3 className="text-3xl md:text-4xl font-bold text-gray-900">How It Works</h3>
        <p className="text-gray-600 mb-8 md:mb-12 text-lg">3 easy steps to get started</p>
        
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
          {[ 
            { title: "Create an Account", text: "Sign up and log in to your account.", icon: <AiOutlineUserAdd className="text-5xl text-blue-600 mx-auto" /> },
            { title: "Input Your Website URL", text: "Provide your website URL to integrate.", icon: <AiOutlineLink className="text-5xl text-blue-600 mx-auto" /> },
            { title: "Get Link & Paste", text: "Get a magic link to embed the chatbot.", icon: <AiOutlineCode className="text-5xl text-blue-600 mx-auto" /> },
            { title: "That's It", text: "Paste it into your code and let AI handle queries!", icon: <IoIosSend className="text-5xl text-blue-600 mx-auto" /> }
          ].map((item, index) => (
            <div 
              key={index} 
              className="bg-white p-6 md:p-8 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300 hover:shadow-2xl"
            >
              {item.icon}
              <h4 className="font-semibold text-xl md:text-2xl text-gray-900 mt-3">{item.title}</h4>
              <p className="text-gray-600 mt-2">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-gray-50 to-gray-100 text-center px-4">
        <h3 className="text-3xl md:text-4xl font-bold text-gray-900">Meet Our Team</h3>
        <p className="text-gray-600 mb-8 md:mb-12 text-lg">Our experts behind the AI chatbot</p>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-1">
          {[ 
            { name: "Anisul Islam", role: "Founder and Developer", 
              img: "https://media.licdn.com/dms/image/v2/D4D03AQGSZ5tJniCvvQ/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1711959792337?e=2147483647&v=beta&t=rxh6TZL_5b0AVToD_1mTT8uVTXyHUjGJC7X_tqdwX1E" }
          ].map((member, index) => (
            <div
              key={index}
              className="bg-white p-6 md:p-8 rounded-lg shadow-lg text-center hover:shadow-2xl transition transform hover:scale-105"
            >
              <img src={member.img} alt={member.name} className="w-24 md:w-28 h-24 md:h-28 mx-auto rounded-full mb-4 border-4 border-blue-500 shadow-lg" />
              <h4 className="font-bold text-xl md:text-2xl text-gray-900">{member.name}</h4>
              <p className="text-gray-600">{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HomePage;