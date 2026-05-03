import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGallery } from '../context/GalleryContext';
import './AdminLogin.css';

export default function AdminLogin() {
  const navigate = useNavigate();
  const { handleLogin, loginError, authed } = useGallery();
  const [password, setPassword] = useState('');
  const [shaking, setShaking]   = useState(false);

  // Redirect if already logged in
  useEffect(() => {
    if (authed) navigate('/admin', { replace: true });
  }, [authed, navigate]);


  const onSubmit = (e) => {
    e.preventDefault();
    const ok = handleLogin(password);
    if (ok) {
      navigate('/admin', { replace: true });
    } else {
      setShaking(true);
      setTimeout(() => setShaking(false), 500);
      setPassword('');
    }
  };

  return (
    <div className="login-shell">
      {/* Background grid */}
      <div className="login-bg-grid"></div>

      <div className={`login-box ${shaking ? 'shake' : ''}`}>
        {/* Logo */}
        <div className="login-logo">PEV<span>ibes</span></div>
        <div className="login-logo-sub">Admin Access</div>

        {/* Lock icon */}
        <div className="login-lock">🔒</div>

        <h1 className="login-title">SIGN IN</h1>
        <p className="login-desc">
          Enter your admin password to manage the gallery portfolio.
        </p>

        <form className="login-form" onSubmit={onSubmit}>
          <div className="login-field">
            <label className="login-label" htmlFor="admin-password">Password</label>
            <input
              id="admin-password"
              className={`login-input ${loginError ? 'err' : ''}`}
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Enter password"
              autoComplete="current-password"
              autoFocus
            />
            {loginError && <div className="login-error">⚠ {loginError}</div>}
          </div>

          <button type="submit" className="login-btn">
            Enter Admin Panel ↗
          </button>
        </form>

        <div className="login-back" onClick={() => navigate('/')}>
          ← Back to Portfolio
        </div>

        <div className="login-hint">Default password: pev2025</div>
      </div>

      {/* Corner decorations */}
      <div className="login-corner lc-tl"></div>
      <div className="login-corner lc-tr"></div>
      <div className="login-corner lc-bl"></div>
      <div className="login-corner lc-br"></div>
    </div>
  );
}
