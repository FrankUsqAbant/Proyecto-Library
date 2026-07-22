/**
 * Helper to generate correct asset URLs for GitHub Pages static export.
 * Handles subpaths like '/Proyecto-Library' automatically in production.
 */
export function getAssetUrl(path: string): string {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:')) {
    return path;
  }

  const isProd = process.env.NODE_ENV === 'production';
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || (isProd ? '/Proyecto-Library' : '');
  const cleanPath = path.startsWith('/') ? path : `/${path}`;

  // Avoid duplicating basePath if already present
  if (basePath && cleanPath.startsWith(basePath)) {
    return cleanPath;
  }

  return `${basePath}${cleanPath}`;
}
