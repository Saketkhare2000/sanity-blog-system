/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                // Match any image on domain
                hostname: "cdn.sanity.io",

                // Match any image with format
                protocol: "https",
                // Match any image with format
                port: "",
            },
        ],
    },
};

export default nextConfig;
