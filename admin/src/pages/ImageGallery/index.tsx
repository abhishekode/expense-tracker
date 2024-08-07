import React from 'react';
import {
  GalleryAPI,
  IGalleryResponse,
  IGallery,
  FilterGalleryQuery,
} from '@/utils/api/gallery.api';
import { toast } from 'react-toastify';
import GalleryCU from './component/GalleryCU';
import DefaultLayout from '@/layout/DefaultLayout';
import SingleGallery from './component/SingleGallery';

const ImageGalleryList = () => {
  const [state, setState] = React.useState<IGalleryResponse>({
    gallery: [],
    count: 0,
  });
  const [isAddNewGallery, setIsAddNewGallery] = React.useState<boolean>(false);

  const toggleModal = () => {
    setIsAddNewGallery(!isAddNewGallery);
  };

  const fetchAllGallery = async (query?: FilterGalleryQuery) => {
    try {
      const res = await GalleryAPI.getAll(query);
      if (res.status) {
        setState(res.result);
      }
    } catch (error: any) {
      toast.error(error.message || 'something went wrong');
    }
  };

  React.useEffect(() => {
    fetchAllGallery();
  }, []);

  return (
    <DefaultLayout>
      <div>
        {isAddNewGallery && (
          <GalleryCU
            isOpen={isAddNewGallery}
            toggleModel={toggleModal}
            fetchGallery={fetchAllGallery}
          />
        )}
        <div className="flex gap-4 mb-8">
          <button onClick={toggleModal}>
            <h4 className="rounded border bg-blue-500 text-gray px-5 py-1">
              Add New Gallery
            </h4>
          </button>
        </div>

        {state.count > 0 ? (
          <div className="grid grid-cols-3 gap-4">
            {state.gallery.map((gallery) => (
              <div className="" key={gallery._id}>
                <SingleGallery
                  gallery={gallery}
                  fetchGallery={fetchAllGallery}
                />
                {/* <img src={gallery.featuredImage} alt={'gallery-data'}  className='object-cover'/> */}
              </div>
            ))}
          </div>
        ) : (
          <div className="">
            No data found,{' '}
            <span onClick={toggleModal} className="cursor-pointer">
              Add New Gallery
            </span>{' '}
          </div>
        )}
      </div>
    </DefaultLayout>
  );
};

export default ImageGalleryList;
