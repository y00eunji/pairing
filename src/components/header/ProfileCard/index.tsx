import Image from 'next/image';

interface ProfileCardHeader {
  name: string;
  age: number;
}

export default function ProfileCard({ name, age }: ProfileCardHeader) {
  return (
    <div>
      <div className="flex items-center space-x-2">
        <span className="text-20px font-semiBold">{name}</span>
        <span className="text-20px font-semiBold">{age}</span>
        <Image
          src="/images/face-auth.png"
          alt="얼굴 인증 마크"
          width={16}
          height={16}
        />
        <button className="pl-10">
          <Image
            src="/images/more_black.png"
            alt="더보기 아이콘"
            width={16}
            height={16}
          />
        </button>
      </div>
    </div>
  );
}
