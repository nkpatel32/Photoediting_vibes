import { useEffect, useRef, useState } from 'react';
import { useSite } from '../context/SiteContext';
import { getOptimizedMediaUrl } from '../data/utils';
import './Showreel.css';

const isVideoUrlDirect = (url) => {
  if (!url) return false;
  return url.match(/\.(mp4|webm|ogg|mov)(\?|$)/i) || url.includes('res.cloudinary.com') || url.includes('/uploads/');
};

function ReelCard({ reel, index, onClick }) {
  const videoRef = useRef(null);
  const [hovered, setHovered] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const isDirect = isVideoUrlDirect(reel.videoUrl);

  useEffect(() => {
    if (!videoRef.current || !isDirect) return;
    if (hovered) {
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          // Autoplay was prevented
          console.warn("Hover autoplay blocked:", error);
        });
      }
    } else {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, [hovered, isDirect]);

  return (
    <div 
      className="reel-card reveal"
      style={{ transitionDelay: `${(index % 4) * 0.1}s` }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
    >
      <div className="reel-card-inner">
        {/* Cover Image */}
        {reel.coverImage ? (
          <img 
            src={getOptimizedMediaUrl(reel.coverImage, 400)} 
            alt={reel.title} 
            className={`reel-cover-img ${hovered && isDirect && videoLoaded ? 'fade-out' : ''}`}
          />
        ) : null}

        {/* Muted Hover Video Preview */}
        {isDirect && reel.videoUrl && (
          <video
            ref={videoRef}
            src={getOptimizedMediaUrl(reel.videoUrl, 480)}
            className={`reel-hover-video ${(!reel.coverImage || (hovered && videoLoaded)) ? 'fade-in' : ''}`}
            muted
            loop
            playsInline
            preload="metadata"
            onLoadedData={() => setVideoLoaded(true)}
          />
        )}

        {/* HUD overlay */}
        <div className="reel-hud">
          <div className="reel-hud-tag">{reel.tag || 'Video'}</div>
          <div className="reel-hud-title">{reel.title}</div>
          <div className="reel-hud-action">
            <span className="play-triangle">▶</span> Preview
          </div>
        </div>

        {/* Subtle grid border/scanlines to make it premium */}
        <div className="reel-card-overlay">
          <div className="corner tl"></div>
          <div className="corner tr"></div>
          <div className="corner bl"></div>
          <div className="corner br"></div>
        </div>
      </div>
    </div>
  );
}

function ReelLightbox({ reels, initialIndex, onClose }) {
  const [index, setIndex] = useState(initialIndex);
  const reel = reels[index];
  const isDirect = isVideoUrlDirect(reel.videoUrl);
  const videoRef = useRef(null);
  const [muted, setMuted] = useState(false);
  const [playing, setPlaying] = useState(true);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') setIndex(prev => (prev > 0 ? prev - 1 : reels.length - 1));
      if (e.key === 'ArrowRight') setIndex(prev => (prev < reels.length - 1 ? prev + 1 : 0));
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [reels.length, onClose]);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setMuted(videoRef.current.muted);
    }
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (playing) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setPlaying(!playing);
    }
  };

  // Re-load video on slide change
  useEffect(() => {
    setPlaying(true);
    if (videoRef.current) {
      videoRef.current.load();
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(err => {
          console.warn("Autoplay blocked in Lightbox:", err);
        });
      }
    }
  }, [index]);

  return (
    <div className="reels-lightbox" onClick={onClose}>
      <div className="reels-lightbox-content" onClick={e => e.stopPropagation()}>
        {/* Aspect 9:16 Vertical Video Wrapper */}
        <div className="reels-lightbox-player">
          {isDirect ? (
            <video
              ref={videoRef}
              src={getOptimizedMediaUrl(reel.videoUrl, 720)}
              className="lightbox-video"
              autoPlay
              playsInline
              loop
              controls={false}
            />
          ) : (
            <iframe
              src={`${reel.videoUrl}?autoplay=1&rel=0`}
              className="lightbox-iframe"
              allow="autoplay; fullscreen"
              allowFullScreen
              title={reel.title}
            />
          )}

          {/* Premium Video Controls Overlay (for native video) */}
          {isDirect && (
            <div className="lightbox-video-controls">
              <button className="lb-control-btn" onClick={togglePlay}>
                {playing ? '⏸' : '▶'}
              </button>
              <button className="lb-control-btn" onClick={toggleMute}>
                {muted ? '🔇' : '🔊'}
              </button>
            </div>
          )}

          {/* HUD Overlay details */}
          <div className="reels-lightbox-hud">
            <div className="lb-hud-tag">{reel.tag}</div>
            <div className="lb-hud-title">{reel.title}</div>
          </div>
        </div>

        {/* Swipe Navigation hints */}
        {reels.length > 1 && (
          <>
            <button 
              className="lb-nav-btn prev-btn" 
              onClick={(e) => { e.stopPropagation(); setIndex(prev => (prev > 0 ? prev - 1 : reels.length - 1)); }}
            >
              ‹
            </button>
            <button 
              className="lb-nav-btn next-btn" 
              onClick={(e) => { e.stopPropagation(); setIndex(prev => (prev < reels.length - 1 ? prev + 1 : 0)); }}
            >
              ›
            </button>
          </>
        )}
      </div>

      <button className="reels-lightbox-close" onClick={onClose}>✕</button>
      <div className="reels-lightbox-counter">{index + 1} / {reels.length}</div>
    </div>
  );
}

