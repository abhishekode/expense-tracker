import { api, handleRequest } from '.';

const prefix: string = 'users';

export const UserMainAPI = {
  deleteUserRequest: (data: { email: string }) =>
    handleRequest(api.delete(`/${prefix}/${data.email}`)),
};
