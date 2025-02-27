'use client';
import Link from 'next/link';

import BottomNavBar from '@/components/BottomNavBar';
import KeywordRecommendation from '@/components/KeywordRecommendation';
import ProfileCard from '@/components/ProfileCard';

import SameHobbyIcon from '/src/assets/icons/keyword_hobby.svg';
import LocationIcon from '/src/assets/icons/keyword_location.svg';
import SameAgeIcon from '/src/assets/icons/keyword_sameAge.svg';
import SameGenderIcon from '/src/assets/icons/keyword_sameGender.svg';
import UnderAgeIcon from '/src/assets/icons/keyword_underAge.svg';
import UpAgeIcon from '/src/assets/icons/keyword_upAge.svg';
import LogoIcon from '/src/assets/icons/logo_letter.svg';

import type {
  idealRecommendList,
  keywordRecommendList,
  keywordsList,
} from '@/types/ideal/ideal';

import { useState } from 'react';

const keywords: keywordsList[] = [
  { keywordId: 1, icon: <SameHobbyIcon />, title: '같은 취미' },
  { keywordId: 2, icon: <LocationIcon />, title: '같은 위치' },
  { keywordId: 3, icon: <UpAgeIcon />, title: '연상' },
  { keywordId: 4, icon: <UnderAgeIcon />, title: '연하' },
  { keywordId: 5, icon: <SameAgeIcon />, title: '동갑' },
  { keywordId: 6, icon: <SameGenderIcon />, title: '같은 성별' },
];

// 추천 리스트
const recommendationList: idealRecommendList[] = [
  {
    name: '김이름',
    age: 20,
    city: '서울시',
    district: '용산구',
    images: [
      'https://upload.wikimedia.org/wikipedia/ko/4/4a/%EC%8B%A0%EC%A7%B1%EA%B5%AC.png',
      'https://upload.wikimedia.org/wikipedia/ko/4/4a/%EC%8B%A0%EC%A7%B1%EA%B5%AC.png',
      'https://upload.wikimedia.org/wikipedia/ko/4/4a/%EC%8B%A0%EC%A7%B1%EA%B5%AC.png',
    ],
  },
  {
    name: '김이름',
    age: 20,
    city: '서울시',
    district: '강남구',
    images: [
      'https://upload.wikimedia.org/wikipedia/ko/4/4a/%EC%8B%A0%EC%A7%B1%EA%B5%AC.png',
      'https://upload.wikimedia.org/wikipedia/ko/4/4a/%EC%8B%A0%EC%A7%B1%EA%B5%AC.png',
    ],
  },
];

// 맞춤 추천 리스트
const keywordRecommendationList: keywordRecommendList[] = [
  {
    keywordId: 1,
    name: '김이름',
    age: 20,
    city: '서울시',
    district: '용산구',
    images: [
      'https://upload.wikimedia.org/wikipedia/ko/4/4a/%EC%8B%A0%EC%A7%B1%EA%B5%AC.png',
      'https://upload.wikimedia.org/wikipedia/ko/4/4a/%EC%8B%A0%EC%A7%B1%EA%B5%AC.png',
      'https://upload.wikimedia.org/wikipedia/ko/4/4a/%EC%8B%A0%EC%A7%B1%EA%B5%AC.png',
    ],
  },
  {
    keywordId: 1,
    name: '김이름',
    age: 20,
    city: '서울시',
    district: '강남구',
    images: [
      'https://upload.wikimedia.org/wikipedia/ko/4/4a/%EC%8B%A0%EC%A7%B1%EA%B5%AC.png',
    ],
  },
  {
    keywordId: 3,
    name: '김이름',
    age: 20,
    city: '서울시',
    district: '용산구',
    images: [
      'https://upload.wikimedia.org/wikipedia/ko/4/4a/%EC%8B%A0%EC%A7%B1%EA%B5%AC.png',
      'https://upload.wikimedia.org/wikipedia/ko/4/4a/%EC%8B%A0%EC%A7%B1%EA%B5%AC.png',
      'https://upload.wikimedia.org/wikipedia/ko/4/4a/%EC%8B%A0%EC%A7%B1%EA%B5%AC.png',
    ],
  },
  {
    keywordId: 3,
    name: '김이름',
    age: 20,
    city: '서울시',
    district: '강남구',
    images: [
      'https://upload.wikimedia.org/wikipedia/ko/4/4a/%EC%8B%A0%EC%A7%B1%EA%B5%AC.png',
    ],
  },
];

export default function MainPage() {
  // 선택된 키워드 id 관리
  const [selectedKeywordId, setSelectedKeywordId] = useState<number | null>(
    null,
  );

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
            <div className="flex flex-col justify-center items-center gap-5">
              {recommendationList.map((item, index) => (
                <ProfileCard
                  key={index}
                  name={item.name}
                  age={item.age}
                  city={item.city}
                  district={item.district}
                  images={item.images}
                />
              ))}
            </div>
          </div>

          {/* 추천 키워드 영역 */}
          <div className="flex flex-col mt-6">
            <p className="font-24-bold mb-5">맞춤 추천</p>
            <div className="flex justify-center">
              <KeywordRecommendation
                keywords={keywords}
                onKeywordSelected={setSelectedKeywordId}
              />
            </div>
          </div>

          {/* 추천 리스트 영역: 버튼 클릭 후 선택된 keywordId와 일치하는 항목만 렌더링 */}
          {selectedKeywordId && (
            <div className="flex flex-col pt-8">
              <div className="flex flex-col items-center gap-5">
                {keywordRecommendationList
                  .filter((item) => item.keywordId === selectedKeywordId)
                  .map((item, index) => (
                    <ProfileCard
                      key={index}
                      name={item.name}
                      age={item.age}
                      city={item.city}
                      district={item.district}
                      images={item.images}
                    />
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <BottomNavBar />
    </div>
  );
}
