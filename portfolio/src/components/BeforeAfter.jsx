import { useState, useEffect, useMemo, useCallback } from 'react';
import { useSite } from '../context/SiteContext';
import './BeforeAfter.css';

const BACKEND_URL = 'https://photoediting-vibes.onrender.com/api';
const LOCAL_URL = 'http://localhost:3001/api';

function getApiUrl() {
  return window.location.hostname === 'localhost' ? LOCAL_URL : BACKEND_URL;
}

// Assign size based on image aspect ratio
function autoSize(width, height) {
  const ratio = height / width;
  if (ratio > 1.4) return 'xl';
  if (ratio > 1.1) return 'large';
  if (ratio > 0.8) return 'medium';
  return 'small';
}

function PinCard({ item, index, onClick }) {
  const sizeClass = `pin-${item.size || 'medium'}`;

  return (
    <div
      className={`pin-card ${sizeClass} reveal`}
      style={{ transitionDelay: `${(index % 6) * 0.08}s` }}
      onClick={() => onClick(index)}
    >
      <div className="pin-img-wrap">
        <img
          src={item.image}
          alt={item.title}
          className="pin-img"
          loading="lazy"
        />
        <div className="pin-overlay">
          <div className="pin-overlay-inner">
            <div className="pin-category">{item.category}</div>
            <div className="pin-title">{item.title}</div>
            {item.photographer && (
              <div className="pin-photographer">by {item.photographer}</div>
            )}
            <div className="pin-view-btn">
              <span className="pin-view-icon">⬡</span>
              View
            </div>
          </div>
        </div>
        <div className="pin-size-badge">{item.category}</div>
      </div>
    </div>
  );
}

function Lightbox({ items, index, onClose, onNav }) {
  const item = items[index];

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft')  onNav(-1);
      if (e.key === 'ArrowRight') onNav(1);
    };
    window.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [onClose, onNav]);

  return (
    <div className="pin-lightbox" onClick={onClose}>
      <div className="pin-lightbox-content" onClick={e => e.stopPropagation()}>
        <img
          src={item.fullImage || item.image}
          alt={item.title}
          className="pin-lightbox-img"
        />
        <div className="pin-lightbox-info">
          <div className="pin-lightbox-cat">{item.category}</div>
          <div className="pin-lightbox-title">{item.title}</div>
          {item.photographer && (
            <div className="pin-lightbox-photographer">📸 {item.photographer}</div>
          )}
        </div>
      </div>

      <button className="pin-lightbox-close" onClick={onClose}>✕</button>

      {items.length > 1 && (
        <>
          <button
            className="pin-lightbox-nav pin-lightbox-prev"
            onClick={e => { e.stopPropagation(); onNav(-1); }}
          >
            ‹
          </button>
          <button
            className="pin-lightbox-nav pin-lightbox-next"
            onClick={e => { e.stopPropagation(); onNav(1); }}
          >
            ›
          </button>
        </>
      )}

      <div className="pin-lightbox-counter">
        {index + 1} / {items.length}
      </div>
    </div>
  );
}

