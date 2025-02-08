import Image from 'next/image';
import BackIcon from '/public/assets/icons/header_back.svg';
import MoreGrayIcon from '/public/assets/icons/more_gray.svg';

interface ChatRoomHeaderProps {
  profileImage: string;
  name: string;
}

export default function ChatRoomHeader({
  profileImage,
  name,
}: ChatRoomHeaderProps) {
  return (
    <div className="flex items-center m-5">
      <button className="mr-5">
        <BackIcon />
      </button>

      <div className="flex items-center space-x-3">
        <Image
          src={profileImage}
          alt="프로필 사진"
          width={48}
          height={48}
          className="rounded-full"
        />
        <span className="text-20px font-semiBold">{name}</span>
      </div>

      <button className="ml-auto">
        <MoreGrayIcon />
      </button>
    </div>
  );
}
