'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import CheckIcon from '@/assets/icons/alert_checkMark.svg';
import ExclamationIcon from '@/assets/icons/alert_exclamationMark.svg';
import Button from '@/components/common/Button';
import ActionModal from '@/components/modal/ActionModal';
import BottomSheetModal from '@/components/modal/BottomSheetModal';
import ListModal from '@/components/modal/ListModal';
import PostCard from '@/components/PostCard';
import UserProfile from '@/components/profiles/UserProfile';
import { useModal } from '@/hooks/useModal';
import type { MeListItem, MyPost } from '@/types/community';

interface MyPostsTabProps {
  myPosts: MyPost[];
  meList: MeListItem[];
}

const MyPostsTab: React.FC<MyPostsTabProps> = ({ myPosts, meList }) => {
  const router = useRouter();
  const myPostMenuModal = useModal();
  const deleteConfirmModal = useModal();
  const deleteSuccessModal = useModal();
  const bottomSheetModal = useModal();

  return (
    <>
      {myPosts.length > 0 ? (
        <div className="flex flex-col pb-[200px] h-screen flex-grow overflow-y-auto bg-[#f9f9f9]">
          {myPosts.map((item) => (
            <PostCard
              key={item.id}
              profileImg={item.profileImg}
              name={item.name}
              age={item.age}
              city={item.city}
              content={item.content}
              imageUrl={item.imageUrl}
              time={new Date(item.createdAt)}
              buttonText="저요 목록 보기"
              onButtonClick={bottomSheetModal.openModal}
            />
          ))}

          {/* 저요 목록 모달 */}
          <BottomSheetModal
            isOpen={bottomSheetModal.isOpen}
            isClose={bottomSheetModal.closeModal}
            title="저요 목록"
          >
            {meList.length > 0 ? (
              <div className="flex flex-col flex-grow pb-[70px]">
                {meList.map((item, index) => (
                  <UserProfile
                    key={index}
                    imageSrc={item.profileImg}
                    name={item.name}
                    age={item.age}
                    city={item.city}
                    buttonComponent={
                      <Button
                        shape="circle"
                        variant="filled"
                        className="px-[20px] py-[8px]"
                      >
                        채팅하기
                      </Button>
                    }
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center">
                <p className="text-18px font-medium text-gray1 py-1">
                  아직 저요 목록이 없습니다.
                </p>
                <p className="font-14-regular text-gray1">저요를 남겨보세요.</p>
              </div>
            )}
          </BottomSheetModal>
        </div>
      ) : (
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
          <Button shape="circle" variant="outline" className="p-1.5 w-[75px]">
            <Link href="/community/create">글 작성</Link>
          </Button>
        </div>
      )}

      {/* 수정/삭제 메뉴 모달 */}
      <ListModal
        isOpen={myPostMenuModal.isOpen}
        buttonList={[
          { label: '수정하기', onClick: () => router.push('/community/edit') },
          {
            label: '삭제하기',
            onClick: () => {
              myPostMenuModal.closeModal();
              deleteConfirmModal.openModal();
            },
            color: 'text-mainPink1',
          },
        ]}
        oneButton={{ label: '취소', onClick: myPostMenuModal.closeModal }}
      />

      {/* 삭제 확인 모달 */}
      <ActionModal
        isOpen={deleteConfirmModal.isOpen}
        icon={<ExclamationIcon fill="#FF4F75" />}
        message="게시물을 삭제하시겠습니까?"
        buttons={[
          { label: '취소', onClick: deleteConfirmModal.closeModal },
          {
            label: '확인',
            onClick: () => {
              deleteConfirmModal.closeModal();
              myPostMenuModal.closeModal();
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
        message="삭제 되었습니다."
        buttons={[
          {
            label: '닫기',
            onClick: deleteSuccessModal.closeModal,
            className: 'w-full',
          },
        ]}
      />
    </>
  );
};

export default MyPostsTab;
