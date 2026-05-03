import { useState, useRef } from 'react';
import { useSite } from '../context/SiteContext';
import ScrollIndicator from './ScrollIndicator';
import './Process.css';

export default function Process() {
  const { site } = useSite();
  const { process } = site;
  const [scrollProgress, setScrollProgress] = useState(0);
  const scrollRef = useRef(null);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    if (scrollWidth > clientWidth) {
      setScrollProgress(scrollLeft / (scrollWidth - clientWidth));
    } else {
      setScrollProgress(0);
    }
  };

  return (
    <section className="process-section">
      <div className="process-bg-text">PROCESS</div>
      <div className="reveal">
        <div className="sec-label">06 — Workflow</div>
        <h2 className="sec-h2">HOW IT<br /><span className="ghost">WORKS</span></h2>
        <div className="sec-divider"></div>
      </div>
      <div className="process-steps" style={{ gridTemplateColumns: `repeat(${process.length}, 1fr)` }} ref={scrollRef} onScroll={handleScroll}>
        {process.map((s, i) => (
          <div className="p-step reveal" key={s.id || i} style={{ transitionDelay: `${i * 0.1}s` }}>
            {i < process.length - 1 && <div className="p-arrow"></div>}
            <div className="p-num">{String(i + 1).padStart(2, '0')}</div>
            <div className="p-name">{s.name}</div>
            <p className="p-desc">{s.desc}</p>
          </div>
        ))}
      </div>
      <ScrollIndicator progress={scrollProgress} />
    </section>
  );
}
