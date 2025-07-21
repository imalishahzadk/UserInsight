import { sendEvent } from "../core/sendEvent";

export function trackScrollDepth() {
  console.log("Scroll depth tracking started");

  let lastTrackedDepth = 0;

  window.addEventListener(
    "scroll",
    throttle(() => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;

      const totalScroll = (scrollTop + windowHeight) / docHeight;
      const scrollPercent = Math.floor(totalScroll * 100);

      const depthBucket = Math.floor(scrollPercent / 10) * 10;

      if (depthBucket > lastTrackedDepth) {
        lastTrackedDepth = depthBucket;
        sendEvent({ type: "scroll_depth", value: depthBucket });
      }
    }, 1000) // Throttle to run once per second
  );
}

// Utility: Throttle function
function throttle(fn, wait) {
  let lastTime = 0;
  return function (...args) {
    const now = Date.now();
    if (now - lastTime >= wait) {
      lastTime = now;
      fn.apply(this, args);
    }
  };
}
