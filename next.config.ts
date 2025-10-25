import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true, 
  typescript: {
      ignoreBuildErrors: true,
    },
  async rewrites() {
    return [
      // Rewrite Grafana asset requests to the correct public folder location
      {
        source: '/public/build/:path*',
        destination: '/build/:path*',
      },
      // ...and handle route-relative requests (e.g., /company/public/build/...)
      {
        source: '/:route*/public/build/:path*',
        destination: '/build/:path*',
      },
    ]
  },
}

export default nextConfig
