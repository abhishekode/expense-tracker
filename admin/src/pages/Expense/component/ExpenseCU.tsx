import { ExpenseCategory } from '@/constant/interfaces';
import React from 'react'
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { CreateNewExpense, ExpenseAPI, IExpense } from '@/utils/api/expense.api';
import BaseModal from '@/components/common/model';
import { MultiSelect } from "react-multi-select-component";


interface ExpenseCUProps {
    isOpen: boolean;
    toggleModal: () => void;
    fetchExpense: () => void;
    updateData?: IExpense;
}
const ExpenseCU: React.FC<ExpenseCUProps> = ({ fetchExpense, isOpen, toggleModal, updateData }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<CreateNewExpense>({
        defaultValues: updateData ? {
            title: updateData.title,
            amount: updateData.amount,
            category: updateData.category,
            description: updateData.description,
        } : {}
    });
    const [selected, setSelected] = React.useState<{ label: string, value: string }[]>([]);

    const options = Object.values(ExpenseCategory).map((category) => ({ label: category, value: category }));


    const onSubmit = async (data: CreateNewExpense) => {
        try {
            let res: any;
            if (updateData?._id) {

                res = await ExpenseAPI.update(updateData?._id, {
                    title: data.title,
                    amount: Number(data.amount),
                    category: selected[0].value,
                    description: data.description,
                });

            } else {
                res = await ExpenseAPI.create({...data, category: selected[0].value, amount: Number(data.amount)});
            }
            if (res.status) {
                toast.success(res.message, {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 1000,
                });
                fetchExpense()
                toggleModal()
            }
        } catch (error: any) {
            toast.error(error?.message || "Something went wrong", {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 1000,
            });
        }
    }

    const inputClassName = "w-full rounded-lg border border-slate-300 bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary";

    React.useEffect(() => {
        if (updateData?.category) {
            setSelected((prev) =>
                prev
                    ? [{ label: updateData.category, value: updateData.category }]
                    : prev
            );
        }
    }, [updateData?.category]);



    return (
        <BaseModal isOpen={isOpen} toggleModal={toggleModal} heading='Add Expense'>
            <div className='bg-gray w-full h-full max-h-[80vh] flex flex-col items-center overflow-y-auto'>
                <div className="w-full max-w-lg">
                    <div className="w-full p-4">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="mb-4">
                                <label className="mb-2.5 block font-extrabold">
                                    Title
                                </label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Enter Title"
                                        {...register("title", { required: true })}
                                        className={inputClassName}
                                    />
                                </div>
                                {errors.title && (
                                    <div className="text-sm text-red-600">Title is required</div>
                                )}
                            </div>

                            <div className="mb-4">
                                <label className="mb-2.5 block font-extrabold">
                                    Expense Overview
                                </label>
                                <div className="relative">
                                    <textarea
                                        placeholder="Enter Expense Overview"
                                        {...register("description", { required: true })}
                                        className={inputClassName}
                                    />
                                </div>
                                {errors.description && (
                                    <div className="text-sm text-red-600">Description is required</div>
                                )}
                            </div>
                            <div className="mb-4">
                                <label className="mb-2.5 block font-extrabold">
                                    Expense type
                                </label>

                                <MultiSelect
                                    options={options}
                                    value={selected}
                                    onChange={setSelected}
                                    labelledBy="Select"
                                    className={'py-2'}
                                />
                                {errors.description && (
                                    <div className="text-sm text-red-600">Description is required</div>
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
                                        {...register("amount", { required: true })}
                                        className={inputClassName}
                                    />
                                </div>
                                {errors.amount && (
                                    <div className="text-sm text-red-600">Amount is required</div>
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
        </BaseModal>
    )
}

export default ExpenseCU