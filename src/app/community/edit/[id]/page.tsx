import PostEdit from './PostEdit';

export default function EditPage({ params }: { params: { id: string } }) {
  const postId = Number(params.id);
  return <PostEdit postId={postId} />;
}
