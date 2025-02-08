import ProfileImage from '../common/ProfileImage';

interface NotificationCardProps {
  profileImg: string;
  name: string;
  age: number;
  location: string;
  time?: string;
  isRead: boolean;
}
export default function NotificationCard({
  profileImg,
  name,
  age,
  location,
  time,
  isRead,
}: NotificationCardProps) {
  return (
    <div className="relative flex items-center bg-white w-[340px] h-[110px] rounded-xl m-4 shadow-md">
      {/* 읽음 여부 아이콘 표시 */}
      {!isRead && (
        <div className="absolute top-2 right-2 w-3 h-3 bg-mainPink1 rounded-full"></div>
      )}

      {/* 프로필 이미지 */}
      <div className="mr-2">
        <ProfileImage src={profileImg} size={90} />
      </div>

      {/* 알림 내용 */}
      <div className="flex-1">
        <p className="text-sm font-semiBold pb-1">
          <span className="font-bold text-mainPink1">{name}</span>님이 하트를
          보냈어요.
        </p>
        <p className="pb-3">
          <span>{age},</span>
          <span> {location}</span>
        </p>
        <p className="text-12px text-gray1 mt-1">{time}</p>
      </div>

      {/* 버튼 */}
      <button className="absolute bottom-3 right-4 text-14px font-bold text-gray1 bg-gray2 rounded-3xl px-3 py-1">
        프로필 보기
      </button>
    </div>
  );
}
