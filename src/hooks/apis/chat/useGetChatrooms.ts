import { useQuery } from '@tanstack/react-query';

import { api } from '@/api';

interface Chatroom {
  _id: string;
  member1Id: number;
  member2Id: number;
  createdAt: string;
  chatroomId: number;
  __v: number;
}

const getChatrooms = async () => {
  return api.get<Chatroom[]>('/chatrooms');
};

export const useGetChatrooms = () => {
  return useQuery({
    queryKey: ['get-chatrooms'],
    queryFn: getChatrooms,
  });
};
