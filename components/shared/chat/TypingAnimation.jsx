import React from "react";

const TypingAnimation = ({ isDark = false }) => {
  return (
    <div className="chat-typing-effect">
      <span
        style={{
          backgroundColor: isDark ? "#ffffff" : "#000000",
        }}
      />
      <span
        style={{
          backgroundColor: isDark ? "#ffffff" : "#000000",
        }}
      />
      <span
        style={{
          backgroundColor: isDark ? "#ffffff" : "#000000",
        }}
      />
    </div>
  );
};

export default TypingAnimation;
