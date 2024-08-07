import { MongoResponse } from '@/components/common/Interfaces';
import {
  AdminPopulateResponse,
  api,
  handleRequest,
  withAuthorization,
  withAuthorizationFormData,
} from '.';

export interface GalleryDto {
  featuredImage: File[];
}
export interface IGallery extends MongoResponse {
  featuredImage: string;
  isActive: boolean;
  admin: AdminPopulateResponse;
}
export interface IGalleryResponse {
  gallery: IGallery[];
  count: number;
}
export interface FilterGalleryQuery {
  page?: number;
  size?: number;
  isActive?: boolean;
}
const pathPrefix = 'image-gallery';

export const GalleryAPI = {
  addNew: (data: FormData) =>
    handleRequest(api.post(`/${pathPrefix}`, data, withAuthorizationFormData)),

  getAll: (query?: FilterGalleryQuery) =>
    handleRequest(api.get(`/${pathPrefix}`, { params: query })),

  deleteById: (id: string) =>
    handleRequest(api.delete(`${pathPrefix}/${id}`, withAuthorization)),
};
