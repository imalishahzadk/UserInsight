(function () {
  // Check for chatbotId in URL parameters
  const params = new URLSearchParams(document.currentScript.src.split("?")[1]);
  let chatbotId = params.get("chatbotId");

  if (!chatbotId) {
    chatbotId = window.chatbotId;
  }

  if (!chatbotId) {
    console.error(
      "Chatbot ID is missing. Please provide it via script URL or window.chatbotId."
    );
    return;
  }

  fetch(`http://localhost:4000/widget/get-bot-appearence?agentId=${chatbotId}`)
    .then((response) => response.json())
    .then((appearance) => {
      initializeChatbot(appearance?.data);
    })
    .catch((error) => {
      console.error("Error loading chatbot appearance:", error);
      initializeChatbot({
        width: 410,
        height: 500,
        isDefaultOpen: false,
      });
    });

  function initializeChatbot(appearance) {
    const style = document.createElement("style");
    style.innerHTML = `
      #chatbotIframe::-webkit-scrollbar {
          width: 8px;
          border-radius: 10px;
      }
      #chatbotIframe::-webkit-scrollbar-thumb {
          background: #007bff;
          border-radius: 10px;
      }
      #chatbotIframe::-webkit-scrollbar-thumb:hover {
          background: #0056b3;
      }
      #chatbotIframe::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
      }
      iframe {
          box-sizing: border-box;
      }
    `;
    document.head.appendChild(style);

    const button = document.createElement("button");
    button.innerText = "Chat with us";
    button.style.position = "fixed";
    button.style.bottom = "20px";
    button.style.right = "20px";
    button.style.zIndex = "9998";
    button.style.padding = "10px 20px";
    button.style.backgroundColor = "#007bff";
    button.style.color = "#fff";
    button.style.border = "none";
    button.style.borderRadius = "5px";
    button.style.cursor = "pointer";
    button.style.boxShadow = "0px 4px 6px rgba(0, 0, 0, 0.1)";
    button.style.fontSize = "14px";

    const iframe = document.createElement("iframe");
    iframe.id = "chatbotIframe";
    iframe.src = `http://localhost:3000/chatbot/?chatbotId=${chatbotId}`;
    iframe.style.border = "none";
    iframe.style.width = `${appearance?.width ?? 420}px`;
    iframe.style.height = `${appearance?.height ?? 600}px`;
    iframe.style.position = "fixed";
    iframe.style.bottom = "80px";
    iframe.style.right = "20px";
    iframe.style.zIndex = "9999";
    iframe.style.boxShadow = "0px 4px 6px rgba(0, 0, 0, 0.1)";
    iframe.style.borderRadius = "16px";
    iframe.style.overflow = "hidden";
    iframe.style.flexDirection = "column";
    iframe.style.display = appearance?.isDefaultOpen ? "flex" : "none";
    iframe.allow = "microphone";

    iframe.onload = function () {
      const iframeDocument = iframe.contentWindow.document;
      iframeDocument.body.style.margin = "0";
      iframeDocument.body.style.padding = "0";
      iframeDocument.body.style.boxSizing = "border-box";
      iframeDocument.body.style.overflowY = "auto";
      iframeDocument.body.style.width = "100%";
      iframeDocument.body.style.height = "100%";

      const iframeStyle = iframeDocument.createElement("style");
      iframeStyle.innerHTML = `
        ::-webkit-scrollbar {
            width: 8px;
            border-radius: 10px;
        }
        ::-webkit-scrollbar-thumb {
            background: #007bff;
            border-radius: 10px;
        }
        ::-webkit-scrollbar-thumb:hover {
            background: #0056b3;
        }
        ::-webkit-scrollbar-track {
            background: #f1f1f1;
            border-radius: 10px;
        }
      `;
      iframeDocument.head.appendChild(iframeStyle);
    };

    button.addEventListener("click", function () {
      iframe.style.display = iframe.style.display === "none" ? "flex" : "none";
    });

    document.body.appendChild(button);
    document.body.appendChild(iframe);
  }
})();
