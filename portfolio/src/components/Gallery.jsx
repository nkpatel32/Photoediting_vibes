import { useState, useEffect } from 'react';
import { useGallery } from '../context/GalleryContext';
import GalleryModal from './GalleryModal';
import './Gallery.css';

export default function Gallery() {
  const { items } = useGallery();
  const [modalIdx, setModalIdx] = useState(null); // null = closed, number = open

  // The main page observer runs before these items load. 
  // We need a local observer to reveal the gallery items once they fetch.
  useEffect(() => {
    const revealEls = document.querySelectorAll('.gallery-grid .reveal');
    if (!revealEls.length) return;

    const io = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.1 }
    );
    revealEls.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, [items]);

  return (
    <section className="gallery-section" id="work">
      <div className="reveal">
        <div className="sec-label">04 — Portfolio</div>
        <h2 className="sec-h2">SELECTED<br /><span className="ghost">WORK</span></h2>
        <div className="sec-divider"></div>
        <p className="gallery-hint">
          Click any image to explore the before / after transformation
        </p>
      </div>

      {items.length === 0 ? (
        <div className="gallery-empty">
          No gallery items yet. Add some from the <a href="/admin">Admin Panel</a>.
        </div>
      ) : (
        <div className="gallery-grid">
          {items.map((item, i) => (
            <div
              key={item.id}
              className={`g-item ${item.cls} reveal`}
              style={{ transitionDelay: `${(i % 3) * 0.1}s` }}
              onClick={() => setModalIdx(i)}
            >
              <div className="g-thumb">
                <img src={item.thumb} alt={item.title} className="g-img" loading="lazy" />
              </div>
              <div className="g-overlay">
                <div className="g-overlay-inner">
                  <div className="g-cat">{item.cat}</div>
                  <div className="g-title">{item.title}</div>
                  <div className="g-cta">
                    <span className="g-cta-icon">⟷</span>
                    View Before / After
                  </div>
                </div>
              </div>
              <div className="g-badge">{item.tag}</div>
            </div>
          ))}
        </div>
      )}

      {modalIdx !== null && (
        <GalleryModal
          items={items}
          initialIdx={modalIdx}
          onClose={() => setModalIdx(null)}
        />
      )}
    </section>
  );
}
