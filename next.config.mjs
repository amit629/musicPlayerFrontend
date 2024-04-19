/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
          {
            source: '/dashboard/tracks',
            destination: '/dashboard/tracks/addtracks', // Matched parameters can be used in the destination
            permanent: false,
          },{
            source: '/dashboard',
            destination: '/dashboard/insights', // Matched parameters can be used in the destination
            permanent: false,
          },            
        ]
      },
    reactStrictMode: false,
};

export default nextConfig;
