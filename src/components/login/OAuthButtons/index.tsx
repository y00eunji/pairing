'use client';

import { useCallback, useMemo } from 'react';

import KakaoLogo from '@/assets/icons/kakao_logo.svg';
import NaverLogo from '@/assets/icons/naver_logo.svg';

import OAuthButton from '../OAuthButton';

export default function OAuthButtons() {
  const baseRedirectUri =
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000'
      : process.env.NEXT_PUBLIC_REDIRECT_URI;

  const REDIRECT_URI = `${baseRedirectUri}/login/auth-loading`;

  const loginConfigs = useMemo(
    () => ({
      naver: {
        icon: <NaverLogo />,
        text: '네이버 로그인',
        bgColor: 'bg-[#03CF5D]',
        textColor: 'text-white',
        url: `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${process.env.NEXT_PUBLIC_NAVER_CLIENT_ID}&redirect_uri=${REDIRECT_URI}`,
      },
      kakao: {
        icon: <KakaoLogo />,
        text: '카카오 로그인',
        bgColor: 'bg-[#FFE812]',
        textColor: 'text-[#181600]',
        url: `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`,
      },
    }),
    [REDIRECT_URI],
  );

  const handleLogin = useCallback(
    (provider: 'naver' | 'kakao') => () => {
      localStorage.setItem('oauth_provider', provider.toUpperCase());
      window.location.href = loginConfigs[provider].url;
    },
    [loginConfigs],
  );

  return (
    <div className="absolute bottom-0 w-full">
      <div className="flex w-full flex-col gap-3">
        {Object.entries(loginConfigs).map(([key, config]) => (
          <OAuthButton
            key={key}
            onClick={handleLogin(key as 'naver' | 'kakao')}
            {...config}
          />
        ))}
      </div>
    </div>
  );
}
