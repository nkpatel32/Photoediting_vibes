import { useSite } from '../context/SiteContext';
import './Marquee.css';

export default function Marquee() {
  const { site } = useSite();
  const { marquee } = site;
  const items = [...marquee, ...marquee, ...marquee]; // triplicate for safer seamless loop

  return (
    <div className="marquee-wrap">
      <div className="marquee-track">
        {items.map((tag, i) => (
          <span key={i} className="m-item">
            {tag} <span className="m-sep">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
