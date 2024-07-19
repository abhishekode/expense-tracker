export interface FilterCancelTripReason {
  reason?: string | undefined;
  isActive?: boolean | undefined;
}

export interface FilterAdminQuery {
  name?: string | undefined;
  email?: string | undefined;
  isActive?: boolean | undefined;
}

export interface FilterAppVersion {
  versionNumber?: number;
}

export interface IFilterCar {
  name?: string | undefined;
  isActive?: boolean| undefined;
}
export interface FilterCarModel extends IFilterCar {
  carCompany?: string | undefined;
  carCompanyName?: string | undefined;
}

export interface IFilterFAQ {
  isActive?: boolean;
  title?: string;
  description?: string;
}
