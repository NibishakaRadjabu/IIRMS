import axios from 'axios';

let BASE = import.meta.env.VITE_API_URL || '/api';

// Sanitize common shorthand forms so devs can set VITE_API_URL=":5000" or "5000"
if (typeof BASE === 'string') {
  if (/^:\d+$/.test(BASE)) {
    BASE = `http://localhost${BASE}`;
  } else if (/^\d+$/.test(BASE)) {
    BASE = `http://localhost:${BASE}`;
  } else if (/^\/\//.test(BASE)) {
    // leading // (protocol-relative) -> default to http:
    BASE = `http:${BASE}`;
  }
}

const api = axios.create({
  baseURL: BASE,
});

// Single request interceptor: add Authorization if token exists and set Content-Type
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  config.headers = config.headers || {};
  if (token) {
    config.headers.Authorization = 'Bearer ' + token;
  }
  config.headers['Accept-Language'] = localStorage.getItem('iirms-language') || 'en';
  // If sending FormData, let the browser set the Content-Type (including boundary)
  if (!(config.data instanceof FormData)) {
    config.headers['Content-Type'] = 'application/json';
  }

  // DEV-only lightweight logger to help debug missing auth/404s
  if (import.meta.env.DEV) {
    try {
      const masked = token ? (token.substring(0, 8) + '...' ) : '<no-token>';
      // eslint-disable-next-line no-console
      console.debug(`[api][req] ${config.method?.toUpperCase() || 'GET'} ${config.baseURL || ''}${config.url} Authorization:${masked}`);
    } catch (e) {}
  }

  return config;
}, (error) => Promise.reject(error));

// DEV-only response logger
api.interceptors.response.use((res) => {
  if (import.meta.env.DEV) {
    try {
      // eslint-disable-next-line no-console
      console.debug(`[api][res] ${res.config.method?.toUpperCase() || 'GET'} ${res.config.url} -> ${res.status}`, res.data);
    } catch (e) {}
  }
  return res;
}, (error) => {
  // Emit a global notification event for certain server responses so UI can show live notices
  try {
    const status = error?.response?.status;
    const cfg = error?.config || {};
    const payload = {
      title: status === 403 ? 'Access denied' : `API ${status || 'Error'}`,
      message: error?.response?.data?.message || error?.response?.data || error.message || 'Request failed',
      url: cfg.url,
      status,
      time: new Date().toISOString(),
      data: error?.response?.data || null,
    };

    // push to localStorage history
    try {
      const raw = localStorage.getItem('app_notifications') || '[]';
      const arr = JSON.parse(raw);
      arr.push(payload);
      localStorage.setItem('app_notifications', JSON.stringify(arr.slice(-200))); // keep last 200
    } catch (e) {
      // ignore storage errors
    }

    // dispatch event for live UI
    try {
      window.dispatchEvent(new CustomEvent('api:notification', { detail: payload }));
    } catch (e) {}
  } catch (e) {
    // swallow
  }

  if (import.meta.env.DEV) {
    try {
      const cfg = error.config || {};
      // eslint-disable-next-line no-console
      console.debug(`[api][err] ${cfg.method?.toUpperCase() || 'UNKNOWN'} ${cfg.url} -> ${error?.response?.status || 'NO_RESPONSE'}`, error?.response?.data || error.message);
    } catch (e) {}
  }
  return Promise.reject(error);
});

export default api;
