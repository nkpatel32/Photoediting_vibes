import { useEffect } from 'react';
import CustomCursor  from '../components/CustomCursor';
import CameraLensIntro from '../components/CameraLensIntro';
import Navbar        from '../components/Navbar';
import Hero          from '../components/Hero';
import Stats         from '../components/Stats';
import Marquee       from '../components/Marquee';
import Pinboard      from '../components/Pinboard';
import Showreel      from '../components/Showreel';
import BeforeAfter   from '../components/BeforeAfter';
import Services      from '../components/Services';
import Gallery       from '../components/Gallery';
import Tools         from '../components/Tools';
import Process       from '../components/Process';
import Testimonials  from '../components/Testimonials';
import Contact       from '../components/Contact';
import Footer        from '../components/Footer';

export default function PortfolioPage() {
  useEffect(() => {
    // Scroll reveal
    const revealEls = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.1 }
    );
    revealEls.forEach(el => io.observe(el));

    // Parallax on hero grid
    const onScroll = () => {
      const grid = document.querySelector('.hero-bg-grid');
      if (grid) grid.style.transform = `translateY(${window.scrollY * 0.3}px)`;
    };
    window.addEventListener('scroll', onScroll);

    return () => {
      io.disconnect();
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <div className="portfolio-root">
      <CustomCursor />
      <CameraLensIntro />
      <Navbar />
      <Hero />
      <Stats />
      <Marquee />
      <Pinboard />
      <Showreel />
      <BeforeAfter />
      <Services />
      <Gallery />
      <Tools />
      <Process />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
}
