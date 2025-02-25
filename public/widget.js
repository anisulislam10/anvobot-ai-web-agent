(function () {
  if (window.chatbotInjected) return;
  window.chatbotInjected = true;

  // Extract Website ID from the script URL
  const scriptTag = document.currentScript;
  const urlParams = new URLSearchParams(scriptTag.src.split("?")[1]);
  const websiteId = urlParams.get("websiteId");

  if (!websiteId) {
      console.error("❌ Website ID is missing in the script URL!");
      return;
  }

  // Create chatbot button
  let chatButton = document.createElement("button");
  chatButton.innerHTML = `
      <img src="https://cdn-icons-png.flaticon.com/512/13330/13330989.png" alt="Chat Icon" width="24" height="24" style="margin-right: 5px;">
      <span>Anvobot</span>
  `;

  Object.assign(chatButton.style, {
      position: "fixed",
      bottom: "20px",
      right: "20px",
      background: "#007bff",
      color: "white",
      padding: "12px 15px",
      border: "none",
      borderRadius: "50px",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      gap: "8px",
      zIndex: "10000",
      fontSize: "14px",
      fontWeight: "bold",
      boxShadow: "0px 4px 6px rgba(0,0,0,0.1)"
  });

  document.body.appendChild(chatButton);

  // Load chatbot UI when button is clicked
  chatButton.addEventListener("click", function () {
      let chatFrame = document.getElementById("chatbot-frame");

      if (!chatFrame) {
          chatFrame = document.createElement("iframe");
          chatFrame.id = "chatbot-frame";
          chatFrame.src = `https://anvobot-ai-web-agent.vercel.app/chat?websiteId=${websiteId}`;
          
          Object.assign(chatFrame.style, {
              position: "fixed",
              bottom: "80px",
              right: "20px",
              width: "400px",
              height: "500px",
              border: "none",
              background: "white",
              boxShadow: "0px 0px 10px rgba(0,0,0,0.2)",
              borderRadius: "10px",
              zIndex: "10000",
              display: "block"
          });

          document.body.appendChild(chatFrame);

          // Add Close Button Inside Iframe
          let closeButton = document.createElement("button");
          closeButton.innerHTML = "✖";
          
          Object.assign(closeButton.style, {
              position: "absolute",
              top: "10px",
              right: "10px",
              background: "red",
              color: "white",
              border: "none",
              padding: "5px",
              cursor: "pointer",
              fontSize: "14px",
              borderRadius: "50%"
          });

          closeButton.addEventListener("click", function () {
              chatFrame.remove();
          });

          document.body.appendChild(closeButton);
      } else {
          chatFrame.style.display = chatFrame.style.display === "none" ? "block" : "none";
      }
  });
})();
