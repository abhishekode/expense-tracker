import DeleteAlertModel from '@/components/common/model/DeleteAlertModel';
import { GalleryAPI, IGallery } from '@/utils/api/gallery.api';
import React from 'react';
import { MdDelete } from 'react-icons/md';
import { toast } from 'react-toastify';

interface SingleGalleryProps {
  gallery: IGallery;
  fetchGallery: ()=> void;
}

const SingleGallery: React.FC<SingleGalleryProps> = ({ gallery,fetchGallery }) => {
  const [isDelete, setIsDelete] = React.useState(false);
  const [isDeleting, setIsDeleting] = React.useState(false)

  const handleDeleteGallery = async () => {
    setIsDeleting(true)
    try {
      const res = await GalleryAPI.deleteById(gallery._id);
      if (res.status) {
        toast.success(res.message);
        toggleDeleteModal()
        fetchGallery();
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
        setIsDeleting(false);
    }
  };

  const toggleDeleteModal = () => {
    setIsDelete(!isDelete);
  };

  return (
    <React.Fragment>
      {isDelete && (
        <DeleteAlertModel
          isOpen={isDelete}
          toggleModal={toggleDeleteModal}
          deleteFor="Gallery Image"
          onDelete={handleDeleteGallery}
        />
      )}
      <div className="relative">
        <img
          src={gallery.featuredImage}
          alt={gallery._id}
          className="object-cover"
        />
        <button className="absolute right-2 top-2 bg-white rounded-full p-2" onClick={toggleDeleteModal}>
          <MdDelete className="text-red-700 text-2xl" />
        </button>
      </div>
    </React.Fragment>
  );
};

export default SingleGallery;
