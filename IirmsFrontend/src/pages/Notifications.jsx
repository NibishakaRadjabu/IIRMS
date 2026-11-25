import React, { useEffect, useState } from 'react';
import { useLanguage } from "../context/LanguageContext";

export default function Notifications() {
  const { translate: tr } = useLanguage();
  const [items, setItems] = useState([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem('app_notifications') || '[]';
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) setItems(parsed.reverse());
    } catch {
      setItems([]);
    }
  }, []);

  const clearAll = () => {
    localStorage.removeItem('app_notifications');
    setItems([]);
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <div className="max-w-4xl mx-auto bg-white rounded shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">{tr("Notifications")}</h1>
          <div>
            <button onClick={clearAll} className="bg-red-500 text-white px-3 py-1 rounded">{tr("Clear all")}</button>
          </div>
        </div>

        {items.length === 0 ? (
          <p className="text-gray-500">{tr("No notifications yet.")}</p>
        ) : (
          <div className="space-y-3">
            {items.map((n, i) => (
              <div key={i} className="p-3 rounded border">
                <div className="font-semibold">{n.title || tr("Notification")}</div>
                <div className="text-xs text-gray-500 mb-2">{n.ts || n.time || '—'}</div>
                <pre className="text-sm bg-gray-50 p-2 rounded">{n.message || JSON.stringify(n.data, null, 2)}</pre>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
