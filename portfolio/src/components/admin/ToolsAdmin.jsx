import { useState } from 'react';
import { useSite } from '../../context/SiteContext';
import { SectionWrap, Field, Input, Row, Divider, IconBtn, RangeInput } from './AdminFields';

export default function ToolsAdmin() {
  const { site, updateSect } = useSite();
  const [tools, setTools] = useState([...site.tools]);
  const [saved, setSaved] = useState(false);

  const update = (i, k, v) => setTools(prev => prev.map((t,idx) => idx===i ? {...t,[k]:v} : t));
  const remove = (i) => setTools(prev => prev.filter((_,idx) => idx!==i));
  const add    = () => setTools(prev => [...prev, { id:Date.now(), name:'', cat:'', level:80 }]);

  const save = () => {
    updateSect('tools', tools);
    setSaved(true); setTimeout(() => setSaved(false), 2000);
  };

  return (
    <SectionWrap
      title="Tools Arsenal"
      subtitle="Software tools with animated skill level bars"
      onSave={save}
      saving={saved}
    >
      {tools.map((t, i) => (
        <div className="af-card" key={t.id || i}>
          <div className="af-card-header">
            <span className="af-card-num">0{i+1}</span>
            <div className="af-card-actions">
              <IconBtn danger onClick={() => remove(i)}>✕</IconBtn>
            </div>
          </div>
          <Row>
            <Field label="Tool Name">
              <Input value={t.name} onChange={v => update(i,'name',v)} placeholder="Lightroom" />
            </Field>
            <Field label="Category">
              <Input value={t.cat} onChange={v => update(i,'cat',v)} placeholder="Photo Editing" />
            </Field>
          </Row>
          <Field label={`Skill Level — ${t.level}%`}>
            <RangeInput value={t.level} onChange={v => update(i,'level',v)} />
          </Field>
        </div>
      ))}
      <button className="af-add-btn" onClick={add}>+ Add Tool</button>
    </SectionWrap>
  );
}
