import { api } from '@/api';

interface PresignedUrlResponse {
  url: string;
}

export const getPresignedUrl = async (fileName: string) => {
  return api.get<PresignedUrlResponse>(
    `/member/presigned-url?fileName=${fileName}`,
  );
};
