import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { DEFAULT_SITE } from '../data/siteData';

const SiteContext = createContext(null);
const BACKEND_URL = 'https://photoediting-vibes.onrender.com/api';
const LOCAL_URL = 'http://localhost:3001/api';
const API_URL = window.location.hostname === 'localhost' ? LOCAL_URL : BACKEND_URL;

export function SiteProvider({ children }) {
  const [site, setSite] = useState(DEFAULT_SITE);
  const [loading, setLoading] = useState(true);

  // Fetch site config from backend
  useEffect(() => {
    fetch(`${API_URL}/config`)
      .then(res => {
        if (!res.ok) throw new Error('Not Found');
        return res.json();
      })
      .then(data => {
        if (data && !data.error) setSite(data);
        setLoading(false);
      })
      .catch(err => {
        console.warn('Backend site config not found or server down, using local defaults:', err);
        setSite(DEFAULT_SITE);
        setLoading(false);
      });
  }, []);

  const updateSect = useCallback(async (section, value) => {
    let updated;
    if (typeof section === 'object' && section !== null) {
      updated = { ...site, ...section };
    } else {
      updated = { ...site, [section]: value };
    }
    
    // Save to backend
    try {
      const res = await fetch(`${API_URL}/config`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated)
      });
      const data = await res.json();
      setSite(data);
      return data;
    } catch (err) {
      console.error('Failed to update site config:', err);
      // Fallback update local state anyway
      setSite(updated);
    }
  }, [site]);

  const resetAll = useCallback(() => {
    console.warn('Reset all requested - using local defaults');
    setSite(DEFAULT_SITE);
  }, []);

  if (loading) return null; // Still show loader/blank during initial fetch attempt

  return (
    <SiteContext.Provider value={{ site, updateSect, resetAll }}>
      {children}
    </SiteContext.Provider>
  );
}

export function useSite() {
  const ctx = useContext(SiteContext);
  if (!ctx) throw new Error('useSite must be used inside SiteProvider');
  return ctx;
}
