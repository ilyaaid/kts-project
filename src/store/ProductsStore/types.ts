export type ProductsMeta = {
  loading: boolean;
};

export type QOptions = {
  populate: string[];
  filters?: {
    documentId?: {
      $in: string[];
    };
    title?: {
      $containsi: string;
    };
    productCategory?: {
      documentId: {
        $in: string[];
      };
    };
  };
  pagination?: {
    page: number;
    pageSize: number;
  };
};
