'use client';

import { useModal } from '@/hooks/useModal';
import formatTime from '@/utils/date';

import ProfileImage from '../common/ProfileImage';
import ActionModal from '../modal/ActionModal';

import CheckIcon from '/public/assets/icons/alert_checkMark.svg';
import ExclamationIcon from '/public/assets/icons/alert_exclamationMark.svg';
import DeleteIcon from '/public/assets/icons/delete_small_gray.svg';

interface NotificationCardProps {
  profileImg?: React.ReactNode;
  name: string;
  age: number;
  location: string;
  time: Date;
  isHeart: boolean; // true이면 하트 알림
  isMe: boolean; // true이면 저요 알림
}

export default function NotificationCard({
  profileImg,
  name,
  age,
  location,
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
      className="relative flex items-center bg-white rounded-xl m-4 
      shadow-[0px_4px_4px_rgba(0,0,0,0.07),_0px_-1px_1px_rgba(0,0,0,0.03),_3px_0px_3px_rgba(0,0,0,0.03),_-3px_0px_3px_rgba(0,0,0,0.03)]"
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
          <ProfileImage src={profileImg} size={90} />
        </div>

        {/* 알림 내용 */}
        <div className="flex-1">
          <p className="text-sm font-semiBold pb-1">{messageText}</p>
          <p className="pb-3">
            <span>{age}, </span>
            <span>{location}</span>
          </p>
          <p className="text-12px text-gray1 mt-1">{formatTime(time)}</p>
        </div>

        {/* 버튼 (messageText가 있을 때만 표시) */}
        {messageText && (
          <button className="absolute bottom-3 right-4 text-14px font-bold text-gray1 bg-gray2 rounded-3xl px-3 py-1">
            {buttonText}
          </button>
        )}
      </div>

      <ActionModal
        isOpen={deleteConfirmModal.isOpen}
        icon={<ExclamationIcon />}
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
