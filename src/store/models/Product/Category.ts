import { ImageApi, ImageModel } from './Image';

export type ProductCategoryApi = {
  id: number;
  documentId: string;
  title: string;
  image: ImageApi;
};

export type ProductCategoryModel = {
  id: number;
  documentId: string;
  title: string;
  image: ImageModel;
};

export const normalizeProductCategory = (from: ProductCategoryApi): ProductCategoryModel => {
  return {
    id: from.id,
    documentId: from.documentId,
    title: from.title,
    image: from.image,
  };
};
