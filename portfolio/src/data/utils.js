/**
 * Helper utility to dynamically optimize images served via Cloudinary.
 * Inserts auto format (f_auto), auto quality (q_auto), and a width constraint (w_xxx)
 * into Cloudinary URLs.
 */
export function optimizeCloudinary(url, width = 800) {
  if (!url || typeof url !== 'string') return url;
  
  if (url.includes('res.cloudinary.com') && url.includes('/image/upload/')) {
    // Avoid double-injecting parameters
    if (url.includes('q_auto') || url.includes('f_auto')) {
      return url;
    }
    return url.replace('/image/upload/', `/image/upload/q_auto,f_auto,w_${width}/`);
  }
  
  return url;
}
