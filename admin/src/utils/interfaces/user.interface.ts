import { MongoResponse } from "@/constant/interfaces";

export interface CurrentUser extends MongoResponse{
    token: string;
    _id: string;
    name: string;
    phone: string;
    email: string;
    role: string;
    isEmailVerified: boolean;
    isAccountDeactivated: boolean;
    otp: string | null;
    otpExpireTime: Date;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
  }
  