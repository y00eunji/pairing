import Image from 'next/image';

import Webcam from 'react-webcam';

import Button from '@/components/common/Button';

import ImagePlusIcon from '/src/assets/icons/image_plus.svg';

import type { UseCameraReturn } from '@/hooks/useCamera';

interface CameraViewProps extends UseCameraReturn {
  isMobile: boolean;
}

export function CameraView({
  isMobile,
  image,
  handleCapture,
  handleCameraClick,
  handleRetake,
  webcamRef,
  fileInputRef,
  handleFileChange,
}: CameraViewProps) {
  if (image) {
    return (
      <div className="w-full flex flex-col items-center">
        <div
          className={`w-full relative rounded-lg ${isMobile ? 'h-[250px]' : 'h-[350px]'}`}
        >
          <Image
            src={image}
            alt="촬영된 사진"
            fill
            className="object-cover rounded-[14px]"
            sizes="(max-width: 768px) 100vw, 400px"
          />
        </div>
        <Button
          shape="rectangle"
          variant="outline"
          className="w-full h-[45px] mt-4"
          onClick={handleRetake}
        >
          다시 촬영하기
        </Button>
      </div>
    );
  }

  if (isMobile) {
    return (
      <div className="w-full flex flex-col items-center">
        <button
          type="button"
          onClick={handleCameraClick}
          className="w-full h-[250px] bg-gray3 rounded-[14px] flex items-center justify-center"
        >
          <div className="scale-[2]">
            <ImagePlusIcon />
          </div>
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/jpg"
          capture
          inputMode="none"
          onFocus={(e) => e.target.blur()}
          className="hidden"
          onChange={handleFileChange}
        />

        <div className="font-14-regular mt-4 w-full text-center">
          얼굴이 정확하게 나온 정면 사진을 <br /> 촬영해주세요.
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full h-[350px] relative rounded-lg overflow-hidden">
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          className="absolute top-0 left-0 w-full h-full object-cover"
          videoConstraints={{
            width: 720,
            height: 960,
            facingMode: 'user',
            aspectRatio: 0.75,
          }}
          playsInline={true}
        />
      </div>
      <Button
        shape="rectangle"
        variant="filled"
        className="w-full h-[45px] mt-4"
        onClick={handleCapture}
      >
        촬영하기
      </Button>

      <div className="font-14-regular mt-4 w-full text-center">
        얼굴이 정확하게 나온 정면 사진을 <br /> 촬영해주세요.
      </div>
    </div>
  );
}
