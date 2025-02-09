import Input from '@/components/common/Input';
import { useState } from 'react';
import MenuButtonIcon from '/public/assets/icons/chat_menu_button.svg';
import SendingButtonIcon from '/public/assets/icons/chat_send_button.svg';

interface Props {
  onSendMessage: () => void;
}

export default function ChatInput({ onSendMessage }: Props) {
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
    <div className="w-full flex items-center justify-center gap-[10px]">
      {/* TODO: 메뉴 버튼 클릭 시 하단에 나오는 메뉴들 추가 개발 필요 */}
      <button>
        <MenuButtonIcon />
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
  );
}
