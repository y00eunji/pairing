'use client';

import type { RefObject } from 'react';
import { useRef, useState } from 'react';

import type Webcam from 'react-webcam';

export interface UseCameraReturn {
  image: string;
  isPhotoTaken: boolean;
  webcamRef: RefObject<Webcam | null>;
  fileInputRef: RefObject<HTMLInputElement | null>;
  handleCapture: () => void;
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleRetake: () => void;
  handleCameraClick: () => void;
}

export function useCamera(): UseCameraReturn {
  const [image, setImage] = useState<string>('');
  const [isPhotoTaken, setIsPhotoTaken] = useState(false);
  const webcamRef = useRef<Webcam | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleCapture = () => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      setImage(imageSrc);
      setIsPhotoTaken(true);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageUrl = reader.result as string;
        setImage(imageUrl);
        setIsPhotoTaken(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRetake = () => {
    setImage('');
    setIsPhotoTaken(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleCameraClick = () => {
    fileInputRef.current?.click();
  };

  return {
    image,
    isPhotoTaken,
    webcamRef,
    fileInputRef,
    handleCapture,
    handleFileChange,
    handleRetake,
    handleCameraClick,
  };
}
