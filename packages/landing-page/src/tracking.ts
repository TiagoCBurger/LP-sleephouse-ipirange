const TRACKING_PARAM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "gclid",
  "fbclid",
] as const;

const TRACKING_STORAGE_KEY = "sleep-house:tracking-params:v1";

function readCookie(name: string): string {
  const escaped = name.replace(/([.$?*|{}()[\]\\/+^])/g, "\\$1");
  const match = document.cookie.match(new RegExp(`(?:^|; )${escaped}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : "";
}

/**
 * Captures UTM/click-id tracking params from the current URL, merges them with
 * whatever was already captured earlier in the session (first-touch wins per key),
 * and adds Meta's _fbc/_fbp cookies so leads can be matched back to ad campaigns.
 * Shared by every lead form (Sleep House, PMAX and Tempur) so all of them send
 * the same hidden tracking fields to their webhooks.
 */
export function captureTrackingParams(): Record<string, string> {
  let stored: Record<string, string>;
  try {
    stored = JSON.parse(window.sessionStorage.getItem(TRACKING_STORAGE_KEY) ?? "{}");
  } catch {
    stored = {};
  }

  const params = new URLSearchParams(window.location.search);
  const merged: Record<string, string> = { ...stored };
  TRACKING_PARAM_KEYS.forEach((key) => {
    const value = params.get(key);
    if (value) merged[key] = value;
  });

  try {
    window.sessionStorage.setItem(TRACKING_STORAGE_KEY, JSON.stringify(merged));
  } catch {
    // sessionStorage can be unavailable (private mode); tracking still works for this page view.
  }

  const fbc = readCookie("_fbc") || (merged.fbclid ? `fb.1.${Date.now()}.${merged.fbclid}` : "");
  const fbp = readCookie("_fbp");

  return { ...merged, fbc, fbp };
}
