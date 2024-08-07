import { CategoryAPI, ICategoryResponse } from '@/utils/api/category.api';
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';


// Define the type for the product context
interface CategoryContextType {
    categories: ICategoryResponse[];
    fetchCategories: () => void;
}

const CategoryContext = createContext<CategoryContextType | undefined>(undefined);

interface ProductProviderProps {
    children: ReactNode;
}

export const CategoryProvider: React.FC<ProductProviderProps> = ({ children }) => {
    const [categories, setCategories] = useState<ICategoryResponse[]>([]);

    const fetchCategories = async () => {
        try {
            const res = await CategoryAPI.getAll();
            if (res) {
                setCategories(res.result || []);
            }
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };



    useEffect(() => {
        // Fetch products when the component mounts
        fetchCategories();
    }, []);

    return (
        <CategoryContext.Provider value={{ categories, fetchCategories }}>
            {children}
        </CategoryContext.Provider>
    );
};

export const useCategory = () => {
    const context = useContext(CategoryContext);
    if (!context) {
        throw new Error('useCategory must be used within a CategoryProvider');
    }
    return context;
};