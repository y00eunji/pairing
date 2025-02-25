export interface Post {
  id: number;
  name: string;
  age: number;
  city: string;
  content: string;
  imageUrl?: string;
  createdAt: Date | string;
}

export interface MyPost {
  id: number;
  userId: number;
  name: string;
  age: number;
  city: string;
  content: string;
  imageUrl: string;
  createdAt: Date | string;
}

export interface MeListItem {
  name: string;
  age: number;
  city: string;
  participantId: 1;
  userId: 2222;
  postId: 1;
}
