import React from 'react';
import { Navigate, RouteObject } from 'react-router';
import App from 'App/';
import Product from 'App/pages/Product';
import Products from 'App/pages/Products';

export const routes = {
  main: {
    mask: '/',
    create: () => '/',
  },
  products: {
    mask: '/',
    create: () => '/',
  },
  product: {
    mask: '/product/:id',
    create: (id: string) => `/product/${id}`,
  },
  categories: {
    mask: '/categories',
    create: () => '/categories',
  },
  about: {
    mask: '/about',
    create: () => '/about',
  },
  cart: {
    mask: '/cart',
    create: () => '/cart',
  },
  profile: {
    mask: '/profile',
    create: () => '/profile',
  },
};

export const routesConfig: RouteObject[] = [
  {
    path: routes.main.mask,
    element: <App />,
    children: [
      {
        path: routes.products.mask,
        element: <Products></Products>,
      },
      {
        path: routes.product.mask,
        element: <Product></Product>,
      },
      {
        path: routes.categories.mask,
        element: <div>categories!</div>,
      },
      {
        path: routes.about.mask,
        element: <div>about!</div>,
      },
      {
        path: routes.cart.mask,
        element: <div>cart!</div>,
      },
      {
        path: routes.profile.mask,
        element: <div>profile!</div>,
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to={routes.main.mask} replace />,
  },
];
