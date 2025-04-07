// import { MetaApi, MetaModel, normalizeMeta } from 'store/models/Meta';
// import { normalizeProduct, ProductApi, ProductModel } from './Product';

// type ProductsResponseApi = {
//   data: ProductApi[];
//   meta: MetaApi;
// };

// type ProductsResponseModel = {
//   data: ProductModel[];
//   meta: MetaModel;
// };

// export const normalizeProducts = (from: ProductsResponseApi): ProductsResponseModel => {
//   const data: ProductModel[] = from.data.map((item) => normalizeProduct(item));
//   return {
//     data: data,
//     meta: normalizeMeta(from.meta),
//   };
// };
