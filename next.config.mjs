/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'images.pexels.com',
                port: ''
            },
            {
                protocol: 'https',
                hostname: 'avatars.githubusercontent.com',
                port: ''
            },
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
                port: ''
            },
            {
                protocol: 'https',
                hostname: 'lh3.googleusercontent.com',
                port: ''
            },
            {
                protocol: 'https',
                hostname: 'assets.aceternity.com',
                port: ''
            },
            {
                protocol: 'https',
                hostname: 'files.edgestore.dev',
                port: ''
            }
        ],
    },
    // webpack: (config) => {
    //     config.externals = [...config.externals, "bcrypt"];
    //     return config;
    //   },
  
    
};

export default nextConfig;
