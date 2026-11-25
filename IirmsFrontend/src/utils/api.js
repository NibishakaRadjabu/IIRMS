// Lightweight wrapper using Vite env for backend base URL.
import axios from 'axios';

const BASE = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({
  baseURL: BASE,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  config.headers = config.headers || {};
  if (token) {
    config.headers.Authorization = 'Bearer ' + token;
  }
  config.headers['Accept-Language'] = localStorage.getItem('iirms-language') || 'en';
  if (!(config.data instanceof FormData)) {
    config.headers['Content-Type'] = 'application/json';
  }

  if (import.meta.env.DEV) {
    try {
      const masked = token ? (token.substring(0, 8) + '...') : '<no-token>';
      // eslint-disable-next-line no-console
      console.debug(`[api][req] ${config.method?.toUpperCase() || 'GET'} ${config.baseURL || ''}${config.url} Authorization:${masked}`);
    } catch (e) {}
  }

  return config;
}, (error) => Promise.reject(error));

api.interceptors.response.use((res) => {
  if (import.meta.env.DEV) {
    try {
      // eslint-disable-next-line no-console
      console.debug(`[api][res] ${res.config.method?.toUpperCase() || 'GET'} ${res.config.url} -> ${res.status}`, res.data);
    } catch (e) {}
  }
  return res;
}, (error) => {
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
