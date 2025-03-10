import axios from 'axios';

interface UploadImageRequest {
  presignedUrl: string;
  file: File | null;
}

export const uploadImageToNcloud = async ({
  presignedUrl,
  file,
}: UploadImageRequest): Promise<void> => {
  if (!file) throw new Error('File is required');

  return axios.put(presignedUrl, file, {
    headers: {
      'Content-Type': file.type,
      'x-amz-acl': 'public-read',
    },
  });
};
