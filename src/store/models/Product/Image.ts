export type ImageApi = {
  id: number;
  url: string;
  alternativeText: string;
};

export type ImageModel = {
  id: number;
  url: string;
  alternativeText: string;
};

export const normalizeImage = (from: ImageApi): ImageModel => {
  return {
    id: from.id,
    url: from.url,
    alternativeText: from.alternativeText,
  };
};
