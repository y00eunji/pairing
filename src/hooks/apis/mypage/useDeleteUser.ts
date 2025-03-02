import { useMutation } from '@tanstack/react-query';

import { api } from '@/api';

const deleteUser = async () => {
  return api.delete('/member');
};

export const useDeleteUser = () => {
  return useMutation({ mutationFn: deleteUser });
};
