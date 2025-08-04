import { z } from 'zod';

export type ParamsType = {
  page: number;
  pageCount: number;
  pageSize: number;
  total: number;
};

export enum QueryParamNames {
  PAGINATE = 'paginate',
}

export const QPSchema = z.object({
  page: z.coerce.number().int().positive().default(1),
});

export type QPType = z.infer<typeof QPSchema>;
