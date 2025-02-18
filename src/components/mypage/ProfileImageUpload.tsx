'use client';

import { useState } from 'react';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import DefaultImage from '/public/assets/icons/default_image.svg';
import MyprofileUploadIcon from '/public/assets/icons/myprofile_upload.svg';

export default function ProfileImageUpload() {
  const [imageUrl] = useState(''); // TODO: 서버에서 이미지 받을 예정
  const router = useRouter();

  const handleImageUpload = () => {
    router.push('/mypage/edit/image');
  };

  return (
    <div className="w-full flex justify-center items-center mt-10">
      <div className="relative w-44 h-44">
        <div className="relative w-44 h-44 rounded-full overflow-hidden bg-gray3 flex items-center justify-center">
          {imageUrl ? (
            <Image
              src={imageUrl}
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
