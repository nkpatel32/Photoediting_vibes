import { useEffect, useRef, useState } from 'react';
import { useSite } from '../context/SiteContext';
import './Stats.css';

export default function Stats() {
  const { site } = useSite();
  const { stats } = site;
  const [counts, setCounts] = useState(stats.map(() => 0));
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      
      stats.forEach((s, i) => {
        const duration = 2000;
        const steps = 60;
        const step = s.target / steps;
        let current = 0;
        
        const timer = setInterval(() => {
          current = Math.min(current + step, s.target);
          setCounts(prev => {
            const next = [...prev];
            next[i] = Math.round(current);
            return next;
          });
          if (current >= s.target) clearInterval(timer);
        }, duration / steps);
      });
      
      observer.disconnect();
    }, { threshold: 0.1 });

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [stats]);

  return (
    <div className="stats" ref={ref}>
      {stats.map((s, i) => (
        <div className="stat reveal" key={i} style={{ transitionDelay: `${i * 0.1}s` }}>
          <div className="stat-n">
            {counts[i]}
            <span className="stat-unit">{s.unit}</span>
          </div>
          <div className="stat-l">{s.label}</div>
        </div>
      ))}
    </div>
  );
}
