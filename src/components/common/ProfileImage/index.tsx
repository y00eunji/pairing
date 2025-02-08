import Image from 'next/image';

interface ProfileImageProps {
  src: string;
  alt?: string;
  size?: number;
}

export default function ProfileImage({
  src,
  alt = '프로필 이미지',
  size,
}: ProfileImageProps) {
  return (
    <div
      className="rounded-full overflow-hidden"
      style={{ width: size, height: size }}
    >
      <Image
        src={src}
        alt={alt}
        width={size}
        height={size}
        className="object-cover"
      />
    </div>
  );
}
