'use client';

import type { UIEvent } from 'react';
import { useRef, useState } from 'react';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import BackIcon from '/public/assets/icons/back_icon.svg';

import terms2Img from '@/assets/images/terms-2.png';
import terms3Img from '@/assets/images/terms-3.png';
import Button from '@/components/common/Button';
import Title from '@/components/onboarding/Title';

export default function PrivacyConsent() {
  const router = useRouter();
  const contentRef = useRef<HTMLDivElement>(null);
  const [isBottom, setIsBottom] = useState(false);

  const handleScroll = (e: UIEvent<HTMLDivElement>) => {
    const element = e.currentTarget;
    const isNearBottom =
      element.scrollHeight - element.scrollTop <= element.clientHeight + 100;
    setIsBottom(isNearBottom);
  };

  const handleButtonClick = () => {
    if (isBottom) {
      router.push('/privacy-consent');
      return;
    }

    // 다음 섹션으로 스크롤
    if (contentRef.current) {
      const currentScroll = contentRef.current.scrollTop;
      const scrollHeight = window.innerHeight - 68 - 120; // 전체 높이 - 헤더(68px) - 버튼영역(120px)
      contentRef.current.scrollTo({
        top: currentScroll + scrollHeight,
        behavior: 'smooth',
      });
    }
  };

  const handleRouterBack = () => {
    router.push('/privacy-consent');
  };

  return (
    <div className="flex flex-col h-screen relative">
      <div className="w-full px-5 py-4 gap-6 h-[68px] flex justify-between items-center">
        <BackIcon onClick={handleRouterBack} />
      </div>

      <div
        ref={contentRef}
        onScroll={handleScroll}
        className="w-full px-5 pt-2 flex flex-col overflow-y-auto h-[calc(100%-68px)]"
      >
        <div className="pb-[89px]">
          <Title title="개인정보 수집 및 이용 동의서" />

          <div className="flex flex-col gap-8 pb-4">
            <div>
              <div className="font-18-medium mt-8 mb-[10px]">
                [pAIring] 개인정보 처리 방침에 대한 동의서
              </div>

              <div className="font-14-regular">
                본인은 pAIring (이하 &quot;서비스&quot;)이 제공하는 AI 기반
                데이팅 서비스 이용과 관련하여, 개인정보 보호법 제15조 및 제17조,
                제22조, 제24조에 따라 아래의 내용을 충분히 숙지하였으며, 이에
                동의합니다.
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <div className="font-18-medium">
                1. 개인정보 수집 및 이용 목적
              </div>
              <div className="font-14-regular">
                서비스는 원활한 매칭 서비스 제공 및 사용자 경험 개선을 위해
                다음과 같은 목적으로 개인정보를 수집·이용합니다.
              </div>

              <ul className="font-14-regular list-disc pl-4 space-y-1">
                <li>사용자 프로필 생성 및 매칭 서비스 제공</li>
                <li>맞춤형 추천 (이상형 설정, 데이트 장소 추천 등)</li>
                <li>
                  대화 분석 피드백 제공 (채팅 요약, 호감도 분석을 통한 대화 추천
                  등)
                </li>
                <li>
                  보안 및 안전한 서비스 운영 (본인 인증, 지인 차단, 불건전
                  사용자 모니터링)
                </li>
                <li>기타 서비스 품질 개선 및 고객 지원 지원</li>
              </ul>
            </div>

            <div className="flex flex-col gap-3">
              <div className="font-18-medium">2. 수집하는 개인정보 항목</div>
              <div className="font-14-regular">
                서비스는 이용자의 동의 하에 다음과 같은 정보를 수집합니다.
              </div>

              <div className="relative w-full h-[200px]">
                <Image src={terms2Img} alt="개인정보 수집 항목" fill />
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <div className="font-18-medium">
                3. 개인정보의 보유 및 이용 기간
              </div>

              <ul className="font-14-regular list-disc pl-4 space-y-1">
                <li>
                  회원 탈퇴 시 즉시 삭제 (단, 서비스 이용 기록 등 일부 데이터는
                  내부 방침에 따라 보관 가능)
                </li>
                <li>
                  관련 법령(전자상거래법, 통신비밀보호법 등)에 따라 일정 기간
                  보관이 필요한 경우 해당 기간 동안 보관 후 파기
                </li>
              </ul>
            </div>

            <div className="flex flex-col gap-3">
              <div className="font-18-medium">
                4. 개인정보의 제3자 제공 (해당 시)
              </div>
              <div className="font-14-regular">
                서비스는 원칙적으로 사용자의 동의 없이 개인정보를 외부에
                제공하지 않습니다.다만, 아래의 경우에 한해 개인정보가 제공될 수
                있습니다.
              </div>

              <div className="relative w-full h-[280px]">
                <Image src={terms3Img} alt="개인정보 수집 항목" fill />
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <div className="font-18-medium">5. 개인정보 보호 및 보안</div>
              <div className="font-14-regular">
                서비스는 이용자의 개인정보를 보호하기 위해 다음과 같은 조치를
                취합니다.
              </div>

              <ul className="font-14-regular list-disc pl-4 space-y-1">
                <li>
                  <span className="font-medium">본인 인증: </span>전화번호
                  인증을 통해 실 사용자 확인
                </li>
                <li>
                  <span className="font-medium">지인차단 기능: </span>연락처를
                  통한 차단 기능 제공
                </li>
                <li>
                  <span className="font-medium">AI 기반 모니터링: </span>비속어
                  필터링 및 부적절한 채팅 감지
                </li>
                <li>
                  <span className="font-medium">암호화 저장: </span>프로필 사진
                  및 중요 정보 암호화 저장
                </li>
              </ul>
            </div>

            <div className="flex flex-col gap-3">
              <div className="font-18-medium">
                6. 개인정보 동의 거부 권리 및 불이익
              </div>

              <ul className="font-14-regular list-disc pl-4 space-y-1">
                <li>사용자는 개인정보 제공에 동의하지 않을 권리가 있습니다.</li>
                <li>
                  단,
                  <span className="text-mainPink1">
                    필수 정보 제공에 동의하지 않을 경우 서비스 이용이 제한
                  </span>
                  될 수 있습니다.
                </li>
              </ul>
            </div>

            <div className="flex flex-col gap-3">
              <div className="font-18-medium">7. 동의 확인</div>
              <div className="font-14-regular">
                본인은 위 내용을 충분히 숙지하였으며, 개인정보 수집· 이용에
                동의합니다.
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full px-5 py-8 absolute bottom-0 min-h-[120px]">
        <div className="absolute bottom-0 w-full h-1/2 backdrop-blur-sm" />
        <Button
          shape="rectangle"
          variant="filled"
          className="relative z-10 w-full h-[55px]"
          onClick={handleButtonClick}
        >
          {isBottom ? '닫기' : '다음'}
        </Button>
      </div>
    </div>
  );
}