export default function BeforeAfter() {
  const { site } = useSite();
  const manualItems = site.pinterestGallery || [];
  const pexelsConfig = site.pexelsConfig || {};
  
  const [pexelsPhotos, setPexelsPhotos] = useState([]);
  const [pexelsLoading, setPexelsLoading] = useState(false);
  const [activeFilter, setActiveFilter] = useState('All');
  const [lightboxIdx, setLightboxIdx] = useState(null);

  // Fetch Pexels photos
  useEffect(() => {
    if (!pexelsConfig.enabled) return;

    const fetchPexels = async () => {
      setPexelsLoading(true);
      try {
        const perPage = pexelsConfig.perPage || 30;
        let url;

        if (pexelsConfig.photoIds) {
          // Photo IDs mode — fetch specific selected photos
          url = `${getApiUrl()}/pexels?photo_ids=${encodeURIComponent(pexelsConfig.photoIds)}`;
        } else if (pexelsConfig.collectionId) {
          // Collection mode — fetch from a specific collection
          url = `${getApiUrl()}/pexels?collection_id=${encodeURIComponent(pexelsConfig.collectionId)}&per_page=${perPage}`;
        } else {
          // Search mode — fallback
          const query = pexelsConfig.query || 'photo editing';
          url = `${getApiUrl()}/pexels?query=${encodeURIComponent(query)}&per_page=${perPage}`;
          if (pexelsConfig.photographer) {
            url += `&photographer=${encodeURIComponent(pexelsConfig.photographer)}`;
          }
        }
        
        const res = await fetch(url);
        if (!res.ok) throw new Error('Pexels fetch failed');
        const data = await res.json();
        
        // Transform Pexels photos to our format
        const photos = data.photos || [];
        const transformed = photos.map(photo => ({
          id: `pexels-${photo.id}`,
          title: photo.alt || photo.photographer || 'Untitled',
          category: 'Pexels',
          image: photo.src?.large || photo.src?.medium || '',
          fullImage: photo.src?.large2x || photo.src?.original || photo.src?.large || '',
          size: autoSize(photo.width || 800, photo.height || 600),
          photographer: photo.photographer,
          pexelsUrl: photo.url,
          source: 'pexels',
        }));
        
        setPexelsPhotos(transformed);
      } catch (err) {
        console.warn('Could not fetch Pexels photos:', err);
        setPexelsPhotos([]);
      } finally {
        setPexelsLoading(false);
      }
    };

    fetchPexels();
  }, [pexelsConfig.enabled, pexelsConfig.query, pexelsConfig.photographer, pexelsConfig.collectionId, pexelsConfig.photoIds, pexelsConfig.perPage]);

  // Combine manual + pexels items
  const allItems = useMemo(() => {
    return [...manualItems, ...pexelsPhotos];
  }, [manualItems, pexelsPhotos]);

  // Extract unique categories
  const categories = useMemo(() => {
    const cats = [...new Set(allItems.map(item => item.category).filter(Boolean))];
    return ['All', ...cats];
  }, [allItems]);

  // Filter items
  const filteredItems = useMemo(() => {
    if (activeFilter === 'All') return allItems;
    return allItems.filter(item => item.category === activeFilter);
  }, [allItems, activeFilter]);

  // Lightbox navigation
  const handleNav = useCallback((dir) => {
    setLightboxIdx(prev => {
      const next = prev + dir;
      if (next < 0) return filteredItems.length - 1;
      if (next >= filteredItems.length) return 0;
      return next;
    });
  }, [filteredItems.length]);

  const closeLightbox = useCallback(() => setLightboxIdx(null), []);

  // Re-observe reveal elements when filter changes
  useEffect(() => {
    const revealEls = document.querySelectorAll('.pin-grid .reveal');
    if (!revealEls.length) return;

    const io = new IntersectionObserver(
      (entries) => entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add('visible');
      }),
      { threshold: 0.1 }
    );
    revealEls.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, [filteredItems]);

  return (
    <section className="pin-section" id="pinterest-gallery">
      <div className="reveal">
        <div className="sec-label">02 — Gallery</div>
        <h2 className="sec-h2">CURATED<br /><span className="ghost">WORK</span></h2>
        <div className="sec-divider"></div>
        <p className="pin-desc">
          A hand-picked collection of my finest photo edits, color grades, and visual transformations — each one crafted with precision.
        </p>
      </div>

      {/* Category Filters */}
      {categories.length > 2 && (
        <div className="pin-filters reveal">
          {categories.map(cat => (
            <button
              key={cat}
              className={`pin-filter-btn ${activeFilter === cat ? 'active' : ''}`}
              onClick={() => setActiveFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {/* Loading indicator */}
      {pexelsLoading && (
        <div className="pin-loading">
          <div className="pin-loading-spinner"></div>
          <span>Loading photos from Pexels...</span>
        </div>
      )}

      {/* Masonry Grid */}
      {filteredItems.length === 0 && !pexelsLoading ? (
        <div className="pin-empty">
          No gallery items yet. Add some from the <a href="/admin">Admin Panel</a> or connect your Pexels account.
        </div>
      ) : (
        <div className="pin-grid">
          {filteredItems.map((item, i) => (
            <PinCard
              key={item.id}
              item={item}
              index={i}
              onClick={(idx) => setLightboxIdx(idx)}
            />
          ))}
        </div>
      )}



      {/* Lightbox */}
      {lightboxIdx !== null && (
        <Lightbox
          items={filteredItems}
          index={lightboxIdx}
          onClose={closeLightbox}
          onNav={handleNav}
        />
      )}
    </section>
  );
}
