import React from 'react';
import { FilterCarModel } from '../common/Interfaces/filter.interface';
import BaseModal from '../common/model';
import { ICarCompanyResponse, IsActiveFilter } from '../common/Interfaces';
import { toast } from 'react-toastify';
import { getCarCompany } from '@/utils/api.method';

interface FilterCarProps {
    isOpen: boolean;
    toggleModal: () => void;
    state: FilterCarModel;
    handleFilter: <K extends keyof FilterCarModel>(name: K, value: any) => void;
    clearFilter: () => void;
    isForCarCompany: boolean;
    applyFilter: () => void;
}

const FilterCar: React.FC<FilterCarProps> = (props) => {
    const { isOpen, toggleModal, state, handleFilter, clearFilter, isForCarCompany, applyFilter } = props;
    const [states, setState] = React.useState<ICarCompanyResponse>({
        carCompany: [],
        total: 0
    })
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        let isActiveValue: boolean | undefined = undefined;

        if (name === 'isActive' && value === IsActiveFilter.Active) {
            isActiveValue = true;
        } else if (name === 'isActive' && value === IsActiveFilter.InActive) {
            isActiveValue = false;
        }

        const filterValue = name === 'isActive' ? isActiveValue : value;
        handleFilter(name as keyof FilterCarModel, filterValue);
    };

    const handleClearFilter = () => {
        clearFilter()
        toggleModal()
    }

    const handleApplyFilter = () => {
        applyFilter()
        toggleModal()
    }

    const getRequestData = async (query?: any) => {
        try {
            const res = await getCarCompany({size: 100, ...query});
            if (res) {
                setState(res.result)
            }
        } catch (error: any) {
            toast.error(error.message || 'something went wrong', {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 1000, 
            })
        }
    }


    React.useEffect(() => {
        if (isForCarCompany) { getRequestData() }
    }, []);


    return (
        <BaseModal isOpen={isOpen} toggleModal={toggleModal} heading='Filter Driver cancel trip reason'>
            <div className="my-4">

                <input
                    type="text"
                    name="name"
                    value={state.name || ''}
                    onChange={handleChange}
                    placeholder="enter name"
                    className='py-3 max-w-md w-full bg-gray my-4 text-slate-900 border px-4 rounded dark:bg-slate-800 dark:text-gray'
                />
                {isForCarCompany && states.total > 0 ?
                    (<select
                        name="carCompany"
                        value={state.carCompany || ''}
                        className='py-3 max-w-md w-full bg-gray my-4 text-slate-900 border px-4 rounded dark:bg-slate-800 dark:text-gray'
                        onChange={handleChange}
                    >
                        <option value="">Select Car Company</option>
                        {states.carCompany.map((company) => (
                            <option key={company._id} value={company._id}>{company.name}</option>
                        ))}
                    </select>) :
                    (
                        <div className="">
                            No Car Company data available
                        </div>
                    )
                }
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

export default FilterCar;
