import { AdminPopulateResponse, MongoResponse } from '@/components/common/Interfaces';
import {
  api,
  handleRequest,
  withAuthorization,
  withAuthorizationFormData,
} from '.';

export interface IBlog extends MongoResponse {
  title: string;
  content: string;
  slug: string;
  author: AdminPopulateResponse;
  category: string;
  featuredImage: string;
  isPublished: boolean;
}
export interface IBlogResponse {
  blogs: IBlog[];
  count: number;
}

export interface CreateBlogDto {
  title: string;
  content: string;
  category: string;
  featuredImage?: File | string;
}
export interface BlogFilterQuery {
  title?: string;
  author?: string;
  category?: string;
  slug?: string;
  page?: number;
  size?: number;
}
const pathPrefix = 'blogs';

export const BlogAPI = {
  addNew: (data: any) =>
    handleRequest(api.post(`/${pathPrefix}`, data, withAuthorizationFormData)),

  getAll: (query?: BlogFilterQuery) =>
    handleRequest(api.get(`/${pathPrefix}`, { params: query })),

  deleteById: (id: string) =>
    handleRequest(api.delete(`${pathPrefix}/${id}`, withAuthorization)),

  getOne: (slug: string) => handleRequest(api.get(`/${pathPrefix}/${slug}`)),

  updateById: (id: string, data: any) =>
    handleRequest(
      api.put(`${pathPrefix}/${id}`, data, withAuthorizationFormData),
    ),
};
