import { useState, useEffect } from 'react';
import { PlayCircle, Image as ImageIcon, Type, Clock, FileText } from 'lucide-react';
import { useSite } from '../../context/SiteContext';
import { SectionWrap, Field, Input, Textarea, Divider, ImgPreview } from './AdminFields';

export default function ShowreelAdmin() {
  const { site, updateSect } = useSite();
  const [form, setForm] = useState({ ...site.showreel });
  const [saved, setSaved] = useState(false);
  const [prevBg, setPrevBg] = useState(form.bgImage);

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  useEffect(() => {
    const t = setTimeout(() => setPrevBg(form.bgImage), 600);
    return () => clearTimeout(t);
  }, [form.bgImage]);

  const save = () => {
    updateSect('showreel', form);
    setSaved(true); setTimeout(() => setSaved(false), 2000);
  };

  return (
    <SectionWrap
      title="Showreel / Video"
      subtitle="Video player section content and embed URL"
      onSave={save}
      saving={saved}
    >
      <Field
        label="YouTube / Vimeo Embed URL"
        hint="paste the embed src URL (not the watch URL)"
      >
        <Input
          value={form.videoUrl}
          onChange={v => set('videoUrl', v)}
          placeholder="https://www.youtube.com/embed/VIDEO_ID"
        />
        <div style={{ fontSize:'0.62rem', color:'rgba(242,237,228,0.25)', marginTop:'0.3rem' }}>
          Example: <code style={{color:'rgba(212,168,67,0.5)'}}>https://www.youtube.com/embed/dQw4w9WgXcQ</code>
        </div>
      </Field>

      <Divider label={<><ImageIcon size={14} style={{marginRight:'6px'}} /> Background & Text</>} />

      <Field label="Background Image URL" hint="shown behind the player">
        <Input value={form.bgImage} onChange={v => set('bgImage', v)} placeholder="https://..." />
        {prevBg && <ImgPreview src={prevBg} label="Background preview" />}
      </Field>

      <Field label="Player Title Overlay" hint="large text shown at bottom of player">
        <Input value={form.playerTitle} onChange={v => set('playerTitle', v)} placeholder="PHOTOEDITING VIBES — 2025 SHOWREEL" />
      </Field>

      <Field label="Timecode Display">
        <Input value={form.timecode} onChange={v => set('timecode', v)} placeholder="00:00:00:00 • 4K • 60fps" />
      </Field>

      <Divider label={<><FileText size={14} style={{marginRight:'6px'}} /> Section Heading</>} />

      <Field label="Section Description">
        <Textarea value={form.description} onChange={v => set('description', v)} placeholder="Describe your showreel..." rows={3} />
      </Field>
    </SectionWrap>
  );
}
