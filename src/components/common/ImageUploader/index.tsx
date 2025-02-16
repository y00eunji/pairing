'use client';

import type { ChangeEvent } from 'react';
import { useRef } from 'react';

import Image from 'next/image';

import DeleteImgIcon from '/public/assets/icons/delete_img.svg';
import ImagePlusIcon from '/public/assets/icons/image_plus.svg';

import { cn } from '@/utils/cn';

interface ImageUploaderProps {
  onImageUpload: (imageUrl: string) => void;
  onImageDelete?: () => void;
  imageUrl?: string;
  wide?: boolean;
}

export default function ImageUploader({
  onImageUpload,
  onImageDelete,
  imageUrl,
  wide,
}: ImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        onImageUpload(reader.result);
      }
    };
    reader.readAsDataURL(file);
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
        {imageUrl ? (
          <div className="relative w-full h-full">
            <Image
              src={imageUrl}
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
      {imageUrl && (
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
