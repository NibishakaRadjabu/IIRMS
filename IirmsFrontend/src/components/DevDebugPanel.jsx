import React, { useEffect, useState } from 'react';

export default function DevDebugPanel() {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    const readEntries = () => {
      const arr = window.__reactDebugBadAttributes || [];
      setEntries(Array.isArray(arr) ? arr.slice().reverse() : []);
    };

    readEntries();
    const t = setInterval(readEntries, 1000);
    return () => clearInterval(t);
  }, []);

  const clear = () => {
    window.__reactDebugBadAttributes = [];
    setEntries([]);
  };

  const download = () => {
    const blob = new Blob([JSON.stringify(entries, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'react-debug-attrs.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(JSON.stringify(entries, null, 2));
      alert('Copied to clipboard');
    } catch (e) {
      alert('Copy failed');
    }
  };

  if (!entries.length) return null;

  return (
    <div style={{ position: 'fixed', right: 12, bottom: 12, zIndex: 9999, width: 420, maxHeight: '60vh', overflow: 'auto', background: 'rgba(20,20,20,0.94)', color: '#fff', padding: 12, borderRadius: 8, fontSize: 12, boxShadow: '0 6px 30px rgba(0,0,0,0.5)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
        <strong>React Dev Warnings</strong>
        <div>
          <button onClick={copy} style={{ marginRight: 6 }}>Copy</button>
          <button onClick={download} style={{ marginRight: 6 }}>Download</button>
          <button onClick={clear}>Clear</button>
        </div>
      </div>
      <div style={{ maxHeight: '56vh', overflow: 'auto' }}>
        {entries.map((e, i) => (
          <div key={i} style={{ marginBottom: 8, padding: 8, background: 'rgba(255,255,255,0.02)', borderRadius: 6 }}>
            <div style={{ fontSize: 11, color: '#ddd', marginBottom: 6 }}>{new Date(e.time).toLocaleString()}</div>
            <div style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>{e.message}</div>
            {e.args && e.args.length > 0 && (
              <details style={{ marginTop: 6 }}>
                <summary style={{ cursor: 'pointer' }}>Details</summary>
                <pre style={{ whiteSpace: 'pre-wrap', color: '#eee', fontSize: 11 }}>{JSON.stringify(e.args, null, 2)}</pre>
              </details>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
