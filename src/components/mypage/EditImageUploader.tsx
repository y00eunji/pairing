'use client';

import type { ChangeEvent } from 'react';
import { useRef } from 'react';

import Image from 'next/image';

import DeleteImgIcon from '/src/assets/icons/delete_img.svg';
import ImagePlusIcon from '/src/assets/icons/image_plus.svg';

import { cn } from '@/utils/cn';

interface EditImageUploaderProps {
  onImageUpload: (image: File) => void;
  onImageDelete?: () => void;
  image?: File | string | null;
  wide?: boolean;
  isExistingImage?: boolean;
}

export default function EditImageUploader({
  onImageUpload,
  onImageDelete,
  image,
  wide,
  isExistingImage = false,
}: EditImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    onImageUpload(file);
  };

  const getImageSrc = () => {
    if (!image) return '';
    if (isExistingImage) return image as string;
    return image instanceof File ? URL.createObjectURL(image) : image;
  };

  return (
    <div className={cn('relative', wide ? 'w-full aspect-square' : '')}>
      <button
        type="button"
        onClick={handleClick}
        className={cn(
          wide
            ? 'w-full h-full bg-gray3 rounded-[14px] flex items-center justify-center overflow-hidden'
            : 'w-28 h-28 bg-gray3 rounded-[14px] flex items-center justify-center overflow-hidden',
        )}
      >
        {image ? (
          <div className="relative w-full h-full">
            <Image
              src={getImageSrc()}
              alt="업로드된 이미지"
              className="rounded-[14px] object-cover"
              fill
              sizes={wide ? '100vw' : '112px'}
            />
          </div>
        ) : (
          <div className={cn(wide && 'scale-[2]')}>
            <ImagePlusIcon />
          </div>
        )}
      </button>
      {image && (
        <button
          type="button"
          onClick={onImageDelete}
          className="absolute -top-2 -right-2 rounded-full flex items-center justify-center shadow-md"
        >
          <DeleteImgIcon />
        </button>
      )}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="hidden"
      />
    </div>
  );
}
