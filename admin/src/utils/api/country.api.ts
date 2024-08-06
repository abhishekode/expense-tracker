import { MongoResponse } from '@/constant/interfaces';
import { api, handleRequest, withAuthorization } from '.';

export enum CouponType {
  Percentage = 'Percentage',
  Flat = 'Flat',
}

export enum CouponStatus {
  Active = 'Active',
  Inactive = 'Inactive',
}

export interface ICountry extends MongoResponse {
  name: string;
  isActive?: boolean;
  isDeleted?: boolean;
}

export interface IICountryResponse {
  country: ICountry[];
  total: number;
}

export interface CreateNewCountry {
  name: string;
  isActive?: boolean;
}
export interface CountryFilterParams {
  isActive?: boolean;
  name?: string;
  isDeleted?: boolean;
  size?: number;
  page?: number;
}

const prefix: string = 'country';

export const CountryAPI = {
  create: (data: CreateNewCountry) =>
    handleRequest(api.post(`/${prefix}`, data, withAuthorization)),
  getAll: (query?: CountryFilterParams) =>
    handleRequest(
      api.get(`/${prefix}`, { params: query, ...withAuthorization }),
    ),
  delete: (id: string) => handleRequest(api.delete(`/${prefix}/${id}`)),
  update: (id: string, updateReason: Partial<CreateNewCountry>) =>
    handleRequest(api.patch(`/${prefix}/${id}`, updateReason, withAuthorization)),
};
