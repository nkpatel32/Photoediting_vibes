import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, Home, BarChart3, Type, PlayCircle, Grid3X3,
  Settings, Wrench, ClipboardList, MessageSquare, Link as LinkIcon,
  LogOut, ExternalLink, Menu, X
} from 'lucide-react';
import { useGallery } from '../context/GalleryContext';
import { useSite }    from '../context/SiteContext';
import GalleryAdminSection from '../components/admin/GalleryAdminSection';
import HeroAdmin           from '../components/admin/HeroAdmin';
import StatsAdmin          from '../components/admin/StatsAdmin';
import MarqueeAdmin        from '../components/admin/MarqueeAdmin';
import ShowreelAdmin       from '../components/admin/ShowreelAdmin';
import StoryboardAdmin     from '../components/admin/StoryboardAdmin';
import BeforeAfterAdmin    from '../components/admin/BeforeAfterAdmin';
import ServicesAdmin       from '../components/admin/ServicesAdmin';
import ToolsAdmin          from '../components/admin/ToolsAdmin';
import ProcessAdmin        from '../components/admin/ProcessAdmin';
import TestimonialsAdmin   from '../components/admin/TestimonialsAdmin';
import ContactAdmin        from '../components/admin/ContactAdmin';
import './AdminPanel.css';

const NAV_ITEMS = [
  { key: 'gallery',      icon: <LayoutDashboard size={18} />, label: 'Gallery' },
  { key: 'hero',         icon: <Home size={18} />,            label: 'Hero' },
  { key: 'stats',        icon: <BarChart3 size={18} />,       label: 'Stats' },
  { key: 'marquee',      icon: <Type size={18} />,            label: 'Marquee' },
  { key: 'storyboard',   icon: <Grid3X3 size={18} />,         label: 'Storyboard' },
  { key: 'showreel',     icon: <PlayCircle size={18} />,      label: 'Showreel / Video' },
  { key: 'beforeafter',  icon: <Grid3X3 size={18} />,         label: 'Pinterest Gallery' },
  { key: 'services',     icon: <Settings size={18} />,        label: 'Services' },
  { key: 'tools',        icon: <Wrench size={18} />,          label: 'Tools' },
  { key: 'process',      icon: <ClipboardList size={18} />,   label: 'Process' },
  { key: 'testimonials', icon: <MessageSquare size={18} />,   label: 'Testimonials' },
  { key: 'contact',      icon: <LinkIcon size={18} />,        label: 'Contact & Links' },
];

function SectionContent({ active }) {
  switch (active) {
    case 'gallery':      return <GalleryAdminSection />;
    case 'hero':         return <HeroAdmin />;
    case 'stats':        return <StatsAdmin />;
    case 'marquee':      return <MarqueeAdmin />;
    case 'storyboard':   return <StoryboardAdmin />;
    case 'showreel':     return <ShowreelAdmin />;
    case 'beforeafter':  return <BeforeAfterAdmin />;
    case 'services':     return <ServicesAdmin />;
    case 'tools':        return <ToolsAdmin />;
    case 'process':      return <ProcessAdmin />;
    case 'testimonials': return <TestimonialsAdmin />;
    case 'contact':      return <ContactAdmin />;
    default:             return <GalleryAdminSection />;
  }
}

export default function AdminPanel() {
  const navigate = useNavigate();
  const { authed, handleLogout } = useGallery();
  const { site } = useSite();
  const [active, setActive] = useState('gallery');
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    if (!authed) navigate('/admin/login', { replace: true });
  }, [authed, navigate]);

  if (!authed) return null;

  const activeLabel = NAV_ITEMS.find(n => n.key === active)?.label || 'Gallery';

  const logout = () => {
    handleLogout();
    navigate('/', { replace: true });
  };

  const selectSection = (key) => {
    setActive(key);
    setDrawerOpen(false);
  };

  return (
    <div className="ap-root">

      {/* ── Top bar ── */}
      <header className="ap-topbar">
        <button className="ap-hamburger" onClick={() => setDrawerOpen(true)}>
          <Menu size={20} />
        </button>
        <div className="ap-topbar-logo">
          {site.nav.logo}<span>{site.nav.logoSuffix}</span>
          {site.nav.logoImage && <img src={site.nav.logoImage} alt="logo" style={{height: '20px', marginLeft: '8px', objectFit: 'contain'}} />}
          <em>Admin</em>
        </div>
        <div className="ap-topbar-section">{activeLabel}</div>
        <div className="ap-topbar-right">
          <button className="ap-topbar-livebtn" onClick={() => navigate('/')}>
            <ExternalLink size={14} /> Live Site
          </button>
          <button className="ap-topbar-logoutbtn" onClick={logout}>
            <LogOut size={14} />
          </button>
        </div>
      </header>

      {/* ── Drawer overlay ── */}
      {drawerOpen && (
        <div className="ap-overlay" onClick={() => setDrawerOpen(false)} />
      )}

      {/* ── Drawer sidebar ── */}
      <aside className={`ap-drawer ${drawerOpen ? 'open' : ''}`}>
        <div className="ap-drawer-head">
          <div className="ap-drawer-logo">
            <div style={{display: 'flex', alignItems: 'center'}}>
              {site.nav.logo}<span>{site.nav.logoSuffix}</span>
              {site.nav.logoImage && <img src={site.nav.logoImage} alt="logo" style={{height: '24px', marginLeft: '8px', objectFit: 'contain'}} />}
            </div>
            <div className="ap-drawer-sub">Admin Panel</div>
          </div>
          <button className="ap-drawer-close" onClick={() => setDrawerOpen(false)}>
            <X size={18} />
          </button>
        </div>

        <nav className="ap-drawer-nav">
          {NAV_ITEMS.map(item => (
            <button
              key={item.key}
              className={`ap-nav-btn ${active === item.key ? 'active' : ''}`}
              onClick={() => selectSection(item.key)}
            >
              <span className="ap-nav-icon">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        <div className="ap-drawer-footer">
          <div className="ap-drawer-ver">v1.0 · photoediting_vibes</div>
          <button className="ap-drawer-livebtn" onClick={() => { navigate('/'); }}>
            <ExternalLink size={14} /> View Live Site
          </button>
          <button className="ap-drawer-logoutbtn" onClick={logout}>
            <LogOut size={14} /> Log Out
          </button>
        </div>
      </aside>

      {/* ── Main content ── */}
      <main className="ap-main">
        <SectionContent active={active} />
      </main>

    </div>
  );
}
