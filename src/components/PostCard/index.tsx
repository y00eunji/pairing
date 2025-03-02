import Image from 'next/image';

import formatTime from '@/utils/date';

import Button from '../common/Button';
import UserProfile from '../profiles/UserProfile';

interface PostCardProps {
  name: string;
  age: number;
  city: string;
  profileImg: string;
  content: string;
  imageUrl?: string;
  time: Date;
  buttonText: string;
  onButtonClick: () => void;
  buttonComponent?: React.ReactNode;
}

export default function PostCard({
  name,
  age,
  city,
  profileImg,
  content,
  imageUrl,
  time,
  buttonText,
  onButtonClick,
  buttonComponent,
}: PostCardProps) {
  return (
    <div
      className="bg-white rounded-lg p-1 m-5 items-center
    shadow-[0px_6px_6px_rgba(0,0,0,0.02),_0px_-6px_6px_rgba(0,0,0,0.02),_6px_0px_6px_rgba(0,0,0,0.02),_-6px_0px_6px_rgba(0,0,0,0.02)]"
    >
      {/* 헤더 */}
      <UserProfile
        name={name}
        age={age}
        city={city}
        imageSize={80}
        imageSrc={profileImg}
        buttonComponent={buttonComponent}
      />

      <div className="m-4 border-t py-2">
        {/* 게시글 내용 */}
        <div className="flex flex-col">
          <p className="font-16-regular py-1">{content}</p>
          {/* 이미지 내용 */}
          {imageUrl && (
            <Image
              src={imageUrl}
              alt="게시글 image"
              width={100}
              height={100}
              className="mt-2 w-full object-cover"
              unoptimized={true}
            />
          )}
        </div>

        {/* 하단 */}
        <div className="flex justify-between pt-6">
          <p className="flex font-14-regular font-roboto text-gray1 items-center justify-center">
            {formatTime(time)}
          </p>
          {/* 분홍색 버튼 (원형) */}
          <Button
            shape="circle"
            variant="filled"
            className="px-[16px] py-[6px]"
            onClick={onButtonClick}
          >
            {buttonText}
          </Button>
        </div>
      </div>
    </div>
  );
}
