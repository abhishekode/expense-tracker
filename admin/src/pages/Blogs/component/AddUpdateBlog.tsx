import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { BlogAPI, IBlog, CreateBlogDto } from '@/utils/api/blogs.api';
import { useCategory } from '@/context/categoryContext';
import MarkdownEditor from '@uiw/react-markdown-editor';

interface AddUpdateBlogProps {
    updateData?: IBlog;
}

const AddUpdateBlog: React.FC<AddUpdateBlogProps> = ({ updateData }) => {
    const [activeTab, setActiveTab] = useState<number>(1)
    const { register, handleSubmit, formState: { errors }, getValues, setValue, clearErrors, setError } = useForm<CreateBlogDto>();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { categories } = useCategory();
    const navigate = useNavigate();

    const onSubmit = async (data: CreateBlogDto) => {
        setIsLoading(true);
        try {
            console.log('data', data)
            const tags = ['tags', 'test_tags'];
            const formData = new FormData();
            formData.append("title", data.title);
            formData.append("category", data.category);
            formData.append("content", data.content);
            tags.forEach((tag) => formData.append('tags[]', tag));
            // Append the featured image if it exists
            if (data.featuredImage instanceof File) {
                formData.append("featuredImage", data.featuredImage);
            }
            const featuredImage = getValues("featuredImage");

            if (!featuredImage && !updateData?._id) {
                setError("featuredImage", {
                    type: "manual",
                    message: "featuredImage is required",
                });
                return;
            } else {
                clearErrors("featuredImage");
            }


            let res: any;
            if (updateData?._id) {
                res = await BlogAPI.updateById(updateData?._id, formData);
            } else {
                res = await BlogAPI.addNew(formData);
            }
            if (res.status) {
                toast.success(res.message);
                navigate("/blogs");
            }
        } catch (error: any) {
            toast.error(error?.message || "Something went wrong");
        } finally {
            setIsLoading(false);
        }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setValue("featuredImage", file);
        }
    };
    const validateStep1 = () => {
        const title = getValues("title");
        const content = getValues("content");

        let hasError = false;

        if (!title) {
            setError("title", {
                type: "manual",
                message: "Title is required",
            });
            hasError = true;
        } else {
            clearErrors("title");
        }

        if (!content) {
            setError("content", {
                type: "manual",
                message: "Content is required",
            });
            hasError = true;
        } else {
            clearErrors("content");
        }

        return !hasError;
    };


    React.useEffect(() => {
        if (updateData) {
            setValue("title", updateData.title);
            setValue("category", updateData.category);
            setValue("content", updateData.content);
        }
    }, [updateData, setValue]);

    return (
        <div className="">
            <form onSubmit={handleSubmit(onSubmit)} className='max-w-5xl'>
                {activeTab === 2 && <div className="grid grid-cols-2 gap-2 mt-5 items-center">
                    <div className="mb-4">
                        <label className="mb-2.5 block font-medium">Category</label>
                        {categories.length > 0 ? <select
                            {...register("category", { required: true })}
                            className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        >
                            <option value="">Select Category</option>
                            {categories.map((category) => (
                                <option value={category._id} key={category._id}>
                                    {category.name}
                                </option>
                            ))}
                        </select> : <p>No category found, <Link to={'/app-data/category/list'}>Add Category</Link></p>}
                        {errors?.category && (
                            <p className="text-xs text-red-600 mb-1">Category is required</p>
                        )}
                    </div>
                    <div className="mb-4">
                        <label className="mb-2.5 block font-medium">Featured Image</label>
                        <input
                            type="file"
                            onChange={handleImageChange}
                            className="w-full rounded-lg border border-stroke bg-transparent py-2 pl-2 pr-4 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        />
                        {errors.featuredImage && (
                            <div className="text-sm text-red-600">Featured Image is required</div>
                        )}
                    </div>
                </div>}
                {activeTab === 1 &&
                    <div className="">
                        <div className="mb-4">
                            <label className="mb-2.5 block font-medium">Title</label>
                            <input
                                type="text"
                                placeholder="Enter Title"
                                {...register("title", { required: true })}
                                className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            />
                            {errors.title && (
                                <div className="text-sm text-red-600">Title is required</div>
                            )}
                        </div>

                        <div className="mb-4">
                            <label className="mb-2.5 block font-medium">Content</label>
                            <MarkdownEditor
                                height='50vh'
                                value={updateData?.content || getValues("content")}
                                onChange={(value) => {
                                    setValue("content", value);
                                }}
                            />
                            {errors.content && (
                                <div className="text-sm text-red-600">Content is required</div>
                            )}
                        </div>
                    </div>
                }
                {activeTab === 1 && <div>
                    <button
                        type='button'
                        className='mb-4 bg-green-600 text-white font-semibold px-8 py-2 rounded-lg flex justify-center items-center'
                        onClick={() => {
                            if (validateStep1()) {
                                setActiveTab(2);
                            }
                        }}
                    >
                        Next
                    </button>

                </div>}
                {activeTab === 2 && <div className='flex gap-4 items-center'>
                    <button
                        type='button'
                        className='mb-4 bg-green-600 text-white font-semibold px-8 py-2 rounded-lg flex justify-center items-center'
                        onClick={() => setActiveTab(1)}
                    >
                        Back
                    </button>

                    <button
                        type="submit"
                        className="mb-4 bg-green-600 uppercase text-white font-semibold px-8 py-2 rounded-lg flex justify-center items-center"
                    >
                        {isLoading ? (
                            <svg
                                className="animate-spin h-5 w-5 rounded-full border-dashed border border-white"
                                viewBox="0 0 24 24"
                            ></svg>
                        ) : (
                            `${updateData?.title ? 'Update' : 'Add'} Post`
                        )}
                    </button>
                </div>}

            </form >
        </div >
    );
};

export default AddUpdateBlog;
