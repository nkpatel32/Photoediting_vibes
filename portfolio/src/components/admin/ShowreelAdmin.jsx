import { useState } from 'react';
import { PlayCircle, Image as ImageIcon, FileText, Trash2, Plus, ArrowUp, ArrowDown } from 'lucide-react';
import { useSite } from '../../context/SiteContext';
import { SectionWrap, Field, Input, Textarea, Divider, ImgPreview, FileInput, Row } from './AdminFields';

export default function ShowreelAdmin() {
  const { site, updateSect } = useSite();
  const [form, setForm] = useState({
    label: site.showreel?.label || '01 — Showreels',
    heading1: site.showreel?.heading1 || 'WATCH THE',
    heading2: site.showreel?.heading2 || 'MAGIC',
    heading3: site.showreel?.heading3 || 'IN MOTION',
    description: site.showreel?.description || '',
    reels: site.showreel?.reels || []
  });
  const [saved, setSaved] = useState(false);

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const updateReel = (index, key, val) => {
    setForm(f => {
      const copy = [...f.reels];
      copy[index] = { ...copy[index], [key]: val };
      return { ...f, reels: copy };
    });
  };

  const addReel = () => {
    setForm(f => ({
      ...f,
      reels: [
        ...f.reels,
        {
          id: Date.now().toString(),
          title: 'New Reel',
          tag: 'Editing',
          videoUrl: '',
          coverImage: ''
        }
      ]
    }));
  };

  const removeReel = (index) => {
    setForm(f => ({
      ...f,
      reels: f.reels.filter((_, i) => i !== index)
    }));
  };

  const moveReel = (index, dir) => {
    setForm(f => {
      const copy = [...f.reels];
      const targetIndex = index + dir;
      if (targetIndex < 0 || targetIndex >= copy.length) return f;
      const temp = copy[index];
      copy[index] = copy[targetIndex];
      copy[targetIndex] = temp;
      return { ...f, reels: copy };
    });
  };

  const save = () => {
    updateSect('showreel', form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <SectionWrap
      title="Showreels / Instagram Reels"
      subtitle="Manage your horizontal scrolling vertical video reels gallery"
      onSave={save}
      saving={saved}
    >
      <Divider label={<><FileText size={14} style={{ marginRight: '6px' }} /> Headers & Details</>} />
      
      <Row>
        <Field label="Section Label" hint="small text on top">
          <Input value={form.label} onChange={v => set('label', v)} placeholder="01 — Showreels" />
        </Field>
      </Row>

      <Row>
        <Field label="Heading 1" hint="e.g. WATCH THE">
          <Input value={form.heading1} onChange={v => set('heading1', v)} placeholder="WATCH THE" />
        </Field>
        <Field label="Heading 2 (Ghost Text)" hint="e.g. MAGIC">
          <Input value={form.heading2} onChange={v => set('heading2', v)} placeholder="MAGIC" />
        </Field>
        <Field label="Heading 3 (Gold Text)" hint="e.g. IN MOTION">
          <Input value={form.heading3} onChange={v => set('heading3', v)} placeholder="IN MOTION" />
        </Field>
      </Row>

      <Field label="Section Description">
        <Textarea
          value={form.description}
          onChange={v => set('description', v)}
          placeholder="Describe this gallery section..."
          rows={3}
        />
      </Field>

      <Divider label={<><PlayCircle size={14} style={{ marginRight: '6px' }} /> Reels List ({form.reels.length})</>} />

      <div className="reels-admin-list" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {form.reels.map((reel, idx) => (
          <div 
            key={reel.id || idx} 
            className="reel-admin-item" 
            style={{ 
              border: '1px solid rgba(212, 168, 67, 0.15)', 
              borderRadius: '6px', 
              padding: '1.5rem', 
              background: 'rgba(25, 25, 25, 0.4)',
              position: 'relative'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h4 style={{ margin: 0, color: 'var(--gold)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Reel #{idx + 1}: {reel.title || 'Untitled'}
              </h4>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button 
                  onClick={() => moveReel(idx, -1)} 
                  disabled={idx === 0}
                  style={{ background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer', opacity: idx === 0 ? 0.3 : 1 }}
                  title="Move Up"
                >
                  <ArrowUp size={16} />
                </button>
                <button 
                  onClick={() => moveReel(idx, 1)} 
                  disabled={idx === form.reels.length - 1}
                  style={{ background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer', opacity: idx === form.reels.length - 1 ? 0.3 : 1 }}
                  title="Move Down"
                >
                  <ArrowDown size={16} />
                </button>
                <button 
                  onClick={() => removeReel(idx)}
                  style={{ background: 'transparent', border: 'none', color: '#e74c3c', cursor: 'pointer' }}
                  title="Delete Reel"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>

            <Row>
              <Field label="Reel Title">
                <Input value={reel.title} onChange={v => updateReel(idx, 'title', v)} placeholder="e.g. Cinematic Color Grade" />
              </Field>
              <Field label="Category / Tag">
                <Input value={reel.tag} onChange={v => updateReel(idx, 'tag', v)} placeholder="e.g. Lightroom" />
              </Field>
            </Row>

            <Row>
              <Field label="Video URL" hint="upload or paste direct Cloudinary .mp4 link">
                <FileInput 
                  value={reel.videoUrl} 
                  onChange={v => updateReel(idx, 'videoUrl', v)} 
                  placeholder="https://res.cloudinary.com/..." 
                  accept="video/*"
                />
              </Field>
              <Field label="Cover Image URL" hint="thumbnail shown before playing">
                <FileInput 
                  value={reel.coverImage} 
                  onChange={v => updateReel(idx, 'coverImage', v)} 
                  placeholder="https://images.unsplash.com/..." 
                  accept="image/*"
                />
              </Field>
            </Row>
            
            {reel.coverImage ? (
              <div style={{ marginTop: '0.5rem' }}>
                <ImgPreview src={reel.coverImage} label="Thumbnail Preview" />
              </div>
            ) : reel.videoUrl ? (
              <div style={{ marginTop: '0.5rem' }}>
                <video 
                  src={reel.videoUrl} 
                  muted 
                  controls 
                  style={{ width: '120px', height: '160px', objectFit: 'cover', borderRadius: '4px', border: '1px solid rgba(212, 168, 67, 0.3)' }} 
                />
                <div style={{ fontSize: '0.62rem', color: 'rgba(242,237,228,0.3)', marginTop: '0.2rem' }}>
                  No thumbnail uploaded. Video first frame will be used as thumbnail.
                </div>
              </div>
            ) : null}
          </div>
        ))}

        <button 
          onClick={addReel}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            background: 'transparent',
            border: '1px dashed var(--gold)',
            color: 'var(--gold)',
            padding: '1rem',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '0.8rem',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            transition: 'all 0.3s'
          }}
          onMouseEnter={e => { e.target.style.background = 'rgba(212,168,67,0.05)'; }}
          onMouseLeave={e => { e.target.style.background = 'transparent'; }}
        >
          <Plus size={16} /> Add New Reel
        </button>
      </div>
    </SectionWrap>
  );
}
