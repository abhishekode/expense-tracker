import SwitchInput from '@/components/common/ui/switch'
import { IBlogResponse, BlogAPI, BlogFilterQuery, IBlog } from '@/utils/api/blogs.api'
import React from 'react'
import { toast } from 'react-toastify'
import BlogTableAction from './component/BlogTableAction'
import { FilterBar } from '@/components/filters'
import { AgGridReact } from 'ag-grid-react'
import Pagination from '@/components/common/ui/PaginationFooter'
import DefaultLayout from '@/layout/DefaultLayout'
import { Link } from 'react-router-dom'

const BlogList = () => {
    const initialValues: IBlogResponse = {
        blogs: [],
        count: 0
    }
    const [state, setState] = React.useState<IBlogResponse>(initialValues)
    const [isOpenFilter, setIsOpenFilter] = React.useState<boolean>(false)
    const [filter, setFilter] = React.useState<BlogFilterQuery>({});
    const [activeFilters, setActiveFilters] = React.useState<{ [key: string]: string | boolean | any }>({});

    const toggleFilterModal = () => {
        setIsOpenFilter(!isOpenFilter)
    }
    const handleFilterChange = <K extends keyof BlogFilterQuery>(name: K, value: BlogFilterQuery[K]) => {
        setFilter({ ...filter, [name]: value });
    }

    const handleClearFilter = () => {
        setFilter({})
        setActiveFilters({})
        fetchAllBlogs()
    }

    const colDefs: any = [
        {
            field: 'title',
            headerName: 'Title',
            flex: 1,
            sortable: true,
        },
        {
            field: 'slug',
            headerName: 'slug',
            flex: 1,
            sortable: true,
        },
        {
            field: 'isPublished', headerName: 'Published', flex: 1, sortable: true,
            cellRenderer: (params: { data: IBlog }) => {
                const active = params.data.isPublished as boolean;

                const handleSwitchChange = (newValue: boolean) => {
                    // handleUpdateUser(params.data._id, { isAccountDeactivated: newValue });
                    BlogAPI.updateById(params.data._id, { isPublished: newValue}).then(() => {
                        toast.success('Updated Successfully')
                        fetchAllBlogs()
                    });

                };

                return (
                    <div className="flex items-center h-full">
                        <SwitchInput
                            initialValue={active}
                            onChange={handleSwitchChange}
                        />
                    </div>
                );
            },
        },
        {
            field: 'buttons',
            flex: 1,
            filter: true,
            cellRenderer: (params: { data: IBlog }) => {
                return <BlogTableAction data={params.data} />;
            },
        },
    ];

    const fetchAllBlogs = async (query?: BlogFilterQuery) => {
        try {
            const res = await BlogAPI.getAll(query)
            if (res.status) {
                setState(res.result)
            }
        } catch (error: any) {
            toast.error(error.message || 'something went wrong')
        }
    }


    const filterUserData = async () => {
        setActiveFilters(filter);
        await fetchAllBlogs(filter);
    };

    React.useEffect(() => {
        fetchAllBlogs()
    }, [])

    const handleFilterCancel = async (filterKey: string) => {
        const updatedFilters = { ...activeFilters };
        delete updatedFilters[filterKey];
        setActiveFilters(updatedFilters);
        setFilter(updatedFilters)
        await fetchAllBlogs(updatedFilters);
    };

    return (
        <DefaultLayout>
            <div className="flex gap-4 mb-8">
                <h1 className='rounded border bg-blue-500 text-gray px-5 py-1 cursor-pointer' onClick={toggleFilterModal}>Filter</h1>
                <h1 className='rounded border bg-blue-500 text-gray px-5 py-1 cursor-pointer' onClick={handleClearFilter}>Clear Filter</h1>
                <Link to={`/blogs/create`}>
                    <h4 className="rounded border bg-blue-500 text-gray px-5 py-1">
                        Add New Blog
                    </h4>
                </Link>
            </div>
            {Object.entries(activeFilters).length > 0 && <FilterBar activeFilters={activeFilters} onFilterCancel={handleFilterCancel} />}
            <div className="w-full h-full">
                <div className="ag-theme-quartz h-[500px]">
                    <AgGridReact className="w-full" rowData={state.blogs} columnDefs={colDefs} />
                </div>
                <div className='relative z-1 -mt-4'>
                    {state.blogs?.length > 0 &&
                        <Pagination getRequestData={fetchAllBlogs} total={state.count} />
                    }
                </div>
            </div>
        </DefaultLayout>
    )
}

export default BlogList