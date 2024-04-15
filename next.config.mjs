/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    // for pdf viwer
    config.resolve.alias.canvas = false;

    config.resolve.extensionAlias = {
      ".js": [".js", ".ts", ".tsx"],
    };

    config.module.rules.push({
      test: /\.node/,
      use: "raw-loader",
    });
    return config;
  },
};

export default nextConfig;
