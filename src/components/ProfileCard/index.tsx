'use client';

import Image from 'next/image';

import DirectIcon from '/src/assets/icons/button_direct.svg';
import HeartIcon from '/src/assets/icons/button_heart.svg';
import FaceAuthIcon from '/src/assets/icons/face_auth.svg';
import LocationIcon from '/src/assets/icons/location.svg';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/Carousel';

interface ProfileCardProps {
  name: string;
  age?: React.ReactNode;
  city: string;
  district: string;
  images?: string[];
}

export default function ProfileCard({
  name,
  age,
  city,
  district,
  images,
}: ProfileCardProps) {
  return (
    <div
      className="relative w-full aspect-square rounded-xl overflow-hidden 
    shadow-[0px_6px_6px_rgba(0,0,0,0.02),_0px_-6px_6px_rgba(0,0,0,0.02),_6px_0px_6px_rgba(0,0,0,0.02),_-6px_0px_6px_rgba(0,0,0,0.02)]"
    >
      {/* 이미지 캐러셀 */}
      <Carousel>
        <CarouselContent>
          {images?.map((imgUrl, index) => (
            <CarouselItem key={index}>
              <Image
                src={imgUrl}
                alt={`Profile image ${index + 1}`}
                className="object-cover w-full h-full"
                width={300}
                height={300}
                unoptimized={true}
              />
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* 좌우 이동 버튼 */}
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

      {/* 그라데이션 오버레이 */}
      <div className="absolute inset-0 bg-gradient-to-t from-mainPink2 via-transparent to-transparent rounded-xl z-5" />

      {/* 사용자 정보 */}
      <div className="absolute left-5 bottom-6">
        <div className="pb-2">
          <FaceAuthIcon />
        </div>
        <div className="font-24-bold text-white space-x-3 pb-2">
          <span>{name}</span>
          <span>{age}</span>
        </div>
        <div className="flex items-center space-x-2">
          <LocationIcon />
          <span className="text-16px font-regular text-white">
            {city} {district}
          </span>
        </div>
      </div>

      {/* 버튼 */}
      <div className="absolute right-3 bottom-3 flex items-start">
        <button className="group">
          <DirectIcon className="text-white group-hover:text-mainPink2 transition-colors duration-200" />
        </button>
        <button className="group">
          <HeartIcon className="text-white group-hover:text-mainPink1  transition-colors duration-200" />
        </button>
      </div>
    </div>
  );
}
