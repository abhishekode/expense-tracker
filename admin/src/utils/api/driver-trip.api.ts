import { api, handleRequest, withAuthorization } from '.';


export interface CreateNewState {
  name: string;
  country: string;
  isActive?: boolean;
}
export interface DriverTripFilterParam {
  driverId?: string;
  size?: number;
  page?: number;
}

const prefix: string = 'driver-trip';

export const DriverTripAPI = {
  create: (data: CreateNewState) =>
    handleRequest(api.post(`/${prefix}`, data, withAuthorization)),
  getAll: (query?: DriverTripFilterParam) =>
    handleRequest(
      api.get(`/${prefix}`, { params: query, ...withAuthorization }),
    ),
  delete: (id: string) => handleRequest(api.delete(`/${prefix}/${id}`)),
  update: (id: string, updateReason: Partial<CreateNewState>) =>
    handleRequest(api.patch(`/${prefix}/${id}`, updateReason, withAuthorization)),
};
