import React from 'react';
import './Pinboard.css';

export default function Pinboard() {
  const scenes = [
    { id: 1, title: 'Scene 04A — Take 2', img: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=500&q=80' },
    { id: 2, title: 'Scene 01 — Wide', img: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=500&q=80' },
    { id: 3, title: 'Scene 07 — Reflection', img: 'https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?w=500&q=80' },
    { id: 4, title: 'Scene 02B — CU', img: 'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=500&q=80' },
    { id: 5, title: 'Scene 09 — Night', img: 'https://images.unsplash.com/photo-1465146633011-14f8e0781093?w=500&q=80' },
    { id: 6, title: 'Scene 05 — Detail', img: 'https://images.unsplash.com/photo-1533158307587-828f0a76ef46?w=500&q=80' },
  ];

  return (
    <section className="pinboard-section reveal">
      <div className="fs-head">
        <h2>The storyboard</h2>
        <span className="mono">PINNED · UNSORTED</span>
      </div>
      <div className="pin-board">
        {/* Red Threads SVG for cinematic connection vibe */}
        <svg className="red-threads" preserveAspectRatio="none" viewBox="0 0 100 100">
          <path d="M 15 25 L 45 35 L 75 25 L 85 75 L 50 65 L 20 85 Z" />
          <line x1="15" y1="25" x2="50" y2="65" />
          <line x1="45" y1="35" x2="20" y2="85" />
          <line x1="75" y1="25" x2="50" y2="65" />
        </svg>
        
        <div className="pin-grid">
          {scenes.map((scene, i) => (
            <div className="pin-card" key={scene.id}>
              <span className="pin"></span>
              {/* Optional tape corners for extra realism on some cards */}
              {i % 2 === 0 && <div className="tapecorner l"></div>}
              {i % 3 === 0 && <div className="tapecorner r"></div>}
              <img src={scene.img} alt={scene.title} loading="lazy" />
              <div className="cap">{scene.title}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
