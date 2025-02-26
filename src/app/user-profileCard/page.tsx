'use client';

import FloatingButton from '@/components/common/FloatingButton';
import ProfileCardHeader from '@/components/header/ProfileCardHeader';
import ProfileCardInfoContainer from '@/components/ProfileCardInfoContainer';

import BeerIcon from '/src/assets/icons/profilecard_bottle_pink.svg';
import HobbyIcon from '/src/assets/icons/profilecard_heart_pink.svg';
import LocationIcon from '/src/assets/icons/profilecard_location_pink.svg';
import PerconalityIcon from '/src/assets/icons/profilecard_user_pink.svg';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/Carousel';
import type { DrinkStatusType, SmokeStatusType } from '@/constants/wellness';
import { DRINK_STATUS, SMOKE_STATUS } from '@/constants/wellness';

import Image from 'next/image';

export default function UserProfileCard() {
  const profile = {
    name: '김이름',
    age: 20,
    gender: 'MALE',
    birth: '2025-02-15',
    mbti: 'INFP',
    drink: 'atAllNothing',
    smoking: 'never',
    city: '서울시',
    district: '강남구',
    hobby: ['운동', '독서', '맛집탐방'],
    images: [
      'https://placehold.co/600x400',
      'https://upload.wikimedia.org/wikipedia/ko/4/4a/%EC%8B%A0%EC%A7%B1%EA%B5%AC.png',
    ],
  };

  // 음주/흡연 상태 변환
  const drinkStatus: DrinkStatusType =
    DRINK_STATUS[profile.drink as keyof typeof DRINK_STATUS];
  const smokeStatus: SmokeStatusType =
    SMOKE_STATUS[profile.smoking as keyof typeof SMOKE_STATUS];

  // 프로필 정보 배열 (거주지, 취미, MBTI, 음주/흡연)
  const profileInfoItems = [
    {
      icon: <LocationIcon />,
      title: '거주지',
      description: `${profile.city} ${profile.district}`,
    },
    {
      icon: <HobbyIcon />,
      title: '취미',
      tags: profile.hobby,
    },
    {
      icon: <PerconalityIcon />,
      title: '성격(MBTI)',
      description: profile.mbti,
    },
    {
      icon: <BeerIcon />,
      title: '음주 흡연 여부',
      tags: [drinkStatus, smokeStatus],
    },
  ];

  const handleDirectClick = () => {
    alert('Direct 버튼이 클릭되었습니다!');
  };

  const handleHeartClick = () => {
    alert('Heart 버튼이 클릭되었습니다!');
  };

  return (
    <div className="relative min-h-screen pb-24 p-5 bg-[#f9f9f9]">
      <ProfileCardHeader name={profile.name} age={profile.age} />

      {/* 프로필 카드 */}
      <div
        className="flex justify-center my-4 aspect-square rounded-xl overflow-hidden bg-white
      shadow-[0px_3px_3px_rgba(0,0,0,0.05),_0px_-3px_3px_rgba(0,0,0,0.05),_3px_0px_3px_rgba(0,0,0,0.05),_-3px_0px_3px_rgba(0,0,0,0.05)]"
      >
        {/* 이미지 캐러셀 */}
        <Carousel>
          <CarouselContent>
            {profile.images.map((imgUrl, index) => (
              <CarouselItem key={index}>
                <Image
                  src={imgUrl}
                  alt={`Profile image ${index + 1}`}
                  className="object-contain w-full h-full"
                  width={200}
                  height={200}
                  unoptimized={true}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          {/* 좌우 이동 버튼 */}
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>

      <div className="flex flex-col gap-y-8">
        {profileInfoItems.map((item, index) => (
          <ProfileCardInfoContainer
            key={index}
            icon={item.icon}
            title={item.title}
            description={item.description}
            tags={item.tags}
          />
        ))}
      </div>

      <div className="absolute bottom-4 right-4">
        <FloatingButton
          onClickDirect={handleDirectClick}
          onClickHeart={handleHeartClick}
        />
      </div>
    </div>
  );
}
