import Image from 'next/image';

export default function Splash() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Image
        src="/images/pairing_logo.png"
        alt="페어링 로고"
        width={340}
        height={340}
      />
    </div>
  );
}
