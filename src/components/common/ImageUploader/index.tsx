'use client';

import Image from 'next/image';

import type { ChangeEvent } from 'react';
import { useRef } from 'react';

import DeleteImgIcon from '/public/assets/icons/delete_img.svg';
import ImagePlusIcon from '/public/assets/icons/image_plus.svg';

interface ImageUploaderProps {
  onImageUpload: (imageUrl: string) => void;
  onImageDelete?: () => void;
  imageUrl?: string;
}

export default function ImageUploader({
  onImageUpload,
  onImageDelete,
  imageUrl,
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
    <div className="relative">
      <button
        type="button"
        onClick={handleClick}
        className="w-28 h-28 bg-gray3 rounded-[14px] flex items-center justify-center overflow-hidden"
      >
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt="업로드된 이미지"
            className="w-full h-full object-cover rounded-[14px]"
            fill
          />
        ) : (
          <ImagePlusIcon />
        )}
      </button>
      {imageUrl && (
        <button
          type="button"
          onClick={onImageDelete}
          className="absolute -top-2 -right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-md"
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
