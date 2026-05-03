import { useState, useRef } from 'react';
import { useSite } from '../../context/SiteContext';
import { SectionWrap, Field, Divider, IconBtn } from './AdminFields';

export default function MarqueeAdmin() {
  const { site, updateSect } = useSite();
  const [items, setItems] = useState([...site.marquee]);
  const [saved, setSaved] = useState(false);
  const [newTag, setNewTag] = useState('');
  const inputRef = useRef(null);

  const addTag = () => {
    const v = newTag.trim();
    if (!v) return;
    setItems(prev => [...prev, v]);
    setNewTag('');
    inputRef.current?.focus();
  };

  const remove = (i) => setItems(prev => prev.filter((_, idx) => idx !== i));

  const save = () => {
    updateSect('marquee', items);
    setSaved(true); setTimeout(() => setSaved(false), 2000);
  };

  return (
    <SectionWrap
      title="Marquee / Skills Ticker"
      subtitle="Scrolling text strip below the stats bar"
      onSave={save}
      saving={saved}
    >
      <Field label="Skill Tags" hint="type and press Enter to add">
        <div className="af-tag-list">
          {items.map((tag, i) => (
            <span key={i} className="af-tag">
              {tag}
              <button className="af-tag-del" onClick={() => remove(i)}>✕</button>
            </span>
          ))}
          <input
            ref={inputRef}
            className="af-tag-input"
            placeholder="Add skill…"
            value={newTag}
            onChange={e => setNewTag(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addTag(); } }}
          />
        </div>
        <div style={{ fontSize:'0.6rem', color:'rgba(242,237,228,0.25)', marginTop:'0.4rem' }}>
          Press <kbd style={{background:'rgba(212,168,67,0.1)', padding:'0 0.3rem', border:'0.5px solid rgba(212,168,67,0.2)'}}>Enter</kbd> to add a tag. Click ✕ to remove.
        </div>
      </Field>
      <Divider label="Preview" />
      <div style={{ overflow:'hidden', fontSize:'0.85rem', color:'rgba(212,168,67,0.4)', letterSpacing:'0.15em' }}>
        {items.join('  ✦  ')}
      </div>
    </SectionWrap>
  );
}
