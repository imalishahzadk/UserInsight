export function loadExternalScript(src, callback) {
  console.log("Loading external script:");
  const script = document.createElement("script");
  script.src = src;
  script.onload = callback;
  document.head.appendChild(script);
}
