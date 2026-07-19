import React, { useRef, useState } from 'react';
import { useSite } from '../context/SiteContext';
import './Pinboard.css';

export default function Pinboard() {
  const { site } = useSite();
  const stripRef = useRef(null);
  const [activeDot, setActiveDot] = useState(0);

  const data = site?.storyboard;
  if (!data || !data.enabled) return null;

  const handleScroll = () => {
    if (!stripRef.current) return;
    const strip = stripRef.current;
    const firstCard = strip.querySelector('.m-card');
    if (!firstCard) return;
    const cardWidth = firstCard.getBoundingClientRect().width + 16;
    const idx = Math.round(strip.scrollLeft / cardWidth);
    setActiveDot(idx);
  };

  const mobileCardsCount = 7;
  const getItem = (id) => data.items.find(i => i.id === id) || {};

  return (
    <section className="pinboard-section reveal">
      <div className="fs-head">
        <h2>{data.title}</h2>
        <span className="mono">{data.subtitle}</span>
      </div>

      {/* ============ DESKTOP COLLAGE (hidden under 860px) ============ */}
      <div className="pin-board board-desktop">
        <svg className="string-svg" viewBox="0 0 1000 574" preserveAspectRatio="none">
          <line x1="120" y1="90" x2="330" y2="230"></line>
          <line x1="330" y1="230" x2="560" y2="120"></line>
          <line x1="560" y1="120" x2="780" y2="90"></line>
          <line x1="330" y1="230" x2="230" y2="380"></line>
          <line x1="230" y1="380" x2="460" y2="420"></line>
          <line x1="460" y1="420" x2="620" y2="330"></line>
          <line x1="620" y1="330" x2="800" y2="420"></line>
          <line x1="120" y1="90" x2="230" y2="380"></line>
          <line x1="560" y1="120" x2="620" y2="330"></line>
          <circle cx="120" cy="90" r="4"></circle>
          <circle cx="330" cy="230" r="4"></circle>
          <circle cx="560" cy="120" r="4"></circle>
          <circle cx="780" cy="90" r="4"></circle>
          <circle cx="230" cy="380" r="4"></circle>
          <circle cx="460" cy="420" r="4"></circle>
          <circle cx="620" cy="330" r="4"></circle>
          <circle cx="800" cy="420" r="4"></circle>
        </svg>

        {/* Photos */}
        <div className={`board-item board-photo ${getItem(1).color ? 'color' : ''}`} style={{ top: '3%', left: '6%', width: '14%', transform: 'rotate(-7deg)', zIndex: 3 }}>
          <span className={`board-pin ${getItem(1).pin}`}></span>
          <img src={getItem(1).url} alt="" />
        </div>
        <div className={`board-item board-photo ${getItem(2).color ? 'color' : ''}`} style={{ top: '28%', left: '3%', width: '15%', transform: 'rotate(5deg)', zIndex: 3 }}>
          <span className={`board-pin ${getItem(2).pin}`}></span>
          <img src={getItem(2).url} alt="" />
        </div>
        <div className={`board-item board-photo ${getItem(3).color ? 'color' : ''}`} style={{ top: '14%', left: '32%', width: '17%', transform: 'rotate(-3deg)', zIndex: 4 }}>
          <span className={`board-pin ${getItem(3).pin}`}></span>
          <img src={getItem(3).url} alt="" />
        </div>
        <div className={`board-item board-photo ${getItem(4).color ? 'color' : ''}`} style={{ top: '48%', left: '20%', width: '14%', transform: 'rotate(4deg)', zIndex: 3 }}>
          <span className={`board-pin ${getItem(4).pin}`}></span>
          <img src={getItem(4).url} alt="" />
        </div>
        <div className={`board-item board-photo ${getItem(5).color ? 'color' : ''}`} style={{ top: '56%', left: '40%', width: '15%', transform: 'rotate(-6deg)', zIndex: 3 }}>
          <span className={`board-pin ${getItem(5).pin}`}></span>
          <img src={getItem(5).url} alt="" />
        </div>
        <div className={`board-item board-photo ${getItem(6).color ? 'color' : ''}`} style={{ top: '16%', left: '57%', width: '15%', transform: 'rotate(6deg)', zIndex: 3 }}>
          <span className={`board-pin ${getItem(6).pin}`}></span>
          <img src={getItem(6).url} alt="" />
        </div>
        <div className={`board-item board-photo ${getItem(7).color ? 'color' : ''}`} style={{ top: '58%', left: '60%', width: '14%', transform: 'rotate(-4deg)', zIndex: 3 }}>
          <span className={`board-pin ${getItem(7).pin}`}></span>
          <img src={getItem(7).url} alt="" />
        </div>
        <div className={`board-item board-photo ${getItem(8).color ? 'color' : ''}`} style={{ top: '32%', left: '78%', width: '15%', transform: 'rotate(5deg)', zIndex: 3 }}>
          <span className={`board-pin ${getItem(8).pin}`}></span>
          <img src={getItem(8).url} alt="" />
        </div>
        <div className={`board-item board-photo ${getItem(9).color ? 'color' : ''}`} style={{ top: '62%', left: '80%', width: '14%', transform: 'rotate(-5deg)', zIndex: 3 }}>
          <span className={`board-pin ${getItem(9).pin}`}></span>
          <img src={getItem(9).url} alt="" />
        </div>

        {/* Stickies */}
        <div className="board-item sticky" style={{ top: '2%', left: '23%', transform: 'rotate(-9deg)', zIndex: 4 }} dangerouslySetInnerHTML={{ __html: getItem(10).text }}></div>
        <div className="board-item sticky" style={{ top: '38%', left: '2%', transform: 'rotate(6deg)', zIndex: 4 }} dangerouslySetInnerHTML={{ __html: getItem(11).text }}></div>
        <div className="board-item sticky" style={{ top: '2%', left: '52%', transform: 'rotate(4deg)', zIndex: 4 }} dangerouslySetInnerHTML={{ __html: getItem(12).text }}></div>
        <div className="board-item sticky" style={{ top: '40%', left: '34%', transform: 'rotate(-5deg)', zIndex: 4 }} dangerouslySetInnerHTML={{ __html: getItem(13).text }}></div>
        <div className="board-item sticky" style={{ top: '36%', left: '52%', transform: 'rotate(7deg)', zIndex: 4 }} dangerouslySetInnerHTML={{ __html: getItem(14).text }}></div>
        <div className="board-item sticky" style={{ top: '78%', left: '16%', transform: 'rotate(-6deg)', zIndex: 4 }} dangerouslySetInnerHTML={{ __html: getItem(15).text }}></div>
        <div className="board-item sticky" style={{ top: '6%', left: '74%', transform: 'rotate(-4deg)', zIndex: 4 }} dangerouslySetInnerHTML={{ __html: getItem(16).text }}></div>
        <div className="board-item sticky" style={{ top: '80%', left: '56%', transform: 'rotate(5deg)', zIndex: 4 }} dangerouslySetInnerHTML={{ __html: getItem(17).text }}></div>

        {/* Clippings */}
        <div className="board-item clipping" style={{ top: '4%', left: '82%', width: '16%', transform: 'rotate(3deg)', zIndex: 3 }}>
          <div className="kicker">{getItem(18).kicker}</div>
          <h3>{getItem(18).title}</h3>
          <p>{getItem(18).text}</p>
        </div>
        <div className="board-item clipping" style={{ top: '70%', left: '34%', width: '17%', transform: 'rotate(-3deg)', zIndex: 3 }}>
          <div className="kicker">{getItem(19).kicker}</div>
          <h3>{getItem(19).title}</h3>
          <p>{getItem(19).text}</p>
        </div>
      </div>

      {/* ============ MOBILE STRIP (shown under 860px) ============ */}
      <div className="pin-board board-mobile">
        <div className="strip" id="mobileStrip" ref={stripRef} onScroll={handleScroll}>
          <div className="m-card" style={{ '--r': '-4deg' }}>
            <div className={`board-photo ${getItem(1).color ? 'color' : ''}`}>
              <span className={`board-pin ${getItem(1).pin}`}></span>
              <img src={getItem(1).url} alt="" />
            </div>
            <div className="sticky" dangerouslySetInnerHTML={{ __html: getItem(12).text }}></div>
          </div>

          <div className="m-card" style={{ '--r': '3deg' }}>
            <div className={`board-photo ${getItem(3).color ? 'color' : ''}`}>
              <span className={`board-pin ${getItem(3).pin}`}></span>
              <img src={getItem(3).url} alt="" />
            </div>
            <div className="sticky" dangerouslySetInnerHTML={{ __html: getItem(11).text }}></div>
          </div>

          <div className="m-card" style={{ '--r': '-3deg' }}>
            <div className={`board-photo ${getItem(6).color ? 'color' : ''}`}>
              <span className={`board-pin ${getItem(6).pin}`}></span>
              <img src={getItem(6).url} alt="" />
            </div>
            <div className="sticky" dangerouslySetInnerHTML={{ __html: getItem(15).text }}></div>
          </div>

          <div className="m-card" style={{ '--r': '4deg' }}>
            <div className={`board-photo ${getItem(4).color ? 'color' : ''}`}>
              <span className={`board-pin ${getItem(4).pin}`}></span>
              <img src={getItem(4).url} alt="" />
            </div>
            <div className="sticky" dangerouslySetInnerHTML={{ __html: getItem(13).text }}></div>
          </div>

          <div className="m-card" style={{ '--r': '-2deg' }}>
            <div className="clipping">
              <div className="kicker">{getItem(18).kicker}</div>
              <h3>{getItem(18).title}</h3>
              <p>{getItem(18).text}</p>
            </div>
          </div>

          <div className="m-card" style={{ '--r': '2deg' }}>
            <div className={`board-photo ${getItem(7).color ? 'color' : ''}`}>
              <span className={`board-pin ${getItem(7).pin}`}></span>
              <img src={getItem(7).url} alt="" />
            </div>
            <div className="sticky" dangerouslySetInnerHTML={{ __html: getItem(16).text }}></div>
          </div>

          <div className="m-card" style={{ '--r': '-4deg' }}>
            <div className={`board-photo ${getItem(9).color ? 'color' : ''}`}>
              <span className={`board-pin ${getItem(9).pin}`}></span>
              <img src={getItem(9).url} alt="" />
            </div>
            <div className="sticky" dangerouslySetInnerHTML={{ __html: getItem(14).text }}></div>
          </div>
        </div>
        <div className="swipe-hint">&larr; swipe through the board &rarr;</div>
        <div className="dots" id="dots">
          {Array.from({ length: mobileCardsCount }).map((_, i) => (
            <span key={i} className={i === activeDot ? 'active' : ''}></span>
          ))}
        </div>
      </div>

      <div className="board-legend">
        <span>{data.legendLeft}</span>
        <span>{data.legendRight}</span>
      </div>
    </section>
  );
}
