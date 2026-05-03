import { useState } from 'react';
import { useSite } from '../../context/SiteContext';
import { SectionWrap, Field, Input, Textarea, Row, IconBtn } from './AdminFields';

export default function ProcessAdmin() {
  const { site, updateSect } = useSite();
  const [steps, setSteps] = useState([...site.process]);
  const [saved, setSaved] = useState(false);

  const update = (i, k, v) => setSteps(prev => prev.map((s,idx) => idx===i ? {...s,[k]:v} : s));
  const remove = (i) => setSteps(prev => prev.filter((_,idx) => idx!==i));
  const add    = () => setSteps(prev => [...prev, { id:Date.now(), name:'', desc:'' }]);

  const save = () => {
    updateSect('process', steps);
    setSaved(true); setTimeout(() => setSaved(false), 2000);
  };

  return (
    <SectionWrap
      title="Workflow / Process"
      subtitle="The step-by-step working process section"
      onSave={save}
      saving={saved}
    >
      {steps.map((s, i) => (
        <div className="af-card" key={s.id || i}>
          <div className="af-card-header">
            <span className="af-card-num" style={{ fontSize:'1.5rem' }}>{String(i+1).padStart(2,'0')}</span>
            <div className="af-card-actions">
              <IconBtn danger onClick={() => remove(i)}>✕</IconBtn>
            </div>
          </div>
          <Row>
            <Field label="Step Name">
              <Input value={s.name} onChange={v => update(i,'name',v)} placeholder="Brief" />
            </Field>
          </Row>
          <Field label="Description">
            <Textarea value={s.desc} onChange={v => update(i,'desc',v)} placeholder="Explain this step..." rows={2} />
          </Field>
        </div>
      ))}
      {steps.length < 8 && (
        <button className="af-add-btn" onClick={add}>+ Add Step</button>
      )}
    </SectionWrap>
  );
}
