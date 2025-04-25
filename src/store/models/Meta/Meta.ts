// export type MetaApi = {
//   pagination: {
//     page: number;
//     pageSize: number;
//     pageCount: number;
//     total: number;
//   };
// };
// export type MetaModel = {
//   pagination: {
//     page: number;
//     pageSize: number;
//     pageCount: number;
//     total: number;
//   };
// };
// export const normalizeMeta = (from: MetaApi): MetaModel => {
//   const pag = from.pagination;
//   return {
//     pagination: {
//       page: pag.page,
//       pageSize: pag.pageSize,
//       pageCount: pag.pageCount,
//       total: pag.total,
//     },
//   };
// };

import { z } from 'zod';

export const MetaApiSchema = z
  .object({
    pagination: z.object({
      page: z.number(),
      pageSize: z.number(),
      pageCount: z.number(),
      total: z.number(),
    }),
  })
  .transform((data) => {
    const pag = data.pagination;
    return {
      pagination: {
        page: pag.page,
        pageSize: pag.pageSize,
        pageCount: pag.pageCount,
        total: pag.total,
      },
    };
  });

export type MetaApi = z.input<typeof MetaApiSchema>;
export type MetaModel = z.output<typeof MetaApiSchema>;

export const normalizeMeta = (from: MetaApi): MetaModel | null => {
  return MetaApiSchema.safeParse(from).data ?? null;
};
