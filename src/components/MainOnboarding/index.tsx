import { useState } from 'react';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import Button from '../common/Button';

import BackIcon from '/src/assets/icons/back_icon.svg';

export default function MainOnboarding() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const router = useRouter();

  const pages = [
    {
      title: 'AI 얼굴 인증',
      content: '으로\n신뢰할 수 있는 프로필',
      description:
        '얼굴 인증을 통해 신뢰성을 높이고,\n만남을 위한 안전한 환경을 제공합니다.',
      image: '/images/main_faceAuth_logo.png',
      imgWidth: 230,
      imgHeight: 200,
    },
    {
      title: '알고리즘을 통한 추천',
      content: '으로\n나와 맞는 사람을 발견하세요!',
      description:
        '실시간 추천으로 나와 맞는 사람을 발견하세요.\n 알고리즘을 통해 당신과 잘 맞는 상대를\n 실시간으로 추천해줍니다',
      image: '/images/main_match_logo.png',
      imgWidth: 250,
      imgHeight: 250,
    },
    {
      title: '채팅 요약 & 호감도 분석\n & 대화 주제 추천',
      content: '으로 앞으로의\n 대화를 쉽게!',
      description:
        'AI가 채팅 내용을 요약하고 호감도를 분석하여,\n상대와의 대화 흐름을 더 쉽게 파악하고\n자연스럽게 이어갈 수 있도록 도와줍니다.',
      image: '/images/main_chat_logo.png',
      imgWidth: 190,
      imgHeight: 180,
    },
  ];

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      window.location.href = '/';
    }
  };

  const handleNext = () => {
    if (currentIndex < pages.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      router.push('/login');
    }
  };

  const { title, content, description, image, imgWidth, imgHeight } =
    pages[currentIndex];

  return (
    <div className="relative w-full h-screen flex flex-col overflow-hidden">
      {/* 상단 영역: 뒤로가기 버튼 */}
      <div className="h-[68px] flex items-center px-5 py-4">
        <BackIcon onClick={handlePrev} className="cursor-pointer" />
      </div>

      {/* 중앙 영역 */}
      <div className="flex-1 flex flex-col px-6">
        {/* 큰 제목 부분 */}
        <h1 className="text-24px font-bold whitespace-pre-line">
          <span className="text-mainPink1">{title}</span>
          <span className="whitespace-pre-line text-black"> {content}</span>
        </h1>

        {/* 설명 부분 */}
        <p className="mt-3 font-14-regular text-gray1 whitespace-pre-line pb-[50px]">
          {description}
        </p>

        {/* 이미지 */}
        <div className="flex mt-6 items-center justify-center w-full ">
          <Image
            src={image}
            alt="온보딩 이미지"
            width={imgWidth}
            height={imgHeight}
            style={{ objectFit: 'cover' }}
          />
        </div>
      </div>

      {/* 하단 영역 */}
      <div className="pb-8 px-5 flex flex-col items-center gap-4">
        {/* 인디케이터 */}
        <div className="flex items-center justify-center pb-3">
          {pages.map((_, idx) => (
            <div
              key={idx}
              className={`w-2 h-2 rounded-full mx-1 ${
                idx === currentIndex ? 'bg-mainPink1' : 'bg-gray2'
              }`}
            />
          ))}
        </div>

        {/* 버튼 */}
        <Button
          shape="rectangle"
          variant="filled"
          className="w-full h-[55px]"
          onClick={handleNext}
        >
          {currentIndex < pages.length - 1
            ? '다음'
            : '로그인/회원가입 하러 가기'}
        </Button>
      </div>
    </div>
  );
}
