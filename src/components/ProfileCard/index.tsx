import Image from 'next/image';

interface ProfileCardProps {
  name: string;
  age: number;
  location: string;
}

export default function ProfileCard({ name, age, location }: ProfileCardProps) {
  return (
    <div className=" m-7 relative w-80 h-80 bg-gray1 rounded-xl">
      {/* 배경 그라데이션 */}
      <div className="absolute w-full h-full bg-gradient-to-t from-mainPink2 via-transparent to-transparent rounded-xl z-0"></div>

      {/* 닫기 버튼 */}
      <button className="absolute top-3 right-2 mr-2">
        <Image
          src="/images/profileCard_delete.png"
          alt="프로필카드 닫기"
          width={16}
          height={16}
        />
      </button>

      {/* 사용자 정보 */}
      <div className="absolute items-start flex-col pl-5 bottom-6">
        <div className="pb-2">
          <Image
            src="/images/face-auth.png"
            alt="얼굴 인증마크"
            width={16}
            height={16}
          />
        </div>
        <div className="text-22px font-semiBold text-white space-x-3 pb-2">
          <span>{name}</span>
          <span>{age}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Image
            src="/images/ping.png"
            alt="주소 이모티콘"
            width={16}
            height={16}
          />
          <span className="text-14px font-medium text-white">{location}</span>
        </div>
      </div>

      {/* 버튼 */}
      <div className="absolute flex items-start right-3 bottom-3">
        <button>
          <Image
            src="/images/button_direct.png"
            alt="채팅 버튼"
            width={75}
            height={75}
          />
        </button>
        <button>
          <Image
            src="/images/button_heart.png"
            alt="하트 버튼"
            width={75}
            height={75}
          />
        </button>
      </div>
    </div>
  );
}
