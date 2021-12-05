const nextConfig = {
  env: {
    PUBLIC_URL: '',
  },
  experimental: {
    craCompat: true,
  },
  // Remove this to leverage Next.js' static image handling
  // read more here: https://nextjs.org/docs/api-reference/next/image
  images: {
    disableStaticImages: true,
  },
  exportPathMap: async (defaultPathMap) => ({
    ...defaultPathMap,
    '/warszawa/legacy': { page: '/warszawa/legacy/[[...slug]]' },
  }),
};

module.exports = nextConfig;
