import fixedPrecision from 'utils/fixedPrecision';
import { ImageApi, ImageModel, normalizeImage } from './Image';

export type ProductApi = {
  id: number;
  documentId: string;
  title: string;
  description: string;
  price: number;
  isInStock: boolean;
  images: ImageApi[];
  discountPercent: number;
};

export type ProductModel = {
  id: number;
  documentId: string;
  title: string;
  description: string;
  price: number;
  isInStock: boolean;
  images: ImageModel[];
  discountPercent: number;
  quantity: number;
  priceDiscount: number;
  discountNum: number;
};

export const normalizeProduct = (from: ProductApi): ProductModel => {
  const priceDiscount = from.price - fixedPrecision(0.01 * from.discountPercent * from.price, 2);
  return {
    id: from.id,
    documentId: from.documentId,
    title: from.title,
    description: from.description,
    price: from.price,
    isInStock: from.isInStock,
    images: from.images.map((img) => normalizeImage(img)),
    discountPercent: from.discountPercent,
    priceDiscount: priceDiscount,
    discountNum: from.price - priceDiscount,
    quantity: from.isInStock ? Math.round(from.id / 50) : 0,
  };
};
