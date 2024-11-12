/** @type {import('next').NextConfig} */
const nextConfig = {};


const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  output: 'export', // Enable static export
  basePath: isProd ? '/Kevin-Wong-E-Commerce-Website' : '', // Replace <your-repo-name> with your GitHub repo name
  images: {
    unoptimized: true, // Disable image optimization for static sites
  },
};


export default nextConfig;
