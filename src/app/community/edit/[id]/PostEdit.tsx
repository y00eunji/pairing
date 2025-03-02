'use client';

import { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

import axios from 'axios';

import { api } from '@/api';
import BottomNavBar from '@/components/BottomNavBar';
import Button from '@/components/common/Button';
import ImageUploader from '@/components/common/ImageUploader';
import ActionModal from '@/components/modal/ActionModal';
import { useGetMyPostList } from '@/hooks/apis/community/useGetMyPostList';
import { useUpdatePost } from '@/hooks/apis/community/usePutPost';
import { useModal } from '@/hooks/useModal';

import ExclamationIcon from '/src/assets/icons/alert_exclamationMark.svg';
import BackIcon from '/src/assets/icons/header_back.svg';

interface GetPresignedUrlResponse {
  url: string;
}

export const uploadImageToNcloud = async ({
  presignedUrl,
  file,
}: {
  presignedUrl: string;
  file: File | null;
}): Promise<void> => {
  if (!file) throw new Error('File is required');
  return axios.put(presignedUrl, file, {
    headers: {
      'Content-Type': file.type,
      'x-amz-acl': 'public-read',
    },
  });
};

interface PostEditProps {
  postId: number;
}

export default function PostEdit({ postId }: PostEditProps) {
  const router = useRouter();
  const outModal = useModal(false);

  // GET 요청
  const { data: myPosts, isLoading, isError } = useGetMyPostList();

  // 내 게시물 목록에서 해당 postId의 게시글을 찾아 초기값 설정
  const [content, setContent] = useState('');
  const [initialImageUrl, setInitialImageUrl] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const maxLength = 80;

  // PUT 요청
  const { mutate: updatePost } = useUpdatePost();

  useEffect(() => {
    if (myPosts) {
      const post = myPosts.find((p) => p.id === postId);
      if (post) {
        setContent(post.content);
        setInitialImageUrl(post.imageUrl);
      }
    }
  }, [myPosts, postId]);

  const handleImageUpload = (selectedFile: File) => {
    setFile(selectedFile);
  };

  const handleImageDelete = () => {
    setFile(null);
  };

  const handleSubmit = async () => {
    try {
      let imageUrl = initialImageUrl;

      if (file) {
        const response = await api.get<GetPresignedUrlResponse>(
          `/community/presigned-url?fileName=${encodeURIComponent(file.name)}&contentType=${encodeURIComponent(file.type)}`,
        );
        const { url } = response;
        await uploadImageToNcloud({ presignedUrl: url, file });
        imageUrl = url;

        imageUrl = url.split('?')[0];
      }

      const updateData = {
        content,
        imageUrl,
      };

      updatePost(
        { postId, data: updateData },
        {
          onSuccess: () => {
            window.location.href = '/community';
          },
        },
      );
    } catch (error) {
      console.error('게시글 수정 실패:', error);
    }
  };

  if (isLoading) return <p>게시물을 불러오는 중...</p>;
  if (isError) return <p>게시물을 불러오지 못했습니다.</p>;

  return (
    <div className="flex flex-col min-h-screen">
      {/* 헤더 */}
      <div className="relative flex flex-row items-center p-5 shadow-md">
        <button onClick={() => router.push('/community')} aria-label="뒤로가기">
          <BackIcon />
        </button>
        <h1 className="text-22px font-bold flex-1 text-center">글수정</h1>
      </div>

      {/* 페이지 이탈 모달 */}
      <ActionModal
        isOpen={outModal.isOpen}
        icon={<ExclamationIcon fill="#FF4F75" />}
        message="현재 페이지를 나가시겠습니까?"
        description="작성하신 내용이 저장되지 않습니다."
        buttons={[
          { label: '취소', onClick: outModal.closeModal },
          {
            label: '확인',
            onClick: () => router.push('/community'),
            className: 'text-mainPink1',
          },
        ]}
      />

      {/* 글 수정 영역 */}
      <div className="flex flex-col p-5 space-y-4">
        <div className="relative">
          <p className="text-18px font-medium pb-2">내용</p>
          <textarea
            placeholder="글을 수정해주세요."
            value={content}
            onChange={(e) => {
              if (e.target.value.length <= maxLength) {
                setContent(e.target.value);
              }
            }}
            className="w-full h-36 p-3 border border-gray2 rounded-xl text-14px font-medium resize-none focus:outline-none focus:border-mainPink1 pr-10"
          />
          <p className="absolute bottom-3 right-3 text-gray1 text-12px">
            {content.length}/{maxLength}
          </p>
        </div>
      </div>

      {/* 사진 등록 영역 */}
      <div className="flex flex-col p-5 space-y-4">
        <p className="text-18px font-medium pb-2">사진 등록</p>
        <ImageUploader
          onImageUpload={handleImageUpload}
          onImageDelete={handleImageDelete}
          image={file}
        />
      </div>

      {/* 하단 바 */}
      <BottomNavBar />

      {/* 수정 완료 버튼 */}
      <div className="fixed bottom-[80px] left-0 right-0 z-20">
        <div className="mx-auto max-w-[520px] px-5 pb-[30px]">
          <Button
            shape="rectangle"
            variant="filled"
            className="w-full py-3"
            onClick={handleSubmit}
          >
            수정 완료
          </Button>
        </div>
      </div>
    </div>
  );
}
