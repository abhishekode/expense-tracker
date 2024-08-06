import React from 'react';
import { FilterAppVersion } from '../../constant/Interfaces/filter.interface';
import BaseModal from '../common/model';
import { IAppVersionHistory, IAppVersionHistoryResponse, IsActiveFilter } from '../../constant/interfaces';
import { getAppVersionHistory } from '@/utils/api.method';
import { toast } from 'react-toastify';

interface AppVersionHistoryFilterProps {
    isOpen: boolean;
    toggleModal: () => void;
    stateValue: FilterAppVersion;
    handleFilter: <K extends keyof FilterAppVersion>(name: K, value: any) => void;
    clearFilter: () => void;
    applyFilter: () => void;
}

const AppVersionHistoryFilterModel: React.FC<AppVersionHistoryFilterProps> = ({ isOpen, stateValue, toggleModal, handleFilter, clearFilter,applyFilter }) => {
    const [state, setState] = React.useState<IAppVersionHistoryResponse>({
        versionHistory: [],
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
        handleFilter(name as keyof FilterAppVersion, filterValue);
    };

    const handleClearFilter = () => {
        clearFilter()
        toggleModal()
    }

    const handleApplyFilter = () => {
        applyFilter()
        toggleModal()
    }

    const getRequestData = async () => {
        try {
            const res = await getAppVersionHistory();
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
        getRequestData()
    }, [])


    return (
        <BaseModal isOpen={isOpen} toggleModal={toggleModal} heading='Filter App Version'>
            <div className="my-4">
                <div className="my-4">
                    <select
                        name="versionNumber"
                        value={stateValue?.versionNumber}
                        className='py-3 max-w-md w-full bg-gray my-4 text-slate-900 border px-4 rounded dark:bg-slate-800 dark:text-gray'
                        onChange={handleChange}
                    >
                        <option value="">Select Version</option>
                        {state.versionHistory?.map((versionHistoryData: IAppVersionHistory) => (
                            <option key={versionHistoryData.versionNumber} value={versionHistoryData.versionNumber}>{versionHistoryData.versionNumber}</option>
                        ))}
                    </select>
                </div>
                <div className="flex w-full gap-5 px-2 mt-10 absolute bottom-8 left-0">
                    <button onClick={handleClearFilter} className='border px-5 py-2 rounded-lg w-full'>Clear</button>
                    <button onClick={handleApplyFilter} className='border px-5 py-2 rounded-lg w-full bg-slate-800 text-white'>apply</button>
                </div>
            </div>
        </BaseModal>
    );
};

export default AppVersionHistoryFilterModel;
