import type { myProfile } from '@/types/member/mypage';

import DefaultMyPage from './DefaultmyPage';

const profiles: myProfile[] = [
  {
    name: '김이름',
    age: 20,
    gender: 'MALE',
    birth: new Date('2000-01-01'),
    mbti: 'ESFJ',
    drink: 'atAllNothing',
    smoke: 'never',
    city: '서울시',
    district: '강남구',
    hobby: ['게임', '독서', '산책'],
    images: [
      'https://placehold.co/600x400',
      'https://upload.wikimedia.org/wikipedia/ko/4/4a/%EC%8B%A0%EC%A7%B1%EA%B5%AC.png',
    ],
  },
];

export default function MyPageContainer() {
  const profile = profiles[0];

  return <DefaultMyPage {...profile} />;
}
