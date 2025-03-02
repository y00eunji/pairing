'use client';

import { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

import Button from '@/components/common/Button';
import ImageUploader from '@/components/common/ImageUploader';
import { getPresignedUrl } from '@/hooks/apis/common/useGetPresignedUrl';
import { uploadImageToNcloud } from '@/hooks/apis/common/useUploadImageToNcloud';
import { useGetMyPageProfile } from '@/hooks/apis/mypage/useGetMyPageProfile';

import BackIcon from '/src/assets/icons/back_icon.svg';

export default function EditImage() {
  const router = useRouter();
  const { data: profileData } = useGetMyPageProfile();
  const [files, setFiles] = useState<File[]>([]);
  const [existingImages, setExistingImages] = useState<string[]>([]);
  const isButtonEnabled = files.length + existingImages.length >= 3;

  useEffect(() => {
    if (profileData) {
      setExistingImages(profileData.images);
    }
  }, [profileData]);

  const handleToMyPage = () => {
    router.push('/mypage');
  };

  const handleImageUpload = (image: File) => {
    if (files.length + existingImages.length >= 5) {
      alert('이미지는 최대 5장까지 업로드할 수 있습니다.');
      return;
    }
    setFiles((prev) => [...prev, image]);
  };

  const handleImageDelete = (index: number) => {
    if (index < existingImages.length) {
      setExistingImages((prev) => prev.filter((_, i) => i !== index));
    } else {
      setFiles((prev) =>
        prev.filter((_, i) => i !== index - existingImages.length),
      );
    }
  };

  const handleSave = async () => {
    const totalImages = existingImages.length + files.length;
    if (totalImages < 3) {
      alert('사진을 3장 이상 추가해주세요.');
      return;
    }

    try {
      // 새로 업로드된 이미지들 처리
      await Promise.all(
        files.map(async (file) => {
          const imageUrl = URL.createObjectURL(file);
          const fileName = imageUrl.split('/')[imageUrl.split('/').length - 1];

          const res = await getPresignedUrl(fileName, file.type);
          await uploadImageToNcloud({
            presignedUrl: res.url,
            file,
          });
        }),
      );

      router.push('/mypage');
    } catch (error) {
      console.error('이미지 업로드 실패:', error);
      alert('이미지 업로드에 실패했습니다.');
    }
  };

  return (
    <div className="h-[100dvh] flex flex-col">
      <div className="relative w-full px-5 py-4 gap-6 h-[68px] flex justify-center items-center shadow-md">
        <div className="absolute left-[20px]">
          <BackIcon onClick={handleToMyPage} />
        </div>
        <div className="font-18-medium">프로필 수정</div>
      </div>

      <div className="flex-1 px-5 py-8">
        <div className="flex flex-wrap gap-2">
          {[...Array(5)].map((_, index) => {
            const existingImage =
              existingImages[existingImages.length - 1 - index];
            const newImage =
              files[
                files.length - 1 - Math.max(0, index - existingImages.length)
              ];

            return (
              <ImageUploader
                key={index}
                onImageUpload={handleImageUpload}
                onImageDelete={() =>
                  handleImageDelete(existingImages.length - 1 - index)
                }
                image={existingImage ? undefined : newImage}
                wide={false}
              />
            );
          })}
        </div>
      </div>

      <div className="px-5 py-8">
        <Button
          shape="rectangle"
          variant={isButtonEnabled ? 'filled' : 'disabled'}
          className="w-full h-[55px]"
          onClick={handleSave}
        >
          수정 완료
        </Button>
      </div>
    </div>
  );
}
