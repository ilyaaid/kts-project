import React from 'react';
import ProductStore from './ProductStore';

const ProductContext = React.createContext<ProductStore | null>(null);
export const ProductProvider = ProductContext.Provider;
export const useProductContext = () => React.useContext(ProductContext);
