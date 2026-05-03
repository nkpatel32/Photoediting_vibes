import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  getItems, addItem, updateItem, deleteItem,
  reorderItems, login, logout, isLoggedIn,
} from '../data/galleryData';

const GalleryContext = createContext(null);

export function GalleryProvider({ children }) {
  const [items,       setItems]     = useState([]);
  const [authed,      setAuthed]    = useState(() => isLoggedIn());
  const [loginError,  setLoginError]= useState('');
  const [loading,     setLoading]   = useState(true);

  const fetchItems = useCallback(async () => {
    setLoading(true);
    const data = await getItems();
    setItems(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  // Sync on focus (other tabs, etc.)
  useEffect(() => {
    const onFocus = () => fetchItems();
    window.addEventListener('focus', onFocus);
    return () => window.removeEventListener('focus', onFocus);
  }, [fetchItems]);

  const handleLogin = useCallback((password) => {
    if (login(password)) {
      setAuthed(true);
      setLoginError('');
      return true;
    }
    setLoginError('Incorrect password. Try again.');
    return false;
  }, []);

  const handleLogout = useCallback(() => {
    logout();
    setAuthed(false);
  }, []);

  const handleAdd = useCallback(async (item) => {
    await addItem(item);
    fetchItems(); // Refetch to get the latest DB state
  }, [fetchItems]);

  const handleUpdate = useCallback(async (id, patch) => {
    await updateItem(id, patch);
    fetchItems();
  }, [fetchItems]);

  const handleDelete = useCallback(async (id) => {
    await deleteItem(id);
    fetchItems();
  }, [fetchItems]);

  const handleReorder = useCallback(async (newOrder) => {
    setItems(newOrder); // Optimistic UI update
    await reorderItems(newOrder);
  }, []);

  return (
    <GalleryContext.Provider value={{
      items,
      loading,
      authed,
      loginError,
      handleLogin,
      handleLogout,
      handleAdd,
      handleUpdate,
      handleDelete,
      handleReorder,
    }}>
      {children}
    </GalleryContext.Provider>
  );
}

export function useGallery() {
  const ctx = useContext(GalleryContext);
  if (!ctx) throw new Error('useGallery must be used inside GalleryProvider');
  return ctx;
}
