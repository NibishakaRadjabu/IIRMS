import React, { useEffect, useState } from 'react';

export default function LiveNotifications() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const handler = (e) => {
      const n = e.detail;
      // add id and timestamp
      const withMeta = { id: Date.now() + Math.random(), ts: new Date().toISOString(), ...n };
      setNotifications((s) => [withMeta, ...s].slice(0, 8));
    };

    window.addEventListener('api:notification', handler);

    return () => window.removeEventListener('api:notification', handler);
  }, []);

  useEffect(() => {
    if (notifications.length === 0) return;
    const timers = notifications.map((n) => {
      return setTimeout(() => {
        setNotifications((s) => s.filter(x => x.id !== n.id));
      }, 6000);
    });
    return () => timers.forEach(t => clearTimeout(t));
  }, [notifications]);

  if (notifications.length === 0) return null;

  return (
    <div style={{ position: 'fixed', right: 12, bottom: 12, zIndex: 9999, display: 'flex', flexDirection: 'column', gap: 8 }}>
      {notifications.map(n => (
        <div key={n.id} style={{ minWidth: 260, maxWidth: 420, background: '#111827', color: '#fff', padding: 12, borderRadius: 8, boxShadow: '0 6px 20px rgba(0,0,0,0.3)' }}>
          <div style={{ fontWeight: 700, marginBottom: 6 }}>{n.title || 'Notification'}</div>
          <div style={{ fontSize: 12, color: '#e5e7eb' }}>{n.message || n.detail || JSON.stringify(n.data)}</div>
        </div>
      ))}
    </div>
  );
}
