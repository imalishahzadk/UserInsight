import { backend_url } from "../../../config/config"; // adjust the path as needed

//sendEvent.js

// This function sends event data to the server
export function sendEvent(data) {
  fetch(`${backend_url}/clients/track-insight-agent`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
}
export async function fetchLeadSettings(insightId) {
  try {
    const res = await fetch(
      `${backend_url}/clients/get-leads-setting?insightId=${insightId}`
    );
    const json = await res.json();
    return json.data || null;
  } catch (err) {
    console.warn("[Lead] Failed to fetch settings", err);
    return null;
  }
}

// sendLeadEvent.js
export function sendLeadEvent(data) {
  return fetch(`${backend_url}/clients/track-insight-lead`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then((res) => {
    if (!res.ok) throw new Error("Failed to submit lead");
    return res.json();
  });
}
