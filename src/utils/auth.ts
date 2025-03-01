import Cookies from 'js-cookie';

// 쿠키 설정 옵션
export const COOKIE_OPTIONS = {
  expires: 7, // 7일 후 만료
  //   secure: process.env.NODE_ENV === 'production', // HTTPS에서만 쿠키 전송
  sameSite: 'lax' as const, // strict에서 lax로 변경
  path: '/', // 모든 경로에서 접근 가능하도록
  secure: false,
};

// 토큰 저장
export const setToken = (token: string): void => {
  Cookies.set('accessToken', token, COOKIE_OPTIONS);
};

// 토큰 가져오기
export const getToken = (): string | undefined => {
  return Cookies.get('accessToken');
};

// 토큰 제거
export const removeToken = (): void => {
  Cookies.remove('accessToken');
};

// 로그인 여부 확인
export const isLoggedIn = (): boolean => {
  return !!getToken();
};

// 로그아웃
export const logout = (): void => {
  removeToken();
  window.location.href = '/login';
};
