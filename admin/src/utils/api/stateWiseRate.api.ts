import { MongoResponse } from '@/components/common/Interfaces';
import { api, handleRequest, withAuthorization } from '.';

export interface IStateWiseRate extends MongoResponse {
  state: {
    _id: string;
    name: string;
    country: {
      _id: string;
      name: string;
    };
  };
	rate: number;
	isActive?: boolean;
	isDeleted?: boolean;
}

export interface IStateWiseRateResponse {
  stateWiseRate: IStateWiseRate[];
  total: number;
}

export interface CreateNewStateWiseRate {
  rate: number;
  state: string;
  countryId?: string;
  isActive?: boolean;
}
export interface StateFilterParams {
  isActive?: boolean;
  isDeleted?: boolean;
  size?: number;
  page?: number;
}

const prefix: string = 'state-wise-rate';

export const StateWiseRateAPI = {
  create: (data: CreateNewStateWiseRate) =>
    handleRequest(api.post(`/${prefix}`, data, withAuthorization)),
  getAll: (query?: StateFilterParams) =>
    handleRequest(
      api.get(`/${prefix}`, { params: query, ...withAuthorization }),
    ),
  delete: (id: string) => handleRequest(api.delete(`/${prefix}/${id}`)),
  update: (id: string, updateReason: Partial<CreateNewStateWiseRate>) =>
    handleRequest(api.patch(`/${prefix}/${id}`, updateReason, withAuthorization)),
};
