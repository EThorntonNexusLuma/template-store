// Utility to get the correct asset path for both development and production
export const getAssetPath = (path: string): string => {
  // In development, Vite serves from root
  // In production (GitHub Pages), we need the base path
  const base = import.meta.env.BASE_URL || '/';
  
  // Remove leading slash from path if it exists
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  
  // Combine base URL with the path
  return `${base}${cleanPath}`;
};

// Helper to get product media paths
export const getProductMediaPath = (folder: string, filename: string): string => {
  return getAssetPath(`products/${folder}/${filename}`);
};