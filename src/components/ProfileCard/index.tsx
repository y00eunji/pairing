'use client';

import DirectIcon from '/public/assets/icons/button_direct.svg';
import HeartIcon from '/public/assets/icons/button_heart.svg';
import FaceAuthIcon from '/public/assets/icons/face_auth.svg';
import LocationIcon from '/public/assets/icons/location.svg';

interface ProfileCardProps {
  name: string;
  age?: React.ReactNode;
  location: string;
}

export default function ProfileCard({ name, age, location }: ProfileCardProps) {
  return (
    <div className="relative w-full aspect-square bg-gray1 rounded-xl shadow-lg">
      {/* 배경 그라데이션 */}
      <div className="absolute w-full h-full bg-gradient-to-t from-mainPink2 via-transparent to-transparent rounded-xl z-0"></div>

      {/* 닫기 버튼 */}
      {/* <button className="absolute top-3 right-2 m-2">
        <DeleteIcon />
      </button> */}

      {/* 사용자 정보 */}
      <div className="absolute items-start flex-col pl-5 bottom-6">
        <div className="pb-2">
          <FaceAuthIcon />
        </div>
        <div className="font-24-medium text-white space-x-3 pb-2">
          <span>{name}</span>
          <span>{age}</span>
        </div>
        <div className="flex items-center space-x-2">
          <LocationIcon />
          <span className="text-14px font-medium text-white">{location}</span>
        </div>
      </div>

      {/* 버튼 */}
      <div className="absolute flex items-start right-3 bottom-3">
        <button>
          <DirectIcon />
        </button>
        <button>
          <HeartIcon />
        </button>
      </div>
    </div>
  );
}
