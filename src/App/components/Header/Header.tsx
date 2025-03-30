import classNames from 'classnames';
import React from 'react';
import { Link, useLocation } from 'react-router';
import Logo from 'components/Logo';
import Text from 'components/Text';
import BagIcon from 'components/icons/BagIcon';
import ProfileIcon from 'components/icons/ProfileIcon';
import { routes } from 'config/routes';
import styles from './Header.module.scss';

const NavLinks: React.FC = () => {
  const locaction = useLocation();

  const navLinksData = [
    { address: routes.main.create(), text: 'Products' },
    { address: routes.categories.create(), text: 'Categories' },
    { address: routes.about.create(), text: 'About us' },
  ];

  return navLinksData.map((data) => {
    const isActive = data.address === locaction.pathname;
    const classes = classNames(styles.header__nav__link, {
      [styles.header__nav__link_active]: isActive,
    });
    return (
      <Link key={data.address} className={classes} to={data.address}>
        <Text className={`${styles.header__nav__link__text}`} view="p-18" color={isActive ? 'accent' : 'primary'}>
          {data.text}
        </Text>
      </Link>
    );
  });
};

const Icons = () => {
  return (
    <>
      <Link to={routes.cart.create()}>
        <BagIcon width={30} height={30}></BagIcon>
      </Link>
      <Link to={routes.profile.create()}>
        <ProfileIcon width={30} height={30}></ProfileIcon>
      </Link>
    </>
  );
};

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
