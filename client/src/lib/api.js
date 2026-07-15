 function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }import axios, { } from 'axios';

const defaultApiUrl = '/api';
const host = window.location.hostname;
const port = window.location.port;
const viteEnv = (import.meta ).env ;
const baseURL =
  viteEnv.VITE_API_URL ||
  ((host === 'localhost' || host === '127.0.0.1') && port && port !== '3001'
    ? 'http://localhost:3001/api'
    : defaultApiUrl);

const api = axios.create({
  baseURL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ── Request Interceptor: Attach auth token ─────────────
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('tradeoxx_token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// ── Response Interceptor: Handle errors ────────────────
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const { status, data } = error.response;

      // Unauthorized — clear token and redirect to login
      if (status === 401) {
        localStorage.removeItem('tradeoxx_token');
        localStorage.removeItem('tradeoxx_user');
        if (!window.location.hash.includes('/login')) {
          window.location.hash = '#/login';
        }
      }

      // Surface readable error message
      const message =
        _optionalChain([data, 'optionalAccess', _ => _.message]) || error.message || 'An unexpected error occurred';
      return Promise.reject(new Error(message));
    }

    if (error.request) {
      return Promise.reject(
        new Error('Network error — please check your connection')
      );
    }

    return Promise.reject(error);
  }
);

export default api;
