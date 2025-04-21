import { observer } from 'mobx-react-lite';
import React from 'react';
import { Link } from 'react-router';
import { useHeaderContext } from 'App/components/Header';
import Text from 'components/Text';
import BagIcon from 'components/icons/BagIcon';
import BurgerIcon from 'components/icons/BurgerIcon';
import CrossIcon from 'components/icons/CrossIcon';
import { routes } from 'config/routes';

import rootStore from 'store/RootStore';
import styles from './Icons.module.scss';

type IconsProps = {
  forMobile: boolean;
};

const Icons: React.FC<IconsProps> = ({ forMobile }) => {
  const cnt = rootStore.cart.getProductsCnt();
  const headerStore = useHeaderContext();
  const handleToggleOpen = () => {
    headerStore.toggleOpen();
  };
  return (
    <div className={`${styles.icons}`}>
      {forMobile ? (
        headerStore.menuOpen ? (
          <CrossIcon onClick={() => handleToggleOpen()} className={styles.cross} width={30} height={30}></CrossIcon>
        ) : (
          <BurgerIcon onClick={() => handleToggleOpen()} className={styles.burger} width={30} height={30}></BurgerIcon>
        )
      ) : (
        <Link className={styles.icons__link} to={routes.cart.create()}>
          <BagIcon width={30} height={30} />
          {cnt > 0 && (
            <Text tag="div" className={styles.icons__link__text}>
              {cnt > 99 ? '99+' : cnt}
            </Text>
          )}
        </Link>
      )}
    </div>
  );
};

export default observer(Icons);
