import ActionModal from '@/components/modal/ActionModal';
import ListModal from '@/components/modal/ListModal';
import { useModal } from '@/hooks/useModal';

import { useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import CheckIcon from '/src/assets/icons/alert_checkMark.svg';
import ExclamationIcon from '/src/assets/icons/alert_exclamationMark.svg';
import BackIcon from '/src/assets/icons/header_back.svg';
import MoreGrayIcon from '/src/assets/icons/more_gray.svg';

interface ChatRoomHeaderProps {
  profileImage: string;
  name: string;
}

export default function ChatRoomHeader({
  profileImage,
  name,
}: ChatRoomHeaderProps) {
  const router = useRouter();
  const outModal = useModal(); // 채팅방 나가기 + 신고 모달
  const outConfirmModal = useModal(); // 채팅방 나가기 여부 모달
  const outSuccessModal = useModal(); // 채팅방 나가기 완료 모달

  // 신고 관련 모달
  const reportModal = useModal(); // 신고 항목 모달
  const reportConfirmModal = useModal();
  const reportSuccessModal = useModal();
  const [reportMessage, setReportMessage] = useState('');

  const handleReportClick = (reason: string): void => {
    setReportMessage(`${reason} 항목으로 상대를 신고하시겠습니까?`);
    reportConfirmModal.openModal();
  };

  return (
    <div className="flex items-center p-4 bg-white shadow-[0px_3px_3px_rgba(0,0,0,0.05)]">
      <Link href="/chat">
        <button className="mr-5" aria-label="채팅방 목록">
          <BackIcon />
        </button>
      </Link>

      <div className="flex items-center space-x-3">
        <Image
          src={profileImage}
          alt="프로필 사진"
          width={48}
          height={48}
          className="rounded-full"
        />
        <span className="text-20px font-semiBold">{name}</span>
      </div>

      <button className="ml-auto" aria-label="더보기">
        <MoreGrayIcon onClick={outModal.openModal} />
      </button>

      {/* 채팅방 나가기 / 신고 메뉴 모달 */}
      <ListModal
        isOpen={outModal.isOpen}
        buttonList={[
          {
            label: '채팅방 나가기',
            onClick: () => {
              outModal.closeModal();
              outConfirmModal.openModal();
            },
            color: 'text-mainPink1',
          },
          {
            label: '신고하기',
            onClick: () => {
              outModal.closeModal();
              reportModal.openModal();
            },
          },
        ]}
        oneButton={{ label: '취소', onClick: outModal.closeModal }}
      />

      {/* 채팅방 나가기 여부 모달 */}
      <ActionModal
        isOpen={outConfirmModal.isOpen}
        icon={<ExclamationIcon fill="#FF4F75" />}
        message="채팅방을 나가시겠습니까?"
        description="체팅방이 삭제됩니다."
        buttons={[
          {
            label: '취소',
            onClick: outConfirmModal.closeModal,
          },
          {
            label: '확인',
            onClick: () => {
              outConfirmModal.closeModal();
              outModal.closeModal();
              outSuccessModal.openModal();
            },
            className: 'text-mainPink1',
          },
        ]}
      />

      {/* 채팅방 나가기 완료 모달 */}
      <ActionModal
        isOpen={outSuccessModal.isOpen}
        icon={<CheckIcon fill="#FF85A2" />}
        message="채팅방을 나갔습니다."
        buttons={[
          {
            label: '닫기',
            onClick: () => {
              outSuccessModal.closeModal();
              router.push('/chat');
            },
            className: 'w-full',
          },
        ]}
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
    </div>
  );
}
