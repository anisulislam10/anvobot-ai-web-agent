import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { AiOutlineSend } from "react-icons/ai";
import { FiMessageSquare } from "react-icons/fi";

const ChatUI = () => {
  const [messages, setMessages] = useState([
    { role: "bot", content: "Welcome to our site! How may I help you today?" } // Initial welcome message
  ]);
  const [input, setInput] = useState("");
  const [websiteId, setWebsiteId] = useState(null);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const messagesEndRef = useRef(null);

  // Initialize chat (extract IDs)
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const extractedWebsiteId = urlParams.get("websiteId");

    if (extractedWebsiteId) {
      setWebsiteId(extractedWebsiteId);
    } else {
      console.error("Website ID is missing in URL.");
    }

    let storedUserId = localStorage.getItem("userId");
    if (!storedUserId) {
      storedUserId = crypto.randomUUID();
      localStorage.setItem("userId", storedUserId);
    }
    setUserId(storedUserId);
  }, []);

  // Auto-scroll to new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    if (!websiteId || !userId) {
      setMessages((prev) => [...prev, { role: "bot", content: "System error. Please refresh the page." }]);
      return;
    }

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}chatbot/chat`,
        { message: input, websiteId, userId }
      );

      setMessages((prev) => [...prev, { role: "bot", content: data.response }]);
    } catch (error) {
      console.error("Chatbot Error:", error);
      setMessages((prev) => [
        ...prev,
        { 
          role: "bot", 
          content: error.response?.data?.error?.code === "rate_limit_exceeded" 
            ? "Our agents are busy. Please try again shortly." 
            : "Sorry, I'm having trouble responding. Please try again later."
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-all"
        >
          <FiMessageSquare size={24} />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-full max-w-md h-[70vh] flex flex-col bg-white rounded-xl shadow-xl overflow-hidden border border-gray-200">
          {/* Header */}
          <div className="bg-blue-600 text-white p-4 flex justify-between items-center">
            <h2 className="font-semibold text-lg">Customer Support</h2>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-gray-200"
            >
              ×
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`mb-3 flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    msg.role === "user"
                      ? "bg-blue-600 text-white rounded-br-none"
                      : "bg-white text-gray-800 border border-gray-200 rounded-bl-none"
                  }`}
                >
                  <p className="whitespace-pre-wrap">{msg.content}</p>
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start mb-3">
                <div className="bg-white border border-gray-200 p-3 rounded-lg rounded-bl-none">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"></div>
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce delay-100"></div>
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce delay-200"></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-3 border-t border-gray-200 bg-white">
            <div className="flex items-center">
              <input
                type="text"
                className="flex-1 border border-gray-300 rounded-l-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your message..."
                disabled={loading}
              />
              <button
                className="bg-blue-600 text-white p-3 rounded-r-lg hover:bg-blue-700 disabled:bg-blue-400 transition"
                onClick={sendMessage}
                disabled={loading || !input.trim()}
              >
                <AiOutlineSend size={20} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatUI;