import { observer } from 'mobx-react-lite';
import { PropsWithChildren } from 'react';
import { Navigate, RouteObject } from 'react-router';
import App from 'App/';
import About from 'pages/About';
import Cart from 'pages/Cart';
import Login from 'pages/Login';
import Product from 'pages/Product';
import Products from 'pages/Products';
import Profile from 'pages/Profile';
import Register from 'pages/Register';
import rootStore from 'store/RootStore';

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
  login: {
    mask: '/login',
    create: () => '/login',
  },
  register: {
    mask: '/register',
    create: () => '/register',
  },
};

const ProtectedRoute: React.FC<PropsWithChildren & { forAuth?: boolean }> = observer(
  ({ forAuth = false, children }) => {
    const isAuth = rootStore.user.isAuth;
    if (forAuth) {
      return !isAuth ? children : <Navigate to={routes.profile.create()} replace />;
    } else {
      return isAuth ? children : <Navigate to={routes.login.create()} replace />;
    }
  },
);

export const routesConfig: RouteObject[] = [
  {
    path: routes.main.mask,
    element: <App />,
    children: [
      {
        path: routes.products.mask,
        element: <Products />,
      },
      {
        path: routes.product.mask,
        element: <Product />,
      },
      {
        path: routes.categories.mask,
        element: <div>categories!</div>,
      },
      {
        path: routes.about.mask,
        element: <About />,
      },
      {
        path: routes.cart.mask,
        element: <Cart />,
      },
      {
        path: routes.login.mask,
        element: (
          <ProtectedRoute forAuth>
            <Login />
          </ProtectedRoute>
        ),
      },
      {
        path: routes.register.mask,
        element: (
          <ProtectedRoute forAuth>
            <Register />
          </ProtectedRoute>
        ),
      },
      {
        path: routes.profile.mask,
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to={routes.main.mask} replace />,
  },
];
