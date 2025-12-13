import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import ChatbotWidget from "../components/ChatbotWidget";
import axios from "axios";
import { FiLogOut, FiCopy, FiLoader, FiSettings, FiHome, FiMenu, FiCheck } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [websiteURL, setWebsiteURL] = useState("");
  const [loading, setLoading] = useState(false);
  const [embedScript, setEmbedScript] = useState(null);
  const [message, setMessage] = useState("");
  const [userData, setUserData] = useState();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();

  const Logout = () => {
    localStorage.removeItem("token");  
    sessionStorage.removeItem("token");  
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
    setMessage("❌ Please Enter a website URL.");
    return;
  }
  
  // Validate URL format
  const urlPattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/i;
  if (!urlPattern.test(websiteURL)) {
    setMessage("❌ Please enter a valid URL (e.g., https://example.com)");
    return;
  }

  setLoading(true);
  setMessage("");
  setEmbedScript(null);
  setCopied(false);
  
  try {
    const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}web/add-website`, {
      url: websiteURL,
    });
    
    console.log("Server response:", response.data); // Debug log
    
    // Check if response has script
    if (response.data.script) {
      setEmbedScript(response.data.script);
      setMessage(response.data.message || "✅ Website processed successfully!");
    } else {
      setMessage("❌ No script returned from server. Response: " + JSON.stringify(response.data));
    }
  } catch (error) {
    console.error("Error scraping website:", error);
    console.error("Error response data:", error.response?.data); // Debug log
    
    // Check if error response has script (for backward compatibility)
    if (error.response?.data?.script) {
      setEmbedScript(error.response.data.script);
      setMessage(error.response.data.message || "⚠️ Website already exists. Here's the embed script.");
    } else {
      setMessage(error.response?.data?.message || "❌ Failed to process website. Please check the URL and try again.");
    }
  }
  setLoading(false);
};
  const handleCopy = async () => {
    if (embedScript) {
      try {
        await navigator.clipboard.writeText(embedScript);
        setCopied(true);
        setMessage("📋 Script copied to clipboard! Paste it before the closing `</body>` tag.");
        
        // Reset copied state after 3 seconds
        setTimeout(() => {
          setCopied(false);
        }, 3000);
      } catch (err) {
        console.error('Failed to copy:', err);
        setMessage("❌ Failed to copy script to clipboard");
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleScrap();
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Mobile Sidebar Button */}
      <button
        className="absolute top-4 left-4 text-gray-600 md:hidden z-40"
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
              <FiHome className="mr-3" /> Dashboard
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
      <main className="flex-1 p-4 md:p-8">
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
        <div className="mt-8">
          {/* Website Input Card */}
          <div className="bg-white shadow-lg p-6 rounded-xl border border-gray-200 mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">📌 Add Your Website</h3>
            <p className="text-gray-500 mb-4">Scrape website content to integrate the chatbot.</p>
            
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <input
                type="text"
                placeholder="https://example.com"
                className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-500 transition"
                value={websiteURL}
                onChange={(e) => setWebsiteURL(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <button
                onClick={handleScrap}
                className={`bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition flex items-center justify-center min-w-[120px] ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <FiLoader className="animate-spin mr-2" /> Scraping...
                  </>
                ) : (
                  "Scrape Website"
                )}
              </button>
            </div>
            
            {message && (
              <div className={`mt-4 p-3 rounded-lg ${message.includes("✅") || message.includes("⚠️") ? "bg-green-50 border border-green-200" : "bg-red-50 border border-red-200"}`}>
                <p className={`font-medium ${message.includes("✅") ? "text-green-700" : message.includes("⚠️") ? "text-amber-700" : "text-red-700"}`}>
                  {message}
                </p>
              </div>
            )}
          </div>

          {/* Embed Script Box */}
          {embedScript && (
            <div className="bg-gradient-to-br from-gray-50 to-white shadow-lg p-6 rounded-xl border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">🔗 Embed Chatbot Script</h3>
              <p className="text-gray-600 mb-4">
                Copy and paste this script <span className="font-semibold">before the closing `&lt;/body&gt;` tag</span> of your website:
              </p>
              
              <div className="relative mb-4">
                <div className="bg-gray-900 p-4 rounded-lg overflow-x-auto">
                  <pre className="text-gray-100 text-sm font-mono whitespace-pre-wrap break-all">
                    {embedScript}
                  </pre>
                </div>
                <div className="absolute top-2 right-2">
                  <span className="bg-gray-800 text-gray-300 text-xs px-2 py-1 rounded">
                    Embed Script
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
                <button
                  onClick={handleCopy}
                  className={`flex-1 py-3 px-4 rounded-lg flex items-center justify-center transition ${
                    copied 
                      ? "bg-green-600 hover:bg-green-700 text-white" 
                      : "bg-blue-600 hover:bg-blue-700 text-white"
                  }`}
                >
                  {copied ? (
                    <>
                      <FiCheck className="mr-2" /> Copied!
                    </>
                  ) : (
                    <>
                      <FiCopy className="mr-2" /> Copy Script
                    </>
                  )}
                </button>
                
                <button
                  onClick={() => {
                    navigator.clipboard.writeText("https://anvobot-ai-web-agent.vercel.app/widget.js");
                    setMessage("📋 Widget URL copied to clipboard!");
                  }}
                  className="flex-1 py-3 px-4 bg-gray-600 hover:bg-gray-700 text-white rounded-lg flex items-center justify-center transition"
                >
                  <FiCopy className="mr-2" /> Copy Widget URL
                </button>
              </div>

              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">📝 Installation Instructions:</h4>
                <ol className="list-decimal pl-5 space-y-2 text-sm text-blue-700">
                  <li>Copy the script above</li>
                  <li>Open your website's HTML file</li>
                  <li>Find the closing `&lt;/body&gt;` tag</li>
                  <li>Paste the script just before `&lt;/body&gt;`</li>
                  <li>Save and upload your website</li>
                  <li>The chat button will appear in the bottom-right corner</li>
                </ol>
              </div>

              <div className="mt-4 text-xs text-gray-500">
                <p>💡 <strong>Note:</strong> The chatbot will appear as a floating button on your website. Click it to open the chat interface.</p>
              </div>
            </div>
          )}

          {/* How It Works Section */}
          {!embedScript && (
            <div className="mt-8 bg-white shadow-lg p-6 rounded-xl border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">🚀 How It Works</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-4">
                  <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-blue-600 font-bold text-xl">1</span>
                  </div>
                  <h4 className="font-semibold text-gray-700 mb-2">Enter Website URL</h4>
                  <p className="text-gray-600 text-sm">Enter the URL of the website you want to add the chatbot to</p>
                </div>
                <div className="text-center p-4">
                  <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-blue-600 font-bold text-xl">2</span>
                  </div>
                  <h4 className="font-semibold text-gray-700 mb-2">Scrape Content</h4>
                  <p className="text-gray-600 text-sm">Our system will analyze and extract content from your website</p>
                </div>
                <div className="text-center p-4">
                  <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-blue-600 font-bold text-xl">3</span>
                  </div>
                  <h4 className="font-semibold text-gray-700 mb-2">Embed Script</h4>
                  <p className="text-gray-600 text-sm">Copy and paste the generated script to your website</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Chatbot Widget Preview */}
        <div className="mt-10">
          {/* Optional: You can add a preview of the chatbot here if needed */}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;