import React from 'react';
import ProductsStore from './ProductsStore';

const ProductsContext = React.createContext<ProductsStore | null>(null);
export const ProductsProvider = ProductsContext.Provider;
export const useProductsContext = () => React.useContext(ProductsContext);
