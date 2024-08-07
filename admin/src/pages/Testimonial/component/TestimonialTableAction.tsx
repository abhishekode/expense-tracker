import React from 'react';
import { MdDelete, MdEdit, MdRemoveRedEye } from 'react-icons/md';
import { ITestimonial } from '@/utils/api/testimonial.api';
import TestimonialCU from './TestimonialCU';

interface TestimonialTableActionProps {
    data: ITestimonial;
    fetchTestimonial: () => void;
}

const TestimonialTableAction: React.FC<TestimonialTableActionProps> = ({ data, fetchTestimonial }) => {
    const [isUpdateTestimonial, setIsUpdateTestimonial] = React.useState<boolean>(false)


    const toggleModal = () => {
        setIsUpdateTestimonial(!isUpdateTestimonial);
    }

    return (
        <div>
            {isUpdateTestimonial && <TestimonialCU
                isOpen={isUpdateTestimonial}
                toggleModal={toggleModal}
                fetchTestimonial={fetchTestimonial}
                updateData={data} />
            }
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

export default TestimonialTableAction;
