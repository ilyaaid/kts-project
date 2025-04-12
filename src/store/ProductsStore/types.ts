export type ProductsMeta = {
  loading: boolean;
};

export type QOptions = {
  populate: string[];
  filters?: {
    title?: {
      $containsi: string;
    };
    productCategory?: {
      documentId: {
        $in: string[];
      };
    };
  };
  pagination: {
    page: number;
    pageSize: number;
  };
};
