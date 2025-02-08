import FaceAuthIcon from '/public/assets/icons/face_auth.svg';
import MoreBlackIcon from '/public/assets/icons/more_black.svg';

interface ProfileCardHeaderProps {
  name: string;
  age: number;
}

export default function ProfileCardHeader({
  name,
  age,
}: ProfileCardHeaderProps) {
  return (
    <div className="m-7">
      <div className="flex items-center">
        <div className="flex items-center space-x-3">
          <span className="text-20px font-semiBold">{name}</span>
          <span className="text-20px font-semiBold">{age}</span>
          <FaceAuthIcon />
        </div>

        <button className="ml-auto">
          <MoreBlackIcon />
        </button>
      </div>
    </div>
  );
}
