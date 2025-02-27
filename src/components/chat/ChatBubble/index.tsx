import type { PropsWithChildren } from 'react';

import ActionModal from '@/components/modal/ActionModal';
import ListModal from '@/components/modal/ListModal';
import { useModal } from '@/hooks/useModal';
import { cn } from '@/utils/cn';
import formatTime from '@/utils/date';

import CheckIcon from '/src/assets/icons/alert_checkMark.svg';
import ExclamationIcon from '/src/assets/icons/alert_exclamationMark.svg';
import MoreIcon from '/src/assets/icons/more_gray_col.svg';

interface Props {
  time: Date;
  isMe?: boolean; // 내가 보낸 메시지인지
  isRead?: boolean; // 읽음 표시
}

export default function ChatBubble({
  time,
  isMe = false,
  isRead = false,
  children,
}: PropsWithChildren<Props>) {
  const menuModal = useModal(); // 채팅 삭제/수정 모달
  const deleteConfirmModal = useModal(); // 채팅 삭제 여부 모달
  const deleteSuccessModal = useModal(); // 채팅 삭제 완료 모달

  return (
    <div className="flex flex-col w-full">
      <div className={cn('max-w-[247px]', isMe && 'self-end')}>
        {/* 채팅 버블 */}
        <div
          className={cn(
            'p-[10px] text-[14px] mb-[10px] w-fit',
            isMe
              ? 'bg-mainPink1 text-white rounded-[14px] rounded-br-[1px]'
              : 'bg-gray3 text-black rounded-[14px] rounded-bl-[1px]',
          )}
        >
          {children}
        </div>

        {/* 채팅 시간, 읽음 표시 */}
        <div
          className={cn(
            'flex gap-[5px] text-black text-[12px] items-center mb-3 ',
            isMe && 'justify-end',
          )}
        >
          {isMe && (
            <div className="font-medium leading-[14px]">{isRead && '읽음'}</div>
          )}
          <div className="font-roboto translate-y-[0.5px]">
            {formatTime(time)}
          </div>
          <button className="px-2" aria-label="더보기">
            {isMe && <MoreIcon onClick={menuModal.openModal} />}
          </button>
        </div>
      </div>

      {/* 채팅 삭제 메뉴 모달 */}
      <ListModal
        isOpen={menuModal.isOpen}
        buttonList={[
          {
            label: '삭제하기',
            onClick: () => {
              menuModal.closeModal();
              deleteConfirmModal.openModal();
            },
            color: 'text-mainPink1',
          },
        ]}
        oneButton={{ label: '취소', onClick: menuModal.closeModal }}
      />

      {/* 채팅 삭제 여부 모달 */}
      <ActionModal
        isOpen={deleteConfirmModal.isOpen}
        icon={<ExclamationIcon fill="#FF4F75" />}
        message="채팅을 삭제하시겠습니까?"
        buttons={[
          {
            label: '취소',
            onClick: deleteConfirmModal.closeModal,
          },
          {
            label: '확인',
            onClick: () => {
              deleteConfirmModal.closeModal();
              menuModal.closeModal();
              deleteSuccessModal.openModal();
            },
            className: 'text-mainPink1',
          },
        ]}
      />

      {/* 채팅 삭제 완료 모달 */}
      <ActionModal
        isOpen={deleteSuccessModal.isOpen}
        icon={<CheckIcon fill="#FF85A2" />}
        message="채팅을 삭제했습니다."
        buttons={[
          {
            label: '닫기',
            onClick: () => {
              deleteSuccessModal.closeModal();
            },
            className: 'w-full',
          },
        ]}
      />
    </div>
  );
}
