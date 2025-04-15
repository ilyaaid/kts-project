import classNames from 'classnames';
import React from 'react';
import { Link, useLocation } from 'react-router';
import Text from 'components/Text';
import { routes } from 'config/routes';
import styles from './NavLinks.module.scss';

const NavLinks: React.FC = () => {
  const locaction = useLocation();

  const navLinksData = [
    { address: routes.main.create(), text: 'Products' },
    { address: routes.categories.create(), text: 'Categories' },
    { address: routes.about.create(), text: 'About us' },
  ];

  return navLinksData.map((data) => {
    const isActive = data.address === locaction.pathname;
    const classes = classNames(styles.link, {
      [styles.link_active]: isActive,
    });
    return (
      <Link key={data.address} className={classes} to={data.address}>
        <Text className={`${styles.link__text}`} view="p-18" color={isActive ? 'accent' : 'primary'}>
          {data.text}
        </Text>
      </Link>
    );
  });
};

export default NavLinks;
