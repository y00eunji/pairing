'use client';

import { useEffect } from 'react';

import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';

import { usePostOAuthLogin } from '@/hooks/apis/login/usePostLogin';

export default function AuthLoadingPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { mutate: loginMutate, isPending, isSuccess } = usePostOAuthLogin();

  useEffect(() => {
    const authCode = searchParams.get('code');
    const provider = localStorage.getItem('oauth_provider') as
      | 'KAKAO'
      | 'NAVER';

    if (!authCode || !provider) {
      router.push('/login');
      return;
    }

    loginMutate({ code: authCode, type: provider });
    localStorage.removeItem('oauth_provider'); // 사용 후 삭제
  }, [router, searchParams, loginMutate]);

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
            {isPending
              ? '로그인 정보를 확인하고 있습니다.'
              : isSuccess
                ? '로그인 성공! 페이지로 이동합니다.'
                : '로그인 정보를 확인하고 있습니다.'}
          </p>
        </div>
      </div>

      <div className="mt-4 w-[60%] h-2 bg-gray3 rounded-full overflow-hidden">
        <div className="h-full loading-bar bg-gradient-to-r from-mainPink1 to-mainPink2" />
      </div>
    </div>
  );
}
