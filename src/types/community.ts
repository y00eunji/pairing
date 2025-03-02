export interface Post {
  id: number;
  name: string;
  age: number;
  city: string;
  profileImg: string;
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
  profileImg: string;
  content: string;
  imageUrl: string;
  createdAt: Date | string;
}

export interface MeListItem {
  name: string;
  age: number;
  city: string;
  profileImg: string;
  participantId: 1;
  userId: 2222;
  postId: 1;
}

export interface PostCreate {
  content: string;
  imageUrl: string;
}

export interface PostUpdate {
  content: string;
  imageUrl: string;
}
