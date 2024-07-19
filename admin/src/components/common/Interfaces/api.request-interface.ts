import { DriverDocumentStatus, Gender, SignupType, UserRole } from '.';

export interface UpdateDriverDocumentArgs {
  isActive?: boolean;
  isApproved?: boolean;
  status?: DriverDocumentStatus;
}

export interface UserQueryDto {
  name?: string;
  phone?: number;
  email?: string;
  role?: UserRole;
  isAccountDeactivated?: boolean;
  signupMethod?: SignupType;
  dobLessThen?: string;
  dobGreaterThen?: string;
  gender?: Gender;
  driverMaxAvgRating?: number;
  driverMinAvgRating?: number;
  passengerMaxAvgRating?: number;
  passengerMinAvgRating?: number;
  driverMinTotalRating?: number;
  driverMaxTotalRating?: number;
  passengerMinTotalRating?: number;
  passengerMaxTotalRating?: number;
  startDate?: Date;
  endDate?: Date;
  page?: number;
  size?: number;
}

export interface PaginationQueryDto {
  page?: number;
  size?: number;
}

export interface CancelTripQueryDto extends PaginationQueryDto {
  isActive?: boolean;
  reasons?: string;
}

export interface ActiveFilterDto {
  isActive?: boolean;
}

export interface versionHistoryFilterDto {
  isForceUpdateRequiredForAndroid?: boolean;
  isForceUpdateRequiredForIos?: boolean;
}

export interface DriverFaqDto {
  title?: string;
  description?: string;
}

export interface PassengerFaqDto {
  title?: string;
  description?: string;
}
