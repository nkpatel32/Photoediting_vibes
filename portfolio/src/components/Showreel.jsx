import { useEffect, useRef, useState } from 'react';
import { useSite } from '../context/SiteContext';
import './Showreel.css';

export default function Showreel() {
  const { site } = useSite();
  const { showreel } = site;
  const [playing, setPlaying] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const wfRef = useRef(null);

  useEffect(() => {
    const bars = wfRef.current;
    if (!bars) return;
    bars.innerHTML = '';
    for (let i = 0; i < 60; i++) {
      const bar = document.createElement('div');
      bar.className = 'wf-bar';
      bar.style.height = `${Math.random() * 60 + 10}%`;
      bar.style.animationDelay = `${Math.random() * 1.5}s`;
      bar.style.animationDuration = `${Math.random() * 0.8 + 0.4}s`;
      bars.appendChild(bar);
    }
  }, []);

  const handlePlay = () => {
    if (showreel.videoUrl) {
      setShowVideo(true);
      setPlaying(true);
    } else {
      setPlaying(p => !p);
    }
  };

  return (
    <section className="showreel-section" id="showreel">
      <div className="reveal">
        <div className="sec-label">{showreel.label}</div>
        <h2 className="sec-h2">
          {showreel.heading1}<br />
          <span className="ghost">{showreel.heading2}</span><br />
          <span className="gold-text">{showreel.heading3}</span>
        </h2>
        <div className="sec-divider"></div>
        <p className="ba-desc">{showreel.description}</p>
      </div>

      <div className="showreel-player reveal">
        {/* Background image / video embed */}
        {showVideo && showreel.videoUrl ? (
          <iframe
            className="showreel-iframe"
            src={`${showreel.videoUrl}?autoplay=1`}
            allow="autoplay; fullscreen"
            allowFullScreen
            title="Showreel"
          />
        ) : (
          <div
            className="showreel-bg"
            style={{ backgroundImage: `url(${showreel.bgImage})` }}
          />
        )}

        {/* Overlay */}
        {!showVideo && (
          <div className="showreel-overlay">
            <div className={`equalizer ${playing ? 'playing' : ''}`} ref={wfRef}></div>
            <button className="play-btn" onClick={handlePlay}>
              <span className="play-icon">{playing ? '⏸' : '▶'}</span>
            </button>
            <div className="player-info">
              <div className="player-title">{showreel.playerTitle}</div>
              <div className="player-tc">{showreel.timecode}</div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
