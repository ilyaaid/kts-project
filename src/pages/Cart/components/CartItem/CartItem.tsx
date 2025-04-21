import { observer } from 'mobx-react-lite';
import React, { HTMLAttributes } from 'react';
import { Link } from 'react-router';
import CartButton from 'components/CartButton';
import ProductPrice from 'components/ProductPrice';
import Text from 'components/Text';
import { routes } from 'config/routes';
import rootStore from 'store/RootStore';
import { ProductModel } from 'store/models/Product';

import fixedPrecision from 'utils/fixedPrecision';
import styles from './CartItem.module.scss';

type CartItemProps = HTMLAttributes<HTMLDivElement> & {
  product: ProductModel;
};

const CartItem: React.FC<CartItemProps> = ({ product }) => {
  const linkToProduct = routes.product.create(product.documentId);
  const cnt = rootStore.cart.getProductCnt(product);
  return (
    <div className={styles.item}>
      <Link to={linkToProduct}>
        <img className={styles.item__img} src={product.images[0].url} />
      </Link>
      <div className={styles.inf}>
        <Link className={styles.inf__link} to={linkToProduct}>
          <Text tag="div" view="p-20" color="primary">
            {product.title}
          </Text>
        </Link>
        <div className={styles.inf__quantity}>
          <Text tag="div" color="secondary">
            quantity: {product.quantity}
          </Text>
        </div>
        <div className={styles.inf__price}>
          <Text className={styles.inf__price__text} tag="div" weight="bold" view="p-18">
            <ProductPrice priceBegin={product.price} priceFinal={product.priceDiscount} />
            <div>
              * {cnt} = {fixedPrecision(product.priceDiscount * cnt, 2)}$
            </div>
          </Text>
        </div>
      </div>
      <div className={styles.actions}>
        <CartButton product={product} inCart={true} />
      </div>
    </div>
  );
};

export default observer(CartItem);
