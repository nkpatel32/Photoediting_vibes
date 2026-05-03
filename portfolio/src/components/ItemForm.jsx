import { useState, useEffect } from 'react';
import './ItemForm.css';

const EMPTY = {
  title: '', cat: '', tag: '', cls: 'g-sm',
  thumb: '', before: '', after: '', desc: '',
};

const GRID_OPTIONS = [
  { value: 'g-large', label: 'g-large — Large (spans 2 rows, left column)' },
  { value: 'g-sm',    label: 'g-sm — Small Square' },
  { value: 'g-wide',  label: 'g-wide — Wide (full 3-column width)' },
  { value: 'g-sm2',   label: 'g-sm2 — Small (bottom row)' },
];

export default function ItemForm({ item, onSave, onCancel }) {
  const isEdit = Boolean(item);
  const [form,   setForm]   = useState(isEdit ? { ...item } : { ...EMPTY });
  const [errors, setErrors] = useState({});
  const [tab,    setTab]    = useState('details'); // 'details' | 'images'
  const [uploading, setUploading] = useState({});

  // Preview states
  const [prevThumb,  setPrevThumb]  = useState(isEdit ? item.thumb  : '');
  const [prevBefore, setPrevBefore] = useState(isEdit ? item.before : '');
  const [prevAfter,  setPrevAfter]  = useState(isEdit ? item.after  : '');

  useEffect(() => {
    const t = setTimeout(() => setPrevThumb(form.thumb), 600);
    return () => clearTimeout(t);
  }, [form.thumb]);
  useEffect(() => {
    const t = setTimeout(() => setPrevBefore(form.before), 600);
    return () => clearTimeout(t);
  }, [form.before]);
  useEffect(() => {
    const t = setTimeout(() => setPrevAfter(form.after), 600);
    return () => clearTimeout(t);
  }, [form.after]);

  const set = (key, val) => {
    setForm(f => ({ ...f, [key]: val }));
    if (errors[key]) setErrors(e => ({ ...e, [key]: '' }));
  };

  const validate = () => {
    const e = {};
    if (!form.title.trim())  e.title  = 'Title is required';
    if (!form.cat.trim())    e.cat    = 'Category is required';
    if (!form.tag.trim())    e.tag    = 'Tag is required';
    if (!form.thumb.trim())  e.thumb  = 'Thumbnail URL is required';
    if (!form.before.trim()) e.before = 'Before image URL is required';
    if (!form.after.trim())  e.after  = 'After image URL is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) onSave(form);
  };

  const handleFileUpload = async (field, e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(u => ({ ...u, [field]: true }));
    
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch(`http://localhost:3001/api/upload`, {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      
      if (res.ok) {
        set(field, data.secure_url);
      } else {
        alert(`Upload failed: ${data.error || 'Unknown error'}`);
      }
    } catch (err) {
      console.error('Upload error:', err);
      alert('An error occurred during upload. Is the backend server running?');
    } finally {
      setUploading(u => ({ ...u, [field]: false }));
      e.target.value = ''; // Reset input so same file can be selected again
    }
  };

  return (
    <div className="iform-backdrop" onClick={e => e.target === e.currentTarget && onCancel()}>
      <div className="iform-box">

        {/* Header */}
        <div className="iform-header">
          <div>
            <h2 className="iform-title">{isEdit ? 'Edit Gallery Item' : 'Add New Gallery Item'}</h2>
            <p className="iform-sub">Changes save immediately and reflect on the live portfolio</p>
          </div>
          <button className="iform-close" onClick={onCancel}>✕</button>
        </div>

        {/* Tabs */}
        <div className="iform-tabs">
          <button className={`iform-tab ${tab === 'details' ? 'active' : ''}`} onClick={() => setTab('details')}>
            Details
          </button>
          <button className={`iform-tab ${tab === 'images' ? 'active' : ''}`} onClick={() => setTab('images')}>
            Images {(errors.thumb || errors.before || errors.after) ? '⚠' : ''}
          </button>
        </div>

        <form className="iform-body" onSubmit={handleSubmit} noValidate>

          {/* ── DETAILS TAB ── */}
          {tab === 'details' && (
            <div className="iform-tab-content">
              <div className="iform-row">
                <div className="iform-field">
                  <label className="iform-label">Title *</label>
                  <input
                    className={`iform-input ${errors.title ? 'err' : ''}`}
                    type="text"
                    value={form.title}
                    onChange={e => set('title', e.target.value)}
                    placeholder="e.g. Golden Hour Portrait"
                  />
                  {errors.title && <span className="iform-err">{errors.title}</span>}
                </div>

                <div className="iform-field">
                  <label className="iform-label">Category *</label>
                  <input
                    className={`iform-input ${errors.cat ? 'err' : ''}`}
                    type="text"
                    value={form.cat}
                    onChange={e => set('cat', e.target.value)}
                    placeholder="e.g. Portrait · Lightroom"
                  />
                  {errors.cat && <span className="iform-err">{errors.cat}</span>}
                </div>
              </div>

              <div className="iform-row">
                <div className="iform-field">
                  <label className="iform-label">Tag *</label>
                  <input
                    className={`iform-input ${errors.tag ? 'err' : ''}`}
                    type="text"
                    value={form.tag}
                    onChange={e => set('tag', e.target.value)}
                    placeholder="e.g. Lightroom Edit"
                  />
                  {errors.tag && <span className="iform-err">{errors.tag}</span>}
                </div>

                <div className="iform-field">
                  <label className="iform-label">Grid Layout</label>
                  <select
                    className="iform-select"
                    value={form.cls}
                    onChange={e => set('cls', e.target.value)}
                  >
                    {GRID_OPTIONS.map(o => (
                      <option key={o.value} value={o.value}>{o.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="iform-field iform-field-full">
                <label className="iform-label">Description</label>
                <textarea
                  className="iform-textarea"
                  value={form.desc}
                  onChange={e => set('desc', e.target.value)}
                  rows={3}
                  placeholder="Describe the editing work, tools used, techniques applied..."
                />
              </div>

              <div className="iform-hint">
                <strong>Tip:</strong> Use g-large for the first/hero item, g-wide for panoramic/video work, and g-sm / g-sm2 for standard portfolio pieces.
              </div>
            </div>
          )}

          {/* ── IMAGES TAB ── */}
          {tab === 'images' && (
            <div className="iform-tab-content">

              {/* Thumbnail */}
              <div className="iform-img-row">
                <div className="iform-field" style={{ flex: 1 }}>
                  <label className="iform-label">Thumbnail URL * <span className="iform-label-hint">(shown in gallery grid)</span></label>
                  <div className="iform-upload-group">
                    <input
                      className={`iform-input ${errors.thumb ? 'err' : ''}`}
                      type="url"
                      value={form.thumb}
                      onChange={e => set('thumb', e.target.value)}
                      placeholder="https://..."
                      disabled={uploading.thumb}
                    />
                    <label className={`iform-upload-btn ${uploading.thumb ? 'uploading' : ''}`}>
                      {uploading.thumb ? 'Uploading...' : 'Upload File'}
                      <input 
                        type="file" 
                        accept="image/*" 
                        onChange={(e) => handleFileUpload('thumb', e)} 
                        style={{ display: 'none' }} 
                        disabled={uploading.thumb}
                      />
                    </label>
                  </div>
                  {errors.thumb && <span className="iform-err">{errors.thumb}</span>}
                </div>
                <div className="iform-img-preview">
                  {prevThumb ? (
                    <img src={prevThumb} alt="Thumbnail preview" className="iform-preview-img" />
                  ) : (
                    <div className="iform-preview-empty">No preview</div>
                  )}
                </div>
              </div>

              {/* Before */}
              <div className="iform-img-row">
                <div className="iform-field" style={{ flex: 1 }}>
                  <label className="iform-label">Before Image URL * <span className="iform-label-hint">(unedited / raw shot)</span></label>
                  <div className="iform-upload-group">
                    <input
                      className={`iform-input ${errors.before ? 'err' : ''}`}
                      type="url"
                      value={form.before}
                      onChange={e => set('before', e.target.value)}
                      placeholder="https://..."
                      disabled={uploading.before}
                    />
                    <label className={`iform-upload-btn ${uploading.before ? 'uploading' : ''}`}>
                      {uploading.before ? 'Uploading...' : 'Upload File'}
                      <input 
                        type="file" 
                        accept="image/*" 
                        onChange={(e) => handleFileUpload('before', e)} 
                        style={{ display: 'none' }} 
                        disabled={uploading.before}
                      />
                    </label>
                  </div>
                  {errors.before && <span className="iform-err">{errors.before}</span>}
                </div>
                <div className="iform-img-preview">
                  {prevBefore ? (
                    <img src={prevBefore} alt="Before preview" className="iform-preview-img" style={{ filter: 'grayscale(0.5)' }} />
                  ) : (
                    <div className="iform-preview-empty">Before</div>
                  )}
                </div>
              </div>

              {/* After */}
              <div className="iform-img-row">
                <div className="iform-field" style={{ flex: 1 }}>
                  <label className="iform-label">After Image URL * <span className="iform-label-hint">(edited / final result)</span></label>
                  <div className="iform-upload-group">
                    <input
                      className={`iform-input ${errors.after ? 'err' : ''}`}
                      type="url"
                      value={form.after}
                      onChange={e => set('after', e.target.value)}
                      placeholder="https://..."
                      disabled={uploading.after}
                    />
                    <label className={`iform-upload-btn ${uploading.after ? 'uploading' : ''}`}>
                      {uploading.after ? 'Uploading...' : 'Upload File'}
                      <input 
                        type="file" 
                        accept="image/*" 
                        onChange={(e) => handleFileUpload('after', e)} 
                        style={{ display: 'none' }} 
                        disabled={uploading.after}
                      />
                    </label>
                  </div>
                  {errors.after && <span className="iform-err">{errors.after}</span>}
                </div>
                <div className="iform-img-preview">
                  {prevAfter ? (
                    <img src={prevAfter} alt="After preview" className="iform-preview-img" style={{ filter: 'saturate(1.3)' }} />
                  ) : (
                    <div className="iform-preview-empty">After</div>
                  )}
                </div>
              </div>

              <div className="iform-hint">
                <strong>Tip:</strong> Use high-resolution URLs (1400px+) for the before/after comparison, and a smaller version (700-900px) for the thumbnail for faster loading.
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="iform-footer">
            <button type="button" className="iform-btn-cancel" onClick={onCancel}>Cancel</button>
            <button type="submit" className="iform-btn-save">
              {isEdit ? 'Save Changes' : 'Add to Gallery'} ↗
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
