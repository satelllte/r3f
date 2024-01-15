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
    config.module.rules.push({test: /\.vert/, type: 'asset/source'});
    config.module.rules.push({test: /\.frag/, type: 'asset/source'});
    return config;
  },
};

module.exports = nextConfig;
