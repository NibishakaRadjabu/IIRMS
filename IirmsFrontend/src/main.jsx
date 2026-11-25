// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'
// if ("serviceWorker" in navigator) {
//   window.addEventListener("load", () => {
//     navigator.serviceWorker
//       .register("/service-worker.js")
//       .then((reg) => console.log("Service Worker registered:", reg))
//       .catch((err) => console.error("Service Worker registration failed:", err));
//   });
// }

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
    
//   </StrictMode>,
// )
// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import "./App.css";

// Development-only diagnostics: capture React console warnings about invalid DOM props
if (import.meta.env.DEV) {
  try {
    const origError = console.error.bind(console);
    console.error = (...args) => {
      try {
        const first = String(args[0] || "");
        if (first.includes('non-boolean attribute') || first.includes('Received `true` for a non-boolean attribute') || first.includes('No routes matched location')) {
          window.__reactDebugBadAttributes = window.__reactDebugBadAttributes || [];
          // store a shallow-copy of args (they can contain circular refs)
          window.__reactDebugBadAttributes.push({ time: Date.now(), message: first, args: args.slice(1) });
          // also print with prefix so it's easy to find
          origError('[DEV-CAPTURE]', ...args);
          return;
        }
      } catch (e) {
        // fallthrough to original error
      }
      origError(...args);
    };
  } catch (e) {
    // ignore diagnostics failures
  }
}


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Service Worker only in production
if ("serviceWorker" in navigator && import.meta.env.PROD) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then((registration) => {
        console.log("Service Worker registered:", registration);
      })
      .catch((error) => {
        console.error("Service Worker registration failed:", error);
      });
  });
}
