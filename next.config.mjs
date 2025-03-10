/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone', //#
  webpack(config) {
    // SVG 파일을 컴포넌트로 사용할 수 있게 설정
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
  // public 폴더의 assets 접근을 위한 설정
  images: {
    disableStaticImages: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'kr.object.ncloudstorage.com',
      },
    ],
  },
};

export default nextConfig;
