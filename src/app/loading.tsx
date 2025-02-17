'use client';

import { Progress } from '@/components/Progress';
import Image from 'next/image';
import * as React from 'react';

export default function Loading() {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    // 500ms 후에 프로그레스 값을 50으로 변경
    const timer = setTimeout(() => {
      setProgress(50);
    }, 50);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="flex flex-col items-center">
        <Image
          src="/images/onboarding-complete.png"
          alt="로고"
          width={335}
          height={335}
        />

        <div className="flex flex-col items-center mt-0">
          <p className="font-18-medium text-mainPink1 pb-1">
            잠시만 기다려주세요.
          </p>
          <p className="font-14-regular text-gray1 pb-2">
            해당페이지로 이동 중입니다.
          </p>
        </div>
      </div>

      <div className="mt-4 w-[60%]">
        <Progress value={progress} />
      </div>
    </div>
  );
}
