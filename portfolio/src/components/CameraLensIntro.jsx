import { useEffect, useState } from 'react';
import './CameraLensIntro.css';

const BLADES = 8; // Simpler 8-blade 2D design

export default function CameraLensIntro({ onDone }) {
  const [phase, setPhase] = useState('loading'); // loading | opening | done

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('opening'), 300);
    const t2 = setTimeout(() => {
      setPhase('done');
      onDone?.();
    }, 300 + 600); // Faster 2D opening
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  if (phase === 'done') return null;

  return (
    <div id="shutter-intro" className={`shutter-overlay ${phase}`}>

      {/* ── Loading phase ── */}
      <div className="shutter-loading">
        <div className="sl-brand">PEV</div>
        <div className="sl-linear-wrap">
          <div className="sl-linear-fill"></div>
        </div>
        <div className="sl-label">Loading Portfolio</div>
      </div>

      {/* ── 2D Shutter ── */}
      <div className="shutter-2d-scene">
        
        {/* Full-screen golden iris */}
        <div className="iris-2d">
          {Array.from({ length: BLADES }, (_, i) => (
            <div key={i} className="blade-2d-wrapper" style={{ '--i': i }}>
              <div className="blade-2d"></div>
            </div>
          ))}
          
          {/* Inner golden ring that scales up */}
          <div className="iris-center-ring"></div>
        </div>
      </div>

    </div>
  );
}
