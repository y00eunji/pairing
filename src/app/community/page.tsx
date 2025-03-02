'use client';

import BottomNavBar from '@/components/BottomNavBar';
import Tab from '@/components/common/Tab';
import MyPostsTab from '@/components/community/MyPostsTab';
import PostsListTab from '@/components/community/PostsListTab';
import PageHeader from '@/components/header/PageHeader';

export default function Community() {
  return (
    <div className="flex flex-col pb-[70px] h-screen overflow-hidden relative">
      <PageHeader title="커뮤니티" />

      <Tab.Group initialTab="tab1">
        <Tab.Header>
          <Tab.Item value="tab1">글 목록</Tab.Item>
          <Tab.Item value="tab2">내가 쓴 글</Tab.Item>
        </Tab.Header>

        <Tab.Content value="tab1">
          <PostsListTab />
        </Tab.Content>

        <Tab.Content value="tab2">
          <MyPostsTab />
        </Tab.Content>
      </Tab.Group>

      <BottomNavBar />
    </div>
  );
}
