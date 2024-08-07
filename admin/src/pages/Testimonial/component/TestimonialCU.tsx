
import BaseModal from '@/components/common/model';
import TinyMCEEditor from '@/components/Editor';
import {
  ITestimonial,
  TestimonialsAPI,
  TestimonialsDto,
} from '@/utils/api/testimonial.api';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

interface TestimonialCUProps {
  updateData?: ITestimonial;
  isOpen: boolean;
  toggleModal: () => void;
  fetchTestimonial: () => void;
}

const TestimonialCU: React.FC<TestimonialCUProps> = ({
  isOpen,
  toggleModal,
  updateData,
  fetchTestimonial,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<TestimonialsDto>({
    defaultValues: updateData
      ? {
        name: updateData.name,
        comments: updateData.comments,
        rating: updateData.rating,
      }
      : {},
  });
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const onSubmit = async (data: TestimonialsDto) => {
    setIsLoading(true);
    try {
      let res: any;
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('comments', data.comments);
      formData.append('rating', data.rating.toString());
      if (data.featuredImage instanceof File) {
        formData.append('featuredImage', data.featuredImage);
      }

      if (updateData?._id) {
        res = await TestimonialsAPI.updateById(updateData?._id, data);
      } else {
        res = await TestimonialsAPI.addNew(formData);
      }
      if (res.status) {
        toast.success(res.message);
        toggleModal();
        fetchTestimonial();
      }
    } catch (error: any) {
      toast.error(error?.message || 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  // Function to handle file input change
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setValue('featuredImage', file);
    }
  };

  return (
    <BaseModal isOpen={isOpen} toggleModal={toggleModal} heading="Testimonial">
      <div className="w-180 px-4">
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-5xl">
          {!updateData && (
            <div className="mb-4">
              <label className="mb-2.5 block font-medium">Featured Image</label>
              <input
                type="file"
                onChange={handleImageChange}
                className="w-full rounded-lg border border-stroke bg-transparent py-2 pl-2 pr-4 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
              {errors.featuredImage && (
                <div className="text-sm text-red-600">
                  Featured Image is required
                </div>
              )}
            </div>
          )}
          <div className="mb-4">
            <label className="mb-2.5 block font-medium">Enter Name</label>
            <input
              type="text"
              placeholder="Enter Name"
              {...register('name', { required: true })}
              className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
            {errors.name && (
              <div className="text-sm text-red-600">name is required</div>
            )}
          </div>
          <div className="mb-4">
            <label className="mb-2.5 block font-medium">
              Comment by student
            </label>

            <TinyMCEEditor
              initialValue={updateData?.comments || ''}
              placeholder='Enter comments'
              onEditorChange={(value) => setValue("comments", value)}
            />
            {errors?.comments && (
              <p className="text-xs text-red-600 mb-1">Comment is required</p>
            )}
          </div>

          <div className="mb-4">
            <label className="mb-2.5 block font-medium">Rate</label>
            <input
              type="number"
              min={0}
              max={5}
              placeholder="Enter rating"
              {...register('rating', { required: true, min: 0, max: 5 })}
              className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
            {errors?.rating && (
              <p className="text-xs text-red-600 mb-1">Comment is required</p>
            )}
          </div>
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
              'Submit'
            )}
          </button>
        </form>
      </div>
    </BaseModal>
  );
};

export default TestimonialCU;
