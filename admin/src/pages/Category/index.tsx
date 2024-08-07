import React from 'react'
import { useCategory } from '@/context/categoryContext';
import { AgGridReact } from 'ag-grid-react';
import DefaultLayout from '@/layout/DefaultLayout';
import { ICategoryResponse } from '@/utils/api/category.api';
import CategoryTableAction from './component/CategoryAction';
import CategoryCU from './component/CategoryCU';

const CategoryList = () => {
    const { categories } = useCategory()
    const [isAddCategory, setIsAddCategory] = React.useState(false)


    const colDefs: any = [
        {
            field: '_id',
            headerName: 'Id',
            flex: 1,
            sortable: true,
        },
        {
            field: 'name',
            headerName: 'Name',
            flex: 1,
            sortable: true,
        },
        {
            field: 'buttons',
            flex: 1,
            filter: true,
            cellRenderer: (params: { data: ICategoryResponse }) => {
                return <CategoryTableAction data={params.data} />;
            },
        },

    ];

    const toggleCategoryModal = () => {
        setIsAddCategory(!isAddCategory)
    }



    return (
        <DefaultLayout>
            {isAddCategory&& <CategoryCU isOpen={isAddCategory} toggleModal={toggleCategoryModal}  />}
            <div className="flex gap-4 mb-8">
                <button onClick={toggleCategoryModal}>
                    <h4 className="rounded border bg-blue-500 text-gray px-5 py-1">
                        Add New Category
                    </h4>
                </button>
            </div>
            <div className="w-full h-full">
                <div className="ag-theme-quartz h-[500px]">
                    <AgGridReact className="w-full" rowData={categories} columnDefs={colDefs} />
                </div>
                {/* <div className='relative z-1 -mt-4'>
                    {categories?.length > 0 &&
                        <Pagination getRequestData={fetchAllBlogs} total={categories?.length} />
                    }
                </div> */}
            </div>
        </DefaultLayout>
    )
}

export default CategoryList