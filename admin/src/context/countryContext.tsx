
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { CountryAPI, CountryFilterParams, IICountryResponse } from '@/utils/api/country.api';
import { toast } from 'react-toastify';


// Define the type for the product context
interface CountryContextType {
	countryData: IICountryResponse;
	fetchCountryData: (params?: CountryFilterParams) => void;
}

const CountryContext = createContext<CountryContextType | undefined>(undefined);

interface CountryProviderProps {
	children: ReactNode;
}

export const CountryProvider: React.FC<CountryProviderProps> = ({ children }) => {
	const [countryData, setCountryData] = useState<IICountryResponse>({
		country: [],
		total: 0
	});

	const fetchCountryData = async (params: CountryFilterParams = { page: 1, size: 10 }) => {
		try {
			const res = await CountryAPI.getAll(params)
			if (res.status) {
				setCountryData(res.result)
			}

		} catch (error: any) {
			toast.error(error.message || 'something went wrong', {
				position: toast.POSITION.TOP_RIGHT,
				autoClose: 1000,
			})
		}
	}

	useEffect(() => {
		fetchCountryData()
	}, [])


	return (
		<CountryContext.Provider value={{ countryData, fetchCountryData }}>
			{children}
		</CountryContext.Provider>
	);
};

export const useCountry = () => {
	const context = useContext(CountryContext);
	if (!context) {
		throw new Error('useCountry must be used within a CountryProvider');
	}
	return context;
};