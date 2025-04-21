import classNames from 'classnames';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { Link } from 'react-router';
import Button from 'components/Button';
import { routes } from 'config/routes';
import rootStore from 'store/RootStore';
import { ProductModel } from 'store/models/Product';
import styles from './CartButton.module.scss';

export type CartButtonClickType = 'add' | 'remove';

type CartButtonProps = React.HTMLAttributes<HTMLDivElement> & {
  product: ProductModel;
  inCart?: boolean;
  className?: string;
};

const CartButton: React.FC<CartButtonProps> = ({ product, inCart = false, className }) => {
  let btnEl: React.ReactNode;

  const classInCart = classNames(className, styles.incart);
  const classToCart = classNames(className);

  const handleCartButtonClick = React.useCallback(
    (type: CartButtonClickType): void => {
      if (type === 'add') {
        if (!product) {
          return;
        }
        rootStore.cart.addProduct(product);
      } else if (type === 'remove') {
        if (!product) {
          return;
        }
        rootStore.cart.decProduct(product);
      }
    },
    [product],
  );

  const productCnt = rootStore.cart.getProductCnt(product);

  const classesAction = classNames({
    [styles.action_cart]: inCart,
  });

  if (productCnt > 0) {
    btnEl = (
      <div className={classInCart}>
        {!inCart && (
          <Link to={routes.cart.create()}>
            <Button>To cart</Button>
          </Link>
        )}
        <Button
          className={classesAction}
          onClick={() => {
            handleCartButtonClick('remove');
          }}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 12H19" stroke="white" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </Button>
        <div>{productCnt}</div>
        <Button
          className={classesAction}
          onClick={() => {
            handleCartButtonClick('add');
          }}
          disabled={productCnt >= product.quantity}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 5V19M5 12H19" stroke="white" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </Button>
      </div>
    );
  } else {
    btnEl = (
      <div className={classToCart}>
        <Button
          onClick={() => {
            handleCartButtonClick('add');
          }}
          disabled={!product.isInStock}
        >
          Add to cart
        </Button>
      </div>
    );
  }
  return btnEl;
};

export default observer(CartButton);
