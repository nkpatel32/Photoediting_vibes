import { useSite } from '../context/SiteContext';
import * as LucideIcons from 'lucide-react';
import './Services.css';

export default function Services() {
  const { site } = useSite();
  const { services } = site;

  return (
    <section className="services-section" id="services">
      <div className="reveal">
        <div className="sec-label">03 — Services</div>
        <h2 className="sec-h2">WHAT I<br /><span className="ghost">OFFER</span></h2>
        <div className="sec-divider"></div>
      </div>
      <div className="services-grid">
        {services.map((s, i) => {
          const IconComponent = LucideIcons[s.icon] || LucideIcons.HelpCircle;
          return (
            <div className="svc-card reveal" key={s.id || i} style={{ transitionDelay: `${(i % 3) * 0.1}s` }}>
              <span className="svc-n">{String(i + 1).padStart(2, '0')}</span>
              <span className="svc-icon">
                {typeof s.icon === 'string' && LucideIcons[s.icon] ? <IconComponent size={32} /> : s.icon}
              </span>
              <div className="svc-name">{s.name}</div>
              <p className="svc-desc">{s.desc}</p>
              <div className="svc-tools">
                {(s.tools || []).map((t, j) => <span className="tool-tag" key={j}>{t}</span>)}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
