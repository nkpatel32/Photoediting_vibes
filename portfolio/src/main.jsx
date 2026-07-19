import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

const root = createRoot(document.getElementById('root'));

root.render(
  <StrictMode>
    <App />
  </StrictMode>,
);

// Hide the inline HTML splash screen once React has rendered its first frame.
// This ensures there is ZERO blank/white flash between the HTML splash and React.
if (typeof window.__hidePevSplash === 'function') {
  window.__hidePevSplash();
}
