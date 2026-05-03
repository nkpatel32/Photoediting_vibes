import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { GalleryProvider } from './context/GalleryContext';
import { SiteProvider }    from './context/SiteContext';
import PortfolioPage from './pages/PortfolioPage';
import AdminLogin    from './pages/AdminLogin';
import AdminPanel    from './pages/AdminPanel';

function App() {
  return (
    <SiteProvider>
      <GalleryProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/"            element={<PortfolioPage />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin"       element={<AdminPanel />} />
            <Route path="*"            element={<PortfolioPage />} />
          </Routes>
        </BrowserRouter>
      </GalleryProvider>
    </SiteProvider>
  );
}

export default App;
