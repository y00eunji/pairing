'use client';

import BottomNavBar from '@/components/BottomNavBar';
import Tab from '@/components/common/Tab';
import MyPostsTab from '@/components/community/MyPostsTab';
import PostsListTab from '@/components/community/PostsListTab';
import PageHeader from '@/components/header/PageHeader';
import type { MeListItem, MyPost, Post } from '@/types/community';

export default function Community() {
  const posts: Post[] = [
    {
      id: 1,
      name: '김이름',
      age: 20,
      city: '서울시',
      profileImg:
        'https://upload.wikimedia.org/wikipedia/ko/4/4a/%EC%8B%A0%EC%A7%B1%EA%B5%AC.png',
      content:
        '글 내용 가나다라마바사 아자차카타파하 가나 다라 마바사 아자차카 타파하 가나다라마 바사 아자차카 타파하가 나다라마바사.',
      imageUrl:
        'https://upload.wikimedia.org/wikipedia/ko/4/4a/%EC%8B%A0%EC%A7%B1%EA%B5%AC.png',
      createdAt: new Date('2025-01-31T09:01:00'),
    },
    {
      id: 2,
      name: '김이름',
      age: 20,
      city: '서울시',
      profileImg:
        'https://upload.wikimedia.org/wikipedia/ko/4/4a/%EC%8B%A0%EC%A7%B1%EA%B5%AC.png',
      content:
        '글 내용 가나다라마바사 아자차카타파하 가나 다라 마바사 아자차카 타파하 가나다라마 바사 아자차카 타파하가 나다라마바사.',
      createdAt: new Date('2025-01-31T09:01:00'),
    },
  ];

  const myPosts: MyPost[] = [
    {
      id: 3,
      userId: 2222,
      name: '김이름',
      age: 20,
      city: '서울시',
      profileImg:
        'https://upload.wikimedia.org/wikipedia/ko/4/4a/%EC%8B%A0%EC%A7%B1%EA%B5%AC.png',
      imageUrl:
        'https://upload.wikimedia.org/wikipedia/ko/4/4a/%EC%8B%A0%EC%A7%B1%EA%B5%AC.png',
      content:
        '글 내용 가나다라마바사 아자차카타파하 가나 다라 마바사 아자차카 타파하 가나다라마 바사 아자차카 타파하가 나다라마바사.',
      createdAt: new Date('2025-01-31T09:01:00'),
    },
  ];

  const meList: MeListItem[] = [
    {
      profileImg:
        'https://upload.wikimedia.org/wikipedia/ko/4/4a/%EC%8B%A0%EC%A7%B1%EA%B5%AC.png',
      name: '김이름',
      age: 20,
      city: '서울시',
      participantId: 1,
      userId: 2222,
      postId: 1,
    },
    {
      profileImg:
        'https://upload.wikimedia.org/wikipedia/ko/4/4a/%EC%8B%A0%EC%A7%B1%EA%B5%AC.png',
      name: '김이름',
      age: 20,
      city: '서울시',
      participantId: 1,
      userId: 2222,
      postId: 1,
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

        <Tab.Content value="tab1">
          <PostsListTab posts={posts} />
        </Tab.Content>

        <Tab.Content value="tab2">
          <MyPostsTab myPosts={myPosts} meList={meList} />
        </Tab.Content>
      </Tab.Group>

      <BottomNavBar />
    </div>
  );
}
