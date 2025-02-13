import BottomNavBar from '@/components/BottomNavBar';
import KeywordRecommendation from '@/components/KeywordRecommendation';
import ProfileCard from '@/components/ProfileCard';

import Link from 'next/link';

import AgeIcon from '/public/assets/icons/keyword_age.svg';
import BeerIcon from '/public/assets/icons/keyword_beer.svg';
import LocationIcon from '/public/assets/icons/keyword_location.svg';
import PersonalityIcon from '/public/assets/icons/keyword_personality.svg';
import LogoIcon from '/public/assets/icons/logo_letter.svg';

const keywords = [
  { icon: <PersonalityIcon />, title: '성격' },
  { icon: <LocationIcon />, title: '상대의 위치' },
  { icon: <AgeIcon />, title: '나이' },
  { icon: <BeerIcon />, title: '음주 스타일' },
];

const profileCardList = [
  { name: '김이름', age: '20', location: '서울시 용산구' },
  { name: '김이름', age: '20', location: '서울시 용산구' },
];

export default function MainPage() {
  return (
    <div className="relative min-h-screen pb-20">
      <div className="w-full mx-auto px-[100px]">
        {/* 로고 영역 */}
        <div className="flex justify-start py-6 -ml-6">
          <Link href="/pAIring">
            <LogoIcon />
          </Link>
        </div>

        {/* 프로필카드 영역 */}
        <div className="flex flex-col items-center space-y-2">
          {profileCardList.map((item, index) => (
            <ProfileCard
              key={index}
              name={item.name}
              age={item.age}
              location={item.location}
            />
          ))}
        </div>

        {/* 추천 키워드 영역 */}
        <div className="flex flex-col mt-6 pb-6">
          <p className="font-24-bold pt-6 pb-4 -ml-6">맞춤 추천</p>
          <div className="flex justify-center">
            <KeywordRecommendation keywords={keywords} />
          </div>
        </div>
      </div>

      <BottomNavBar />
    </div>
  );
}
