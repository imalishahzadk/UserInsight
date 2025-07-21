import { sendEvent } from "../core/sendEvent";

export function trackFormSubmission() {
  console.log("Form submission tracking started");
  document.addEventListener("submit", (e) => {
    if (e.target.tagName === "FORM") {
      sendEvent({
        type: "form_submission",
        formId: e.target.id,
        formData: new FormData(e.target),
      });
    }
  });
}
