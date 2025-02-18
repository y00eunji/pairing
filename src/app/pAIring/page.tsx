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

// 추천 리스트
const recommendationList = [
  {
    name: '김이름',
    age: '20',
    location: '서울시 용산구',
    // images: [
    //   'https://upload.wikimedia.org/wikipedia/ko/4/4a/%EC%8B%A0%EC%A7%B1%EA%B5%AC.png',
    //   'https://upload.wikimedia.org/wikipedia/ko/4/4a/%EC%8B%A0%EC%A7%B1%EA%B5%AC.png',
    //   'https://upload.wikimedia.org/wikipedia/ko/4/4a/%EC%8B%A0%EC%A7%B1%EA%B5%AC.png',
    // ],
  },
  {
    name: '김이름',
    age: '20',
    location: '서울시 강남구',
    // images: [
    //   'https://upload.wikimedia.org/wikipedia/ko/4/4a/%EC%8B%A0%EC%A7%B1%EA%B5%AC.png',
    //   'https://upload.wikimedia.org/wikipedia/ko/4/4a/%EC%8B%A0%EC%A7%B1%EA%B5%AC.png',
    // ],
  },
];

// 맞춤 추천 리스트
const keywordRecommendationList = [
  {
    name: '김이름',
    age: '20',
    location: '서울시 용산구',
    // images: [
    //   'https://upload.wikimedia.org/wikipedia/ko/4/4a/%EC%8B%A0%EC%A7%B1%EA%B5%AC.png',
    //   'https://upload.wikimedia.org/wikipedia/ko/4/4a/%EC%8B%A0%EC%A7%B1%EA%B5%AC.png',
    //   'https://upload.wikimedia.org/wikipedia/ko/4/4a/%EC%8B%A0%EC%A7%B1%EA%B5%AC.png',
    // ],
  },
  {
    name: '김이름',
    age: '20',
    location: '서울시 중구',
    // images: [
    //   'https://upload.wikimedia.org/wikipedia/ko/4/4a/%EC%8B%A0%EC%A7%B1%EA%B5%AC.png',
    // ],
  },
];

export default function MainPage() {
  return (
    <div className="relative min-h-screen p-6 bg-[#f9f9f9]">
      <div className="flex flex-col pb-24">
        <div className="flex flex-col">
          {/* 로고 영역 */}
          <div className="flex flex-col gap-5">
            <div className="flex justify-start">
              <Link href="/pAIring">
                <LogoIcon />
              </Link>
            </div>

            {/* 프로필카드 영역 */}
            <div className="flex flex-col items-center gap-5">
              {recommendationList.map((item, index) => (
                <ProfileCard
                  key={index}
                  name={item.name}
                  age={item.age}
                  location={item.location}
                  // images={item.images}
                />
              ))}
            </div>
          </div>

          {/* 추천 키워드 영역 */}
          <div className="flex flex-col mt-6">
            <p className="font-24-bold mb-5">맞춤 추천</p>
            <div className="flex justify-center">
              <KeywordRecommendation keywords={keywords} />
            </div>
          </div>

          <div className="flex flex-col pt-8">
            <div className="flex flex-col items-center gap-5">
              {keywordRecommendationList.map((item, index) => (
                <ProfileCard
                  key={index}
                  name={item.name}
                  age={item.age}
                  location={item.location}
                  // images={item.images}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <BottomNavBar />
    </div>
  );
}
