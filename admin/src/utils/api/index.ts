import { CurrentUser } from '@/components/common/Interfaces';
import { server_url } from '@/config';
import axios from 'axios';

const API_BASE_URL = `${server_url}/api/v1`;

export const api = axios.create({
  baseURL: API_BASE_URL,
});

const getToken = () => {
  const admin: CurrentUser = JSON.parse(localStorage.getItem('admin') || '{}');
  return admin.token;
};

export const withAuthorization = {
  headers: {
    Authorization: `Bearer ${getToken()}`,
  },
};

export const withAuthorizationFormData = {
  headers: {
    Authorization: `Bearer ${getToken()}`,
    'Content-Type': 'multipart/form-data',
  },
};

export const handleRequest = async (request: Promise<any>) => {
  try {
    const response = await request;
    return response.data;
  } catch (error: any) {
    throw error.response ? error.response.data : error.message;
  }
};
