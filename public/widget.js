(function () {
    if (window.chatbotInjected) return;
    window.chatbotInjected = true;
  
    // Extract Website ID from the script URL
    const scriptTag = document.currentScript;
    const urlParams = new URLSearchParams(scriptTag.src.split("?")[1]);
    const websiteId = urlParams.get("websiteId");
  
    if (!websiteId) {
      console.error("Website ID is missing in the script URL!");
      return;
    }
  
    // Create a chatbot button
    let chatButton = document.createElement("button");
    chatButton.innerHTML = `
      <img src="https://cdn-icons-png.flaticon.com/512/13330/13330989.png" alt="Chat Icon" width="24" height="24" style="margin-right: 1px;"><span>Anvobot</span>
    `; 
  
    chatButton.style.position = "fixed";
    chatButton.style.bottom = "20px";
    chatButton.style.right = "20px";
    chatButton.style.background = "#007bff";
    chatButton.style.color = "white";
    chatButton.style.padding = "12px 15px";
    chatButton.style.border = "none";
    chatButton.style.borderRadius = "50px";
    chatButton.style.cursor = "pointer";
    chatButton.style.display = "flex";
    chatButton.style.alignItems = "center";
    chatButton.style.gap = "8px";
    chatButton.style.zIndex = "10000"; 
  
    document.body.appendChild(chatButton);
  
    // Load chatbot UI when button is clicked
    chatButton.addEventListener("click", function () {
      let chatFrame = document.getElementById("chatbot-frame");
      if (!chatFrame) {
        chatFrame = document.createElement("iframe");
        chatFrame.id = "chatbot-frame";
        chatFrame.src = `http://localhost:5174/chat?websiteId=${websiteId}`; 
        chatFrame.style.position = "fixed";
        chatFrame.style.bottom = "80px";
        chatFrame.style.right = "20px";
        chatFrame.style.width = "400px";
        chatFrame.style.height = "500px";
        chatFrame.style.border = "none";
        chatFrame.style.background = "white";
        chatFrame.style.boxShadow = "0px 0px 10px rgba(0,0,0,0.2)";
        chatFrame.style.borderRadius = "10px";
        chatFrame.style.zIndex = "10000";
  
        document.body.appendChild(chatFrame);
      } else {
        // Toggle visibility if already added
        chatFrame.style.display =
          chatFrame.style.display === "none" ? "block" : "none";
      }
    });
  })();
  