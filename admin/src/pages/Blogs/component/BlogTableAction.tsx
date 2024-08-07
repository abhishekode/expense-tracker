import React from 'react';
import { MdDelete, MdRemoveRedEye } from 'react-icons/md';
import { IBlog } from '@/utils/api/blogs.api';

interface BlogTableActionProps {
    data: IBlog;
}

const BlogTableAction: React.FC<BlogTableActionProps> = ({ data }) => {
    return (
        <div>
            <div className="flex gap-x-3 py-3 px-6 whitespace-nowrap capitalize">
                <button
                    className="bg-gray-500 hover:bg-gray-700 font-bold rounded"
                >
                    <MdRemoveRedEye className='text-xl' />
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

export default BlogTableAction;
