'use client';

import { useState } from 'react';

import Link from 'next/link';

import CheckIcon from '@/assets/icons/alert_checkMark.svg';
import ExclamationIcon from '@/assets/icons/alert_exclamationMark.svg';
import PlusButton from '@/components/buttons/PlusButton';
import ActionModal from '@/components/modal/ActionModal';
import ListModal from '@/components/modal/ListModal';
import PostCard from '@/components/PostCard/page';
import { useModal } from '@/hooks/useModal';
import type { Post } from '@/types/community';

interface PostsListTabProps {
  posts: Post[];
}

const PostsListTab: React.FC<PostsListTabProps> = ({ posts }) => {
  // 신고 관련 모달
  const reportcheckModal = useModal(); // 신고 체크 모달
  const reportModal = useModal(); // 신고 항목 모달
  const reportConfirmModal = useModal();
  const reportSuccessModal = useModal();
  const [reportMessage, setReportMessage] = useState('');

  const handleReportClick = (reason: string): void => {
    setReportMessage(`${reason} 항목으로 상대를 신고하시겠습니까?`);
    reportConfirmModal.openModal();
  };

  return (
    <>
      <div className="flex flex-col pb-[200px] h-screen flex-grow overflow-y-auto bg-[#f9f9f9]">
        {posts.map((item) => (
          <PostCard
            key={item.id}
            name={item.name}
            age={item.age}
            city={item.city}
            content={item.content}
            imageUrl={item.imageUrl ?? '/images/pairing_logo.png'}
            time={new Date(item.createdAt)}
            buttonText="저요"
            onMoreClick={reportcheckModal.openModal}
            onButtonClick={() => console.log('저요 버튼 클릭')}
          />
        ))}
      </div>

      {/* 신고 체크 모달 */}
      <ListModal
        isOpen={reportcheckModal.isOpen}
        buttonList={[
          {
            label: '신고하기',
            onClick: () => {
              reportcheckModal.closeModal();
              reportModal.openModal();
            },
            color: 'text-mainPink1',
          },
        ]}
        oneButton={{ label: '취소', onClick: reportcheckModal.closeModal }}
      />

      {/* 신고 항목 모달 */}
      <ListModal
        isOpen={reportModal.isOpen}
        buttonList={[
          { label: '허위 인증', onClick: () => handleReportClick('허위 인증') },
          {
            label: '불쾌한 대화',
            onClick: () => handleReportClick('불쾌한 대화'),
          },
          {
            label: '허위 프로필',
            onClick: () => handleReportClick('허위 프로필'),
          },
        ]}
        oneButton={{
          label: '취소',
          onClick: reportModal.closeModal,
          color: 'text-mainPink1',
        }}
      />

      {/* 신고 확인 모달 */}
      <ActionModal
        isOpen={reportConfirmModal.isOpen}
        icon={<ExclamationIcon fill="#FF4F75" />}
        message={reportMessage}
        buttons={[
          { label: '취소', onClick: reportConfirmModal.closeModal },
          {
            label: '확인',
            onClick: () => {
              reportConfirmModal.closeModal();
              reportModal.closeModal();
              reportSuccessModal.openModal();
            },
            className: 'text-mainPink1',
          },
        ]}
      />

      {/* 신고 완료 모달 */}
      <ActionModal
        isOpen={reportSuccessModal.isOpen}
        icon={<CheckIcon fill="#FF85A2" />}
        message="신고 되었습니다."
        buttons={[
          {
            label: '닫기',
            onClick: reportSuccessModal.closeModal,
            className: 'w-full',
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
