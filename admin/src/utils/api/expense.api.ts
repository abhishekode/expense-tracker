import { MongoResponse } from '@/constant/interfaces';
import { api, handleRequest, createAuthorizationHeader } from '.';

export interface CreateNewExpense {
  title: string;
  amount: number;
  category: string;
  description: string;
}

interface IUser {
  _id: string;
  name: string;
  email: string;
}

export interface IExpense extends MongoResponse {
  _id: string;
  title: string;
  category: string;
  amount: number;
  description: string;
  user: IUser;
}

export interface IExpenseResponse {
  expense: IExpense[];
  count: number;
}

export interface DriverTripFilterParam {
  driverId?: string;
  size?: number;
  page?: number;
}

const prefix: string = 'expense';

export const ExpenseAPI = {
  create: (data: CreateNewExpense) => handleRequest(api.post(`/${prefix}`, data, createAuthorizationHeader())),
  getAll: (query?: DriverTripFilterParam) =>
    handleRequest(api.get(`/${prefix}`, { params: query, ...createAuthorizationHeader() })),
  delete: (id: string) => handleRequest(api.delete(`/${prefix}/${id}`)),
  update: (id: string, updateReason: Partial<CreateNewExpense>) =>
    handleRequest(api.patch(`/${prefix}/${id}`, updateReason, createAuthorizationHeader())),
};
