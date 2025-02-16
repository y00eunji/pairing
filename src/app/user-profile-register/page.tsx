'use client';

import FloatingButton from '@/components/common/FloatingButton';
import ProfileCardHeader from '@/components/header/ProfileCardHeader';
import ProfileCard from '@/components/ProfileCard';
import ProfileCardInfoContainer from '@/components/ProfileCardInfoContainer';

import BeerIcon from '/public/assets/icons/profilecard_bottle_pink.svg';
import HobbyIcon from '/public/assets/icons/profilecard_heart_pink.svg';
import LocationIcon from '/public/assets/icons/profilecard_location_pink.svg';
import PerconalityIcon from '/public/assets/icons/profilecard_user_pink.svg';

export default function UserProfileRegister() {
  const handleDirectClick = () => {
    alert('Direct 버튼이 클릭되었습니다!');
  };

  const handleHeartClick = () => {
    alert('Heart 버튼이 클릭되었습니다!');
  };

  return (
    <div className="relative min-h-screen pb-24 p-5">
      <div>
        <ProfileCardHeader name="김이름" age={20} />
      </div>

      {/* ProfileCard를 가운데 정렬 */}
      <div className="flex justify-center my-4">
        <ProfileCard />
      </div>

      <div className="flex flex-col gap-y-8">
        <ProfileCardInfoContainer
          icon={<LocationIcon />}
          title="거주지"
          description="서울시 강남구 역삼동"
        />
        <ProfileCardInfoContainer
          icon={<HobbyIcon />}
          title="취미"
          tags={['운동', '독서', '맛집탐방']}
        />
        <ProfileCardInfoContainer
          icon={<PerconalityIcon />}
          title="성격(MBTI)"
          description="INFP"
        />
        <ProfileCardInfoContainer
          icon={<BeerIcon />}
          title="음주 흡연 여부"
          tags={['전혀 안마심', '비흡연']}
        />
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
