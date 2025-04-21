import React, { JSX } from 'react';
import * as ReactRouter from 'react-router';
import { STRICT_MODE } from 'config/configureReact';
import rootStore from 'store/RootStore';
import Header from './components/Header';
import './App.module.scss';

export default function App() {
  const loc = ReactRouter.useLocation();
  const navigate = ReactRouter.useNavigate();

  React.useEffect(() => {
    rootStore.query.setSearch(loc.search);
    rootStore.query.setChangeUrlParamFunc((params: string): void => {
      navigate(`${loc.pathname}?${params}`);
    });
  }, [loc.pathname, loc.search, navigate]);

  const AppInner: JSX.Element = (
    <div className="app">
      <Header />
      <main className="main">
        <ReactRouter.Outlet />
      </main>
    </div>
  );

  return <>{STRICT_MODE ? <React.StrictMode>{AppInner}</React.StrictMode> : AppInner}</>;
}
