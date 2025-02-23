import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import ChatbotWidget from "../components/ChatbotWidget";
import axios from "axios";
import { FiLogOut, FiCopy, FiLoader, FiSettings, FiHome, FiMenu } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [websiteURL, setWebsiteURL] = useState("");
  const [loading, setLoading] = useState(false);
  const [embedScript, setEmbedScript] = useState(null);
  const [message, setMessage] = useState("");
  const [userData, setUserData] = useState();
  const [sidebarOpen, setSidebarOpen] = useState(false); // State for mobile sidebar
  const navigate = useNavigate();


  const Logout = () => {
    // Clear user session (Modify based on your auth setup)
    localStorage.removeItem("token");  
    sessionStorage.removeItem("token");  

    // Navigate to homepage
    navigate("/");
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No token found, user not authenticated.");
          return;
        }

        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}auth/profile`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("User Profile Data:", response.data.user);
        setUserData(response.data.user);
      } catch (error) {
        console.error("Error fetching user profile:", error.response?.data || error.message);
      }
    };

    fetchData();
  }, []);

  const handleScrap = async () => {
    if (!websiteURL) {
      setMessage(" ❌ Please Enter a website URL.");
      return;
    }
    setLoading(true);
    setMessage("");
    setEmbedScript(null);
    try {
      const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}web/add-website`, {
        url: websiteURL,
        content: "",
      });
      setEmbedScript(response.data.script);
      setMessage("✅ Website scraped successfully! Embed the chatbot using the script.");
    } catch (error) {
      console.error("Error scraping website:", error);
      setMessage("❌ Failed to scrape website || You have Already Screaped this website.");
    }
    setLoading(false);
  };

  const handleCopy = () => {
    if (embedScript) {
      navigator.clipboard.writeText(embedScript);
      setMessage("📋 Script copied to clipboard!");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Mobile Sidebar Button */}
      <button
        className="absolute top-4 left-4 text-gray-600 md:hidden"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        <FiMenu size={24} />
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 w-64 bg-gradient-to-b from-gray-900 to-gray-800 text-white shadow-lg flex flex-col justify-between p-6 transition-transform duration-300 z-50 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:static`}
      >
        <div>
          {/* Profile Section */}
          <div className="flex items-center space-x-3 mb-6 p-4 bg-gray-800 rounded-lg">
            <img
              src="https://img.favpng.com/17/24/10/computer-icons-user-profile-male-avatar-png-favpng-jhVtWQQbMdbcNCahLZztCF5wk.jpg"
              alt="Profile"
              className="w-10 h-10 rounded-full border-2 border-gray-600"
            />
            <div>
              <p className="text-sm font-semibold">{userData?.name || "User Name"}</p>
              <p className="text-xs text-gray-400">{userData?.email || "user@example.com"}</p>
            </div>
          </div>

          <nav className="space-y-4">
            <a href="#" className="flex items-center text-gray-300 hover:text-white py-3 transition">
              <FiHome className="mr-3" /> Home
            </a>
            <a href="#" className="flex items-center text-gray-300 hover:text-white py-3 transition">
              <FiSettings className="mr-3" /> Settings
            </a>
          </nav>
        </div>

        <button
      onClick={Logout}
      className="flex items-center bg-red-500 hover:bg-red-600 text-white px-4 py-3 rounded-lg transition"
    >
      <FiLogOut className="mr-2 text-lg" /> Logout
    </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-8">
        {/* Navbar */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-500 text-white shadow-md rounded-xl px-6 py-4 flex flex-col md:flex-row justify-between items-center">
          <h2 className="text-xl md:text-2xl font-semibold">🤖 Setup Anvobot</h2>
          {user && (
            <div className="bg-white text-gray-700 px-4 py-2 rounded-full font-medium mt-2 md:mt-0">
              {user.email}
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Website Input */}
          <div className="bg-white shadow-lg p-6 rounded-xl border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">📌 Add Your Website</h3>
            <p className="text-gray-500 mb-4">Scrape website content to integrate the chatbot.</p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <input
                type="text"
                placeholder="Enter website URL"
                className="w-full border p-3 rounded-lg focus:ring focus:ring-blue-200 transition"
                value={websiteURL}
                onChange={(e) => setWebsiteURL(e.target.value)}
              />
              <button
                onClick={handleScrap}
                className={`bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition flex items-center ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={loading}
              >
                {loading ? <FiLoader className="animate-spin mr-2" /> : "Scrap"}
              </button>
            </div>
            {message && <p className="mt-4 text-gray-700">{message}</p>}
          </div>

          {/* Embed Script Box */}
          {embedScript && (
            <div className="bg-gray-50 shadow-lg p-6 rounded-xl border">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">🔗 Embed Chatbot</h3>
              <p className="text-gray-500 mb-3">Copy and paste this script to your website:</p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-2">
                <textarea
                  readOnly
                  className="w-full p-3 border rounded-lg bg-white"
                  value={embedScript}
                />
                <button
                  onClick={handleCopy}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center transition"
                >
                  <FiCopy className="mr-2" /> Copy
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Chatbot Widget */}
        <div className="mt-10">
          <ChatbotWidget />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
