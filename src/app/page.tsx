'use client';

import { useEffect, useState } from 'react';

import MainOnboarding from '@/components/MainOnboarding';
import Splash from '@/components/Splash';

export default function HomePage() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return <>{showSplash ? <Splash /> : <MainOnboarding />}</>;
}
