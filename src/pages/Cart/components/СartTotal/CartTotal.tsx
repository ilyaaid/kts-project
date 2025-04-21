import { observer } from 'mobx-react-lite';
import React, { HTMLAttributes } from 'react';
import Button from 'components/Button';
import Text from 'components/Text';
import rootStore from 'store/RootStore';
import styles from './CartTotal.module.scss';

const CartTotal: React.FC<HTMLAttributes<HTMLDivElement>> = () => {
  const total = rootStore.cart.getTotal();
  return (
    <div>
      <Text className={styles.title} tag="div" view="subtitle" weight="normal">
        Total
      </Text>
      <div className={styles.calc_sum}>
        <div className={styles.sum_item}>
          <Text tag="div">Products ({total.count})</Text>
          <Text tag="div">{total.price}$</Text>
        </div>
        <div className={styles.sum_item}>
          <Text tag="div">Discount</Text>
          <Text tag="div">{total.discountNum}$</Text>
        </div>
      </div>
      <div className={styles.total}>
        <div className={styles.sum_item}>
          <Text tag="div" weight="bold">
            Total sum
          </Text>
          <Text tag="div">{total.priceDiscount}$</Text>
        </div>
      </div>
      <Button className={styles.btn}>Place an order</Button>
    </div>
  );
};

export default observer(CartTotal);
