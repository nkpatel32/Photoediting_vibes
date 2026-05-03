import { useState } from 'react';
import { Mail, Phone, Camera, Video, Briefcase, Globe, MessageSquare, Info } from 'lucide-react';
import { useSite } from '../../context/SiteContext';
import { SectionWrap, Field, Input, Textarea, Row, Divider } from './AdminFields';

export default function ContactAdmin() {
  const { site, updateSect } = useSite();
  const [contact, setContact] = useState({ ...site.contact });
  const [links,   setLinks]   = useState({ ...site.links });
  const [nav,     setNav]     = useState({ ...site.nav });
  const [saved,   setSaved]   = useState(false);

  const setC = (k, v) => setContact(f => ({ ...f, [k]: v }));
  const setL = (k, v) => setLinks(f => ({ ...f, [k]: v }));
  const setN = (k, v) => setNav(f => ({ ...f, [k]: v }));

  const save = () => {
    updateSect('contact', contact);
    updateSect('links', links);
    updateSect('nav', nav);
    setSaved(true); setTimeout(() => setSaved(false), 2000);
  };

  return (
    <SectionWrap
      title="Contact & Links"
      subtitle="Contact section content, social media URLs, and footer links"
      onSave={save}
      saving={saved}
    >
      <Divider label={<><MessageSquare size={14} style={{marginRight:'6px'}} /> Contact Section Text</>} />
      <Row>
        <Field label="Big Headline Line 1">
          <Input value={contact.bigLine1} onChange={v => setC('bigLine1', v)} placeholder="LET'S" />
        </Field>
        <Field label="Big Headline Line 2">
          <Input value={contact.bigLine2} onChange={v => setC('bigLine2', v)} placeholder="CREATE" />
        </Field>
        <Field label="Big Headline Line 3 (gold)">
          <Input value={contact.bigLine3} onChange={v => setC('bigLine3', v)} placeholder="TOGETHER." />
        </Field>
      </Row>
      <Field label="Description Paragraph">
        <Textarea value={contact.description} onChange={v => setC('description', v)} rows={2} placeholder="DM me for..." />
      </Field>
      <Row>
        <Field label={<><Camera size={12} style={{marginRight:'4px'}} /> Instagram Handle Text</>}>
          <Input value={contact.igHandle} onChange={v => setC('igHandle', v)} placeholder="@photoediting_vibes" />
        </Field>
        <Field label={<><Mail size={12} style={{marginRight:'4px'}} /> Email (optional)</>}>
          <Input type="email" value={contact.email} onChange={v => setC('email', v)} placeholder="you@email.com" />
        </Field>
        <Field label={<><Phone size={12} style={{marginRight:'4px'}} /> Phone / WhatsApp (optional)</>}>
          <Input value={contact.phone} onChange={v => setC('phone', v)} placeholder="+91 98765 43210" />
        </Field>
      </Row>

      <Divider label={<><Globe size={14} style={{marginRight:'6px'}} /> Social Media Links</>} />
      <Row>
        <Field label={<><Camera size={12} style={{marginRight:'4px'}} /> Instagram URL</>}>
          <Input type="url" value={links.instagram} onChange={v => setL('instagram', v)} placeholder="https://instagram.com/..." />
        </Field>
        <Field label={<><Video size={12} style={{marginRight:'4px'}} /> YouTube URL</>}>
          <Input type="url" value={links.youtube} onChange={v => setL('youtube', v)} placeholder="https://youtube.com/..." />
        </Field>
      </Row>
      <Row>
        <Field label="Behance URL">
          <Input type="url" value={links.behance} onChange={v => setL('behance', v)} placeholder="https://behance.net/..." />
        </Field>
        <Field label={<><Briefcase size={12} style={{marginRight:'4px'}} /> LinkedIn URL</>}>
          <Input type="url" value={links.linkedin} onChange={v => setL('linkedin', v)} placeholder="https://linkedin.com/..." />
        </Field>
      </Row>
      <Field label="Footer Copyright Text">
        <Input value={links.footerCopy} onChange={v => setL('footerCopy', v)} placeholder="© 2025 @photoediting_vibes..." />
      </Field>

      <Divider label={<><Info size={14} style={{marginRight:'6px'}} /> Navbar</>} />
      <Row>
        <Field label="Logo Main Text" hint="bold gold part">
          <Input value={nav.logo} onChange={v => setN('logo', v)} placeholder="PEV" />
        </Field>
        <Field label="Logo Suffix" hint="muted grey part">
          <Input value={nav.logoSuffix} onChange={v => setN('logoSuffix', v)} placeholder="ibes" />
        </Field>
      </Row>
      <Row>
        <Field label="Navbar Instagram Text">
          <Input value={nav.igText} onChange={v => setN('igText', v)} placeholder="@photoediting_vibes ↗" />
        </Field>
        <Field label="Navbar Instagram URL">
          <Input type="url" value={nav.igLink} onChange={v => setN('igLink', v)} placeholder="https://instagram.com/..." />
        </Field>
      </Row>
    </SectionWrap>
  );
}
