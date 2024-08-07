import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import NotFound from '../../NotFound';
import { BlogAPI, IBlog } from '@/utils/api/blogs.api';
import { toast } from 'react-toastify';
import AddUpdateBlog from './AddUpdateBlog';
import DefaultLayout from '@/layout/DefaultLayout';

const CreateNewBlog = () => {
    const [blogData, setBlogData] = useState<IBlog | undefined>();
    const { slug } = useParams<{ slug: string }>();

    useEffect(() => {
        if (!slug || slug === 'create') return;

        const fetchSingleBlogs = async () => {
            try {
                const res = await BlogAPI.getOne(slug);
                if (res.status) {
                    setBlogData(res.result);
                } else {
                    throw new Error(res.message || 'Failed to fetch blog data');
                }
            } catch (error: any) {
                toast.error(error.message || 'Something went wrong');
            }
        };

        fetchSingleBlogs();
    }, [slug]);

    const memoizedUpdateData = React.useMemo(() => {
        return slug === 'create' ? undefined : blogData;
    }, [slug, blogData]);


    return (
        <DefaultLayout>
            <h1>{slug === 'create' ? 'Create' : 'Update'} Blog</h1>
            <div>
                <AddUpdateBlog updateData={memoizedUpdateData} />
            </div>
        </DefaultLayout>
    );
};

export default CreateNewBlog;
