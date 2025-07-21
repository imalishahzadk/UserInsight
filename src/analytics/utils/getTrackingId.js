export function getTrackingId(script) {
  return (
    new URL(script.src).searchParams.get("trackingId") || "default-tracking-id"
  );
}
