import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { GalleryProvider } from './context/GalleryContext';
import { SiteProvider }    from './context/SiteContext';
import PortfolioPage from './pages/PortfolioPage';

const AdminLogin = lazy(() => import('./pages/AdminLogin'));
const AdminPanel = lazy(() => import('./pages/AdminPanel'));

const SimpleFallback = () => (
  <div style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    background: '#090909',
    color: '#c8a96e',
    fontFamily: '"Bebas Neue", sans-serif',
    fontSize: '2rem',
    letterSpacing: '0.1em'
  }}>
    LOADING...
  </div>
);

function App() {
  return (
    <SiteProvider>
      <GalleryProvider>
        <BrowserRouter>
          <Suspense fallback={<SimpleFallback />}>
            <Routes>
              <Route path="/"            element={<PortfolioPage />} />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin"       element={<AdminPanel />} />
              <Route path="*"            element={<PortfolioPage />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </GalleryProvider>
    </SiteProvider>
  );
}

export default App;
