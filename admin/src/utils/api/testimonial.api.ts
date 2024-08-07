import { MongoResponse } from '@/constant/interfaces';
import {
  api,
  handleRequest,
  createAuthorizationHeader,
} from '.';

export interface TestimonialsDto {
  name: string;
  comments: string;
  isActive?: boolean;
  rating: number;
  featuredImage: File;
}
export interface FilterTestimonialQuery {
  question?: string;
  isActive?: boolean;
  page?: number;
  size?: number;
}
export interface ITestimonial extends MongoResponse {
  name: string;
  comments: string;
  isActive: boolean;
  rating: number;
  admin: any;
}

export interface ITestimonialResponse {
    testimonials: ITestimonial[];
    count: number;
  }
const pathPrefix = 'testimonials';

export const TestimonialsAPI = {
  addNew: (data: FormData) =>
    handleRequest(api.post(`/${pathPrefix}`, data, createAuthorizationHeader())),

  getAll: (query?: FilterTestimonialQuery) =>
    handleRequest(api.get(`/${pathPrefix}`, { params: query })),

  deleteById: (id: string) =>
    handleRequest(api.delete(`${pathPrefix}/${id}`, createAuthorizationHeader())),

  getOne: (id: string) => handleRequest(api.get(`/${pathPrefix}/${id}`)),

  updateById: (id: string, data: Partial<TestimonialsDto>) =>
    handleRequest(api.patch(`${pathPrefix}/${id}`, data, createAuthorizationHeader())),
};
