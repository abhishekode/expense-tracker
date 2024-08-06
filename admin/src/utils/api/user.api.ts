import { api, createAuthorizationHeader, handleRequest } from '.';

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterUserPayload {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: number;
}

const USER_ENDPOINT = 'users';

export const UserAPI = {
  deleteUser: (email: string) => handleRequest(api.delete(`/${USER_ENDPOINT}/${email}`)),

  login: (payload: LoginPayload) => handleRequest(api.post(`/${USER_ENDPOINT}/login`, payload)),

  register: (payload: RegisterUserPayload) => handleRequest(api.post(`/${USER_ENDPOINT}/register`, payload)),

  fetchUserProfile: () => handleRequest(api.get('/me', createAuthorizationHeader())),
};
