import { useSite } from '../context/SiteContext';
import { Play, Send } from 'lucide-react';
import './Hero.css';

export default function Hero() {
  const { site } = useSite();
  const { hero } = site;

  return (
    <section className="hero" id="hero">
      <div className="hero-bg-grid"></div>

      <div className="hero-left">
        <div className="hero-eyebrow">{hero.eyebrow}</div>
        <h1 className="hero-h1">
          <span className="line1">{hero.line1}</span>
          <span className="line2">{hero.line2}</span>
          <span className="line3">{hero.line3}</span>
        </h1>
        <p className="hero-sub">{hero.subtitle}</p>
        <div className="hero-actions">
          <a className="btn-gold" href="#showreel">
            <Play size={14} fill="currentColor" style={{marginRight:'8px'}} />
            {hero.cta1.replace(' ▶', '')}
          </a>
          <a className="btn-ghost" href="#contact">
            <Send size={14} style={{marginRight:'8px'}} />
            {hero.cta2}
          </a>
        </div>
      </div>

      <div className="hero-right">
        <div className="hero-right-inner">
          <div className="cine-frame">
            <div className="cf-tl"></div>
            <div className="cf-tr"></div>
            <div className="cf-bl"></div>
            <div className="cf-br"></div>
          </div>

          <div className="lens-system">
            <div className="lens-orbit o1"><div className="lens-dot"></div></div>
            <div className="lens-orbit o2"><div className="lens-dot"></div></div>
            <div className="lens-orbit o3"></div>
            <div className="lens-orbit o4"></div>
            <div className="lens-center"></div>
            <div className="lens-crosshair"></div>
          </div>

          <div className="hud h-tl">REC ●</div>
          <div className="hud h-tr">ISO 800<br/>1/60 F2.8</div>
          <div className="hud h-bl">4K 60FPS<br/>CLOG-3</div>
          <div className="hud h-br">00:12:44:02</div>
        </div>

        <div className="filmstrip-h">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="fs-frame"></div>
          ))}
        </div>
      </div>

      <div className="scroll-hint">
        <div className="scroll-line"></div>
        <span>Scroll</span>
      </div>
    </section>
  );
}
