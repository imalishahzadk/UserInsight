import { sendEvent, fetchLeadSettings } from "../core/sendEvent";

// Get tracking ID from script tag
function getInsightIdFromScript() {
  const scripts = document.getElementsByTagName("script");
  for (let script of scripts) {
    const src = script.src || "";
    const match = src.match(/trackingId=([^&]+)/);
    if (match) return match[1];
  }
  return null;
}

const insightId = getInsightIdFromScript();
const POPUP_ID = "lead-capture-modal";
let isModalOpen = false;
let leadSettings = null;
let shadowRoot = null;

// Create input field
function createInput(id, placeholder) {
  return `<input id="${id}" placeholder="${placeholder}" style="width: 100%; margin-bottom: 10px; padding: 10px; border-radius: 6px; border: 1px solid #ccc;">`;
}

// Show the lead capture modal in Shadow DOM
function showLeadPopup() {
  if (isModalOpen || document.getElementById("leadContainer") || !leadSettings)
    return;

  const { title, subtitle, fields } = leadSettings;

  let inputsHtml = "";
  if (fields?.name) inputsHtml += createInput("leadName", "Your Name");
  if (fields?.phone) inputsHtml += createInput("leadPhone", "Phone Number");
  if (fields?.email) inputsHtml += createInput("leadEmail", "Email");

  const style = `
    <style>
      #${POPUP_ID} {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: white;
        padding: 30px;
        border-radius: 12px;
        box-shadow: 0 8px 16px rgba(0,0,0,0.2);
        z-index: 1001;
        width: 360px;
        font-family: system-ui;
      }
      #leadOverlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.5);
        z-index: 1000;
      }
      button {
        padding: 10px 20px;
        border-radius: 6px;
        cursor: pointer;
      }
      #submitLeadBtn {
        border: none;
        background: #3498db;
        color: white;
      }
      #submitLeadBtn:disabled {
        background: #ccc;
        cursor: not-allowed;
      }
      #closeLeadModal {
        border: 1px solid #ccc;
        background: #fff;
      }
    </style>
  `;

  const modalHtml = `
    ${style}
    <div id="${POPUP_ID}">
      <h3 style="margin-bottom: 8px;">${title || "Get in Touch"}</h3>
      <p style="margin-bottom: 20px;">${
        subtitle || "start a conversation with us"
      }</p>
      ${inputsHtml}
      <div style="display: flex; justify-content: flex-end; gap: 12px;">
        <button id="closeLeadModal">Close</button>
        <button id="submitLeadBtn" disabled>Submit</button>
      </div>
    </div>
    <div id="leadOverlay"></div>
  `;

  const container = document.createElement("div");
  container.id = "leadContainer";
  container.style.position = "fixed";
  container.style.top = "0";
  container.style.left = "0";
  container.style.zIndex = "9999";

  shadowRoot = container.attachShadow({ mode: "open" });
  shadowRoot.innerHTML = modalHtml;
  document.body.appendChild(container);

  isModalOpen = true;

  const submitBtn = shadowRoot.getElementById("submitLeadBtn");

  function validateInputs() {
    let valid = true;

    const nameInput = fields?.name
      ? shadowRoot.getElementById("leadName")?.value.trim()
      : "";
    const phoneInput = fields?.phone
      ? shadowRoot.getElementById("leadPhone")?.value.trim()
      : "";
    const emailInput = fields?.email
      ? shadowRoot.getElementById("leadEmail")?.value.trim()
      : "";

    if (fields?.name && !nameInput) valid = false;
    if (fields?.phone && !/^\d{10,}$/.test(phoneInput)) valid = false;
    if (fields?.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput))
      valid = false;

    submitBtn.disabled = !valid;
  }

  if (fields?.phone) {
    const phoneInput = shadowRoot.getElementById("leadPhone");
    phoneInput.addEventListener("input", validateInputs);
    phoneInput.addEventListener("keypress", (e) => {
      if (!/[0-9]/.test(e.key)) e.preventDefault();
    });
  }
  if (fields?.email)
    shadowRoot
      .getElementById("leadEmail")
      .addEventListener("input", validateInputs);
  if (fields?.name)
    shadowRoot
      .getElementById("leadName")
      .addEventListener("input", validateInputs);

  shadowRoot
    .getElementById("closeLeadModal")
    .addEventListener("click", closeLeadModal);
  shadowRoot
    .getElementById("leadOverlay")
    .addEventListener("click", closeLeadModal);
  submitBtn.addEventListener("click", submitLead);
}

function closeLeadModal() {
  const modal = document.getElementById("leadContainer");
  if (modal) modal.remove();
  isModalOpen = false;
}

function submitLead() {
  const leadData = {
    name: shadowRoot.getElementById("leadName")?.value?.trim() || "",
    phone: shadowRoot.getElementById("leadPhone")?.value?.trim() || "",
    email: shadowRoot.getElementById("leadEmail")?.value?.trim() || "",
  };

  localStorage.setItem("leadSubmitted", "true");
  console.log("[Lead Captured]", leadData);
  closeLeadModal();
  trackLead(leadData);
}

export function trackLead(leadData) {
  const sessionKey = "analytics_session";
  const now = Date.now();

  let session = JSON.parse(localStorage.getItem(sessionKey));
  if (!session) session = { id: generateUUID(), timestamp: now, views: {} };

  const userId = getOrCreateUserId();

  const payload = {
    type: "lead",
    insight: insightId || "unknown",
    sessionId: session.id,
    userId,
    timestamp: new Date().toISOString(),
    ...leadData,
  };

  return sendEvent(payload).catch((err) => {
    console.warn("[Analytics] Failed to send lead data", err);
    saveFailedEvent(payload);
  });
}

function getOrCreateUserId() {
  const key = "analytics_user_id";
  let userId = localStorage.getItem(key);
  if (!userId) {
    userId = generateUUID();
    localStorage.setItem(key, userId);
  }
  return userId;
}

function generateUUID() {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );
}

function saveFailedEvent(event) {
  const failedKey = "analytics_failed_events";
  const events = JSON.parse(localStorage.getItem(failedKey)) || [];
  events.push(event);
  localStorage.setItem(failedKey, JSON.stringify(events));
}

async function startPopupScheduler() {
  const isLeadSubmitted = localStorage.getItem("leadSubmitted") === "true";
  if (isLeadSubmitted || !insightId) return;

  async function scheduleNext() {
    setTimeout(async () => {
      const isLeadSubmittedNow =
        localStorage.getItem("leadSubmitted") === "true";
      if (isLeadSubmittedNow || !insightId) return;

      const latestSettings = await fetchLeadSettings(insightId);
      if (latestSettings?.leadEnabled) {
        leadSettings = latestSettings;
        showLeadPopup();
      }

      scheduleNext();
    }, 5 * 1000); // Check every minute in production
  }

  scheduleNext();
}

// Start scheduler
startPopupScheduler();