export default function Showreel() {
  const { site } = useSite();
  const showreel = site.showreel || {};
  const reels = showreel.reels || [];
  const [lightboxIdx, setLightboxIdx] = useState(null);
  const scrollContainerRef = useRef(null);

  // Re-run observer for items loaded dynamically
  useEffect(() => {
    const revealEls = document.querySelectorAll('.reels-track .reveal');
    if (!revealEls.length) return;

    const io = new IntersectionObserver(
      (entries) => entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add('visible');
      }),
      { threshold: 0.1 }
    );
    revealEls.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, [reels]);

  // Horizontal scroll utility
  const scroll = (dir) => {
    if (scrollContainerRef.current) {
      const offset = dir * 320; // Approximately one card width + gap
      scrollContainerRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  return (
    <section className="showreel-section" id="showreels">
      <div className="reveal">
        <div className="sec-label">{showreel.label || '01 — Showreels'}</div>
        <h2 className="sec-h2">
          {showreel.heading1 || 'WATCH THE'}<br />
          <span className="ghost">{showreel.heading2 || 'MAGIC'}</span><br />
          <span className="gold-text">{showreel.heading3 || 'IN MOTION'}</span>
        </h2>
        <div className="sec-divider"></div>
        <p className="showreel-desc">{showreel.description || 'Curated vertical video reels and transitions.'}</p>
      </div>

      {reels.length === 0 ? (
        <div className="reels-empty reveal">
          No showreels added yet. Add some via the <a href="/admin">Admin Panel</a>.
        </div>
      ) : (
        <div className="reels-slider-container reveal">
          {/* Scroll Navigation Buttons for Desktop */}
          {reels.length > 3 && (
            <div className="reels-nav-controls">
              <button className="reels-arrow-btn left" onClick={() => scroll(-1)}>‹</button>
              <button className="reels-arrow-btn right" onClick={() => scroll(1)}>›</button>
            </div>
          )}

          {/* Horizontally Scrolling Rail */}
          <div className="reels-scroll-area" ref={scrollContainerRef}>
            <div className="reels-track">
              {reels.map((reel, idx) => (
                <ReelCard
                  key={reel.id || idx}
                  reel={reel}
                  index={idx}
                  onClick={() => setLightboxIdx(idx)}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Vertical Reels Lightbox */}
      {lightboxIdx !== null && (
        <ReelLightbox
          reels={reels}
          initialIndex={lightboxIdx}
          onClose={() => setLightboxIdx(null)}
        />
      )}
    </section>
  );
}
