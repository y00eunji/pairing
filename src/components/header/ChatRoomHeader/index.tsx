import ActionModal from '@/components/modal/ActionModal';
import ListModal from '@/components/modal/ListModal';
import { useModal } from '@/hooks/useModal';

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
  const outModal = useModal(); // 채팅방 나가기 모달
  const outConfirmModal = useModal(); // 채팅방 나가기 여부 모달
  const outSuccessModal = useModal(); // 채팅방 나가기 완료 모달

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

      {/* 채팅방 나가기 메뉴 모달 */}
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
    </div>
  );
}
