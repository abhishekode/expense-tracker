import React from 'react';
import { MdDelete, MdRemoveRedEye } from 'react-icons/md';
import { IBlog } from '@/utils/api/blogs.api';
import { Link } from 'react-router-dom';

interface BlogTableActionProps {
    data: IBlog;
}

const BlogTableAction: React.FC<BlogTableActionProps> = ({ data }) => {
    return (
        <div>
            <div className="flex gap-x-3 whitespace-nowrap capitalize mt-1">
                <button
                    className="bg-gray-500 hover:bg-gray-700 font-bold rounded bg-blue-600 text-white p-1"
                >
                    <Link to={`/blogs/${data.slug}`}>
                        <MdRemoveRedEye className='text-xl' />
                    </Link>
                </button>
                <button
                    className="hover:bg-red-500 font-bold rounded bg-red-600 text-white p-1"
                >
                    <MdDelete className='text-xl' />
                </button>
            </div>
        </div>
    );
};

export default BlogTableAction;
