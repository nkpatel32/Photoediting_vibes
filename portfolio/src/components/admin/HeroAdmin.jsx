import { useState } from 'react';
import { useSite } from '../../context/SiteContext';
import { SectionWrap, Field, Input, Row } from './AdminFields';

export default function HeroAdmin() {
  const { site, updateSect } = useSite();
  const [form, setForm] = useState({ ...site.hero });
  const [saved, setSaved] = useState(false);

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const save = () => {
    updateSect('hero', form);
    setSaved(true); setTimeout(() => setSaved(false), 2000);
  };

  return (
    <SectionWrap
      title="Hero Section"
      subtitle="Main landing banner — headline, subtitle, and CTA buttons"
      onSave={save}
      saving={saved}
    >
      <Field label="Eyebrow Text" hint="small text above headline">
        <Input value={form.eyebrow} onChange={v => set('eyebrow', v)} placeholder="Photo · Video · AI Editing" />
      </Field>

      <Row>
        <Field label="Headline Line 1" hint="plain white text">
          <Input value={form.line1} onChange={v => set('line1', v)} placeholder="VISUAL" />
        </Field>
        <Field label="Headline Line 2" hint="outlined / ghost text">
          <Input value={form.line2} onChange={v => set('line2', v)} placeholder="EDITING" />
        </Field>
        <Field label="Headline Line 3" hint="gold accent text">
          <Input value={form.line3} onChange={v => set('line3', v)} placeholder="VIBES." />
        </Field>
      </Row>

      <Field label="Subtitle Paragraph">
        <Input value={form.subtitle} onChange={v => set('subtitle', v)} placeholder="Describe your work..." />
      </Field>

      <Row>
        <Field label="Primary CTA Button">
          <Input value={form.cta1} onChange={v => set('cta1', v)} placeholder="Watch Showreel ▶" />
        </Field>
        <Field label="Secondary CTA Button">
          <Input value={form.cta2} onChange={v => set('cta2', v)} placeholder="Get Quote" />
        </Field>
      </Row>
    </SectionWrap>
  );
}
