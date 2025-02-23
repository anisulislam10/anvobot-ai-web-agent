import React, { useState } from "react";
import ChatUI from "./ChatUI";
import { BiMessageSquareDetail } from "react-icons/bi";

const ChatbotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div >

      <ChatUI/>
      
    </div>
  );
};

export default ChatbotWidget;
