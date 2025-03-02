'use client';

import { useEffect } from 'react';

import { useRouter } from 'next/navigation';

import BottomNavBar from '@/components/BottomNavBar';
import ChatListItem from '@/components/chat/ChatListItem';
import PageHeader from '@/components/header/PageHeader';
import SearchInput from '@/components/SearchInput';
import { useGetChatrooms } from '@/hooks/apis/chat/useGetChatrooms';

export default function Chat() {
  const router = useRouter();
  const { data: chatrooms } = useGetChatrooms();
  useEffect(() => {
    console.log(chatrooms);
  }, [chatrooms]);

  const chatListItems = [
    {
      id: 1,
      name: '김이름',
      createdAt: new Date(),
      message: '채팅방 리스트',
      profileImage:
        'https://upload.wikimedia.org/wikipedia/ko/4/4a/%EC%8B%A0%EC%A7%B1%EA%B5%AC.png',
      messageCnt: 2,
    },
    {
      id: 2,
      name: '김이름',
      createdAt: new Date(),
      message: '채팅방 리스트',
      profileImage:
        'https://upload.wikimedia.org/wikipedia/ko/4/4a/%EC%8B%A0%EC%A7%B1%EA%B5%AC.png',
      messageCnt: 2,
    },
    {
      id: 3,
      name: '김이름',
      createdAt: new Date(),
      message: '채팅방 리스트',
      profileImage:
        'https://upload.wikimedia.org/wikipedia/ko/4/4a/%EC%8B%A0%EC%A7%B1%EA%B5%AC.png',
      messageCnt: 2,
    },
  ];

  // 메시지 개수 총합 계산
  const totalMessageCount = chatListItems.reduce(
    (sum, item) => sum + item.messageCnt,
    0,
  );

  return (
    <div className="flex flex-col pb-[70px] h-screen">
      <PageHeader title="채팅" />

      <div className="p-5">
        <SearchInput />
      </div>
      <div className="flex-grow overflow-y-auto">
        {chatListItems.map((item) => (
          <div
            key={item.id}
            onClick={() => router.push(`/chat/${item.id}`)}
            className="cursor-pointer"
          >
            <ChatListItem
              name={item.name}
              time={item.createdAt}
              message={item.message}
              profileImage={item.profileImage ?? '/images/pairing_logo.png'}
              messageCnt={item.messageCnt}
            />
          </div>
        ))}
      </div>
      <BottomNavBar chatNotificationCount={totalMessageCount} />
    </div>
  );
}
