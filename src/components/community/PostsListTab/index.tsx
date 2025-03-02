'use client';

import Image from 'next/image';
import Link from 'next/link';

import PlusButton from '@/components/buttons/PlusButton';
import ActionModal from '@/components/modal/ActionModal';
import PostCard from '@/components/PostCard';
import { useGetPostList } from '@/hooks/apis/community/useGetPostList';
import { usePostParticipation } from '@/hooks/apis/community/usePostParticipation';

import ExclamationIcon from '/src/assets/icons/alert_exclamationMark.svg';

import { useModal } from '@/hooks/useModal';

const PostsListTab = () => {
  const checkModal = useModal(false);
  // POST 요청
  const { mutate: participate } = usePostParticipation();
  // 실제 환경에서는 인증 정보를 통해 가져와야 함.
  const userId = '2222';

  const { data: postList, isLoading, isError } = useGetPostList();

  return (
    <>
      <div className="flex flex-col pb-[200px] h-screen flex-grow overflow-y-auto bg-[#f9f9f9]">
        {isLoading && <p>데이터 로딩 중</p>}
        {isError && <p>데이터를 불러오지 못했습니다.</p>}

        {postList?.length === 0 ? (
          // 작성한 글이 없을 때
          <div className="flex flex-col items-center justify-center h-full">
            <div className="flex flex-col items-center w-full h-[50%] justify-center">
              <Image
                src="/images/logo_gray.png"
                alt="내가 작성한 글 없을 때 페이지 로고"
                width={335}
                height={335}
              />
            </div>
            <div className="flex flex-col items-center justify-center pb-4">
              <p className="font-18-medium text-gray1 py-1">
                아직 작성하신 글이 없습니다.
              </p>
              <p className="font-14-regular text-gray1 py-1">
                새로운 글을 작성해보세요!
              </p>
            </div>
          </div>
        ) : (
          // 작성한 글이 있을 때
          postList &&
          postList?.map((item) => (
            <PostCard
              key={item.id}
              profileImg={item.profileImg}
              name={item.name}
              age={item.age}
              city={item.city}
              content={item.content ?? '/images/pairing_logo.png'}
              imageUrl={item.imageUrl ?? '/images/pairing_logo.png'}
              time={new Date(item.createdAt)}
              buttonText="저요"
              onButtonClick={() => {
                participate(
                  { postId: item.id, userId },
                  {
                    onSuccess: () => {
                      checkModal.openModal();
                    },
                  },
                );
              }}
            />
          ))
        )}
      </div>

      {/* 참여 완료 모달 */}
      <ActionModal
        isOpen={checkModal.isOpen}
        icon={<ExclamationIcon fill="#FF4F75" />}
        message="참여가 완료되었습니다!"
        buttons={[
          {
            label: '확인',
            onClick: () => (window.location.href = '/community'),
            className: 'text-mainPink1',
          },
        ]}
      />

      {/* 플로팅 버튼 */}
      <div className="absolute bottom-20 right-5 mb-6">
        <Link href="/community/create">
          <PlusButton aria-labelledby="게시물 생성 버튼" />
        </Link>
      </div>
    </>
  );
};

export default PostsListTab;
