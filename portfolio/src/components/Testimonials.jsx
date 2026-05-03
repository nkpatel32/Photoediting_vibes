import { useSite } from '../context/SiteContext';
import './Testimonials.css';

export default function Testimonials() {
  const { site } = useSite();
  const { testimonials } = site;

  return (
    <section className="testi-section reveal">
      <div className="sec-label">07 — Reviews</div>
      <h2 className="sec-h2">CLIENT<br /><span className="ghost">WORDS</span></h2>
      <div className="sec-divider"></div>
      <div className="testi-grid">
        {testimonials.map((t, i) => (
          <div className="testi-card" key={t.id || i}>
            <div className="testi-quote">"</div>
            <div className="testi-stars">★★★★★</div>
            <p className="testi-text">{t.text}</p>
            <div className="testi-author">{t.author}</div>
            <div className="testi-role">{t.role}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
