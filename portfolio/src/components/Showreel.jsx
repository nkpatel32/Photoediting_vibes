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

      <div className="showreel-player-wrapper reveal">
        <div className="showreel-player">
          {/* Background image / video embed */}
          {showVideo && showreel.videoUrl ? (
            <iframe
              className="player-iframe"
              src={`${showreel.videoUrl}?autoplay=1&rel=0&modestbranding=1&iv_load_policy=3`}
              allow="autoplay; fullscreen"
              allowFullScreen
              title="Showreel"
            />
          ) : (
            <div className="player-bg">
              <img src={showreel.bgImage} className="player-bg-img" alt="" />
            </div>
          )}

          {/* Cinematic HUD (Always visible) */}
          <div className="cine-hud-overlay">
            <div className="ch-tl"></div>
            <div className="ch-tr"></div>
            <div className="ch-bl"></div>
            <div className="ch-br"></div>
            <div className="ch-rec">
              <div className="rec-dot"></div>
              REC
            </div>
            <div className="ch-crosshair"></div>
          </div>

          {/* Start Screen Overlay */}
          {!showVideo && (
            <div className="player-overlay">
              <div className={`player-waveform ${playing ? 'playing-indicator' : ''}`} ref={wfRef}></div>
              <button className="play-btn" onClick={handlePlay}>
                <span className="play-icon">▶</span>
              </button>
              <div className="player-title-overlay">{showreel.playerTitle}</div>
              <div className="player-timecode">{showreel.timecode}</div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
