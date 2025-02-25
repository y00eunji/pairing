import ProfileImage from '@/components/common/ProfileImage';

interface UserProfileProps {
  name: string;
  age: number;
  city: string;
  imageSize?: number;
  imageSrc?: string;
  buttonComponent?: React.ReactNode;
}

export default function UserProfile({
  name,
  age,
  city,
  imageSize = 50,
  imageSrc = '',
  buttonComponent,
}: UserProfileProps) {
  return (
    <div className="relative flex items-center m-2">
      {/* 프로필 이미지 */}
      <div className="mr-3 rounded-full">
        <ProfileImage src={imageSrc} size={imageSize} />
      </div>

      {/* 이름, 나이, 위치 정보 */}
      <div className="flex-1">
        <p className="font-18-medium pb-1">{name}</p>
        <p>
          <span>{age}, </span>
          <span>{city}</span>
        </p>
      </div>

      {/* 우측 버튼 (아이콘 또는 버튼) */}
      {buttonComponent && <div>{buttonComponent}</div>}
    </div>
  );
}
