'use client';

import { useRouter } from 'next/navigation';

import ProfileCardInfoContainer from '@/components/ProfileCardInfoContainer';
import { useModal } from '@/hooks/useModal';

import BottomNavBar from '../BottomNavBar';
import Button from '../common/Button';
import ActionModal from '../modal/ActionModal';
import ProfileImageUpload from './ProfileImageUpload';

import CheckIcon from '/src/assets/icons/alert_checkMark.svg';
import ExclamationIcon from '/src/assets/icons/alert_exclamationMark.svg';
import NameStarIcon from '/src/assets/icons/name_star.svg';
import BeerIcon from '/src/assets/icons/profilecard_bottle_pink.svg';
import HobbyIcon from '/src/assets/icons/profilecard_heart_pink.svg';
import LocationIcon from '/src/assets/icons/profilecard_location_pink.svg';
import PerconalityIcon from '/src/assets/icons/profilecard_user_pink.svg';

interface DefaultInfoProps {
  name: string;
  age: number;
}

export default function DefaultMyPage({ name, age }: DefaultInfoProps) {
  const router = useRouter();

  const logoutModal = useModal();
  const logoutConfirmModal = useModal();

  const withdrawalModal = useModal();
  const withdrawalConfirmModal = useModal();

  const handleEdit = () => {
    router.push('/mypage/edit/info');
  };

  // TODO : 로그아웃, 회원탈퇴 로직 추가
  const handleLogout = () => {
    logoutModal.openModal();
  };

  const handleWithdrawal = () => {
    withdrawalModal.openModal();
  };

  return (
    <div className="flex flex-col items-center  overflow-y-auto">
      <div className="flex flex-col items-center w-full overflow-y-auto  p-5">
        <ProfileImageUpload />

        <div className="flex flex-col items-center mb-8">
          <div className="flex mt-5 mb-2 font-24-bold gap-3 items-center justify-center">
            <div>{name}</div>
            <div>{age}</div>
            <NameStarIcon />
          </div>

          <button
            className="px-3 py-2 rounded-[25px] border boerder-gray1 text-gray1 font-14-medium"
            onClick={handleEdit}
          >
            내 프로필 수정
          </button>
        </div>

        <div className="flex flex-col gap-[10px] w-[98%]">
          <ProfileCardInfoContainer
            icon={<LocationIcon />}
            title="거주지"
            description="서울시 강남구 역삼동"
          />
          <ProfileCardInfoContainer
            icon={<HobbyIcon />}
            title="취미"
            tags={['운동', '독서', '맛집탐방']}
          />
          <ProfileCardInfoContainer
            icon={<PerconalityIcon />}
            title="성격(MBTI)"
            description="INFP"
          />
          <ProfileCardInfoContainer
            icon={<BeerIcon />}
            title="음주 흡연 여부"
            tags={['전혀 안마심', '비흡연']}
          />
        </div>

        <div className="w-full font-18-medium flex flex-col gap-[10px] mt-[20px] mb-[40px]">
          <Button
            shape="rectangle"
            variant="disabled"
            className="w-full px-32 py-4"
            onClick={handleLogout}
          >
            로그아웃
          </Button>
          <Button
            shape="rectangle"
            variant="disabled"
            className="w-full px-32 py-4"
            onClick={handleWithdrawal}
          >
            회원탈퇴
          </Button>
        </div>

        <ActionModal
          isOpen={logoutModal.isOpen}
          icon={<ExclamationIcon fill="#FF4F75" />}
          message="로그아웃을 하시겠습니까?"
          buttons={[
            {
              label: '취소',
              onClick: logoutModal.closeModal,
            },
            {
              label: '확인',
              onClick: () => {
                logoutModal.closeModal();
                logoutConfirmModal.openModal();
              },
              className: 'text-mainPink1',
            },
          ]}
        />

        <ActionModal
          isOpen={logoutConfirmModal.isOpen}
          icon={<CheckIcon fill="#FF85A2" />}
          message="로그아웃 되었습니다."
          buttons={[
            {
              label: '닫기',
              onClick: () => {
                logoutConfirmModal.closeModal();
                router.push('/');
              },
              className: 'w-full',
            },
          ]}
        />

        <ActionModal
          isOpen={withdrawalModal.isOpen}
          icon={<ExclamationIcon fill="#FF4F75" />}
          message="페어링의 회원탈퇴를 하시겠습니까?"
          description="계정 삭제 시 모든 데이터가 삭제됩니다."
          buttons={[
            {
              label: '취소',
              onClick: withdrawalModal.closeModal,
            },
            {
              label: '확인',
              onClick: () => {
                withdrawalModal.closeModal();
                withdrawalConfirmModal.openModal();
              },
              className: 'text-mainPink1',
            },
          ]}
        />

        <ActionModal
          isOpen={withdrawalConfirmModal.isOpen}
          icon={<CheckIcon fill="#FF85A2" />}
          message="회원탈퇴 되었습니다."
          buttons={[
            {
              label: '닫기',
              onClick: () => {
                withdrawalConfirmModal.closeModal();
                router.push('/');
              },
              className: 'w-full',
            },
          ]}
        />
      </div>
      <BottomNavBar chatNotificationCount={0} />
    </div>
  );
}
