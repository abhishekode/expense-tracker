import React from 'react'
import { MdDelete, MdModeEdit } from 'react-icons/md';
import CouponCU from './ExpenseCU';
import { toast } from 'react-toastify';
import DeleteAlertModel from '@/components/common/model/DeleteAlertModel';
import { ExpenseAPI, IExpense } from '@/utils/api/expense.api';

interface CouponTableActionProps {
    data: IExpense;
    fetchExpenses: () => void;
}
const ExpenseTableAction: React.FC<CouponTableActionProps> = ({ data, fetchExpenses }) => {
    const [isUpdate, setIsUpdate] = React.useState(false)
    const [isDeleteCoupon, setIsDeleteCoupon] = React.useState<boolean>(false)

    const toggleDeleteAlertModel = () => {
        setIsDeleteCoupon(!isDeleteCoupon)
    }

    const handleDeleteCoupon = () => {
        ExpenseAPI.delete(data._id).then((res) => {
            if (res.status) {
                toast.success(res.message, {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 1000,
                });
                fetchExpenses();
            }
        })
    }


    const toggleUpdateModel = () => {
        setIsUpdate(!isUpdate)
    }
    return (
        <div>
            {isUpdate && <CouponCU
                isOpen={isUpdate}
                toggleModal={toggleUpdateModel}
                fetchExpense={fetchExpenses}
                updateData={data}
            />}
              {isDeleteCoupon &&
                <DeleteAlertModel
                    isOpen={isDeleteCoupon}
                    onDelete={handleDeleteCoupon}
                    toggleModal={toggleDeleteAlertModel}
                    deleteFor={'Coupon'}
                />
            }
            <div className="flex gap-x-3 whitespace-nowrap capitalize mt-1">
                <button
                    className="bg-gray-500 hover:bg-gray-700 font-bold rounded bg-blue-600 text-white p-1"
                    onClick={toggleUpdateModel}
                >
                    <MdModeEdit className='text-xl' />
                </button>
                <button
                    className="hover:bg-red-500 font-bold rounded bg-red-600 text-white p-1"
                    onClick={toggleDeleteAlertModel}
                >
                    <MdDelete className='text-xl' />
                </button>
            </div>
        </div>
    )
}

export default ExpenseTableAction