import { server_url } from '@/config';
import axios from 'axios';
import { CurrentUser } from '../interfaces/user.interface';

const API_BASE_URL = `${server_url}/api/v1`;

export const api = axios.create({
  baseURL: API_BASE_URL,
});

const getToken = () => {
  const user: CurrentUser = JSON.parse(localStorage.getItem('user') || '{}');
  return user.token;
};

export const createAuthorizationHeader = () => ({
  headers: {
    Authorization: `Bearer ${getToken()}`,
  },
});

export const createAuthorizationFormDataHeader = () => ({
  headers: {
    Authorization: `Bearer ${getToken()}`,
    'Content-Type': 'multipart/form-data',
  },
});

export const handleRequest = async (request: Promise<any>) => {
  try {
    const response = await request;
    return response.data;
  } catch (error: any) {
    throw error.response ? error.response.data : error.message;
  }
};
