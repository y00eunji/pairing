'use client';

import { useCallback } from 'react';

import KakaoLogo from '@/assets/icons/kakao_logo.svg';
import NaverLogo from '@/assets/icons/naver_logo.svg';

import OAuthButton from '../OAuthButton';

interface LoginConfig {
  icon: React.ReactNode;
  text: string;
  bgColor: string;
  textColor: string;
  url: string;
}

export default function OAuthButtons() {
  // 개발 환경에서는 localhost:3000 사용, 프로덕션에서는 환경 변수 사용
  const baseRedirectUri =
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000'
      : process.env.NEXT_PUBLIC_REDIRECT_URI;

  // const REDIRECT_URI = `${baseRedirectUri}/login/auth-loading`;
  const REDIRECT_URI_NAVER = `${baseRedirectUri}/login/auth-loading?plt=naver_login`;
  const REDIRECT_URI_KAKAO = `${baseRedirectUri}/login/auth-loading`;

  const loginConfigs: Record<'naver' | 'kakao', LoginConfig> = {
    naver: {
      icon: <NaverLogo />,
      text: '네이버 로그인',
      bgColor: 'bg-[#03CF5D]',
      textColor: 'text-white',
      url: `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${process.env.NEXT_PUBLIC_NAVER_CLIENT_ID}&redirect_uri=${REDIRECT_URI_NAVER}`,
    },
    kakao: {
      icon: <KakaoLogo />,
      text: '카카오 로그인',
      bgColor: 'bg-[#FFE812]',
      textColor: 'text-[#181600]',
      url: `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}&redirect_uri=${REDIRECT_URI_KAKAO}&response_type=code`,
    },
  };

  const handleLogin = useCallback(
    (url: string) => () => {
      window.location.href = url;
    },
    [],
  );

  return (
    <div className="absolute bottom-0 w-full">
      <div className="flex w-full flex-col gap-3">
        {Object.entries(loginConfigs).map(([key, config]) => (
          <OAuthButton
            key={key}
            onClick={handleLogin(config.url)}
            {...config}
          />
        ))}
      </div>
    </div>
  );
}
