'use client';

import Input from '@/components/common/Input';

import { useState } from 'react';

import MenuButtonIcon from '/src/assets/icons/chat_menu_button.svg';
import CameraIcon from '/src/assets/icons/chat_menu_camera.svg';
import EmojiIcon from '/src/assets/icons/chat_menu_emoji.svg';
import PictureIcon from '/src/assets/icons/chat_menu_picture.svg';
import SendingButtonIcon from '/src/assets/icons/chat_send_button.svg';
import DeleteButtonIcon from '/src/assets/icons/delete_gray.svg';

interface Props {
  onSendMessage: () => void;
  isMenuOpen: boolean;
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ChatInput({
  onSendMessage,
  isMenuOpen,
  setIsMenuOpen,
}: Props) {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage();
      setMessage('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="w-full flex flex-col items-center">
      {/* 입력창 및 메뉴 버튼 */}
      <div className="w-full flex items-center justify-center gap-3 p-2 bg-#f9f9f9">
        <button
          aria-label="메뉴"
          onClick={() => setIsMenuOpen((prev) => !prev)}
        >
          {isMenuOpen ? <DeleteButtonIcon /> : <MenuButtonIcon />}
        </button>

        <Input
          wrapperClassName="h-[40px]"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
        />

        <button
          onClick={handleSend}
          type="button"
          aria-label="메시지 보내기"
          disabled={!message.trim()}
        >
          <SendingButtonIcon />
        </button>
      </div>

      {/* 메뉴 영역 */}
      {isMenuOpen && (
        <div className="w-full py-5 flex justify-around bg-gray3 p-3">
          {/* 사진 */}
          <div className="flex flex-col items-center">
            <label aria-label="사진" className="cursor-pointer">
              <input type="file" accept="image/*" style={{ display: 'none' }} />
              <div className="flex items-center justify-center bg-white p-2 rounded-xl shadow-md w-24 h-24">
                <PictureIcon />
              </div>
            </label>
            <span className="font-14-medium pt-4">사진</span>
          </div>

          {/* 카메라 */}
          <div className="flex flex-col items-center">
            <label aria-label="카메라" className="cursor-pointer">
              <input
                type="file"
                accept="image/*"
                capture="environment"
                style={{ display: 'none' }}
              />
              <div className="flex items-center justify-center bg-white p-2 rounded-xl shadow-md w-24 h-24">
                <CameraIcon />
              </div>
            </label>
            <span className="font-14-medium pt-4">카메라</span>
          </div>

          {/* 이모티콘 */}
          <div className="flex flex-col items-center">
            <div className="flex items-center justify-center bg-white p-2 rounded-xl shadow-md w-24 h-24">
              <button aria-label="이모티콘">
                <EmojiIcon />
              </button>
            </div>
            <span className="font-14-medium pt-4">이모티콘</span>
          </div>
        </div>
      )}
    </div>
  );
}
