import { sendEvent } from "./sendEvent";

let currentPage = getPageName();
let pageStartTime = Date.now();
let sessionId = null;
let userId = null;

const SESSION_TIMEOUT_MS = 30 * 60 * 1000;
const sessionKey = "analytics_session";

function getPageName() {
  return (
    window.location.pathname + window.location.search + window.location.hash
  );
}

export function startSessionTracking(insightId) {
  const now = Date.now();
  let session = JSON.parse(localStorage.getItem(sessionKey));

  if (!session || now - session.timestamp > SESSION_TIMEOUT_MS) {
    session = {
      id: generateUUID(),
      timestamp: now,
      views: {},
    };
    localStorage.setItem(sessionKey, JSON.stringify(session));
  }

  sessionId = session.id;
  userId = getOrCreateUserId();

  // Detect tab hide/show
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") {
      pauseTimerAndSend(insightId);
    } else if (document.visibilityState === "visible") {
      currentPage = getPageName(); // re-capture page
      resumeTimer();
      resendFailedEvents();
    }
  });

  // Detect page unload (close/reload)
  window.addEventListener("load", () => {
    console.log("[Analytics] Page unload detected");
    pauseTimerAndSend(insightId);
  });

  // Handle SPA navigation
  observeSPAChanges(insightId);

  // Retry previous failed events
  resendFailedEvents();
}

function pauseTimerAndSend(insightId) {
  if (!pageStartTime) return;

  const now = Date.now();
  const duration = Math.round((now - pageStartTime) / 1000);

  if (duration <= 0) return;

  const payload = {
    type: "session_duration",
    insight: insightId,
    sessionId,
    userId,
    page: window.location.href,
    duration,
    timestamp: new Date().toISOString(),
  };

  console.log("[Analytics] Sending page session duration:", payload);

  sendEvent(payload).catch((err) => {
    console.warn("[Analytics] Failed to send page duration", err);
    saveFailedEvent(payload);
  });

  pageStartTime = null;
}

function resumeTimer() {
  pageStartTime = Date.now();
}

// Debounce utility
function debounce(fn, delay = 300) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), delay);
  };
}

// For SPA (Single Page App) route detection using History API
function observeSPAChanges(insightId) {
  const originalPushState = history.pushState;
  const originalReplaceState = history.replaceState;

  const handleRouteChange = debounce(() => {
    const newPage = getPageName();
    if (newPage !== currentPage && document.visibilityState === "visible") {
      console.log("[Analytics] Route changed:", newPage);
      pauseTimerAndSend(insightId);
      currentPage = newPage;
      resumeTimer();
    }
  }, 200); // Adjust debounce timing if needed

  history.pushState = function (...args) {
    originalPushState.apply(this, args);
    handleRouteChange();
  };

  history.replaceState = function (...args) {
    originalReplaceState.apply(this, args);
    handleRouteChange();
  };

  window.addEventListener("popstate", handleRouteChange);
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

function resendFailedEvents() {
  const failedKey = "analytics_failed_events";
  const events = JSON.parse(localStorage.getItem(failedKey)) || [];
  if (!events.length) return;

  console.log(`[Analytics] Resending ${events.length} failed event(s)...`);

  const remaining = [];

  const promises = events.map((event) =>
    sendEvent(event).catch((err) => {
      console.warn("[Analytics] Resend failed:", err);
      remaining.push(event);
    })
  );

  Promise.all(promises).then(() => {
    if (remaining.length > 0) {
      localStorage.setItem(failedKey, JSON.stringify(remaining));
    } else {
      localStorage.removeItem(failedKey);
    }
  });
}
