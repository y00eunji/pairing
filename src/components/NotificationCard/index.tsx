'use client';

import { useModal } from '@/hooks/useModal';
import formatTime from '@/utils/date';

import Button from '../common/Button';
import ProfileImage from '../common/ProfileImage';
import ActionModal from '../modal/ActionModal';

import CheckIcon from '/src/assets/icons/alert_checkMark.svg';
import ExclamationIcon from '/src/assets/icons/alert_exclamationMark.svg';
import DeleteIcon from '/src/assets/icons/delete_small_gray.svg';

interface NotificationCardProps {
  profileImg?: string;
  name: string;
  age: number;
  city: string;
  time: Date;
  isHeart: boolean; // true이면 하트 알림
  isMe: boolean; // true이면 저요 알림
}

export default function NotificationCard({
  profileImg,
  name,
  age,
  city,
  time,
  isHeart,
  isMe,
}: NotificationCardProps) {
  let messageText = '';
  let buttonText = '';

  // 조건처리
  if (isHeart) {
    // isHeart가 true면 "하트를 보냈어요."
    messageText = `${name}님이 하트를 보냈어요.`;
    buttonText = '프로필 보기';
  } else if (isMe) {
    // isMe가 true면 "저요를 보냈어요."
    messageText = `${name}님이 저요를 보냈어요.`;
    buttonText = '저요 목록 보기';
  }

  // 삭제 확인 모달 & 삭제 완료 모달
  const deleteConfirmModal = useModal();
  const deleteSuccessModal = useModal();

  return (
    <div
      className="relative flex items-center bg-white rounded-xl m-4 p-1
      shadow-[0px_6px_6px_rgba(0,0,0,0.02),_0px_-6px_6px_rgba(0,0,0,0.02),_6px_0px_6px_rgba(0,0,0,0.02),_-6px_0px_6px_rgba(0,0,0,0.02)]"
    >
      <div className="flex m-4">
        {/* 삭제 버튼 */}
        <button
          className="absolute top-2 right-2 m-1"
          onClick={deleteConfirmModal.openModal}
        >
          <DeleteIcon />
        </button>

        {/* 프로필 이미지 */}
        <div className="mr-2">
          <ProfileImage
            src={profileImg ?? '/images/pairing_logo.png'}
            size={90}
          />
        </div>

        {/* 알림 내용 */}
        <div className="flex-1">
          <p className="text-sm font-medium pb-1">{messageText}</p>
          <p className="pb-3 font-regular">
            <span>{age}, </span>
            <span>{city}</span>
          </p>
          <p className="font-12-regular font-roboto text-gray1 mt-1">
            {formatTime(time)}
          </p>
        </div>

        {/* 버튼 (messageText가 있을 때만 표시) */}
        {messageText && (
          <Button
            shape="circle"
            variant="filled"
            className="absolute bottom-3 right-4 text-14px font-medium text-white rounded-3xl px-3 py-1.5"
          >
            {buttonText}
          </Button>
        )}
      </div>

      <ActionModal
        isOpen={deleteConfirmModal.isOpen}
        icon={<ExclamationIcon fill="#FF4F75" />}
        message="이 알림을 삭제하시겠습니까?"
        buttons={[
          {
            label: '취소',
            onClick: deleteConfirmModal.closeModal,
          },
          {
            label: '확인',
            onClick: () => {
              deleteConfirmModal.closeModal();
              deleteSuccessModal.openModal();
            },
            className: 'text-mainPink1',
          },
        ]}
      />

      {/* 삭제 완료 모달 */}
      <ActionModal
        isOpen={deleteSuccessModal.isOpen}
        icon={<CheckIcon fill="#FF85A2" />}
        message="알림이 삭제 되었습니다."
        buttons={[
          {
            label: '닫기',
            onClick: deleteSuccessModal.closeModal,
            className: 'w-full',
          },
        ]}
      />
    </div>
  );
}
