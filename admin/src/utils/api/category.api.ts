import { MongoResponse } from '@/constant/interfaces';
import {
  api,
  handleRequest,
  createAuthorizationFormDataHeader,
  createAuthorizationHeader,
} from '.';

export interface ICategoryResponse extends MongoResponse {
  name: string;
  categoryImage: string;
}
export interface CreateCategoryDto {
  name: string;
  categoryImage: File;
}

const pathPrefix = 'category';

export const CategoryAPI = {
  addNew: (data: FormData) =>
    handleRequest(api.post(`/${pathPrefix}`, data, createAuthorizationFormDataHeader())),

  getAll: () => handleRequest(api.get(`/${pathPrefix}`)),
  getOne: (id: string) => handleRequest(api.get(`/${pathPrefix}/${id}`)),

  updateById: (id: string, data: FormData) =>
    handleRequest(
      api.put(`${pathPrefix}/${id}`, data, createAuthorizationFormDataHeader()),
    ),
  deleteById: (id: string) =>
    handleRequest(api.delete(`${pathPrefix}/${id}`, createAuthorizationHeader())),
};