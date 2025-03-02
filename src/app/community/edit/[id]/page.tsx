'use client';

import { useParams } from 'next/navigation';

import NotFound from '@/app/not-found';

import PostEdit from './PostEdit';

export default function EditPage() {
  const params = useParams();
  const postId = params?.id ? Number(params.id) : null;

  if (!postId) {
    return (
      <div>
        <NotFound />
      </div>
    );
  }

  return <PostEdit postId={postId} />;
}
