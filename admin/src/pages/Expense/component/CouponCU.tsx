import {  ExpenseCategory, UserRole } from '@/constant/interfaces';
import AlertModel from '@/components/common/model/AlertModel';
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { MultiSelect } from "react-multi-select-component";
import { CreateNewExpense, ExpenseAPI } from '@/utils/api/expense.api';

interface CouponCUProps {
    isOpen: boolean;
    toggleModal: () => void;
    fetchCoupon: () => void;
    updateData?: any;
}
const CouponCU: React.FC<CouponCUProps> = ({ fetchCoupon, isOpen, toggleModal, updateData }) => {
    const [userList, setUserList] = React.useState<any>({
        userData: [],
        total: 0
    })
    const [selected, setSelected] = React.useState<{ label: string, value: string }[]>([]);
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<any>({
        defaultValues: updateData ? {
            user: updateData.user,
            code: updateData.code,
            expiryDateTime: new Date(updateData.expiryDateTime).toISOString().split('T')[0],
            discount: updateData.discount,
            maxRedeemCount: updateData.maxRedeemCount,
            minimumOrderAmount: updateData.minimumOrderAmount,
            shortDescription: updateData.shortDescription,
            termsAndConditions: updateData.termsAndConditions,
            newUserAfterDate: new Date(updateData.newUserAfterDate).toISOString().split('T')[0],
            newUserOnly: updateData.newUserOnly,
        } : {}
    });

    const onSubmit = async (data: CreateNewExpense) => {
        try {
            let res: any;
            if (updateData?._id) {

                res = await ExpenseAPI.update(updateData?._id, {
                    amount: updateData?.amount,
                    category: data.category,
                    description: data.description,
                });

            } else {
                res = await ExpenseAPI.create(data);
            }
            if (res.status) {
                toast.success(res.message, {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 1000,
                });
                fetchCoupon()
                toggleModal()
            }
        } catch (error: any) {
            toast.error(error?.message || "Something went wrong", {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 1000,
            });
        }
    }

    

    

    const inputClassName = "w-full rounded-lg border border-slate-300 bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"

   


    return (
        <AlertModel isOpen={isOpen} toggleModal={toggleModal} heading='Add Coupon'>
            <div className='bg-gray w-full h-full max-h-[80vh] flex flex-col items-center overflow-y-auto'>
                <div className="w-full max-w-lg">
                    <div className="w-full p-4">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="mb-4">
                                <label className="mb-2.5 block font-extrabold">
                                    Code
                                </label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Enter Title"
                                        {...register("code", { required: true })}
                                        className={inputClassName}
                                    />
                                </div>
                                {errors.code && (
                                    <div className="text-sm text-red-600">Code is required</div>
                                )}
                            </div>

                            <div className="mb-4">
                                <label className="mb-2.5 block font-extrabold">
                                    Coupon Overview
                                </label>
                                <div className="relative">
                                    <textarea
                                        placeholder="Enter Coupon Overview"
                                        {...register("shortDescription", { required: true })}
                                        className={inputClassName}
                                    />
                                </div>
                                {errors.shortDescription && (
                                    <div className="text-sm text-red-600">Coupon Overview is required</div>
                                )}
                            </div>
                            <div className="mb-4">
                                <label className="mb-2.5 block font-extrabold">
                                    Coupon type
                                </label>
                                <div className="relative">
                                    <select
                                        {...register("type", { required: true })}
                                        className={inputClassName}>
                                        <option value="">Select Coupon type</option>
                                        {Object.keys(ExpenseCategory).map((category) => (
                                            <option value={category}>{category}</option>
                                        ))}
                                    </select>

                                </div>
                                {errors.type && (
                                    <div className="text-sm text-red-600">Coupon type is required</div>
                                )}
                            </div>
                          
                            
                            <div className="mb-4">
                                <label className="mb-2.5 block font-extrabold capitalize">
                                    Minimum Order Amount
                                </label>
                                <div className="relative">
                                    <input
                                        type="number"
                                        placeholder={`Enter Minimum Order Amount`}
                                        {...register("minimumOrderAmount", { required: true })}
                                        className={inputClassName}
                                    />
                                </div>
                                {errors.minimumOrderAmount && (
                                    <div className="text-sm text-red-600">Minimum Order Amount is required</div>
                                )}
                            </div>
                            <div className="mb-4">
                                <label className="mb-2.5 block font-extrabold capitalize">
                                    Expiry Date Time
                                </label>
                                <div className="relative">
                                    <input
                                        type="date"
                                        {...register("expiryDateTime", { required: true })}
                                        className={inputClassName}

                                    />
                                </div>
                                {errors.expiryDateTime && (
                                    <div className="text-sm text-red-600">Expiry Date Time is required</div>
                                )}
                            </div>
                            
                            <div className="mb-4">
                                <label className="mb-2.5 block font-extrabold">
                                    Terms And Conditions
                                </label>
                                <div className="relative">
                                    <textarea
                                        placeholder="Enter termsAndConditions"
                                        {...register("termsAndConditions", { required: true })}
                                        className={inputClassName}
                                    />
                                </div>
                                {errors.termsAndConditions && (
                                    <div className="text-sm text-red-600">Terms And Conditions is required</div>
                                )}
                            </div>
                            <div className="mb-4">
                                <label className="inline-flex items-center cursor-pointer">
                                    <input type="checkbox" {...register("newUserOnly", { required: false })} value="" className="sr-only peer" />
                                    <div className="relative w-11 h-[26px] bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all border border-gray-600 peer-checked:bg-blue-600"></div>
                                    <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Toggle me</span>
                                </label>
                            </div>

                            <div className="mb-4">
                                <label className="mb-2.5 block font-extrabold">
                                    Select Date for new user
                                </label>
                                <div className="relative">
                                    <input
                                        type='date'
                                        placeholder="Enter termsAndConditions"
                                        {...register("newUserAfterDate", { required: false })}
                                        className={inputClassName}
                                    />
                                </div>
                                {errors.termsAndConditions && (
                                    <div className="text-sm text-red-600">New User After Date is required</div>
                                )}
                            </div>

                            <div className="">
                                <input
                                    type="submit"
                                    value="Submit"
                                    className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
                                />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AlertModel>
    )
}

export default CouponCU