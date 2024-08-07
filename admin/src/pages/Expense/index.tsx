import { radDateFormatter } from '@/utils';
import React from 'react'
import CouponTableAction from './component/CouponTableAction';
import { toast } from 'react-toastify';
import { AgGridReact } from 'ag-grid-react';
import Pagination from '@/components/common/ui/PaginationFooter';
import DefaultLayout from '@/layout/DefaultLayout';
import BreadCrumb from '@/components/common/ui/BreadCrumb';
import CouponCU from './component/CouponCU';
import { ExpenseAPI, IExpenseResponse, IExpense } from '@/utils/api/expense.api';

const ExpenseList = () => {
    const [state, setState] = React.useState<IExpenseResponse>({
        expense: [],
        count: 0
    })
    const [addCoupon, setAddCoupon] = React.useState(false);
    const [isOpenFilter, setIsOpenFilter] = React.useState(false);
    const [filter, setFilter] = React.useState<any>({});

    const colDefs: any = [
        { field: 'title', headerName: 'title', flex: 1, sortable: true },
        { field: 'amount', headerName: 'Amount', flex: 1, sortable: true },
        { field: 'category', headerName: 'category', flex: 1, sortable: true },
        { field: 'description', headerName: 'description', flex: 0.5, sortable: true },
        {
            field: 'createdAt',
            headerName: 'Created At',
            flex: 1,
            sortable: true,
            cellRenderer: (params: { data: IExpense }) => {
                const date = params?.data?.createdAt as Date
                return (
                    <div className="flex items-center h-full">
                        {radDateFormatter(date)}
                    </div>
                );
            }
        },
        {
            field: 'Actions',
            flex: 0.6,
            filter: true,
            cellRenderer: (params: { data: IExpense }) => {
                return <CouponTableAction data={params.data} fetchCoupon={fetchCoupon} />;
            },
        },

    ];

    const fetchCoupon = async (query?: any) => {
        try {
            const res = await ExpenseAPI.getAll({ ...query })
            if (res.status) {
                setState(res.result)
            }
        } catch (error: any) {
            toast.error(error.message || 'something went wrong', {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 1000,
            })
        }
    }
    React.useEffect(() => {
        fetchCoupon()
    }, [])

    const toggleModal = () => {
        setAddCoupon(!addCoupon)
    }
    return (
        <DefaultLayout>
            {addCoupon && <CouponCU isOpen={addCoupon} fetchCoupon={fetchCoupon} toggleModal={toggleModal} />}
            <div>
                <BreadCrumb pageName='Coupon' />
                <div className="flex gap-4 mb-8 justify-end">
                    <h1 className='text-xl rounded border bg-blue-500 text-gray px-5 py-1 cursor-pointer'>Filter</h1>
                    <h1 className='text-xl rounded border bg-blue-500 text-gray px-5 py-1 cursor-pointer'>Clear Filter</h1>
                    <button>
                        <h4 className="text-xl rounded border bg-blue-500 text-gray px-5 py-1" onClick={toggleModal}>
                            Add Coupon
                        </h4>
                    </button>
                </div>
                <div className="w-full h-full">
                    <div className="ag-theme-quartz h-[500px] pb-4">
                        {state.expense &&
                            <AgGridReact className="w-full" rowData={state.expense} columnDefs={colDefs} />
                        }
                    </div>
                    <div className='relative z-1 -mt-4'>
                        {state.expense?.length > 0 &&
                            <Pagination getRequestData={fetchCoupon} total={state.count} />
                        }
                    </div>
                </div>
            </div>
        </DefaultLayout>
    )
}

export default ExpenseList