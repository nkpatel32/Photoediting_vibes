import { useState, useEffect } from 'react';
import { useSite } from '../context/SiteContext';
import { useGallery } from '../context/GalleryContext';
import { Play, Send } from 'lucide-react';
import './Hero.css';

export default function Hero() {
  const { site } = useSite();
  const { hero, beforeAfter } = site;
  const { items: galleryItems } = useGallery();

  const slideImages = beforeAfter?.map(item => item.after || item.afterImg).filter(Boolean).slice(0, 4) || [];
  const reelImagesRaw = galleryItems?.map(item => item.thumb || item.after).filter(Boolean) || [];
  const reelImages = reelImagesRaw.length > 0 ? reelImagesRaw : slideImages;

  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    if (slideImages.length <= 1) return;
    const interval = setInterval(() => {
      setActiveSlide(s => (s + 1) % slideImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [slideImages.length]);

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
          
          {/* Live Viewfinder Slideshow */}
          {slideImages.length > 0 && (
            <div className="hero-slideshow">
              {slideImages.map((img, idx) => (
                <div 
                  key={idx} 
                  className={`hs-slide ${idx === activeSlide ? 'active' : ''}`}
                >
                  <img src={img} alt="Showcase" className="hs-img" />
                </div>
              ))}
              <div className="hs-overlay"></div>
            </div>
          )}
          <div className="cine-frame">
            <div className="cf-tl"></div>
            <div className="cf-tr"></div>
            <div className="cf-bl"></div>
            <div className="cf-br"></div>
          </div>
          
          <div className="subtle-crosshair"></div>

          <div className="hud h-tl">REC ●</div>
          <div className="hud h-tr">ISO 800<br/>1/60 F2.8</div>
          <div className="hud h-bl">4K 60FPS<br/>CLOG-3</div>
          <div className="hud h-br">00:12:44:02</div>
        </div>

        <div className="filmstrip-h">
          <div className="fs-track">
            {reelImages.length > 0 && [...reelImages, ...reelImages, ...reelImages].map((img, i) => (
              <div key={i} className="fs-frame">
                <div className="fs-frame-img" style={{ backgroundImage: `url(${img})` }}></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="scroll-hint">
        <div className="scroll-line"></div>
        <span>Scroll</span>
      </div>
    </section>
  );
}
