export interface MongoResponse {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}
export enum UserRole {
  Passenger = 'passenger',
  Driver = 'driver',
  Admin = 'admin',
}

export enum UserRoleFilter {
  Passenger = 'passenger',
  Driver = 'driver',
}

export enum SignupMethodFilter {
  custom = 'custom',
  Google = 'google',
  Facebook = 'facebook'
}

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
}

export enum SignupType {
  Custom = 'custom',
  Facebook = 'facebook',
  Gmail = 'Gmail',
}

export enum IsActiveFilter {
  Active = 'Active',
  InActive = 'InActive'
}

export enum AppVersionHistoryFilter {
  All = 'All',
  isForceUpdateRequiredForAndroid = 'UpdateForAndroid',
  isForceUpdateRequiredForIos = 'UpdateForIos'
}

export interface IAdmin extends MongoResponse {
  name: string;
  email: string;
  phone: number;
  role: UserRole;
  isActive: boolean;
}
export interface IAdminResponse {
  allAdmins: IAdmin[];
  total: number;
}

export interface IAppVersionHistory extends MongoResponse {
  versionNumber: string;
  isForceUpdateRequiredForAndroid: boolean;
  isForceUpdateRequiredForIos: boolean;
  releaseDate: Date
}

export interface IAppVersionHistoryResponse {
  versionHistory: IAppVersionHistory[];
  total: number;
}

export interface CurrentUser {
  token?: string;
  admin: IAdmin;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface CancelTripReasonRequest {
  reason: string;
  isActive?: boolean;
}

export interface ICancelRequestReason extends MongoResponse {
  reason: string;
  isActive: boolean;
}

export interface IDriverCancelTripReasonResponse {
  CancelDriverTripReasons: ICancelRequestReason[];
  total: number;
}

export interface IPassengerCancelTripReasonResponse {
  CancelPassengerTripReasons: ICancelRequestReason[];
  total: number;
}

export interface NewAdminAddRequest {
  email: string;
  password?: string;
  name: string;
  isActive?: boolean;
}

interface RatingObj {
  averageRating: number;
  totalRating: number;
}
export interface IUser extends MongoResponse {
  firstName: string;
  lastName: string;
  phone: number;
  countryCode: string;
  email: string;
  role: UserRole;
  isMobileVerified: boolean;
  isEmailVerified: boolean;
  isAccountDeactivated: boolean;
  signupMethod: SignupType;
  dob?: string;
  description?: string;
  gender?: Gender;
  fcmToken?: string;
  profileImg?: string;
  driverRating: RatingObj;
  passengerRatings: RatingObj;
}

export interface IUserResponse {
  userData: IUser[];
  total: number;
}

export enum DriverDocumentsType {
	DriverLicense = 'DriverLicense',
	BackgroundCheck = 'BackgroundCheck',
	ProofOfWorkEligibility = 'ProofOfWorkEligibility',
	PrivateTransportCompany = 'PrivateTransportCompany',
	SocialInsuranceNumber = 'SocialInsuranceNumber',
}

export enum DriverDocumentStatus {
	Pending = 'Pending',
	Upload = 'Upload',
	Failed = 'Failed',
	InReview = 'InReview',
	Verified = 'Verified',
}

interface IDriverLicense {
	frontView?: string;
	backView?: string;
}

export interface IDriverDocuments extends MongoResponse{
  documentType?: DriverDocumentsType;
	documentPath?: string;
	isActive?: boolean;
	isApproved?: boolean;
	driverId?: string;
	approvedBy?: string;
	licenseNumber?: string;
	documentStatus?: DriverDocumentStatus;
	dateOfExpiry?: Date;
	issueDate?: Date;
	isRequiredDocument?: boolean;
	sinNumber?: string;
	driverLicense?: IDriverLicense
}

export interface IDriverDocumentResponse {
  driverDocumentData: IDriverDocuments[];
  total: number;
}

export interface IDriverCar extends MongoResponse{
  make: string;
	modelName: string;
	year: number;
	color: string;
	frontSide?: string;
	backSide?: string;
	rightSide?: string;
	leftSide?: string;
	licensePlate?: string;
	vehicleInsurance?: string;
	vehicleInspection?: string;
	isApproved?: boolean;
	driverId: string;
	isDefault?: boolean;
	approvedBy?: string;
}
export interface NewAppVersionHistory {
  versionNumber: string;
  releaseDate: Date;
  isForceUpdateRequiredForAndroid: boolean;
  isForceUpdateRequiredForIos: boolean;
}

export interface RequestAppVersionHistory extends MongoResponse {
  versionNumber: string;
  releaseDate: Date;
  isForceUpdateRequiredForAndroid: boolean;
  isForceUpdateRequiredForIos: boolean;
}

export interface CarCompany {
  name: string;
  isActive?: boolean
}

export interface RequestCarCompany extends MongoResponse {
  name: string;
  isActive?: boolean;
}

export interface ICarCompanyResponse {
  carCompany: RequestCarCompany[];
  total: number
}

export interface CarColor {
  name: string;
  isActive?: boolean
}

export interface ICarColorResponse {
  carColors: RequestCarColor[];
  total: number
}

export interface RequestCarColor extends MongoResponse {
  name: string;
  isActive?: boolean;
}

export interface CarModel {
  name: string;
  carCompanyId: string
  isActive?: boolean
}

export interface ICarModelResponse {
  carModels: RequestCarModel[];
  total: number
}

export interface RequestCarModel extends MongoResponse {
  name: string;
  carCompanyId: string
  isActive?: boolean;
}
export interface IFaq extends MongoResponse {
  title: string,
  description: string,
  isActive: boolean
}

export interface NewDriverFaq {
  title: string,
  description: string,
  isActive: boolean
}

export interface IDriverFaqResponse {
  driverFAQs: IFaq[];
  total: number
}


export interface NewPassengerFaq {
  title: string,
  description: string,
  isActive: boolean
}

export interface IPassengerFaqResponse {
  passengerFAQs: IFaq[];
  total: number
}

export interface AdminPopulateResponse {
  _id: string;
  email: string;
  name: string;
}
