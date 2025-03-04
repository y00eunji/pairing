'use client';

import { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

import Button from '@/components/common/Button';
import { getPresignedUrl } from '@/hooks/apis/common/useGetPresignedUrl';
import { uploadImageToNcloud } from '@/hooks/apis/common/useUploadImageToNcloud';
import { useGetMyPageProfile } from '@/hooks/apis/mypage/useGetMyPageProfile';
import { usePutMyPageProfile } from '@/hooks/apis/mypage/usePutMyPageProfile';

import EditImageUploader from './EditImageUploader';

import BackIcon from '/src/assets/icons/back_icon.svg';

export default function EditImage() {
  const router = useRouter();
  const { data: profileData, refetch } = useGetMyPageProfile();
  const { mutate: putMyPageProfile } = usePutMyPageProfile();
  const [files, setFiles] = useState<File[]>([]);
  const [existingImages, setExistingImages] = useState<string[]>([]);
  const isButtonEnabled = files.length + existingImages.length >= 3;

  useEffect(() => {
    refetch();
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
      const encodedFileNames: string[] = [];

      await Promise.all(
        files.map(async (file) => {
          const fileName = encodeURIComponent(file.name);
          const contentType = encodeURIComponent(file.type);

          const res = await getPresignedUrl(fileName, contentType);
          await uploadImageToNcloud({
            presignedUrl: res.url,
            file,
          });

          encodedFileNames.push(fileName);
        }),
      );

      if (profileData) {
        putMyPageProfile({
          ...profileData,
          images: [...existingImages, ...encodedFileNames],
        });
      }

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
            const existingImage = existingImages[index];
            const newImage = files[Math.max(0, index - existingImages.length)];

            return (
              <EditImageUploader
                key={index}
                onImageUpload={handleImageUpload}
                onImageDelete={() => handleImageDelete(index)}
                image={existingImage || newImage}
                isExistingImage={!!existingImage}
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
