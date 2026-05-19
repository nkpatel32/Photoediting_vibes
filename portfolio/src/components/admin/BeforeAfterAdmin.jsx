import { useState, useEffect } from 'react';
import { useSite } from '../../context/SiteContext';
import { SectionWrap, Field, Input, FileInput, Row, IconBtn, ImgPreview, Divider } from './AdminFields';

const SIZE_OPTIONS = [
  { value: 'small',  label: 'Small (200px)' },
  { value: 'medium', label: 'Medium (300px)' },
  { value: 'large',  label: 'Large (420px)' },
  { value: 'xl',     label: 'Extra Large (550px)' },
];

function PinCard({ item, idx, onChange, onDelete }) {
  const [preview, setPreview] = useState(item.image);

  useEffect(() => {
    const t = setTimeout(() => setPreview(item.image), 600);
    return () => clearTimeout(t);
  }, [item.image]);

  return (
    <div className="af-card">
      <div className="af-card-header">
        <span className="af-card-num">0{idx + 1}</span>
        <div className="af-card-actions">
          <IconBtn danger title="Delete" onClick={onDelete}>✕</IconBtn>
        </div>
      </div>

      <Row>
        <div>
          <Field label="Title">
            <Input value={item.title} onChange={v => onChange('title', v)} placeholder="Portrait Retouch" />
          </Field>
          <Field label="Category">
            <Input value={item.category} onChange={v => onChange('category', v)} placeholder="Retouching" />
          </Field>
        </div>
        <div>
          <Field label="Image Size">
            <select
              className="af-input"
              value={item.size || 'medium'}
              onChange={e => onChange('size', e.target.value)}
            >
              {SIZE_OPTIONS.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </Field>
          <div style={{ marginTop: '0.5rem' }}>
            <span style={{
              display: 'inline-block',
              padding: '0.2rem 0.6rem',
              fontSize: '0.6rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              borderRadius: '4px',
              background: 'rgba(212,168,67,0.1)',
              border: '0.5px solid rgba(212,168,67,0.25)',
              color: 'rgba(212,168,67,0.7)',
            }}>
              {item.size || 'medium'}
            </span>
          </div>
        </div>
      </Row>

      <Field label="Image URL">
        <FileInput value={item.image} onChange={v => onChange('image', v)} placeholder="https://..." />
      </Field>
      {preview && <ImgPreview src={preview} label="Preview" />}
    </div>
  );
}

export default function BeforeAfterAdmin() {
  const { site, updateSect } = useSite();
  const [items, setItems] = useState([...(site.pinterestGallery || [])]);
  const [pexelsConfig, setPexelsConfig] = useState(site.pexelsConfig || {
    enabled: true,
    collectionId: '',
    query: 'photo editing',
    photographer: '',
    perPage: 30,
  });
  const [saved, setSaved] = useState(false);
  const [pexelsTest, setPexelsTest] = useState(null);
  const [testing, setTesting] = useState(false);

  const update = (i, k, v) => setItems(prev => prev.map((it, idx) => idx === i ? { ...it, [k]: v } : it));
  const remove = (i) => setItems(prev => prev.filter((_, idx) => idx !== i));
  const add = () => setItems(prev => [...prev, {
    id: Date.now(),
    title: '',
    category: '',
    image: '',
    size: 'medium',
  }]);

  const updatePexels = (k, v) => setPexelsConfig(prev => ({ ...prev, [k]: v }));

  const save = () => {
    updateSect({
      pinterestGallery: items,
      pexelsConfig: pexelsConfig
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  // Test Pexels connection
  const testPexels = async () => {
    setTesting(true);
    setPexelsTest(null);
    try {
      const apiBase = window.location.hostname === 'localhost'
        ? 'http://localhost:3001/api'
        : 'https://photoediting-vibes.onrender.com/api';

      let url;
      let mode;
      if (pexelsConfig.photoIds) {
        url = `${apiBase}/pexels?photo_ids=${encodeURIComponent(pexelsConfig.photoIds)}`;
        mode = 'specific photo IDs';
      } else if (pexelsConfig.collectionId) {
        url = `${apiBase}/pexels?collection_id=${encodeURIComponent(pexelsConfig.collectionId)}&per_page=5`;
        mode = 'collection';
      } else {
        url = `${apiBase}/pexels?query=${encodeURIComponent(pexelsConfig.query || 'photo editing')}&per_page=5`;
        if (pexelsConfig.photographer) {
          url += `&photographer=${encodeURIComponent(pexelsConfig.photographer)}`;
        }
        mode = 'search';
      }

      const res = await fetch(url);
      const data = await res.json();

      if (res.ok) {
        const count = data.photos?.length || 0;
        setPexelsTest({
          success: count > 0,
          message: count > 0
            ? `✓ Found ${count} photo${count !== 1 ? 's' : ''} via ${mode} (total: ${data.total_results || count})`
            : `⚠ 0 photos found via ${mode}. Check your IDs/Collection.`,
        });
      } else {
        setPexelsTest({ success: false, message: `✗ ${data.error || 'API error'}${data.details ? ': ' + data.details : ''}` });
      }
    } catch (err) {
      setPexelsTest({ success: false, message: `✗ Connection failed: ${err.message}` });
    } finally {
      setTesting(false);
    }
  };

  return (
    <SectionWrap
      title="Pinterest Gallery"
      subtitle="Masonry-style gallery with customizable image sizes — displayed in section 02"
      onSave={save}
      saving={saved}
    >
      {/* Pexels Integration Config */}
      <div className="af-card" style={{ borderColor: 'rgba(212,168,67,0.2)' }}>
        <div className="af-card-header">
          <span style={{
            fontSize: '0.7rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'var(--gold)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}>
            📸 Pexels Integration
          </span>
          <label style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            cursor: 'pointer',
            fontSize: '0.65rem',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: pexelsConfig.enabled ? 'var(--gold)' : 'rgba(242,237,228,0.3)',
          }}>
            <input
              type="checkbox"
              checked={pexelsConfig.enabled || false}
              onChange={e => updatePexels('enabled', e.target.checked)}
              style={{ accentColor: '#d4a843' }}
            />
            {pexelsConfig.enabled ? 'Enabled' : 'Disabled'}
          </label>
        </div>

        {pexelsConfig.enabled && (
          <>
            {/* Specific Photo IDs — NEW super targeted method */}
            <div style={{
              padding: '0.75rem',
              background: 'rgba(212,168,67,0.08)',
              border: '0.5px solid rgba(212,168,67,0.2)',
              borderRadius: '6px',
              marginBottom: '1rem',
            }}>
              <Field label="Selected Photo IDs (Recommended)" hint="Enter specific photo IDs to show only YOUR chosen photos">
                <Input
                  value={pexelsConfig.photoIds || ''}
                  onChange={v => updatePexels('photoIds', v)}
                  placeholder="e.g. 33642644, 33642645"
                />
              </Field>
              <div style={{
                fontSize: '0.6rem',
                lineHeight: '1.8',
                color: 'rgba(242,237,228,0.35)',
                marginTop: '0.4rem',
              }}>
                Pexels doesn't let us fetch your profile directly. Paste comma-separated IDs of the photos you want to show!<br />
                Example: <code style={{ color: 'rgba(212,168,67,0.5)' }}>pexels.com/photo/vibrant-ganesh-idol-<strong>33642644</strong>/</code> → ID is <code style={{ color: 'rgba(212,168,67,0.5)' }}>33642644</code>
              </div>
            </div>

            {/* Collection ID — Option 2 */}
            {!pexelsConfig.photoIds && (
              <div style={{
                padding: '0.75rem',
                background: 'rgba(242,237,228,0.02)',
                border: '0.5px solid rgba(242,237,228,0.06)',
                borderRadius: '6px',
                marginBottom: '1rem',
              }}>
                <Field label="Collection ID" hint="Option 2 — fetch all photos inside a Pexels collection">
                  <Input
                    value={pexelsConfig.collectionId || ''}
                    onChange={v => updatePexels('collectionId', v.trim())}
                    placeholder="e.g. abc123xyz"
                  />
                </Field>
              </div>
            )}

            {/* Fallback: Search mode */}
            {!pexelsConfig.photoIds && !pexelsConfig.collectionId && (
              <>
                <Divider label="Fallback: Search Mode" />
                <Row>
                  <Field label="Search Query" hint="Keywords to search on Pexels">
                    <Input
                      value={pexelsConfig.query || ''}
                      onChange={v => updatePexels('query', v)}
                      placeholder="photo editing"
                    />
                  </Field>
                  <Field label="Photographer Filter" hint="Optional — filter by name">
                    <Input
                      value={pexelsConfig.photographer || ''}
                      onChange={v => updatePexels('photographer', v)}
                      placeholder="Nishil Patel"
                    />
                  </Field>
                </Row>
              </>
            )}

            {!pexelsConfig.photoIds && (
              <Field label="Photos Per Page" hint="Number of photos to fetch (max 80)">
                <Input
                  type="number"
                  value={pexelsConfig.perPage || 30}
                  onChange={v => updatePexels('perPage', parseInt(v) || 30)}
                  placeholder="30"
                />
              </Field>
            )}

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '0.75rem' }}>
              <button
                className="af-add-btn"
                onClick={testPexels}
                disabled={testing}
                style={{ margin: 0 }}
              >
                {testing ? '⟳ Testing...' : '⚡ Test Connection'}
              </button>
              {pexelsTest && (
                <span style={{
                  fontSize: '0.7rem',
                  letterSpacing: '0.05em',
                  color: pexelsTest.success ? 'rgba(100,220,100,0.8)' : 'rgba(255,180,80,0.8)',
                }}>
                  {pexelsTest.message}
                </span>
              )}
            </div>

            <div style={{
              marginTop: '1rem',
              padding: '0.75rem',
              background: 'rgba(212,168,67,0.04)',
              border: '0.5px solid rgba(212,168,67,0.1)',
              borderRadius: '6px',
              fontSize: '0.65rem',
              lineHeight: '1.8',
              color: 'rgba(242,237,228,0.35)',
              letterSpacing: '0.03em',
            }}>
              <strong style={{ color: 'rgba(212,168,67,0.6)' }}>How it works:</strong><br />
              • <strong>Collection ID</strong> (recommended): Create a collection on Pexels with your photos, paste the ID here<br />
              • <strong>Search mode</strong> (fallback): Searches Pexels by keyword if no collection ID is set<br />
              • Image sizes are auto-assigned based on each photo's aspect ratio<br />
              • Your Pexels API key must be set in the backend <code>.env</code> file<br />
              • Manual images (below) appear alongside Pexels photos
            </div>
          </>
        )}
      </div>

      <Divider label="Manual Images" />

      {/* Manual Gallery Items */}
      {items.map((item, i) => (
        <PinCard
          key={item.id}
          item={item}
          idx={i}
          onChange={(k, v) => update(i, k, v)}
          onDelete={() => remove(i)}
        />
      ))}
      <button className="af-add-btn" onClick={add}>+ Add Gallery Image</button>
    </SectionWrap>
  );
}
