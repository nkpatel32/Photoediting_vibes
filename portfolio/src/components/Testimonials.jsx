import { useState, useRef, useEffect } from 'react';
import { useSite } from '../context/SiteContext';
import ScrollIndicator from './ScrollIndicator';
import './Testimonials.css';

export default function Testimonials() {
  const { site } = useSite();
  const { testimonials } = site;
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

  useEffect(() => {
    const grid = scrollRef.current;
    if (!grid) return;

    let isHovered = false;
    const setHover = () => isHovered = true;
    const clearHover = () => isHovered = false;

    grid.addEventListener('mouseenter', setHover);
    grid.addEventListener('mouseleave', clearHover);
    grid.addEventListener('touchstart', setHover, { passive: true });
    grid.addEventListener('touchend', clearHover);

    const interval = setInterval(() => {
      if (isHovered) return;
      
      const { scrollLeft, scrollWidth, clientWidth } = grid;
      if (scrollWidth <= clientWidth) return; // No need to scroll

      const card = grid.querySelector('.testi-card');
      if (!card) return;
      
      // Calculate width including gap
      const style = window.getComputedStyle(grid);
      const gap = parseFloat(style.gap) || 0;
      const cardWidth = card.offsetWidth + gap;

      if (scrollLeft + clientWidth >= scrollWidth - 10) {
        // Reached end, rewind
        grid.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        // Scroll next
        grid.scrollBy({ left: cardWidth, behavior: 'smooth' });
      }
    }, 3000);

    return () => {
      clearInterval(interval);
      grid.removeEventListener('mouseenter', setHover);
      grid.removeEventListener('mouseleave', clearHover);
      grid.removeEventListener('touchstart', setHover);
      grid.removeEventListener('touchend', clearHover);
    };
  }, []);

  return (
    <section className="testi-section reveal">
      <div className="sec-label">07 — Reviews</div>
      <h2 className="sec-h2">CLIENT<br /><span className="ghost">WORDS</span></h2>
      <div className="sec-divider"></div>
      <div className="testi-grid" ref={scrollRef} onScroll={handleScroll}>
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
      <ScrollIndicator progress={scrollProgress} />
    </section>
  );
}
