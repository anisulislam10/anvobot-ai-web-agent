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
      <img src="https://cdn-icons-png.flaticon.com/512/13330/13330989.png" alt="Chat Icon" width="24" height="24">
  `;

  Object.assign(chatButton.style, {
    position: "fixed",
    bottom: "15px",
    right: "15px",
    background: "#007bff",
    color: "white",
    padding: "10px",
    border: "none",
    borderRadius: "50%",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: "10000",
    width: "50px",
    height: "50px",
    boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
    transition: "all 0.3s ease-in-out",
  });

  document.body.appendChild(chatButton);

  // Load chatbot UI when button is clicked
  chatButton.addEventListener("click", function () {
    let chatFrame = document.getElementById("chatbot-frame");

    if (!chatFrame) {
      chatFrame = document.createElement("iframe");
      chatFrame.id = "chatbot-frame";
      chatFrame.src = `http://localhost:5173/chat?websiteId=${websiteId}`;

      // Responsive styles for different screens
      const screenWidth = window.innerWidth;
      let width = "400px";
      let height = "500px";
      let bottom = "80px";

      if (screenWidth < 768) {
        // Mobile View
        width = "90vw";
        height = "60vh";
        bottom = "70px";
        chatButton.style.width = "40px";
        chatButton.style.height = "40px";
      } else if (screenWidth < 1024) {
        // Tablet View
        width = "350px";
        height = "450px";
      }

      Object.assign(chatFrame.style, {
        position: "fixed",
        bottom,
        right: "15px",
        width,
        height,
        border: "none",
        background: "white",
        boxShadow: "0px 0px 10px rgba(0,0,0,0.2)",
        borderRadius: "10px",
        zIndex: "10000",
        display: "block",
      });

      // Close button
      // let closeButton = document.createElement("button");
      // closeButton.innerHTML = "×";
      // Object.assign(closeButton.style, {
      //   position: "absolute",
      //   top: "10px",
      //   right: "10px",
      //   background: "red",
      //   color: "white",
      //   border: "none",
      //   padding: "5px",
      //   cursor: "pointer",
      //   fontSize: "14px",
      //   borderRadius: "50%",
      //   width: "25px",
      //   height: "25px",
      //   textAlign: "center",
      //   lineHeight: "20px",
      // });

      // closeButton.addEventListener("click", function () {
      //   chatFrame.remove();
      //   closeButton.remove();
      // });

      document.body.appendChild(chatFrame);
      document.body.appendChild(closeButton);
    } else {
      chatFrame.style.display = chatFrame.style.display === "none" ? "block" : "none";
    }
  });
})();
