import { observer } from 'mobx-react-lite';
import React, { HTMLAttributes } from 'react';
import Text from 'components/Text';
import rootStore from 'store/RootStore';
import CartItem from './components/CartItem';
import CartTotal from './components/СartTotal';
import styles from './Cart.module.scss';

const Cart: React.FC<HTMLAttributes<HTMLDivElement>> = () => {
  const products = rootStore.cart.productCollection;

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="container">
      <section className={styles.intro}>
        <Text tag="div" view="title">
          Cart
        </Text>
        <Text className={styles.intro__description} tag="div" view="p-20" color="secondary">
          {rootStore.cart.getProductsCnt()}
        </Text>
      </section>
      <section className={styles.content}>
        <div className={`${styles.content__item} ${styles.content__list}`}>
          {products.length > 0 ? (
            products.map((p) => <CartItem key={p.documentId} product={p}></CartItem>)
          ) : (
            <Text view="subtitle" weight="normal">
              The cart is empty
            </Text>
          )}
        </div>
        <div className={`${styles.content__item} ${styles.content__total}`}>
          <CartTotal />
        </div>
      </section>
    </div>
  );
};

export default observer(Cart);
