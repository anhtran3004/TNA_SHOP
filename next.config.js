/** @type {{images: {unoptimized: boolean}, reactStrictMode: boolean}} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        unoptimized: true
    },
    webpack: (config, { isServer }) => {
        if (!isServer) config.resolve.fallback.fs = false;
        return config;
    }
}
module.exports = nextConfig
