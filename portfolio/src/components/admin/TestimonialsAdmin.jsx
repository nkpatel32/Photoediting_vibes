import { useState } from 'react';
import { useSite } from '../../context/SiteContext';
import { SectionWrap, Field, Input, Textarea, Row, Divider, IconBtn } from './AdminFields';

export default function TestimonialsAdmin() {
  const { site, updateSect } = useSite();
  const [items, setItems] = useState([...site.testimonials]);
  const [saved, setSaved] = useState(false);

  const update = (i, k, v) => setItems(prev => prev.map((t,idx) => idx===i ? {...t,[k]:v} : t));
  const remove = (i) => setItems(prev => prev.filter((_,idx) => idx!==i));
  const add    = () => setItems(prev => [...prev, { id:Date.now(), text:'', author:'', role:'' }]);

  const save = () => {
    updateSect('testimonials', items);
    setSaved(true); setTimeout(() => setSaved(false), 2000);
  };

  return (
    <SectionWrap
      title="Client Testimonials"
      subtitle="Review cards shown in the 'Client Words' section"
      onSave={save}
      saving={saved}
    >
      {items.map((t, i) => (
        <div className="af-card" key={t.id || i}>
          <div className="af-card-header">
            <span className="af-card-num" style={{ fontSize:'2rem', color:'rgba(212,168,67,0.15)' }}>"</span>
            <div className="af-card-actions">
              <IconBtn danger onClick={() => remove(i)}>✕</IconBtn>
            </div>
          </div>
          <Field label="Quote / Review Text">
            <Textarea value={t.text} onChange={v => update(i,'text',v)} placeholder="What the client said..." rows={3} />
          </Field>
          <Row>
            <Field label="Client Name">
              <Input value={t.author} onChange={v => update(i,'author',v)} placeholder="Priya Sharma" />
            </Field>
            <Field label="Role / Location">
              <Input value={t.role} onChange={v => update(i,'role',v)} placeholder="Travel Blogger · Mumbai" />
            </Field>
          </Row>
        </div>
      ))}
      {items.length < 6 && (
        <button className="af-add-btn" onClick={add}>+ Add Testimonial</button>
      )}
    </SectionWrap>
  );
}
