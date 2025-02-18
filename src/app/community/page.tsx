'use client';

import BottomNavBar from '@/components/BottomNavBar';
import PlusButton from '@/components/buttons/PlusButton';
import Button from '@/components/common/Button';
import Tab from '@/components/common/Tab';
import PageHeader from '@/components/header/PageHeader';
import ActionModal from '@/components/modal/ActionModal';
import BottomSheetModal from '@/components/modal/BottomSheetModal';
import ListModal from '@/components/modal/ListModal';
import PostCard from '@/components/PostCard/page';
import UserProfile from '@/components/profiles/UserProfile';
import { useModal } from '@/hooks/useModal';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { useState } from 'react';

import CheckIcon from '/public/assets/icons/alert_checkMark.svg';
import ExclamationIcon from '/public/assets/icons/alert_exclamationMark.svg';

export default function Community() {
  const router = useRouter();

  const reportcheckModal = useModal(); // 신고 체크 모달
  const reportModal = useModal(); // 신고하기 상세 모달

  // 신고 확인 모달 & 신고 완료 모달
  const reportConfirmModal = useModal();
  const reportSuccessModal = useModal();
  const [reportMessage, setReportMessage] = useState('');

  // 신고 항목 버튼 클릭 시 실행할 함수
  const handleReportClick = (reason: string) => {
    setReportMessage(`${reason} 항목으로 상대를 신고하시겠습니까?`);
    reportConfirmModal.openModal();
  };

  const myPostMenuModal = useModal(); // 수정/삭제 여부 모달
  // 신고 확인 모달 & 신고 완료 모달
  const deleteConfirmModal = useModal();
  const deleteSuccessModal = useModal();

  // "저요 목록" 모달
  const bottomSheetModal = useModal();

  // 글 목록
  const posts = [
    {
      name: '김이름',
      age: 20,
      location: '서울시',
      content:
        '글 내용 가나다라마바사 아자차카타파하 가나 다라 마바사 아자차카 타파하 가나다라마 바사 아자차카 타파하가 나다라마바사.',
      // imageUrl:
      //   'https://upload.wikimedia.org/wikipedia/ko/4/4a/%EC%8B%A0%EC%A7%B1%EA%B5%AC.png',
      createdAt: new Date(),
    },
    {
      name: '김이름',
      age: 20,
      location: '서울시',
      content:
        '글 내용 가나다라마바사 아자차카타파하 가나 다라 마바사 아자차카 타파하 가나다라마 바사 아자차카 타파하가 나다라마바사.',
      createdAt: new Date(),
    },
  ];

  // 내가 쓴 글 목록
  const myPosts = [
    {
      name: '김이름',
      age: 20,
      location: '서울시',
      // imageUrl:
      //   'https://upload.wikimedia.org/wikipedia/ko/4/4a/%EC%8B%A0%EC%A7%B1%EA%B5%AC.png',
      content:
        '글 내용 가나다라마바사 아자차카타파하 가나 다라 마바사 아자차카 타파하 가나다라마 바사 아자차카 타파하가 나다라마바사.',
      createdAt: new Date(),
    },
  ];

  // 저요 목록
  const meList = [
    {
      name: '김이름',
      age: 20,
      location: '서울시',
    },
    {
      name: '김이름',
      age: 20,
      location: '서울시',
    },
  ];

  return (
    <div className="flex flex-col pb-[70px] h-screen overflow-hidden relative">
      <PageHeader title="커뮤니티" />

      <Tab.Group initialTab="tab1">
        <Tab.Header>
          <Tab.Item value="tab1">글 목록</Tab.Item>
          <Tab.Item value="tab2">내가 쓴 글</Tab.Item>
        </Tab.Header>

        {/* 글 목록 */}
        <Tab.Content value="tab1">
          <div className="flex flex-col pb-[200px] h-screen flex-grow overflow-y-auto bg-[#f9f9f9]">
            {posts.map((item, index) => (
              <PostCard
                key={index}
                name={item.name}
                age={item.age}
                location={item.location}
                content={item.content}
                // 없애면 안됨 imageUrl={item.imageUrl}
                time={item.createdAt}
                buttonText="저요"
                onMoreClick={reportcheckModal.openModal}
                onButtonClick={() => console.log('저요 버튼 클릭')}
              />
            ))}
          </div>

          {/* 신고 모달 */}
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

          {/* 신고하기 항목 모달 */}
          <ListModal
            isOpen={reportModal.isOpen}
            buttonList={[
              {
                label: '허위 인증',
                onClick: () => handleReportClick('허위 인증'),
              },
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
            icon={<ExclamationIcon />}
            message={reportMessage}
            buttons={[
              {
                label: '취소',
                onClick: reportConfirmModal.closeModal,
              },
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
        </Tab.Content>

        {/* ------------------------------------------------------------- */}
        {/* 내가 쓴 글 목록 */}
        <Tab.Content value="tab2">
          {myPosts.length > 0 ? (
            <div className="flex flex-col pb-[200px] h-screen flex-grow overflow-y-auto bg-[#f9f9f9]">
              {/* 내가 작성한 글 있을 때 */}
              {myPosts.map((item, index) => (
                <PostCard
                  key={index}
                  name={item.name}
                  age={item.age}
                  location={item.location}
                  content={item.content}
                  // 없애면 안됨 imageUrl={item.imageUrl}
                  time={item.createdAt}
                  buttonText="저요 목록 보기"
                  onMoreClick={myPostMenuModal.openModal}
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
                  <div className="flex flex-col flex-grow overflow-y-auto">
                    {meList.map((item, index) => (
                      <UserProfile
                        key={index}
                        name={item.name}
                        age={item.age}
                        location={item.location}
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
                    <p className="font-14-regular text-gray1">
                      저요를 남겨보세요.
                    </p>
                  </div>
                )}
              </BottomSheetModal>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full">
              {/* 내가 작성한 글 없을 때 */}
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

              <Button shape="circle" variant="outline">
                <Link href="/community/create">글 작성</Link>
              </Button>
            </div>
          )}

          {/* 수정/삭제 여부 모달 */}
          <ListModal
            isOpen={myPostMenuModal.isOpen}
            buttonList={[
              {
                label: '수정하기',
                onClick: () => {
                  router.push('/community/edit');
                },
              },
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
            icon={<ExclamationIcon />}
            message="게시물을 삭제하시겠습니까?"
            buttons={[
              {
                label: '취소',
                onClick: deleteConfirmModal.closeModal,
              },
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
        </Tab.Content>
      </Tab.Group>

      <BottomNavBar />
    </div>
  );
}
