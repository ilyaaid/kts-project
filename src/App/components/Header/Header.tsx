import React from 'react';
import { Link } from 'react-router';
import Logo from 'components/Logo';
import { routes } from 'config/routes';
import Icons from './components/Icons';
import NavLinks from './components/NavLinks';
import styles from './Header.module.scss';

const Header: React.FC = () => {
  return (
    <header className={`${styles.header}`}>
      <div className="container">
        <div className={`${styles.header__inner}`}>
          <div className={`${styles.header__logo}`}>
            <Link to={routes.main.create()}>
              <Logo></Logo>
            </Link>
          </div>
          <nav className={`${styles.header__nav}`}>
            <NavLinks></NavLinks>
          </nav>
          <div className={`${styles.header__icons}`}>
            <Icons></Icons>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
