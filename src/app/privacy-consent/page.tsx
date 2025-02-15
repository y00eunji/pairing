'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import BackIcon from '/public/assets/icons/back_icon.svg';

import Button from '@/components/common/Button';
import Title from '@/components/onboarding/Title';

export default function PrivacyConsent() {
  const router = useRouter();

  const handlePrev = () => {
    router.push('/login');
  };

  const handleNext = () => {
    router.push('/onboarding');
  };

  return (
    <div className="relative h-[100dvh]">
      <div className="w-full px-5 py-4 gap-6 h-[68px] flex justify-between items-center">
        <BackIcon onClick={handlePrev} />
      </div>

      <div className="w-full px-5 pt-2 flex flex-col">
        <div>
          <Title title="페어링 이용을 위한 개인정보 수집 및 이용 동의" />
          <div className="font-18-medium mt-8 mb-[10px]">
            [pAIring] 개인정보 처리 방침에 대한 동의서
          </div>

          <div className="font-14-regular mb-[20px]">
            본인은 pAIring (이하 "페어링")이 제공하는 AI 기반 데이팅 서비스
            이용과 관련하여, 개인정보 보호법 제15조 및 제17조, 제22조, 제24조에
            따라 아래의 내용을 충분히 숙지하였으며, 이에 동의합니다.
          </div>

          <div>
            <Link href="/privacy-consent/detail">
              <span className="font-14-medium text-gray1 underline">
                전문보기
              </span>
            </Link>
          </div>

          <div className="absolute bottom-0 left-0 w-full px-5 py-8 flex flex-col gap-3">
            <Button
              shape="rectangle"
              variant="filled"
              className="w-full h-[55px]"
              onClick={handleNext}
            >
              동의합니다.
            </Button>
            <Button
              shape="rectangle"
              variant="disabled"
              className="w-full h-[55px]"
              onClick={handlePrev}
            >
              동의하지 않습니다.
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
