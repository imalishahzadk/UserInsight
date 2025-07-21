import { sendEvent } from "./sendEvent";

function getDeviceType() {
  const ua = navigator.userAgent;
  if (/Mobi|Android/i.test(ua)) return "mobile";
  else if (/Tablet|iPad/i.test(ua)) return "tablet";
  return "desktop";
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

export function trackPageView(insightId) {
  const pathname = window.location.pathname;
  const sessionKey = "analytics_session";
  const viewKey = `page_view_${pathname}`;
  const SESSION_TIMEOUT_MS = 30 * 60 * 1000; // 30 minutes

  const now = Date.now();
  let session = JSON.parse(localStorage.getItem(sessionKey));

  if (!session || now - session.timestamp > SESSION_TIMEOUT_MS) {
    session = {
      id: generateUUID(),
      timestamp: now,
      views: {},
    };
  }

  if (session.views?.[viewKey]) {
    console.log(`[Analytics] Skipping duplicate page_view for: ${pathname}`);
    return;
  }

  const userId = getOrCreateUserId();

  // Check if location already sent
  const locationSent = localStorage.getItem("location_sent");
  if (!locationSent) {
    // Use Geolocation API
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;

          // Reverse Geocoding - Replace with your API key if needed
          try {
            const res = await fetch(
              `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`
            );
            const locationData = await res.json();

            const payload = {
              type: "page_view",
              insight: insightId,
              sessionId: session.id,
              userId,
              url: window.location.href,
              referrer: document.referrer,
              timestamp: new Date().toISOString(),
              userAgent: navigator.userAgent,
              language: navigator.language,
              deviceType: getDeviceType(),
              screen: {
                width: window.innerWidth,
                height: window.innerHeight,
              },
              location: {
                latitude: lat,
                longitude: lon,
                city: locationData.city || "",
                state: locationData.principalSubdivision || "",
                country: locationData.countryName || "",
              },
            };

            sendEvent(payload);
            localStorage.setItem("location_sent", "true");
          } catch (error) {
            console.warn("Location fetch failed", error);
          }
        },
        (err) => {
          console.warn("Geolocation permission denied or error:", err);
        }
      );
    } else {
      console.warn("Geolocation not supported in this browser.");
    }
  }

  // Save view without location
  session.views = session.views || {};
  session.views[viewKey] = true;
  session.timestamp = now;
  localStorage.setItem(sessionKey, JSON.stringify(session));
}
