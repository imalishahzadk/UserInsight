import { getTrackingId } from "./utils/getTrackingId";
import { trackPageView } from "./core/trackPageView";
import { trackLead } from "./modules/leadCapturePopup";
import { startSessionTracking } from "./core/trackSession";

window.addEventListener("DOMContentLoaded", () => {
  const currentScript =
    document.currentScript ||
    document.querySelector('script[src*="analytics-widget.js"]');
  const trackingId = getTrackingId(currentScript);
  trackPageView(trackingId);
  startSessionTracking(trackingId);
  trackLead(trackingId);
});
