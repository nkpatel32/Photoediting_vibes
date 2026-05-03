import { useEffect, useRef } from 'react';
import { useSite } from '../context/SiteContext';
import './BeforeAfter.css';



function BASlider({ item, delay }) {
  const sliderRef = useRef(null);

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;
    const after = slider.querySelector('.ba-after');
    const handle = slider.querySelector('.ba-handle');
    let dragging = false;

    const updateSlider = (x) => {
      const rect = slider.getBoundingClientRect();
      let pct = ((x - rect.left) / rect.width) * 100;
      pct = Math.max(5, Math.min(95, pct));
      after.style.clipPath = `inset(0 0 0 ${pct}%)`;
      handle.style.left = pct + '%';
    };

    const onDown = (e) => { dragging = true; updateSlider(e.clientX || e.touches?.[0]?.clientX); };
    const onMove = (e) => { if (dragging) updateSlider(e.clientX || e.touches?.[0]?.clientX); };
    const onUp = () => { dragging = false; };

    slider.addEventListener('mousedown', onDown);
    handle.addEventListener('mousedown', (e) => { dragging = true; e.preventDefault(); });
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    handle.addEventListener('touchstart', (e) => { dragging = true; e.preventDefault(); }, { passive: false });
    window.addEventListener('touchmove', (e) => { if (dragging) updateSlider(e.touches[0].clientX); }, { passive: false });
    window.addEventListener('touchend', onUp);

    return () => {
      slider.removeEventListener('mousedown', onDown);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
      window.removeEventListener('touchend', onUp);
    };
  }, []);

  return (
    <div className="ba-item reveal" style={{ transitionDelay: delay }}>
      <div className="ba-tag">{item.tag || item.label}</div>
      <div className="ba-slider-wrap" ref={sliderRef}>
        <div className="ba-before">
          <img src={item.before || item.beforeImg} alt={`Before ${item.tag}`} className="ba-img" />
        </div>
        <div className="ba-after">
          <img src={item.after || item.afterImg} alt={`After ${item.tag}`} className="ba-img" />
        </div>
        <div className="ba-handle"></div>
        <div className="ba-labels">
          <div className="ba-l">Before</div>
          <div className="ba-r">After</div>
        </div>
      </div>
    </div>
  );
}

export default function BeforeAfter() {
  const { site } = useSite();
  const baItems = site.beforeAfter || [];

  return (
    <section className="ba-section" id="before-after">
      <div className="reveal">
        <div className="sec-label">02 — Transformations</div>
        <h2 className="sec-h2">BEFORE <span className="ghost">vs</span><br />AFTER</h2>
        <div className="sec-divider"></div>
        <p className="ba-desc">
          Drag the slider to see the raw shot vs the finished edit. This is the craft — every pixel deliberate.
        </p>
      </div>
      <div className="ba-grid">
        {baItems.map((item, i) => (
          <BASlider key={item.id || i} item={item} delay={`${(i + 1) * 0.1}s`} />
        ))}
      </div>
    </section>
  );
}
