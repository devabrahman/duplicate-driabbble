/** @type {import('next').NextConfig} */
const nextConfig = {};

module.exports = nextConfig;

module.exports = {
  images: {
    domains: [
      'images.unsplash.com',
      'lh3.googleusercontent.com',
      'res.cloudinary.com'
    ]
  },
  experimental: {
    serverComponentsExternalPackages: ['cloudinary', 'graphql-request']
  }
  // eslint: {
  //   // Warning: This allows production builds to successfully complete even if
  //   // your project has ESLint errors.
  //   ignoreDuringBuilds: true
  // }
};
