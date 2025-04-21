import { observer } from 'mobx-react-lite';
import React from 'react';
import { Link, useLocation } from 'react-router';
import Logo from 'components/Logo';
import { routes } from 'config/routes';
import HeaderStore from 'store/HeaderStore';
import { BREAKPOINTS, useMediaType } from 'utils/useMediaType';
import Icons from './components/Icons';
import NavLinks from './components/NavLinks';
import styles from './Header.module.scss';

const headerContext = React.createContext<HeaderStore>(new HeaderStore());
const HeaderProvider = headerContext.Provider;
export const useHeaderContext = () => React.useContext(headerContext);

const Header: React.FC = () => {
  const headerStore = useHeaderContext();
  const isMobile = useMediaType() === BREAKPOINTS.mobile;

  const loc = useLocation();
  React.useEffect(() => {
    headerStore.setOpen(false);
  }, [headerStore, loc.pathname]);

  return (
    <HeaderProvider value={headerStore}>
      <header className={`${styles.header}`}>
        <div className={styles.up}>
          <div className="container">
            <div className={`${styles.inner}`}>
              <div className={`${styles.logo}`}>
                <Link to={routes.main.create()}>
                  <Logo></Logo>
                </Link>
              </div>
              {!isMobile && <NavLinks></NavLinks>}
              <Icons forMobile={isMobile}></Icons>
            </div>
          </div>
        </div>
        {headerStore.menuOpen && (
          <div className={styles.down}>
            <NavLinks></NavLinks>
            <Icons forMobile={false}></Icons>
          </div>
        )}
      </header>
    </HeaderProvider>
  );
};

export default observer(Header);
