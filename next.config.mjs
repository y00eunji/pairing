/** @type {import('next').NextConfig} */
const nextConfig = {
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
  },
};

export default nextConfig;
