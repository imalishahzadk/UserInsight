import { sendEvent } from "../core/sendEvent";

export function trackClickEvents() {
  document.addEventListener("click", (e) => {
    const el = e.target.closest("button, a, [data-track]");
    if (el) {
      sendEvent({
        type: "click",
        tag: el.tagName,
        id: el.id,
        class: el.className,
        text: el.innerText,
        timestamp: new Date().toISOString(),
      });
    }
  });
}
