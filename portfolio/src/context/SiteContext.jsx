import { createContext, useContext, useState, useCallback } from 'react';
import { getSiteData, updateSection, saveSiteData } from '../data/siteData';

const SiteContext = createContext(null);

export function SiteProvider({ children }) {
  const [site, setSite] = useState(() => getSiteData());

  const updateSect = useCallback((section, value) => {
    const updated = updateSection(section, value);
    setSite(updated);
    return updated;
  }, []);

  const resetAll = useCallback(() => {
    localStorage.removeItem('pev_site_data');
    setSite(getSiteData());
  }, []);

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
