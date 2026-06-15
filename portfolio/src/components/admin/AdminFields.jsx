import { Check, Save } from 'lucide-react';
import './AdminFields.css';

export function Field({ label, hint, children, error }) {
  return (
    <div className="af-field">
      {label && <label className="af-label">{label}{hint && <span className="af-hint"> — {hint}</span>}</label>}
      {children}
      {error && <span className="af-err">{error}</span>}
    </div>
  );
}

export function Input({ value, onChange, placeholder, type = 'text', ...rest }) {
  return (
    <input
      className="af-input"
      type={type}
      value={value ?? ''}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      {...rest}
    />
  );
}

import { useState } from 'react';

const BACKEND_URL = 'https://photoediting-vibes.onrender.com/api';
const LOCAL_URL = 'http://localhost:3001/api';
const API_URL = window.location.hostname === 'localhost' ? LOCAL_URL : BACKEND_URL;

export function FileInput({ value, onChange, placeholder, accept = "image/*,video/*" }) {
  const [uploading, setUploading] = useState(false);

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch(`${API_URL}/upload`, {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      
      if (res.ok) {
        onChange(data.secure_url);
      } else {
        alert(`Upload failed: ${data.error || 'Unknown error'}`);
      }
    } catch (err) {
      console.error('Upload error:', err);
      alert('An error occurred during upload. Is the backend server running?');
    } finally {
      setUploading(false);
      e.target.value = ''; // Reset input
    }
  };

  return (
    <div className="af-upload-group">
      <input
        className="af-input"
        type="url"
        value={value ?? ''}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={uploading}
      />
      <label className={`af-upload-btn ${uploading ? 'uploading' : ''}`}>
        {uploading ? 'Uploading...' : 'Upload File'}
        <input 
          type="file" 
          accept={accept}
          onChange={handleFileUpload} 
          style={{ display: 'none' }} 
          disabled={uploading}
        />
      </label>
    </div>
  );
}

export function Textarea({ value, onChange, placeholder, rows = 3 }) {
  return (
    <textarea
      className="af-input af-textarea"
      value={value ?? ''}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
    />
  );
}

export function ImgPreview({ src, label }) {
  return src ? (
    <div className="af-img-preview">
      <img src={src} alt={label || 'preview'} className="af-preview-img" />
      <span className="af-preview-label">{label}</span>
    </div>
  ) : null;
}

export function SectionWrap({ title, subtitle, onSave, saving, children }) {
  return (
    <div className="af-section">
      <div className="af-section-header">
        <div>
          <h2 className="af-section-title">{title}</h2>
          {subtitle && <p className="af-section-sub">{subtitle}</p>}
        </div>
        {onSave && (
          <button className="af-save-btn" onClick={onSave} disabled={saving}>
            {saving ? (
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Check size={14} /> Saved
              </span>
            ) : (
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Save size={14} /> Save Changes
              </span>
            )}
          </button>
        )}
      </div>
      <div className="af-section-body">{children}</div>
    </div>
  );
}

export function Row({ children }) {
  return <div className="af-row">{children}</div>;
}

export function Divider({ label }) {
  return <div className="af-divider">{label && <span>{label}</span>}</div>;
}

export function IconBtn({ children, onClick, danger, title }) {
  return (
    <button
      className={`af-icon-btn ${danger ? 'danger' : ''}`}
      onClick={onClick}
      title={title}
    >
      {children}
    </button>
  );
}

export function RangeInput({ value, onChange, min = 0, max = 100 }) {
  return (
    <div className="af-range-wrap">
      <input
        className="af-range"
        type="range"
        min={min}
        max={max}
        value={value ?? 0}
        onChange={e => onChange(Number(e.target.value))}
      />
      <span className="af-range-val">{value}%</span>
    </div>
  );
}
