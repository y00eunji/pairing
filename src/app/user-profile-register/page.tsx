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
  const profile = {
    name: '김이름',
    age: 20,
    gender: 'MALE',
    birth: '2025-02-15',
    mbti: 'INFP',
    drink: '전혀 안마심',
    smoking: '비흡연',
    city: '서울시',
    district: '강남구',
    hobby: ['운동', '독서', '맛집탐방'],
    images: ['img1.png', 'img2.png'],
  };

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
      tags: [profile.drink, profile.smoking],
    },
  ];

  const handleDirectClick = () => {
    alert('Direct 버튼이 클릭되었습니다!');
  };

  const handleHeartClick = () => {
    alert('Heart 버튼이 클릭되었습니다!');
  };

  return (
    <div className="relative min-h-screen pb-24 p-5">
      <ProfileCardHeader name={profile.name} age={profile.age} />

      {/* ProfileCard를 가운데 정렬 */}
      <div className="flex justify-center my-4">
        <ProfileCard />
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
