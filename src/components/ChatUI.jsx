import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { AiOutlineSend } from "react-icons/ai";

const ChatUI = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [websiteId, setWebsiteId] = useState(null);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

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
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    if (!websiteId || !userId) {
      setMessages((prev) => [...prev, { role: "bot", content: "❌ Missing required data." }]);
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
      console.error("Chatbot API Error:", error.response?.data || error.message);

      if (error.response?.data?.error?.code === "rate_limit_exceeded") {
        const retryAfter = error.response?.data?.error?.message.match(/in (\d+m\d+\.\d+s)/);
        setMessages((prev) => [
          ...prev,
          { role: "bot", content: `⚠️ API rate limit exceeded. Please wait ${retryAfter ? retryAfter[1] : "a few minutes"} and try again.` },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          { role: "bot", content: "❌ Unable to process request. Please try again later." },
        ]);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="fixed bottom-5 right-3 bg-white p-4 rounded-lg shadow-lg flex flex-col 
                    w-full h-full sm:max-w-sm sm:h-[80vh] md:max-w-md lg:max-w-lg">
      
      {/* Messages */}
      <div className="flex-grow overflow-y-auto space-y-2 p-2">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-2 rounded-md max-w-4/5 ${
              msg.role === "user"
                ? "bg-blue-500 text-white self-end ml-auto"
                : "bg-gray-200 text-gray-800"
            }`}
          >
            <p>{msg.content}</p>
          </div>
        ))}
        {loading && (
          <div className="p-2 rounded-md bg-gray-200 text-gray-800">⏳ Typing...</div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Field */}
      <div className="flex items-center border-t p-2">
        <input
          type="text"
          className="border p-2 w-full rounded-md focus:ring focus:ring-blue-300"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Welcome! How may I help you today?"
        />
        <button
          className="bg-blue-600 text-white p-2 ml-2 rounded-md flex items-center justify-center 
                     hover:bg-blue-700 transition"
          onClick={sendMessage}
          disabled={loading}
        >
          <AiOutlineSend className="text-lg" />
        </button>
      </div>
    </div>
  );
};

export default ChatUI;
