import { FilterTestimonialQuery, ITestimonial, ITestimonialResponse, TestimonialsAPI } from '@/utils/api/testimonial.api'
import React from 'react'
import TestimonialTableAction from './component/TestimonialTableAction'
import { toast } from 'react-toastify'
import DefaultLayout from '@/layout/DefaultLayout'
import { FilterBar } from '@/components/filters'
import { AgGridReact } from 'ag-grid-react'
import Pagination from '@/components/common/ui/PaginationFooter'
import TestimonialCU from './component/TestimonialCU'
import SwitchInput from '@/components/common/ui/switch'

const TestimonialList = () => {
    const initialValues: ITestimonialResponse = {
        testimonials: [],
        count: 0
    }
    const [state, setState] = React.useState<ITestimonialResponse>(initialValues)
    const [isOpenFilter, setIsOpenFilter] = React.useState<boolean>(false)
    const [filter, setFilter] = React.useState<FilterTestimonialQuery>({});
    const [activeFilters, setActiveFilters] = React.useState<{ [key: string]: string | boolean | any }>({});
    const [isAddTestimonial, setIsAddTestimonial] = React.useState<boolean>(false)

    const toggleFilterModal = () => {
        setIsOpenFilter(!isOpenFilter)
    }
    const handleFilterChange = <K extends keyof FilterTestimonialQuery>(name: K, value: FilterTestimonialQuery[K]) => {
        setFilter({ ...filter, [name]: value });
    }

    const handleClearFilter = () => {
        setFilter({})
        setActiveFilters({})
        fetchAllTestimonial()
    }

    const colDefs: any = [
        {
            field: 'name',
            headerName: 'Name',
            flex: 1,
            sortable: true,
        },
        {
            field: 'comments',
            headerName: 'comments',
            flex: 1,
            sortable: true,
            cellRenderer: (params: { data: ITestimonial }) => {
                
                return (
                    <div dangerouslySetInnerHTML={{ __html: params?.data?.comments }} />
                );
            },
        },
        {
            field: 'rating',
            headerName: 'rating',
            flex: 1,
            sortable: true,
        },
        {
            field: 'isActive', headerName: 'Active', flex: 1, sortable: true,
            cellRenderer: (params: { data: ITestimonial }) => {
                const active = params.data.isActive as boolean;

                const handleSwitchChange = (newValue: boolean) => {
                    
                    TestimonialsAPI.updateById(params.data._id, { isActive: newValue }).then(() => {
                        toast.success('Updated Successfully')
                        fetchAllTestimonial()
                    })
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
            cellRenderer: (params: { data: ITestimonial }) => {
                return <TestimonialTableAction data={params.data} fetchTestimonial={fetchAllTestimonial} />;
            },
        },
    ];

    const fetchAllTestimonial = async (query?: FilterTestimonialQuery) => {
        try {
            const res = await TestimonialsAPI.getAll(query)
            if (res.status) {
                setState(res.result)
            }
        } catch (error: any) {
            toast.error(error.message || 'something went wrong')
        }
    }


    const filterUserData = async () => {
        setActiveFilters(filter);
        await fetchAllTestimonial(filter);
    };

    React.useEffect(() => {
        fetchAllTestimonial()
    }, [])

    const handleFilterCancel = async (filterKey: string) => {
        const updatedFilters = { ...activeFilters };
        delete updatedFilters[filterKey];
        setActiveFilters(updatedFilters);
        setFilter(updatedFilters)
        await fetchAllTestimonial(updatedFilters);
    };

    const handleAddTestimonial = () => {
        setIsAddTestimonial(!isAddTestimonial)
    }

    return (
        <DefaultLayout>
            {isAddTestimonial && <TestimonialCU isOpen={isAddTestimonial} toggleModal={handleAddTestimonial} fetchTestimonial={fetchAllTestimonial} />}
            <div className="flex gap-4 mb-8">
                <h1 className='rounded border bg-blue-500 text-gray px-5 py-1 cursor-pointer' onClick={toggleFilterModal}>Filter</h1>
                <h1 className='rounded border bg-blue-500 text-gray px-5 py-1 cursor-pointer' onClick={handleClearFilter}>Clear Filter</h1>
                <button onClick={handleAddTestimonial}>
                    <h4 className="rounded border bg-blue-500 text-gray px-5 py-1">
                        New Testimonial
                    </h4>
                </button>
            </div>
            {Object.entries(activeFilters).length > 0 && <FilterBar activeFilters={activeFilters} onFilterCancel={handleFilterCancel} />}
            <div className="w-full h-full">
                <div className="ag-theme-quartz h-[500px]">
                    <AgGridReact className="w-full" rowData={state.testimonials} columnDefs={colDefs} />
                </div>
                <div className='relative z-1 -mt-4'>
                    {state.testimonials?.length > 0 &&
                        <Pagination getRequestData={fetchAllTestimonial} total={state.count} />
                    }
                </div>
            </div>
        </DefaultLayout>
    )
}

export default TestimonialList