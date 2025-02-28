'use client';

import Image from 'next/image';

import LoginButtons from './OAuthButtons';

export default function Login() {
  return (
    <div className="relative flex flex-col items-center justify-center h-screen overflow-hidden">
      <Image
        className="mb-56"
        src="/images/login_pairing_logo.png"
        alt="login"
        width={343}
        height={339}
      />
      <div className="absolute bottom-20 w-full">
        <LoginButtons />
      </div>
    </div>
  );
}
