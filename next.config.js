/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  eslint: {
    ignoreDuringBuilds: true, // Checking in "test:lint" script instead
  },
  typescript: {
    ignoreBuildErrors: true, // Checking in "test:types" script instead
  },
  transpilePackages: ['three'],
  webpack: (config) => {
    config.module.rules.push({test: /\.glsl/, type: 'asset/source'});
    return config;
  },
};

module.exports = nextConfig;
