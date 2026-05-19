import { useEffect, useRef, useState, useCallback } from 'react';
import { optimizeCloudinary } from '../data/utils';
import './GalleryModal.css';

export default function GalleryModal({ items, initialIdx, onClose }) {
  const sliderRef  = useRef(null);
  const [pct, setPct]       = useState(50);
  const [dragging, setDrag] = useState(false);
  const [idx, setIdx]       = useState(initialIdx ?? 0);

  const current = items[idx];

  /* Reset slider when item changes */
  useEffect(() => { setPct(50); }, [idx]);

  /* Keyboard navigation */
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') setIdx(i => Math.min(i + 1, items.length - 1));
      if (e.key === 'ArrowLeft')  setIdx(i => Math.max(i - 1, 0));
    };
    document.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
    };
  }, [onClose, items.length]);

  /* Slider logic */
  const updatePct = useCallback((clientX) => {
    const rect = sliderRef.current?.getBoundingClientRect();
    if (!rect) return;
    const p = Math.max(2, Math.min(98, ((clientX - rect.left) / rect.width) * 100));
    setPct(p);
  }, []);

  const onMouseDown = (e) => { setDrag(true); updatePct(e.clientX); e.preventDefault(); };
  const onMouseMove = useCallback((e) => { if (dragging) updatePct(e.clientX); }, [dragging, updatePct]);
  const onMouseUp   = useCallback(() => setDrag(false), []);
  const onTouchStart = (e) => { setDrag(true); updatePct(e.touches[0].clientX); };
  const onTouchMove  = useCallback((e) => { if (dragging) updatePct(e.touches[0].clientX); }, [dragging, updatePct]);

  useEffect(() => {
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup',   onMouseUp);
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend',  onMouseUp);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup',   onMouseUp);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend',  onMouseUp);
    };
  }, [onMouseMove, onTouchMove, onMouseUp]);

  if (!current) return null;

  return (
    <div className="modal-backdrop" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal-box">

        {/* ── Top bar ── */}
        <div className="modal-topbar">
          <div className="modal-meta">
            <span className="modal-cat">{current.cat}</span>
            <span className="modal-sep">·</span>
            <span className="modal-title">{current.title}</span>
          </div>
          <div className="modal-controls">
            <span className="modal-counter">
              {String(idx + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
            </span>
            <button
              className="modal-nav-btn"
              disabled={idx === 0}
              onClick={() => setIdx(i => i - 1)}
              aria-label="Previous"
            >←</button>
            <button
              className="modal-nav-btn"
              disabled={idx === items.length - 1}
              onClick={() => setIdx(i => i + 1)}
              aria-label="Next"
            >→</button>
            <button className="modal-close" onClick={onClose} aria-label="Close">✕</button>
          </div>
        </div>

        {/* ── Slider ── */}
        <div
          className={`modal-slider ${dragging ? 'dragging' : ''}`}
          ref={sliderRef}
          onMouseDown={onMouseDown}
          onTouchStart={onTouchStart}
        >
          {/* AFTER (Base layer) */}
          <div className="ms-after">
            <img src={optimizeCloudinary(current.after, 1200)} alt="After" className="ms-img" draggable={false} />
          </div>

          {/* BEFORE (Top layer, clipped from the right) */}
          <div className="ms-before" style={{ clipPath: `inset(0 ${100 - pct}% 0 0)` }}>
            <img src={optimizeCloudinary(current.before, 1200)} alt="Before" className="ms-img" draggable={false} />
          </div>

          {/* Labels */}
          <div className="ms-label ms-label-before" style={{ opacity: pct > 15 ? 1 : 0 }}>Before</div>
          <div className="ms-label ms-label-after"  style={{ opacity: pct < 85 ? 1 : 0 }}>After</div>

          {/* Handle */}
          <div
            className="ms-handle"
            style={{ left: `${pct}%` }}
            onMouseDown={onMouseDown}
            onTouchStart={onTouchStart}
          >
            <div className="ms-handle-line"></div>
            <div className="ms-handle-btn">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 18l-6-6 6-6M15 6l6 6-6 6" />
              </svg>
            </div>
          </div>

          {/* Drag hint */}
          {pct === 50 && (
            <div className="ms-drag-hint">
              <span>⟵ Drag to compare ⟶</span>
            </div>
          )}
        </div>

        {/* ── Info bar ── */}
        <div className="modal-infobar">
          <div className="modal-tag-badge">{current.tag}</div>
          {current.desc && <p className="modal-desc">{current.desc}</p>}
          <div className="modal-pct-display">
            <div className="modal-pct-bar">
              <div className="modal-pct-before" style={{ width: `${pct}%` }}>
                <span>Before {Math.round(pct)}%</span>
              </div>
              <div className="modal-pct-after" style={{ width: `${100 - pct}%` }}>
                <span>After {Math.round(100 - pct)}%</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
