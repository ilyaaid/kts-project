import { ImageApi, ImageModel, normalizeImage } from './Image';

export type ProductApi = {
  id: number;
  documentId: string;
  title: string;
  description: string;
  price: number;
  isInStock: boolean;
  images: ImageApi[];
};

export type ProductModel = {
  id: number;
  documentId: string;
  title: string;
  description: string;
  price: number;
  isInStock: boolean;
  images: ImageModel[];
};

export const normalizeProduct = (from: ProductApi): ProductModel => {
  return {
    id: from.id,
    documentId: from.documentId,
    title: from.title,
    description: from.description,
    price: from.price,
    isInStock: from.isInStock,
    images: from.images.map((img) => normalizeImage(img)),
  };
};
