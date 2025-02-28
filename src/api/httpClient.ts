import axios, {
  type AxiosError,
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
  isAxiosError,
} from 'axios';

import { getToken, logout } from '@/utils/auth';

export class HttpClient {
  private client: AxiosInstance;
  private static instance: HttpClient;

  constructor(config?: AxiosRequestConfig) {
    this.client = axios.create(config);

    this.setupInterceptors();
  }

  // API 클라이언트 초기화
  public static getInstance(config?: AxiosRequestConfig): HttpClient {
    if (!HttpClient.instance) {
      HttpClient.instance = new HttpClient(config);
    }
    return HttpClient.instance;
  }

  get<T>(...args: Parameters<typeof this.client.get>) {
    return this.client.get<T, T>(...args);
  }

  post<T>(...args: Parameters<typeof this.client.post>) {
    return this.client.post<T, T>(...args);
  }

  put<T>(...args: Parameters<typeof this.client.put>) {
    return this.client.put<T, T>(...args);
  }

  patch<T>(...args: Parameters<typeof this.client.patch>) {
    return this.client.patch<T, T>(...args);
  }

  delete<T>(...args: Parameters<typeof this.client.delete>) {
    return this.client.delete<T, T>(...args);
  }

  private setupInterceptors() {
    this.client.interceptors.request.use(
      this.onRequestFulfilled,
      this.onRequestRejected,
    );

    this.client.interceptors.response.use(
      this.onResponseFulfilled,
      this.onResponseRejected,
    );
  }

  private onRequestFulfilled(config: InternalAxiosRequestConfig) {
    const token = getToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  }

  private onRequestRejected(error: AxiosError) {
    return Promise.reject(error);
  }

  private onResponseFulfilled(response: AxiosResponse) {
    return response.data;
  }

  private onResponseRejected(error: AxiosError) {
    if (!isAxiosError(error)) return Promise.reject(error);

    // 401 에러 처리 (토큰 만료)
    if (error.response?.status === 401) {
      // auth 유틸리티 함수를 사용하여 로그아웃 처리
      logout();
    }

    return Promise.reject(error.response?.data);
  }
}
