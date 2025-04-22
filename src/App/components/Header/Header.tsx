import { observer } from 'mobx-react-lite';
import React from 'react';
import { Link, useLocation } from 'react-router';
import Logo from 'components/Logo';
import Text from 'components/Text';
import BagIcon from 'components/icons/BagIcon';
import BurgerIcon from 'components/icons/BurgerIcon';
import CrossIcon from 'components/icons/CrossIcon';
import { routes } from 'config/routes';
import rootStore from 'store/RootStore';
import { BREAKPOINTS, useMediaType } from 'utils/useMediaType';
// import Icons from './components/Icons';
import NavLinks from './components/NavLinks';
import styles from './Header.module.scss';

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = React.useState<boolean>(false);
  const toggleMenuOpen = React.useCallback(() => {
    setMenuOpen((prev) => !prev);
  }, []);
  const isMobile = useMediaType() === BREAKPOINTS.mobile;

  const loc = useLocation();
  React.useEffect(() => {
    setMenuOpen(false);
  }, [loc.pathname]);

  const cnt = rootStore.cart.getProductsCnt();

  return (
    <header className={`${styles.header}`}>
      <div className={styles.up}>
        <div className="container">
          <div className={`${styles.inner}`}>
            <div className={`${styles.logo}`}>
              <Link to={routes.main.create()}>
                <Logo></Logo>
              </Link>
            </div>
            {!isMobile && <NavLinks className={styles.navlinks}></NavLinks>}
            <div className={styles.icons}>
              <Link className={styles.icons__link} to={routes.cart.create()}>
                <BagIcon width={30} height={30} />
                {cnt > 0 && (
                  <Text tag="div" className={styles.icons__link__text}>
                    {cnt > 99 ? '99+' : cnt}
                  </Text>
                )}
              </Link>
              {isMobile &&
                (menuOpen ? (
                  <CrossIcon onClick={toggleMenuOpen} className={styles.cross} width={30} height={30}></CrossIcon>
                ) : (
                  <BurgerIcon onClick={toggleMenuOpen} className={styles.burger} width={30} height={30}></BurgerIcon>
                ))}
            </div>
          </div>
        </div>
      </div>
      {menuOpen && (
        <div className={styles.down}>
          <NavLinks className={styles.down__navlinks}></NavLinks>
        </div>
      )}
    </header>
  );
};

export default observer(Header);
