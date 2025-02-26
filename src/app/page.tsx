'use client';

import { useEffect, useState } from 'react';

import MainOnboarding from '@/components/MainOnboarding';
import Splash from '@/components/Splash';

import Login from './login/page';

export default function HomePage() {
  const [showSplash, setShowSplash] = useState(true);
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState(false);

  useEffect(() => {
    const seen = localStorage.getItem('hasSeenOnboarding');
    if (seen) {
      setHasSeenOnboarding(true);
    }

    // 스플래시 화면은 2초
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {showSplash ? (
        <Splash />
      ) : // 온보딩을 이미 본 사용자는 로그인 화면, 그렇지 않으면 메인 온보딩 화면
      hasSeenOnboarding ? (
        <Login />
      ) : (
        <MainOnboarding />
      )}
    </>
  );
}
