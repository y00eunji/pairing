import { useRouter } from 'next/navigation';

import FaceAuthIcon from '/src/assets/icons/face_auth.svg';
import BackIcon from '/src/assets/icons/header_back.svg';

interface ProfileCardHeaderProps {
  name: string;
  age: number;
}

export default function ProfileCardHeader({
  name,
  age,
}: ProfileCardHeaderProps) {
  const router = useRouter();

  return (
    <div className="m-1">
      <div className="flex items-center">
        <button
          className="mr-5"
          aria-label="이전 페이지"
          onClick={() => router.back()}
        >
          <BackIcon />
        </button>
        <div className="flex items-center space-x-3">
          <span className="text-20px font-semiBold">{name}</span>
          <span className="text-20px font-semiBold">{age}</span>
          <FaceAuthIcon />
        </div>
      </div>
    </div>
  );
}
