import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n.ts');

/** @type {import('next').NextConfig} */
const isExport = process.env.NEXT_EXPORT === 'true';
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '/nomad-cafe'; // Default to '/nomad-cafe' for GitHub Pages

const nextConfig = {
  output: 'export',
  // output: isExport ? 'export' : 'standalone', // Use 'export' for static export on GitHub Pages
  typescript: { ignoreBuildErrors: true }, // Ignore TypeScript errors during build
  images: { unoptimized: true }, // Disable optimized images for static export
  ...(basePath ? { basePath, assetPrefix: basePath } : {}), // Base path and asset prefix for GitHub Pages URLs
};

export default withNextIntl(nextConfig);
