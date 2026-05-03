import { useState, useEffect } from 'react';
import { useSite } from '../../context/SiteContext';
import { SectionWrap, Field, Input, FileInput, Row, Divider, IconBtn, ImgPreview } from './AdminFields';

function BACard({ item, idx, onChange, onDelete }) {
  const [prevB, setPrevB] = useState(item.before);
  const [prevA, setPrevA] = useState(item.after);

  useEffect(() => { const t = setTimeout(() => setPrevB(item.before), 600); return () => clearTimeout(t); }, [item.before]);
  useEffect(() => { const t = setTimeout(() => setPrevA(item.after), 600); return () => clearTimeout(t); }, [item.after]);

  return (
    <div className="af-card">
      <div className="af-card-header">
        <span className="af-card-num">0{idx + 1}</span>
        <div className="af-card-actions">
          <IconBtn danger title="Delete" onClick={onDelete}>✕</IconBtn>
        </div>
      </div>
      <Field label="Tag Label">
        <Input value={item.tag} onChange={v => onChange('tag', v)} placeholder="Portrait Retouch" />
      </Field>
      <Row>
        <div>
          <Field label="Before Image URL">
            <FileInput value={item.before} onChange={v => onChange('before', v)} placeholder="https://..." />
          </Field>
          {prevB && <ImgPreview src={prevB} label="Before" />}
        </div>
        <div>
          <Field label="After Image URL">
            <FileInput value={item.after} onChange={v => onChange('after', v)} placeholder="https://..." />
          </Field>
          {prevA && <ImgPreview src={prevA} label="After" />}
        </div>
      </Row>
    </div>
  );
}

export default function BeforeAfterAdmin() {
  const { site, updateSect } = useSite();
  const [items, setItems] = useState([...site.beforeAfter]);
  const [saved, setSaved] = useState(false);

  const update = (i, k, v) => setItems(prev => prev.map((it, idx) => idx === i ? { ...it, [k]: v } : it));
  const remove = (i) => setItems(prev => prev.filter((_, idx) => idx !== i));
  const add = () => setItems(prev => [...prev, { id: Date.now(), tag: '', before: '', after: '' }]);

  const save = () => {
    updateSect('beforeAfter', items);
    setSaved(true); setTimeout(() => setSaved(false), 2000);
  };

  return (
    <SectionWrap
      title="Before / After Section"
      subtitle="Interactive comparison slider pairs shown in the dedicated section"
      onSave={save}
      saving={saved}
    >
      {items.map((item, i) => (
        <BACard key={item.id} item={item} idx={i} onChange={(k,v) => update(i,k,v)} onDelete={() => remove(i)} />
      ))}
      {items.length < 6 && (
        <button className="af-add-btn" onClick={add}>+ Add Comparison Pair</button>
      )}
    </SectionWrap>
  );
}
