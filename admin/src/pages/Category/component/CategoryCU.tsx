import BaseModal from '@/components/common/model';
import { useCategory } from '@/context/categoryContext';
import { CategoryAPI, CreateCategoryDto, ICategoryResponse } from '@/utils/api/category.api';
import React from 'react'
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

interface CategoryCUProps {
    isOpen: boolean;
    toggleModal: () => void;
    categoryData?: ICategoryResponse;
}
const CategoryCU: React.FC<CategoryCUProps> = ({ isOpen, categoryData, toggleModal }) => {
    const { register, handleSubmit, formState: { errors }, setValue } = useForm<CreateCategoryDto>({
        defaultValues: categoryData ? {
            name: categoryData.name
        } : {}
    });
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const { fetchCategories } = useCategory();

    const onSubmit = async (data: CreateCategoryDto) => {
        setIsLoading(true);
        try {
            const formData = new FormData();
            formData.append("name", data.name);
            if (data.categoryImage instanceof File) {
                formData.append("categoryImage", data.categoryImage);
            }

            let res: any;
            if (categoryData?._id) {
                res = await CategoryAPI.updateById(categoryData?._id, formData);
            } else {
                res = await CategoryAPI.addNew(formData);
            }
            if (res.status) {
                toast.success(res.message);
                fetchCategories()
                toggleModal()
            }
        } catch (error: any) {
            toast.error(error?.message || "Something went wrong");
        } finally {
            setIsLoading(false);
        }
    };

    // Function to handle file input change
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setValue("categoryImage", file);
        }
    };

    return (
        <BaseModal isOpen={isOpen} toggleModal={toggleModal} heading='Category'>
            <div className="px-4">
                <form onSubmit={handleSubmit(onSubmit)} className='max-w-5xl'>
                    <div className="mb-4">
                        <label className="mb-2.5 block font-medium">Title</label>
                        <input
                            type="text"
                            placeholder="Enter Title"
                            {...register("name", { required: true })}
                            className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        />
                        {errors.name && (
                            <div className="text-sm text-red-600">Name is required</div>
                        )}
                    </div>

                    {!categoryData?._id && <div className="mb-4">
                        <label className="mb-2.5 block font-medium">Featured Image</label>
                        <input
                            type="file"
                            onChange={handleImageChange}
                            className="w-full rounded-lg border border-stroke bg-transparent py-2 pl-2 pr-4 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        />
                        {errors.categoryImage && (
                            <div className="text-sm text-red-600">Featured Image is required</div>
                        )}

                    </div>}

                    <button
                        type="submit"
                        className="mb-4 bg-green-600 text-white font-semibold px-8 py-2 rounded-lg w-full"
                    >
                        {isLoading ? (
                            <p className='flex justify-center items-center'>
                                <svg
                                    className="animate-spin h-5 w-5 rounded-full border-dashed border border-white"
                                    viewBox="0 0 24 24"
                                ></svg>
                                <span>submitting</span>
                            </p>
                        ) : (
                            "Submit"
                        )}
                    </button>
                </form>
            </div>
        </BaseModal>
    );
};

export default CategoryCU