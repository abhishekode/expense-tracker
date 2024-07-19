import { MongoResponse } from '@/components/common/Interfaces';
import { api, handleRequest, withAuthorization } from '.';

export interface CreateNewDriverBank {
  name: string;
  country: string;
  isActive?: boolean;
}
export interface DriverTripFilterParam {
  driverId?: string;
  size?: number;
  page?: number;
}

export interface IDriverBank extends MongoResponse {
  driverId: string;
  stripeAccountId: string;
  stripeBankToken: string;
  isDefault: boolean;
  isAccountVerified: boolean;
  isDeleted: boolean;
  bankName: string;
  accountNumber: string;
}
const prefix: string = 'bank-details';

export const DriverBankAPI = {
  create: (data: CreateNewDriverBank) =>
    handleRequest(api.post(`/${prefix}`, data, withAuthorization)),
  getAll: (query?: DriverTripFilterParam) =>
    handleRequest(
      api.get(`/${prefix}`, { params: query, ...withAuthorization }),
    ),
  delete: (id: string) => handleRequest(api.delete(`/${prefix}/${id}`)),
  update: (id: string, updateReason: Partial<CreateNewDriverBank>) =>
    handleRequest(
      api.patch(`/${prefix}/${id}`, updateReason, withAuthorization),
    ),
};
