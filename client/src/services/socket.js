// This file was originally for socket.io, but has been refactored
// to use HTTP polling to support Vercel Serverless Functions.

let pollInterval = null;
const listeners = new Set();

const fetchMarketData = async () => {
  try {
    const res = await fetch('/api/market/live');
    if (res.ok) {
      const data = await res.json();
      listeners.forEach((callback) => callback(data));
    }
  } catch (err) {
    console.error('Polling error:', err);
  }
};

// ── Connection helpers ─────────────────────────────────

export function connectSocket() {
  if (!pollInterval) {
    // Fetch immediately, then every 2 seconds
    fetchMarketData();
    pollInterval = setInterval(fetchMarketData, 2000);
  }
}

export function disconnectSocket() {
  if (pollInterval) {
    clearInterval(pollInterval);
    pollInterval = null;
  }
}

// ── Event subscription helper ──────────────────────────

export function onSocketEvent(
  event,
  callback
) {
  // We ignore the event name because we only poll for price updates
  const wrappedCallback = (data) => callback(data );
  listeners.add(wrappedCallback);
  
  return () => {
    listeners.delete(wrappedCallback);
  };
}
