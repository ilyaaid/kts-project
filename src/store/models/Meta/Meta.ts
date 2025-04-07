export type MetaApi = {
  pagination: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  };
};

export type MetaModel = {
  pagination: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  };
};

export const normalizeMeta = (from: MetaApi): MetaModel => {
  return JSON.parse(JSON.stringify(from));
};
