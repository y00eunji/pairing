'use client';

import Link from 'next/link';

import PlusButton from '@/components/buttons/PlusButton';
import PostCard from '@/components/PostCard';
import type { Post } from '@/types/community';

interface PostsListTabProps {
  posts: Post[];
}

const PostsListTab: React.FC<PostsListTabProps> = ({ posts }) => {
  return (
    <>
      <div className="flex flex-col pb-[200px] h-screen flex-grow overflow-y-auto bg-[#f9f9f9]">
        {posts.map((item) => (
          <PostCard
            key={item.id}
            profileImg={item.profileImg}
            name={item.name}
            age={item.age}
            city={item.city}
            content={item.content ?? '/images/pairing_logo.png'}
            imageUrl={item.imageUrl ?? '/images/pairing_logo.png'}
            time={new Date(item.createdAt)}
            buttonText="저요"
            onButtonClick={() => console.log('저요 버튼 클릭')}
          />
        ))}
      </div>

      {/* 플로팅 버튼 */}
      <div className="absolute bottom-20 right-5 mb-6">
        <Link href="/community/create">
          <PlusButton aria-labelledby="게시물 생성 버튼" />
        </Link>
      </div>
    </>
  );
};

export default PostsListTab;
