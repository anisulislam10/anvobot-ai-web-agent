import React, { useState, useEffect } from "react";
import axios from "axios";
import { AiOutlineClose, AiOutlineSend } from "react-icons/ai";
import { BiMessageDetail } from "react-icons/bi";

const ChatUI = ({ closeChat }) => {
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
      setMessages([...messages, { role: "bot", content: "❌ Website ID is missing." }]);
      return;
    }

    const userMessage = { role: "user", content: input };
    setMessages([...messages, userMessage]);

    try {
      const { data } = await axios.post(`${import.meta.env.VITE_SERVER_URL}chatbot/chat`, {
        message: input,
        websiteId
      });

      setMessages([...messages, userMessage, { role: "bot", content: data.response }]);
    } catch (error) {
      console.error("Chatbot API Error:", error.response?.data || error.message);
      setMessages([...messages, userMessage, { role: "bot", content: "❌ Error processing request." }]);
    }

    setInput("");
  };

  return (
    <div className="fixed bottom-1 right-4 bg-white p-7 w-full h-full">
      <div className="flex justify-between items-center border-b pb-2 mb-2">
        <div className="flex items-center space-x-2">
          <BiMessageDetail className="text-blue-600 text-xl" />
          <h2 className="text-lg font-semibold">Anvobot</h2>
        </div>
        <AiOutlineClose className="text-gray-500 hover:text-red-500 cursor-pointer text-xl" onClick={closeChat} />
      </div>

      <div className="h-80 overflow-y-auto space-y-2 p-1">
        {messages.map((msg, index) => (
          <div key={index} className={`p-2 rounded-md max-w-4/5 ${msg.role === "user" ? "bg-blue-500 text-white self-end ml-auto" : "bg-gray-200 text-gray-800"}`}>
            <p>{msg.content}</p>
          </div>
        ))}
      </div>

      <div className="flex mt-2">
        <input
          type="text"
          className="border p-2 w-full rounded-md focus:ring focus:ring-blue-300"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask..."
        />
        <button
          className="bg-blue-600 text-white p-2 ml-2 rounded-md flex items-center justify-center hover:bg-blue-700 transition"
          onClick={sendMessage}
        >
          <AiOutlineSend className="text-lg" />
        </button>
      </div>

      <div className="text-xs text-gray-500 text-center mt-3">
        Developed by <span className="font-semibold text-blue-500 text-md">Sharplogicians</span>
      </div>
    </div>
  );
};

export default ChatUI;
