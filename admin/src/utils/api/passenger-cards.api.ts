import { MongoResponse } from '@/components/common/Interfaces';
import { api, handleRequest, withAuthorization } from '.';


export interface CreateNewState {
  name: string;
  country: string;
  isActive?: boolean;
}
export interface passengerCardFilterParam {
  passengerId?: string;
}

export interface IPassengerBank extends MongoResponse{
  userId: string;
	stripeCardTokenId: string;
	stripeCardId: string;
	isDefault: boolean;
	cardType: string;
	last4Digit: string;
	isSaveForFuture: boolean;
	isDeleted: boolean;
}

const prefix: string = 'card';

export const passengerCardAPI = {
  create: (data: CreateNewState) =>
    handleRequest(api.post(`/${prefix}`, data, withAuthorization)),
  getAll: (query?: passengerCardFilterParam) =>
    handleRequest(
      api.get(`/${prefix}`, { params: query, ...withAuthorization }),
    ),
  delete: (id: string) => handleRequest(api.delete(`/${prefix}/${id}`)),
  update: (id: string, updateReason: Partial<CreateNewState>) =>
    handleRequest(api.patch(`/${prefix}/${id}`, updateReason, withAuthorization)),
};
