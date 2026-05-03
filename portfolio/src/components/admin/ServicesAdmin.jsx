import { useState } from 'react';
import { useSite } from '../../context/SiteContext';
import { SectionWrap, Field, Input, Textarea, Row, Divider, IconBtn } from './AdminFields';

const ICONS = ['📷','🤖','🎬','🎨','✦','📲','🎥','📸','🖼','💡'];

function ServiceCard({ svc, idx, onChange, onDelete, onMove, total }) {
  const [tagInput, setTagInput] = useState('');

  const addTool = () => {
    const v = tagInput.trim();
    if (!v) return;
    onChange('tools', [...(svc.tools || []), v]);
    setTagInput('');
  };
  const removeTool = (ti) => onChange('tools', svc.tools.filter((_, i) => i !== ti));

  return (
    <div className="af-card">
      <div className="af-card-header">
        <div style={{ display:'flex', alignItems:'center', gap:'0.6rem' }}>
          <span className="af-card-num">0{idx + 1}</span>
          <span style={{ fontSize:'1.4rem' }}>{svc.icon}</span>
          <strong style={{ fontSize:'0.82rem', color:'#f2ede4' }}>{svc.name || 'New Service'}</strong>
        </div>
        <div className="af-card-actions">
          <IconBtn title="Move up"   disabled={idx === 0}         onClick={() => onMove(idx, idx-1)}>↑</IconBtn>
          <IconBtn title="Move down" disabled={idx === total - 1} onClick={() => onMove(idx, idx+1)}>↓</IconBtn>
          <IconBtn danger title="Delete" onClick={onDelete}>✕</IconBtn>
        </div>
      </div>
      <Row>
        <Field label="Icon (emoji)">
          <div style={{ display:'flex', gap:'0.3rem', flexWrap:'wrap', marginBottom:'0.5rem' }}>
            {ICONS.map(ic => (
              <button key={ic} onClick={() => onChange('icon', ic)}
                style={{ background: svc.icon===ic ? 'rgba(212,168,67,0.2)' : 'transparent',
                  border:`0.5px solid ${svc.icon===ic ? '#d4a843' : 'rgba(242,237,228,0.1)'}`,
                  padding:'0.3rem 0.5rem', cursor:'pointer', fontSize:'1.1rem' }}>
                {ic}
              </button>
            ))}
          </div>
          <Input value={svc.icon} onChange={v => onChange('icon', v)} placeholder="or type custom emoji" />
        </Field>
        <Field label="Service Name">
          <Input value={svc.name} onChange={v => onChange('name', v)} placeholder="Lightroom Editing" />
        </Field>
      </Row>
      <Field label="Description">
        <Textarea value={svc.desc} onChange={v => onChange('desc', v)} placeholder="Describe the service..." rows={2} />
      </Field>
      <Field label="Tool Tags" hint="press Enter to add">
        <div className="af-tag-list">
          {(svc.tools || []).map((t, ti) => (
            <span key={ti} className="af-tag">
              {t}
              <button className="af-tag-del" onClick={() => removeTool(ti)}>✕</button>
            </span>
          ))}
          <input className="af-tag-input" placeholder="Add tool…" value={tagInput}
            onChange={e => setTagInput(e.target.value)}
            onKeyDown={e => { if(e.key==='Enter'){e.preventDefault();addTool();}}} />
        </div>
      </Field>
    </div>
  );
}

export default function ServicesAdmin() {
  const { site, updateSect } = useSite();
  const [services, setServices] = useState([...site.services]);
  const [saved, setSaved] = useState(false);

  const update = (i, k, v) => setServices(prev => prev.map((s, idx) => idx===i ? {...s,[k]:v} : s));
  const remove = (i) => setServices(prev => prev.filter((_,idx) => idx!==i));
  const move = (from, to) => {
    const arr = [...services];
    [arr[from], arr[to]] = [arr[to], arr[from]];
    setServices(arr);
  };
  const add = () => setServices(prev => [...prev, { id:Date.now(), icon:'📷', name:'', desc:'', tools:[] }]);

  const save = () => {
    updateSect('services', services);
    setSaved(true); setTimeout(() => setSaved(false), 2000);
  };

  return (
    <SectionWrap
      title="Services"
      subtitle="Service cards shown in the What I Offer grid"
      onSave={save}
      saving={saved}
    >
      {services.map((svc, i) => (
        <ServiceCard key={svc.id || i} svc={svc} idx={i} total={services.length}
          onChange={(k,v) => update(i,k,v)}
          onDelete={() => remove(i)}
          onMove={move} />
      ))}
      <button className="af-add-btn" onClick={add}>+ Add Service</button>
    </SectionWrap>
  );
}
