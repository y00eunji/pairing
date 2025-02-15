import Input from '@/components/common/Input';
import { useState } from 'react';
import MenuButtonIcon from '/public/assets/icons/chat_menu_button.svg';
import CameraIcon from '/public/assets/icons/chat_menu_camera.svg';
import EmojiIcon from '/public/assets/icons/chat_menu_emoji.svg';
import PictureIcon from '/public/assets/icons/chat_menu_picture.svg';
import SendingButtonIcon from '/public/assets/icons/chat_send_button.svg';

interface Props {
  onSendMessage: () => void;
}

export default function ChatInput({ onSendMessage }: Props) {
  const [message, setMessage] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
      {/* TODO: 메뉴 버튼 클릭 시 하단에 나오는 메뉴들 추가 개발 필요 */}
      <div className="w-full flex items-center justify-center gap-3 p-2 bg-#f9f9f9">
        {/* 메뉴 버튼 */}
        <button
          aria-label="메뉴"
          onClick={() => setIsMenuOpen((prev) => !prev)}
        >
          <MenuButtonIcon />
        </button>

        {/* 입력창 */}
        <Input
          wrapperClassName="h-[40px]"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
        />

        {/* 전송 버튼 */}
        <button
          onClick={handleSend}
          type="button"
          aria-label="메시지 보내기"
          disabled={!message.trim()}
        >
          <SendingButtonIcon />
        </button>
      </div>

      {/* 메뉴 */}
      {isMenuOpen && (
        <div className="w-full py-5 flex justify-around bg-gray3 p-3">
          {/* 사진 */}
          <div className="flex flex-col items-center">
            <div className="flex items-center justify-center bg-white p-2 rounded-xl shadow-md w-24 h-24">
              <button aria-label="사진">
                <PictureIcon />
              </button>
            </div>
            <span className="font-14-medium pt-4">사진</span>
          </div>

          {/* 카메라 */}
          <div className="flex flex-col items-center">
            <div className="flex items-center justify-center bg-white p-2 rounded-xl shadow-md w-24 h-24">
              <button aria-label="카메라">
                <CameraIcon />
              </button>
            </div>
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
