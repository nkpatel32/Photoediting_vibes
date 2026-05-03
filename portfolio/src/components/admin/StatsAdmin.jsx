import { useState } from 'react';
import { useSite } from '../../context/SiteContext';
import { SectionWrap, Field, Input, Row, Divider } from './AdminFields';

export default function StatsAdmin() {
  const { site, updateSect } = useSite();
  const [stats, setStats] = useState([...site.stats]);
  const [saved, setSaved] = useState(false);

  const setField = (i, k, v) => {
    const copy = stats.map((s, idx) => idx === i ? { ...s, [k]: k === 'target' ? Number(v) : v } : s);
    setStats(copy);
  };

  const save = () => {
    updateSect('stats', stats);
    setSaved(true); setTimeout(() => setSaved(false), 2000);
  };

  return (
    <SectionWrap
      title="Stats Bar"
      subtitle="4 animated counter statistics shown below the hero"
      onSave={save}
      saving={saved}
    >
      {stats.map((s, i) => (
        <div key={i}>
          {i > 0 && <Divider label={`Stat ${i + 1}`} />}
          {i === 0 && <Divider label="Stat 1" />}
          <Row>
            <Field label="Number (target)">
              <Input type="number" value={s.target} onChange={v => setField(i, 'target', v)} placeholder="54" />
            </Field>
            <Field label="Unit suffix">
              <Input value={s.unit} onChange={v => setField(i, 'unit', v)} placeholder="K+" />
            </Field>
            <Field label="Label">
              <Input value={s.label} onChange={v => setField(i, 'label', v)} placeholder="Instagram Followers" />
            </Field>
          </Row>
        </div>
      ))}
    </SectionWrap>
  );
}
