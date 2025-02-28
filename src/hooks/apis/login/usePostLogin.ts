import { useRouter } from 'next/navigation';

import { useMutation } from '@tanstack/react-query';

import { api } from '@/api';
import { setToken } from '@/utils/auth';

interface LoginResponse {
  accessToken: string;
  enrolled: boolean;
}

interface LoginRequest {
  code: string;
  type: 'KAKAO' | 'NAVER';
}

// OAuth 로그인 요청 함수
const postOAuthLogin = async (data: LoginRequest): Promise<LoginResponse> => {
  return api.post<LoginResponse>('/member/oauth/login', data);
};

export const usePostOAuthLogin = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: postOAuthLogin,
    onSuccess: (data) => {
      setToken(data.accessToken);

      // 로그인 성공 후 메인 페이지 또는 온보딩 페이지로 이동
      if (data.enrolled) {
        router.push('/');
      } else {
        router.push('/privacy-consent');
      }
    },
    onError: (error) => {
      console.error('로그인 실패:', error);
      // 에러 처리 로직
      router.push('/login');
    },
  });
};
