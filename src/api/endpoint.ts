export const ENDPOINTS = {
  products: () => `products`,
  product: (id: string) => `products/${id}`,
  categories: () => `product-categories`,
  register: () => `auth/local/register`,
  login: () => `auth/local`,
};
