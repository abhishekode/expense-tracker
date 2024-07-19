import { MongoResponse } from '@/components/common/Interfaces';
import { api, handleRequest, withAuthorization } from '.';

export interface IState extends MongoResponse {
  name: string;
  country: {
    _id: string;
    name: string;
  }
  isActive?: boolean;
  isDeleted?: boolean;
}

export interface IStateResponse {
  state: IState[];
  total: number;
}

export interface CreateNewState {
  name: string;
  country: string;
  isActive?: boolean;
}
export interface StateFilterParams {
  isActive?: boolean;
  name?: string;
  isDeleted?: boolean;
  size?: number;
  page?: number;
  countryId?: string;
}

const prefix: string = 'state';

export const StateAPI = {
  create: (data: CreateNewState) =>
    handleRequest(api.post(`/${prefix}`, data, withAuthorization)),
  getAll: (query?: StateFilterParams) =>
    handleRequest(
      api.get(`/${prefix}`, { params: query, ...withAuthorization }),
    ),
  delete: (id: string) => handleRequest(api.delete(`/${prefix}/${id}`)),
  update: (id: string, updateReason: Partial<CreateNewState>) =>
    handleRequest(api.patch(`/${prefix}/${id}`, updateReason, withAuthorization)),
};
