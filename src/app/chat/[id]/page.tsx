'use client';

import { useState } from 'react';

import AiButton from '@/components/buttons/AiButton/index';
import ChatBubble from '@/components/chat/ChatBubble';
import ChatInput from '@/components/chat/ChatInput';
import ChatRoomHeader from '@/components/header/ChatRoomHeader';

const formatDate = (date: Date) =>
  date.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
  });

export default function ChatRoom() {
  // 메뉴 열림 상태를 상위에서 관리
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSendMessage = () => {
    console.log('보낸 메시지');
  };

  const chatList = [
    {
      time: new Date('2025-01-31T09:01:00'),
      isMe: true,
      isRead: true,
      message: '안녕! 어떻게 지내?',
    },
    {
      time: new Date('2025-01-31T09:05:00'),
      isMe: true,
      isRead: true,
      message: '잘 지내고 있어! 너는?',
    },
    {
      time: new Date('2025-02-01T08:30:00'),
      isMe: false,
      isRead: true,
      message: '안녕! 어떻게 지내?',
    },
    {
      time: new Date('2025-02-01T08:45:00'),
      isMe: false,
      isRead: false,
      message: '잘 지내고 있어! 너는?',
    },
    {
      time: new Date('2025-02-02T10:15:00'),
      isMe: false,
      isRead: true,
      message: '잘 지내고 있어! 너는?',
    },
    {
      time: new Date('2025-02-02T11:00:00'),
      isMe: true,
      isRead: true,
      message: '잘 지내고 있어! 너는?',
    },
  ];

  return (
    <div className="relative h-screen flex flex-col w-full mx-auto">
      <ChatRoomHeader profileImage="/images/profile.png" name="김이름" />

      <div className="flex-1 overflow-y-auto p-5">
        {chatList.map((item, index) => {
          const isNewDay =
            index === 0 ||
            formatDate(chatList[index - 1].time) !== formatDate(item.time);
          return (
            <div key={index}>
              {isNewDay && (
                <div className="text-center text-gray1 font-14-medium my-4">
                  {formatDate(item.time)}
                </div>
              )}
              <ChatBubble
                time={item.time}
                isMe={item.isMe}
                isRead={item.isRead}
              >
                {item.message}
              </ChatBubble>
            </div>
          );
        })}
        <div
          className={`absolute bottom-20 left-1/2 -translate-x-1/2 transition-all ${
            isMenuOpen ? 'z-0' : 'z-10'
          }`}
        >
          <AiButton />
        </div>
      </div>

      <div className="w-full relative z-20">
        <div className="w-full max-w-[520px] mx-auto">
          <ChatInput
            onSendMessage={handleSendMessage}
            isMenuOpen={isMenuOpen}
            setIsMenuOpen={setIsMenuOpen}
          />
        </div>
      </div>
    </div>
  );
}
