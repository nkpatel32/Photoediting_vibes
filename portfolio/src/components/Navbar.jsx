import { useState } from 'react';
import { useSite } from '../context/SiteContext';
import { Camera, ExternalLink, Menu, X } from 'lucide-react';
import './Navbar.css';

export default function Navbar() {
  const { site } = useSite();
  const { nav } = site;
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollTo = (id) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const navItems = [
    { id: 'showreel',          label: 'Showreel' },
    { id: 'pinterest-gallery', label: 'Gallery' },
    { id: 'work',              label: 'Work' },
    { id: 'services',          label: 'Services' },
    { id: 'contact',           label: 'Contact' }
  ];

  return (
    <>
    <nav className="navbar">
      <div className="logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
        {nav.logo}<span>{nav.logoSuffix}</span>
        {nav.logoImage && <img src={nav.logoImage} alt="Logo" className="nav-logo-img" />}
      </div>
      <div className="nav-links">
        {navItems.map(link => (
          <a key={link.id} className="nav-link" onClick={() => scrollTo(link.id)}>
            {link.label}
          </a>
        ))}
      </div>
      <div className="nav-actions">
        <a className="nav-ig" href={nav.igLink} target="_blank" rel="noreferrer">
          <Camera size={14} style={{marginRight:'8px'}} />
          {nav.igText.replace(' ↗', '')}
          <ExternalLink size={12} style={{marginLeft:'6px', opacity: 0.5}} />
        </a>
        <button className="mobile-menu-btn" onClick={() => setMenuOpen(true)}>
          <Menu size={24} />
        </button>
      </div>

      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`mobile-menu-overlay ${menuOpen ? 'open' : ''}`}>
        <button className="mobile-menu-close" onClick={() => setMenuOpen(false)}>
          <X size={32} />
        </button>
        <div className="mobile-nav-links">
          {navItems.map((link, i) => (
            <a 
              key={link.id} 
              className="mobile-nav-link" 
              onClick={() => scrollTo(link.id)}
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              {link.label}
            </a>
          ))}
          <a className="mobile-nav-ig" href={nav.igLink} target="_blank" rel="noreferrer">
            <Camera size={18} style={{marginRight:'12px'}} />
            {nav.igText.replace(' ↗', '')}
          </a>
        </div>
      </div>
    </>
  );
}
