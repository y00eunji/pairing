import { HttpClient } from './httpClient';

import type { AxiosError } from 'axios';

const API_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const api = new HttpClient({
  baseURL: API_URL,
});

export interface CustomError extends AxiosError {
  code: string;
  data?: string;
  message: string;
}
