import { useEffect, useState } from 'react';
import './Loader.css';

export default function Loader() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setHidden(true), 2400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div id="loader" className={hidden ? 'hidden' : ''}>
      <div className="loader-text">PEV</div>
      <div className="loader-bar-wrap">
        <div className="loader-bar"></div>
      </div>
      <div className="loader-subtitle">Loading Portfolio</div>
    </div>
  );
}
