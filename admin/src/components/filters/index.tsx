import React from 'react';
import { RiCloseLine } from "react-icons/ri";

interface FilterComponentProps {
    filterKey: string;
    filterValue: string | boolean;
    onCancel: (filterKey: string) => void;
}

const FilterComponent: React.FC<FilterComponentProps> = ({ filterKey, filterValue, onCancel }) => {
    return (
        <div className="flex items-center h-auto gap-2 border py-1 px-2 rounded">
            <span
                className='font-semibold first-letter:uppercase'
            >
                {filterKey}: {typeof filterValue === 'boolean' ? (filterValue ? 'true' : 'false') : filterValue}
            </span>
            <button
                className='text-whiten bg-blue-500 rounded-full mt-[2px] p-1'
                onClick={() => onCancel(filterKey)}>
                <RiCloseLine className='text-sm' />
            </button>
        </div>
    );
};

interface FilterBarProps {
    activeFilters: { [key: string]: string | boolean | any };
    onFilterCancel: (filterKey: string) => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({ activeFilters, onFilterCancel }) => {
    return (
        <div className="flex gap-3 h-10 items-center pl-2 mb-5 flex-wrap">
            {Object.entries(activeFilters).map(([key, value]) => (
                <FilterComponent
                    key={key}
                    filterKey={key}
                    filterValue={value}
                    onCancel={onFilterCancel}
                />
            ))}
        </div>
    );
};