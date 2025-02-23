import React, { useRef } from "react";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { AiOutlineUserAdd, AiOutlineLink, AiOutlineCode  } from "react-icons/ai";
import { FaRobot } from "react-icons/fa6";

const HomePage = () => {
  const howItWorksRef = useRef(null);

  const scrollToHowItWorks = () => {
    howItWorksRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-100 to-gray-300">
      {/* Navbar */}
      <nav className="bg-gradient-to-r from-blue-600 to-purple-500 text-white p-5 flex justify-between items-center shadow-lg">
      <h1 className="text-3xl font-extrabold tracking-wide flex items-center gap-2">
  <FaRobot className="text-4xl text-white" /> Anvobot
</h1>        <div>
          <Link to='/signup' className="px-6 py-2 border border-white rounded-lg hover:bg-white hover:text-blue-600 transition">
            Sign Up
          </Link>
          <Link to='/login' className="ml-4 px-6 py-2 bg-white text-blue-600 rounded-lg hover:bg-blue-700 hover:text-white transition">
            Login
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="text-center py-24 flex flex-col items-center bg-gradient-to-r from-blue-50 to-white shadow-lg">
        <h2 className="text-5xl font-extrabold text-gray-900 leading-tight drop-shadow-lg">
          AI Chatbot for Your Website 🚀
        </h2>
        <p className="mt-4 text-xl text-gray-600 max-w-3xl">
          Enhance customer engagement with an AI-powered chatbot for seamless communication.
        </p>
        <div className="mt-8 flex gap-6">
          <Link to='/login' className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold text-lg shadow-md hover:bg-blue-700 transition">
            Login
          </Link>
          <button
            className="px-8 py-3 bg-gray-800 text-white rounded-lg font-semibold text-lg flex items-center gap-2 shadow-md hover:bg-gray-900 transition"
            onClick={scrollToHowItWorks}
          >
            Learn More <FaArrowRight />
          </button>
        </div>
      </header>

      {/* How It Works */}
      <section ref={howItWorksRef} className="py-20 bg-white text-center">
  <h3 className="text-4xl font-bold text-gray-900">How It Works</h3>
  <p className="text-gray-600 mb-12 text-lg">3 easy steps to get started</p>
  
  <div className="grid md:grid-cols-3 gap-10 px-6">
    {[
      { 
      
        title: "Create an Account", 
        text: "Sign up and log in to your account.", 
        icon: <AiOutlineUserAdd className="text-5xl text-blue-600 mx-auto mb-4" />
      },
      { 
       
        title: "Input Your Website URL", 
        text: "Provide your website URL to integrate.", 
        icon: <AiOutlineLink className="text-5xl text-blue-600 mx-auto mb-4" />
      },
      { 
        
        title: "Get Link & Paste", 
        text: "Embed the chatbot link on your site.", 
        icon: <AiOutlineCode className="text-5xl text-blue-600 mx-auto mb-4" />
      }
    ].map((item, index) => (
      <div 
        key={index} 
        className="bg-white p-8 rounded-lg shadow-xl transform hover:scale-105 transition-all duration-300 hover:shadow-2xl"
      >
        {item.icon}
        <h4 className="font-semibold text-2xl text-gray-900 mt-3">{item.title}</h4>
        <p className="text-gray-600 mt-3">{item.text}</p>
      </div>
    ))}
  </div>
</section>

      {/* Team Section */}
      <section className="py-20 bg-gradient-to-r from-gray-50 to-gray-100 text-center">
        <h3 className="text-4xl font-bold text-gray-900">Meet Our Team</h3>
        <p className="text-gray-600 mb-12 text-lg">Our experts behind the AI chatbot</p>
        <div className="grid md:grid-cols-3 gap-10 px-6">
          {[
            { name: "John Doe", role: "CEO", img: "https://static.vecteezy.com/system/resources/thumbnails/002/002/403/small/man-with-beard-avatar-character-isolated-icon-free-vector.jpg" },
            { name: "Jane Smith", role: "Lead Developer", img: "https://static.vecteezy.com/system/resources/thumbnails/002/002/403/small/man-with-beard-avatar-character-isolated-icon-free-vector.jpg" },
            { name: "Mike Johnson", role: "UI/UX Designer", img: "https://static.vecteezy.com/system/resources/thumbnails/002/002/403/small/man-with-beard-avatar-character-isolated-icon-free-vector.jpg" }
          ].map((member, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-lg shadow-xl text-center hover:shadow-2xl transition transform hover:scale-105"
            >
              <img src={member.img} alt={member.name} className="w-28 h-28 mx-auto rounded-full mb-5 border-4 border-blue-500 shadow-lg" />
              <h4 className="font-bold text-2xl text-gray-900">{member.name}</h4>
              <p className="text-gray-600">{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-blue-600 to-purple-500 text-white text-center py-6 text-lg font-medium">
        &copy; 2025 ChatBot AI. All rights reserved.
      </footer>
    </div>
  );
};

export default HomePage;
