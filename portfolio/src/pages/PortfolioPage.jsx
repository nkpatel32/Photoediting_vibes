import React, { useEffect, Suspense, lazy } from 'react';
import CustomCursor  from '../components/CustomCursor';
import CameraLensIntro from '../components/CameraLensIntro';
import Navbar        from '../components/Navbar';

// Lazy load below-the-fold and heavy components
const Hero          = lazy(() => import('../components/Hero'));
const Stats         = lazy(() => import('../components/Stats'));
const Marquee       = lazy(() => import('../components/Marquee'));
const Pinboard      = lazy(() => import('../components/Pinboard'));
const Showreel      = lazy(() => import('../components/Showreel'));
const BeforeAfter   = lazy(() => import('../components/BeforeAfter'));
const Services      = lazy(() => import('../components/Services'));
const Gallery       = lazy(() => import('../components/Gallery'));
const Tools         = lazy(() => import('../components/Tools'));
const Process       = lazy(() => import('../components/Process'));
const Testimonials  = lazy(() => import('../components/Testimonials'));
const Contact       = lazy(() => import('../components/Contact'));
const Footer        = lazy(() => import('../components/Footer'));

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
      
      {/* 
        Suspense boundary for lazy loaded components.
        Provides a seamless loading state for the heavy UI parts.
      */}
      <Suspense fallback={<div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading content...</div>}>
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
      </Suspense>
    </div>
  );
}
