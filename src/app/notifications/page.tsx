import Image from 'next/image';

import BottomNavBar from '@/components/BottomNavBar';
import PageHeader from '@/components/header/PageHeader';
import NotificationCard from '@/components/NotificationCard';

// 날짜를 "YYYY.MM.DD" 형식으로 변환하는 함수
const formatDate = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}.${month}.${day}`;
};

export default function Notifications() {
  const notificationList = [
    {
      profileImg: '/images/profile.png',
      name: '김이름',
      age: 20,
      location: '서울시',
      time: new Date('2025-02-02T10:15:00'),
      isHeart: true,
      isMe: false,
    },
    {
      profileImg: '/images/profile.png',
      name: '김이름',
      age: 20,
      location: '서울시',
      time: new Date('2025-02-02T11:00:00'),
      isHeart: true,
      isMe: false,
    },
    {
      profileImg: '/images/profile.png',
      name: '김이름',
      age: 20,
      location: '서울시',
      time: new Date('2025-02-03T09:00:00'),
      isHeart: false,
      isMe: true,
    },
  ];

  //  알림 있음, 없음 여부 확인
  const isEmpty = notificationList.length === 0;
  return (
    <div className="flex flex-col h-screen pb-[90px]">
      <div className="shadow-[0px_3px_3px_rgba(0,0,0,0.05)]">
        <PageHeader title="알림" />
      </div>

      <div className="flex flex-col h-screen bg-[#f9f9f9]">
        {isEmpty ? (
          //  알림이 없을 때의 화면
          <div className="flex flex-col items-center w-full justify-center">
            <Image
              src="/images/logo_gray.png"
              alt="알림이 없을 때 페이지 로고"
              width={335}
              height={335}
            />
            <p className="font-18-medium text-gray1">새로운 알림이 없습니다.</p>
          </div>
        ) : (
          // 알림이 있을 때의 화면
          <div className="flex-1 overflow-y-auto">
            {notificationList.map((item, index) => {
              const isNewDay =
                index === 0 ||
                formatDate(notificationList[index - 1].time) !==
                  formatDate(item.time);

              return (
                <div key={index}>
                  {isNewDay && (
                    <div className="font-14-medium font-roboto m-5">
                      {formatDate(item.time)}
                    </div>
                  )}
                  <NotificationCard
                    profileImg={item.profileImg}
                    name={item.name}
                    age={item.age}
                    location={item.location}
                    time={item.time}
                    isHeart={item.isHeart}
                    isMe={item.isMe}
                  />
                </div>
              );
            })}
          </div>
        )}
      </div>
      <BottomNavBar />
    </div>
  );
}
