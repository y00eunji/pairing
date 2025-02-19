'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import Button from '@/components/common/Button';

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="flex flex-col items-center">
        <Image
          src="/images/logo_error.png"
          alt="에러페이지 로고"
          width={335}
          height={335}
        />

        <div className="flex flex-col items-center mt-0">
          <p className="font-18-medium text-mainPink1 pb-1">
            페이지를 찾을 수 없습니다.
          </p>
          <p className="font-14-regular text-gray1 pb-2">
            잠시 후에 다시 시도해 주세요.
          </p>
        </div>
      </div>

      <div className="mt-4">
        <Button shape="circle" variant="disabled" onClick={() => router.back()}>
          이전으로 돌아가기
        </Button>
      </div>
    </div>
  );
}
