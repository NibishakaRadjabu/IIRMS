import React, { useEffect, useState } from 'react';
import api from '../utils/axios';

const endpointsToCheck = [
  { method: 'get', path: '/auth/departments' },
  { method: 'get', path: '/hero' },
];

export default function ApiProbe() {
  const [results, setResults] = useState([]);
  const [running, setRunning] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [tokenInput, setTokenInput] = useState('');

  const runChecks = async () => {
    setRunning(true);
    const out = [];
    for (const ep of endpointsToCheck) {
      const start = Date.now();
      try {
        const res = await api.request({ method: ep.method, url: ep.path });
        out.push({ path: ep.path, method: ep.method, status: res.status, ok: true, time: Date.now() - start, data: res.data });
      } catch (err) {
        const status = err?.response?.status || null;
        const text = err?.response?.data || err?.message || 'Network error';
        out.push({ path: ep.path, method: ep.method, status, ok: false, time: Date.now() - start, data: text });
      }
    }
    setResults(out);
    setRunning(false);
  };

  const attemptLogin = async () => {
    try {
      const res = await api.post('/auth/login', { email, password });
      if (res?.data?.token) {
        localStorage.setItem('token', res.data.token);
        alert('Login succeeded, token saved to localStorage');
      } else {
        alert('Login responded but no token found. Response:\n' + JSON.stringify(res.data));
      }
    } catch (err) {
      alert('Login failed: ' + (err?.response?.data?.message || err.message || JSON.stringify(err?.response?.data)));
    }
  };

  const setToken = () => {
    if (!tokenInput) return alert('Paste a token value first');
    localStorage.setItem('token', tokenInput);
    alert('Token stored in localStorage');
  };

  const clearToken = () => {
    localStorage.removeItem('token');
    alert('Token cleared from localStorage');
  };

  useEffect(() => { if (import.meta.env.DEV) runChecks(); }, []);

  if (!import.meta.env.DEV) return null;

  return (
    <div style={{ position: 'fixed', left: 12, bottom: 12, zIndex: 9999, width: 520, maxHeight: '60vh', overflow: 'auto', background: 'rgba(255,255,255,0.98)', color: '#000', padding: 12, borderRadius: 8, fontSize: 12, boxShadow: '0 6px 30px rgba(0,0,0,0.15)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
        <strong>API Probe</strong>
        <div>
          <button onClick={runChecks} disabled={running} style={{ marginRight: 8 }}>{running ? 'Running...' : 'Re-run'}</button>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
        <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
          <input placeholder="email" value={email} onChange={e => setEmail(e.target.value)} style={{ padding: '6px 8px' }} />
          <input placeholder="password" type="password" value={password} onChange={e => setPassword(e.target.value)} style={{ padding: '6px 8px' }} />
          <button onClick={attemptLogin}>Login & Save Token</button>
        </div>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 6, alignItems: 'center' }}>
          <input placeholder="paste token here" value={tokenInput} onChange={e => setTokenInput(e.target.value)} style={{ padding: '6px 8px', width: 220 }} />
          <button onClick={setToken}>Set Token</button>
          <button onClick={clearToken}>Clear Token</button>
        </div>
      </div>

      <div style={{ fontSize: 12 }}>
        {results.length === 0 && <div style={{ color: '#666' }}>No results yet. Click Re-run to test endpoints.</div>}
        {results.map((r, i) => (
          <div key={i} style={{ marginBottom: 8, padding: 8, borderRadius: 6, background: r.ok ? 'rgba(220,255,220,0.8)' : 'rgba(255,220,220,0.9)' }}>
            <div style={{ fontWeight: 600 }}>{r.method.toUpperCase()} {r.path} — {r.status || 'No response'} {r.ok ? 'OK' : 'ERR'}</div>
            <div style={{ fontSize: 11, color: '#333' }}>Time: {r.time} ms</div>
            <details>
              <summary style={{ cursor: 'pointer' }}>Response</summary>
              <pre style={{ whiteSpace: 'pre-wrap', fontSize: 11 }}>{typeof r.data === 'string' ? r.data : JSON.stringify(r.data, null, 2)}</pre>
            </details>
          </div>
        ))}
      </div>
    </div>
  );
}
