import React from 'react';
import { MdDelete, MdEdit } from 'react-icons/md';
import { ICategoryResponse } from '@/utils/api/category.api';
import CategoryCU from './CategoryCU';

interface CategoryTableActionProps {
    data: ICategoryResponse;
}

const CategoryTableAction: React.FC<CategoryTableActionProps> = ({ data }) => {
    const [isUpdateCategory, setIsUpdateCategory] = React.useState<boolean>(false)


    const toggleModal = () => {
        setIsUpdateCategory(!isUpdateCategory);
    }

    return (
        <div>
            {isUpdateCategory && <CategoryCU isOpen={isUpdateCategory} toggleModal={toggleModal} categoryData={data}  />}
            <div className="flex gap-x-3 py-3 px-6 whitespace-nowrap capitalize">
                <button
                    className="bg-gray-500 hover:bg-gray-700 font-bold rounded"
                    onClick={toggleModal}
                >
                    <MdEdit className='text-xl' />
                </button>
                <button
                    className="hover:bg-red-100 font-bold rounded"
                >
                    <MdDelete className='text-xl' />
                </button>
            </div>
        </div>
    );
};

export default CategoryTableAction;
