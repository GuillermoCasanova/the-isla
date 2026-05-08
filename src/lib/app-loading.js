/** Client-only gate: resolves after app.html shell loader has faded out (app-shell-ready). */

const WINDOW_STATE_KEY = "__theIslaOverlayLoading";

/** @returns {{ dismissed: boolean; waiters: Array<() => void> }} */
function getState() {
  if (typeof window === "undefined") {
    return { dismissed: false, waiters: [] };
  }
  if (!window[WINDOW_STATE_KEY]) {
    window[WINDOW_STATE_KEY] = { dismissed: false, waiters: [] };
  }
  return window[WINDOW_STATE_KEY];
}

export function notifyLoadingOverlayHidden() {
  const s = getState();
  if (s.dismissed) return;
  s.dismissed = true;
  const pending = s.waiters.splice(0);
  for (let i = 0; i < pending.length; i += 1) {
    pending[i]();
  }
}

export function waitForLoadingOverlayHidden() {
  const s = getState();
  if (s.dismissed) return Promise.resolve();
  return new Promise((resolve) => {
    s.waiters.push(() => resolve());
  });
}

if (typeof window !== "undefined") {
  const sync = () => notifyLoadingOverlayHidden();

  if (window.__appShellReady) {
    sync();
  } else {
    window.addEventListener("app-shell-ready", sync, { once: true });
  }
}
