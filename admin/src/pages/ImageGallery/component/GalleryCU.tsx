import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { GalleryAPI, GalleryDto } from '@/utils/api/gallery.api';
import BaseModal from '@/components/common/model';
import { toast } from 'react-toastify';

interface GalleryCUProps {
  isOpen: boolean;
  toggleModel: () => void;
  fetchGallery: () => void;
}

const GalleryCU: React.FC<GalleryCUProps> = ({ fetchGallery, isOpen, toggleModel }) => {
  const { handleSubmit, formState: { errors }, setValue } = useForm<GalleryDto>();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: GalleryDto) => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      if (data.featuredImage.length) {
        data.featuredImage.forEach(file => formData.append('featuredImage', file));
      }

      const res = await GalleryAPI.addNew(formData);

      if (res.status) {
        toast.success(res.message);
        fetchGallery();
        toggleModel();
      }
    } catch (error: any) {
      toast.error(error?.message || 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setValue('featuredImage', Array.from(e.target.files));
    }
  };

  return (
    <BaseModal isOpen={isOpen} toggleModal={toggleModel} heading="Course">
      <div className="w-180 px-4">
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-5xl">
          <div className="mb-4">
            <label className="mb-2.5 block font-medium">Featured Image</label>
            <input
              type="file"
              onChange={handleImageChange}
              className="w-full rounded-lg border border-stroke bg-transparent py-2 pl-2 pr-4 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              multiple
            />
            {errors.featuredImage && (
              <div className="text-sm text-red-600">
                Featured Image is required
              </div>
            )}
          </div>

          <button
            type="submit"
            className="mb-4 bg-green-600 text-white font-semibold px-8 py-2 rounded-lg w-full"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <svg
                  className="animate-spin h-5 w-5 mr-3 border-dashed border-white"
                  viewBox="0 0 24 24"
                ></svg>
                <span>Submitting</span>
              </div>
            ) : (
              'Submit'
            )}
          </button>
        </form>
      </div>
    </BaseModal>
  );
};

export default GalleryCU;
