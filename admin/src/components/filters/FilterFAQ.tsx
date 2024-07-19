import React from 'react';
import { IFilterFAQ } from '../common/Interfaces/filter.interface';
import BaseModal from '../common/model';
import { IsActiveFilter } from '../common/Interfaces';

interface FilterFAQ {
    isOpen: boolean;
    toggleModal: () => void;
    state: IFilterFAQ;
    handleFilter: <K extends keyof IFilterFAQ>(name: K, value: any) => void;
    clearFilter: () => void;
    applyFilter: () => void;
}

const FilterFAQ: React.FC<FilterFAQ> = (props) => {
    const { isOpen, toggleModal, state, handleFilter, clearFilter, applyFilter } = props;
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        let isActiveValue: boolean | undefined = undefined;

        if (name === 'isActive' && value === IsActiveFilter.Active) {
            isActiveValue = true;
        } else if (name === 'isActive' && value === IsActiveFilter.InActive) {
            isActiveValue = false;
        }

        const filterValue = name === 'isActive' ? isActiveValue : value;
        handleFilter(name as keyof IFilterFAQ, filterValue);
    };

    const handleClearFilter = () => {
        clearFilter()
        toggleModal()
    }

    const handleApplyFilter = () => {
        applyFilter()
        toggleModal()
    }




    return (
        <BaseModal isOpen={isOpen} toggleModal={toggleModal} heading='Filter Faqs'>
            <div className="my-4">

                <input
                    type="text"
                    name="title"
                    value={state.title || ''}
                    onChange={handleChange}
                    placeholder="Enter title"
                    className='py-3 max-w-md w-full bg-gray my-4 text-slate-900 border px-4 rounded dark:bg-slate-800 dark:text-gray'
                />
                {<input
                    type="text"
                    name="description"
                    value={state.description || ''}
                    onChange={handleChange}
                    placeholder="Enter Description"
                    className='py-3 max-w-md w-full bg-gray my-4 text-slate-900 border px-4 rounded dark:bg-slate-800 dark:text-gray'
                />}
                <select
                    name="isActive"
                    value={(state.isActive !== undefined ? (state.isActive ? IsActiveFilter.Active : IsActiveFilter.InActive) : '')}
                    className='py-3 max-w-md w-full bg-gray my-4 text-slate-900 border px-4 rounded dark:bg-slate-800 dark:text-gray'
                    onChange={handleChange}
                >
                    <option value="">{state.isActive ? 'All' : 'Select status'}</option>
                    {Object.values(IsActiveFilter).map((status) => (
                        <option key={status} value={status}>{status}</option>
                    ))}
                </select>
                <div className="flex w-full gap-5 px-2 mt-10 absolute bottom-8 left-0">
                    <button onClick={handleClearFilter} className='border px-5 py-2 rounded-lg w-full'>Clear</button>
                    <button onClick={handleApplyFilter} className='border px-5 py-2 rounded-lg w-full bg-slate-800 text-white'>apply</button>
                </div>
            </div>
        </BaseModal>
    );
};

export default FilterFAQ;
