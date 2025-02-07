import Image from 'next/image';

interface ChatRoomHeader {
  profileImage: string;
  name: string;
}

export default function ChatRoom({ profileImage, name }: ChatRoomHeader) {
  return (
    <div className="flex items-center">
      <button className="mr-2">
        <span className="text-20px text-gray1">{'<'}</span>
      </button>

      <div className="flex items-center space-x-2">
        <Image
          src={profileImage}
          alt="프로필 사진"
          width={48}
          height={48}
          className="rounded-full"
        />
        <span className="text-20px font-semiBold">{name}</span>
      </div>

      <button className="pl-10">
        <Image
          src="/images/more_grey.png"
          alt="더보기 아이콘"
          width={16}
          height={16}
        />
      </button>
    </div>
  );
}
