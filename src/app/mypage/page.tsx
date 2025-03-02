'use client';

import MyPageContainer from '@/components/mypage';
import Title from '@/components/onboarding/Title';

export default function MyPage() {
  return (
    <div className="h-[100dvh] flex flex-col bg-[#F9F9F9] pb-[40px]">
      <div className="p-5">
        <Title title="마이 프로필" />
      </div>

      <MyPageContainer />
    </div>
  );
}
