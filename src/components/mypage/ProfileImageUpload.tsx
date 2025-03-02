'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import DefaultImage from '/src/assets/icons/default_image.svg';
import MyprofileUploadIcon from '/src/assets/icons/myprofile_upload.svg';

import { useGetMyPageProfile } from '@/hooks/apis/mypage/useGetMyPageProfile';

export default function ProfileImageUpload() {
  const router = useRouter();
  const { data: myPageProfileData } = useGetMyPageProfile();

  const handleImageUpload = () => {
    router.push('/mypage/edit/image');
  };

  return (
    <div className="w-full flex justify-center items-center mt-10">
      <div className="relative w-44 h-44">
        <div className="relative w-44 h-44 rounded-full overflow-hidden bg-gray3 flex items-center justify-center">
          {myPageProfileData?.images[0] ? (
            <Image
              src={myPageProfileData.images[0]}
              alt="프로필 이미지"
              className="object-cover rounded-full"
              fill
            />
          ) : (
            <DefaultImage />
          )}
        </div>

        <button
          onClick={handleImageUpload}
          className="absolute bottom-3 right-3"
        >
          <MyprofileUploadIcon />
        </button>
      </div>
    </div>
  );
}
