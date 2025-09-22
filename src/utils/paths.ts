// Utility to get the correct asset path for both development and production
export const getAssetPath = (path: string): string => {
  // Remove leading slash from path if it exists
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  
  // For relative base path, just return the clean path
  return cleanPath;
};

// Helper to get product media paths
export const getProductMediaPath = (folder: string, filename: string): string => {
  return getAssetPath(`products/${folder}/${filename}`);
};