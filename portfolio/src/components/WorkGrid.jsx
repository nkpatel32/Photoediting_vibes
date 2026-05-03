import './WorkGrid.css';

const works = [
  { cat: 'Portrait · Lightroom', title: 'Golden Hour Portrait Series', cls: 'w-large', img: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&q=80' },
  { cat: 'Cinematic Grade', title: 'Teal-Orange Film Look', cls: 'w-med', img: 'https://images.unsplash.com/photo-1518676590747-1e3dcf5a8e27?w=600&q=80' },
  { cat: 'AI Edit', title: 'Sky Replacement Series', cls: 'w-med', img: 'https://images.unsplash.com/photo-1507400492013-162706c8c05e?w=600&q=80' },
  { cat: 'Video Edit', title: 'Wedding Reel', cls: 'w-third', img: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=500&q=80' },
  { cat: 'Motion', title: 'Brand Film', cls: 'w-third', img: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=500&q=80' },
  { cat: 'Social', title: 'Reels Package', cls: 'w-third', img: 'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=500&q=80' },
];

export default function WorkGrid() {
  return (
    <section className="work-section" id="work">
      <div className="reveal">
        <div className="sec-label">04 — Portfolio</div>
        <h2 className="sec-h2">SELECTED<br /><span className="ghost">WORK</span></h2>
        <div className="sec-divider"></div>
      </div>
      <div className="work-grid">
        {works.map((w, i) => (
          <div className={`w-item ${w.cls} reveal`} key={i} style={{ transitionDelay: `${(i % 3) * 0.1}s` }}>
            <div className="w-bg">
              <img src={w.img} alt={w.title} className="w-bg-img" />
            </div>
            <div className="w-overlay">
              <div className="w-cat">{w.cat}</div>
              <div className="w-title">{w.title}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
