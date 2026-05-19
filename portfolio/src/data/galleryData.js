// ================================================================
// galleryData.js — API Service connecting to Node backend
// ================================================================

const ADMIN_KEY   = 'pev_admin_token';
const ADMIN_PASS  = 'pev2025'; // Change this password
const BACKEND_URL = 'https://photoediting-vibes.onrender.com/api';
const LOCAL_URL = 'http://localhost:3001/api';
const API_URL = window.location.hostname === 'localhost' ? LOCAL_URL : BACKEND_URL;

// ── CRUD helpers ─────────────────────────────────────────────────
export async function getItems() {
  try {
    const res = await fetch(`${API_URL}/items`);
    if (!res.ok) throw new Error('Network response was not ok');
    return await res.json();
  } catch (error) {
    console.error('Failed to fetch items:', error);
    return [];
  }
}

export async function addItem(item) {
  try {
    const res = await fetch(`${API_URL}/items`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item),
    });
    return await res.json();
  } catch (error) {
    console.error('Failed to add item:', error);
    throw error;
  }
}

export async function updateItem(id, patch) {
  try {
    const res = await fetch(`${API_URL}/items/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(patch),
    });
    return await res.json();
  } catch (error) {
    console.error('Failed to update item:', error);
    throw error;
  }
}

export async function deleteItem(id) {
  try {
    await fetch(`${API_URL}/items/${id}`, {
      method: 'DELETE',
    });
    return id;
  } catch (error) {
    console.error('Failed to delete item:', error);
    throw error;
  }
}

export async function reorderItems(newOrder) {
  try {
    await fetch(`${API_URL}/items/reorder`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newOrder),
    });
    return newOrder;
  } catch (error) {
    console.error('Failed to reorder items:', error);
    throw error;
  }
}

// ── Auth helpers ─────────────────────────────────────────────────
export function login(password) {
  if (password === ADMIN_PASS) {
    sessionStorage.setItem(ADMIN_KEY, 'true');
    return true;
  }
  return false;
}

export function logout() {
  sessionStorage.removeItem(ADMIN_KEY);
}

export function isLoggedIn() {
  return sessionStorage.getItem(ADMIN_KEY) === 'true';
}
