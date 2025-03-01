import { api } from '@/api';

interface UploadImageRequest {
  presignedUrl: string;
  file: File | null;
}

export const uploadImageToNcloud = async ({
  presignedUrl,
  file,
}: UploadImageRequest): Promise<void> => {
  if (!file) throw new Error('File is required');

  return api.put(presignedUrl, file, {
    headers: {
      'Content-Type': file.type,
    },
  });
};
