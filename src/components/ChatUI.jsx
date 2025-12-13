import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { 
  AiOutlineSend, 
  AiOutlineClose,
  AiOutlineUser,
  AiOutlineRobot
} from "react-icons/ai";
import { 
  FiMic, 
  FiPaperclip,
  FiThumbsUp,
  FiThumbsDown
} from "react-icons/fi";
import { BsDot } from "react-icons/bs";

const ChatUI = () => {
  const [messages, setMessages] = useState([
    { 
      role: "bot", 
      content: "Hello! 👋 I'm Anvobot, your AI assistant. How may I help you today?" 
    }
  ]);
  const [input, setInput] = useState("");
  const [websiteId, setWebsiteId] = useState(null);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Bot thinking messages
  const thinkingMessages = [
    "Thinking...",
    "Processing your request...",
    "Analyzing...",
    "Generating response..."
  ];

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const extractedWebsiteId = urlParams.get("websiteId");

    if (extractedWebsiteId) {
      setWebsiteId(extractedWebsiteId);
    } else {
      console.error("❌ Website ID is missing in URL.");
    }

    let storedUserId = localStorage.getItem("userId");
    if (!storedUserId) {
      storedUserId = crypto.randomUUID();
      localStorage.setItem("userId", storedUserId);
    }
    setUserId(storedUserId);
    
    // Focus input on load
    setTimeout(() => {
      inputRef.current?.focus();
    }, 500);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ 
      behavior: "smooth",
      block: "end" 
    });
  }, [messages, isTyping]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    if (!websiteId || !userId) {
      setMessages((prev) => [...prev, { 
        role: "bot", 
        content: "❌ Missing required data. Please refresh the page." 
      }]);
      return;
    }

    const userMessage = { 
      role: "user", 
      content: input,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);
    setIsTyping(true);

    // Simulate thinking with random messages
    const thinkingInterval = setInterval(() => {
      const randomMessage = thinkingMessages[Math.floor(Math.random() * thinkingMessages.length)];
      setIsTyping(randomMessage);
    }, 2000);

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}chatbot/chat`,
        { message: input, websiteId, userId }
      );

      clearInterval(thinkingInterval);
      setIsTyping(false);
      
      setMessages((prev) => [...prev, { 
        role: "bot", 
        content: data.response,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    } catch (error) {
      console.error("Chatbot API Error:", error.response?.data || error.message);
      clearInterval(thinkingInterval);
      setIsTyping(false);

      if (error.response?.data?.error?.code === "rate_limit_exceeded") {
        const retryAfter = error.response?.data?.error?.message.match(/in (\d+m\d+\.\d+s)/);
        setMessages((prev) => [
          ...prev,
          { 
            role: "bot", 
            content: `⚠️ API rate limit exceeded. Please wait ${retryAfter ? retryAfter[1] : "a few minutes"} and try again.`,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          { 
            role: "bot", 
            content: "❌ Unable to process request. Please try again later.",
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          },
        ]);
      }
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

  const quickReplies = [
    "What services do you offer?",
    "Tell me about pricing",
    "How can I contact support?",
    "Book a consultation"
  ];

  const handleQuickReply = (reply) => {
    setInput(reply);
    setTimeout(() => {
      sendMessage();
    }, 100);
  };

  return (
    <div className="flex flex-col bg-gradient-to-br from-white to-gray-50 
                    w-full h-screen md:h-[600px] md:w-96 
                    shadow-2xl rounded-t-xl md:rounded-xl 
                    border border-gray-200 overflow-hidden">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 
                      text-white  flex items-center justify-between 
                      border-b border-blue-700">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <AiOutlineRobot className="text-xl" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 
                          rounded-full border-2 border-blue-600 flex items-center justify-center">
              <BsDot className="text-green-500 text-xs" />
            </div>
          </div>
          <div>
            <h2 className="font-bold text-lg">Anvobot AI</h2>
            <div className="flex items-center space-x-1 text-sm text-blue-100">
              <BsDot className="text-green-300 animate-pulse" />
              <span>Online • Ready to help</span>
            </div>
          </div>
        </div>
        <button 
          onClick={() => window.parent.postMessage('close-chat', '*')}
          className="text-white/80 hover:text-white p-2 rounded-full hover:bg-white/10 transition"
        >
          <AiOutlineClose className="text-xl" />
        </button>
      </div>

      {/* Welcome Message */}
      <div className="px-4 py-3 bg-gradient-to-r from-blue-50 to-purple-50 
                      border-b border-gray-200">
        <p className="text-gray-700 text-sm font-medium">
          💬 Welcome! I'm here to assist you 24/7. Ask me anything!
        </p>
      </div>

      {/* Chat Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-white to-gray-50/50">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div className={`max-w-[85%] ${msg.role === "user" ? "order-2" : "order-1"}`}>
              <div className={`flex items-end space-x-2 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
                {/* Avatar */}
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center
                              ${msg.role === "user" 
                                ? "bg-gradient-to-r from-blue-500 to-blue-600" 
                                : "bg-gradient-to-r from-gray-700 to-gray-800"}`}>
                  {msg.role === "user" ? (
                    <AiOutlineUser className="text-white text-sm" />
                  ) : (
                    <AiOutlineRobot className="text-white text-sm" />
                  )}
                </div>
                
                {/* Message Bubble */}
                <div className={`rounded-2xl px-4 py-3 shadow-sm
                              ${msg.role === "user" 
                                ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-br-none" 
                                : "bg-white text-gray-800 border border-gray-200 rounded-bl-none"}`}>
                  <p className="text-sm md:text-base whitespace-pre-wrap">{msg.content}</p>
                  
                  {/* Timestamp */}
                  {msg.timestamp && (
                    <div className={`text-xs mt-2 ${msg.role === "user" ? "text-blue-100" : "text-gray-500"}`}>
                      {msg.timestamp}
                    </div>
                  )}
                  
                  {/* Feedback buttons for bot messages */}
                  {msg.role === "bot" && index === messages.length - 1 && (
                    <div className="flex items-center space-x-2 mt-2">
                      <button className="text-gray-400 hover:text-gray-600 transition p-1">
                        <FiThumbsUp className="text-sm" />
                      </button>
                      <button className="text-gray-400 hover:text-gray-600 transition p-1">
                        <FiThumbsDown className="text-sm" />
                      </button>
                      <button className="text-xs text-gray-500 hover:text-blue-500 transition">
                        Copy
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
        
        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex justify-start">
            <div className="max-w-[85%]">
              <div className="flex items-end space-x-2">
                <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center
                              bg-gradient-to-r from-gray-700 to-gray-800">
                  <AiOutlineRobot className="text-white text-sm" />
                </div>
                <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-none px-4 py-3">
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
                    <span className="text-gray-600 text-sm ml-2">{isTyping}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} className="h-4" />
      </div>

      {/* Quick Replies */}
      {messages.length <= 2 && (
        <div className="px-4 py-3 border-t border-gray-200 bg-white">
          <p className="text-xs text-gray-500 mb-2 font-medium">💡 Quick questions:</p>
          <div className="flex flex-wrap gap-2">
            {quickReplies.map((reply, index) => (
              <button
                key={index}
                onClick={() => handleQuickReply(reply)}
                className="px-3 py-2 text-xs bg-gradient-to-r from-blue-50 to-purple-50 
                         hover:from-blue-100 hover:to-purple-100 text-gray-700 
                         rounded-full border border-blue-100 transition 
                         hover:border-blue-300 hover:shadow-sm"
              >
                {reply}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="border-t border-gray-200 bg-white p-4">
        <div className="flex items-center space-x-2">
          {/* Attachment Button */}
          <button className="p-2 text-gray-500 hover:text-blue-500 transition rounded-full 
                           hover:bg-gray-100" disabled>
            <FiPaperclip className="text-lg" />
          </button>
          
          {/* Voice Input */}
          <button className="p-2 text-gray-500 hover:text-blue-500 transition rounded-full 
                           hover:bg-gray-100" disabled>
            <FiMic className="text-lg" />
          </button>
          
          {/* Input Field */}
          <div className="flex-1 relative">
            <input
              ref={inputRef}
              type="text"
              className="w-full border border-gray-300 rounded-full py-3 px-4 
                       focus:outline-none focus:ring-2 focus:ring-blue-300 
                       focus:border-blue-500 pr-12 placeholder-gray-400
                       bg-gray-50 hover:bg-white transition"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message here..."
              disabled={loading}
            />
            
            {/* Character counter */}
            {input.length > 0 && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 
                            text-xs text-gray-400">
                {input.length}/500
              </div>
            )}
          </div>
          
          {/* Send Button */}
          <button
            className={`p-3 rounded-full flex items-center justify-center 
                      transition-all duration-200 shadow-sm
                      ${input.trim() && !loading
                        ? "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-md"
                        : "bg-gray-200 text-gray-400 cursor-not-allowed"}`}
            onClick={sendMessage}
            disabled={!input.trim() || loading}
          >
            <AiOutlineSend className="text-lg" />
          </button>
        </div>
        
        {/* Input Help Text */}
        
      </div>

      {/* Footer */}
      
    </div>
  );
};

export default ChatUI;