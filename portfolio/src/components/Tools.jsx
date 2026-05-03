import { useEffect, useRef } from 'react';
import { useSite } from '../context/SiteContext';
import './Tools.css';

export default function Tools() {
  const { site } = useSite();
  const { tools } = site;
  const ref = useRef(null);

  useEffect(() => {
    const bars = ref.current?.querySelectorAll('.tool-level-fill');
    if (!bars) return;
    bars.forEach(b => { b.style.transition = 'none'; b.style.width = '0'; });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          setTimeout(() => {
            e.target.style.transition = 'width 1s ease';
            e.target.style.width = e.target.dataset.level + '%';
          }, 200);
          observer.unobserve(e.target);
        }
      });
    }, { threshold: 0.5 });

    bars.forEach(b => observer.observe(b));
    return () => observer.disconnect();
  }, [tools]);

  return (
    <section className="tools-section reveal" ref={ref}>
      <div className="sec-label">05 — Arsenal</div>
      <h2 className="sec-h2">TOOLS I<br /><span className="ghost">MASTER</span></h2>
      <div className="sec-divider"></div>
      <div className="tools-grid">
        {tools.map((t, i) => (
          <div className="tool-item" key={t.id || i}>
            <div className="tool-name">{t.name}</div>
            <div className="tool-cat">{t.cat}</div>
            <div className="tool-level-bar">
              <div className="tool-level-fill" data-level={t.level}></div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
