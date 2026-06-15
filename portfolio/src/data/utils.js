/**
 * Helper utility to dynamically optimize media files (images and videos)
 * served via Cloudinary or Unsplash.
 */
export function optimizeCloudinary(url, width = 800) {
  if (!url || typeof url !== 'string') return url;
  
  if (url.includes('res.cloudinary.com') && url.includes('/image/upload/')) {
    if (url.includes('q_auto') || url.includes('f_auto')) {
      return url;
    }
    return url.replace('/image/upload/', `/image/upload/q_auto,f_auto,w_${width}/`);
  }
  
  return url;
}

export function getOptimizedMediaUrl(url, width = 800) {
  if (!url || typeof url !== 'string') return url;

  // Cloudinary image
  if (url.includes('res.cloudinary.com') && url.includes('/image/upload/')) {
    if (url.includes('q_auto') || url.includes('f_auto')) return url;
    return url.replace('/image/upload/', `/image/upload/q_auto,f_auto,w_${width}/`);
  }

  // Cloudinary video
  if (url.includes('res.cloudinary.com') && url.includes('/video/upload/')) {
    if (url.includes('q_auto') || url.includes('f_auto')) return url;
    const videoWidth = width > 800 ? 720 : 480;
    return url.replace('/video/upload/', `/video/upload/q_auto,f_auto,w_${videoWidth}/`);
  }

  // Unsplash images
  if (url.includes('images.unsplash.com')) {
    try {
      const u = new URL(url);
      if (width) {
        u.searchParams.set('w', width.toString());
      }
      u.searchParams.set('q', '75');
      u.searchParams.set('auto', 'format');
      return u.toString();
    } catch (e) {
      return url;
    }
  }

  return url;
}
