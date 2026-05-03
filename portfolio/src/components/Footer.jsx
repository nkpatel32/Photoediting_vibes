import { useSite } from '../context/SiteContext';
import { Camera, Video, Briefcase, Globe } from 'lucide-react';
import './Footer.css';

export default function Footer() {
  const { site } = useSite();
  const { links } = site;

  const socials = [
    { label: 'Instagram', url: links.instagram, icon: <Camera size={14} /> },
    { label: 'YouTube',   url: links.youtube,   icon: <Video size={14} /> },
    { label: 'Behance',   url: links.behance,   icon: <Globe size={14} /> },
    { label: 'LinkedIn',  url: links.linkedin,  icon: <Briefcase size={14} /> },
  ];

  return (
    <footer>
      <div className="ft-left">{links.footerCopy}</div>
      <div className="ft-right">
        {socials.map(s => (
          <a key={s.label} href={s.url} target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {s.icon} {s.label}
          </a>
        ))}
      </div>
    </footer>
  );
}
