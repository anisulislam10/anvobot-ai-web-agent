import React, { useState, useEffect } from "react";
import axios from "axios";
import { AiOutlineClose, AiOutlineSend } from "react-icons/ai";
import { BiMessageDetail } from "react-icons/bi";

const ChatUI = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [websiteId, setWebsiteId] = useState(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const extractedWebsiteId = urlParams.get("websiteId");

    if (extractedWebsiteId) {
      setWebsiteId(extractedWebsiteId);
    } else {
      console.error("Website ID is missing in URL.");
    }
  }, []);

  const sendMessage = async () => {
    if (!input.trim()) return;
    if (!websiteId) {
      setMessages((prev) => [...prev, { role: "bot", content: "❌ Website ID is missing." }]);
      return;
    }

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);

    try {
      const { data } = await axios.post(`${import.meta.env.VITE_SERVER_URL}chatbot/chat`, {
        message: input,
        websiteId
      });

      setMessages((prev) => [...prev, { role: "bot", content: data.response }]);
    } catch (error) {
      console.error("Chatbot API Error:", error.response?.data || error.message);
      setMessages((prev) => [...prev, { role: "bot", content: "❌ Error processing request." }]);
    }

    setInput("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="fixed  right-0.5 bg-white p-10 w-full h-full">
      {/* Header with Close Button */}
      <div className="flex justify-end items-start border-b pb-2 mb-1">
        <div className="flex items-start space-x-1">
          <h2 className="text-lg font-semibold"></h2>
        </div>
        {/* <button onClick={closeChat} className="text-gray-500 hover:text-red-500 cursor-pointer">
          <AiOutlineClose className="text-xl" />
        </button> */}
      </div>

      {/* Messages */}
      <div className="h-80 overflow-y-auto space-y-2 p-1">
        {messages.map((msg, index) => (
          <div key={index} className={`p-2 rounded-md max-w-4/5 ${msg.role === "user" ? "bg-blue-500 text-white self-end ml-auto" : "bg-gray-200 text-gray-800"}`}>
            <p>{msg.content}</p>
          </div>
        ))}
      </div>

      {/* Input Field */}
      <div className="flex mt-2">
        <input
          type="text"
          className="border p-2 w-full rounded-md focus:ring focus:ring-blue-300"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}  
          placeholder="Welcome! How may I help you today"
        />
        <button
          className="bg-blue-600 text-white p-2 ml-2 rounded-md flex items-center justify-center hover:bg-blue-700 transition"
          onClick={sendMessage}
        >
          <AiOutlineSend className="text-lg" />
        </button>
      </div>

      {/* Footer
      <div className="text-xs text-gray-500 text-center mt-3">
      </div> */}
    </div>
  );
};

export default ChatUI;
