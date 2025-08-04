import classNames from 'classnames';
import { observer } from 'mobx-react-lite';
import React from 'react';
import CartButton from 'components/CartButton';
import ProductPrice from 'components/ProductPrice';
import Text from 'components/Text';
import { useProductContext } from 'store/ProductStore';
import CircleArrow from '../CircleArrow';

import styles from './ProductContent.module.scss';

const ProductContent: React.FC = () => {
  const productStore = useProductContext()!;

  const sliderItems = React.useRef<HTMLDivElement>(null);
  const [sliderItemsX, setSliderItemsX] = React.useState<number>(0);

  const p = productStore.product;
  const len: number = p?.images.length ?? 0;

  const handleClickSlider = (type: 'left' | 'right') => {
    const items = sliderItems.current;
    if (!items) {
      return;
    }
    const itemWidth = items.offsetWidth;
    const itemsFullWidth = len * itemWidth;
    if (type === 'right') {
      setSliderItemsX((prev) => (prev - itemWidth) % itemsFullWidth);
    } else {
      setSliderItemsX((prev) => (prev - itemsFullWidth + itemWidth) % itemsFullWidth);
    }
  };

  if (!p) {
    return null;
  }

  return (
    <section className={styles.content}>
      <div className={styles.slider}>
        {p.images.length > 1 && (
          <>
            <CircleArrow
              className={classNames(styles.slider__left, styles.slider__both)}
              onClick={handleClickSlider}
              type={'left'}
            />
            <CircleArrow
              className={classNames(styles.slider__right, styles.slider__both)}
              onClick={handleClickSlider}
              type={'right'}
            />
          </>
        )}

        <div
          ref={sliderItems}
          className={styles.slider__items}
          style={{
            transform: `translateX(${sliderItemsX}px)`,
          }}
        >
          {p.images.map((item) => (
            <img key={item.url} className={styles.slider__el} src={item.url ?? '/image.png'}></img>
          ))}
        </div>
      </div>

      <div className={styles.desc}>
        <Text className={styles.desc__title} tag="div" view="title">
          {p.title}
        </Text>
        <Text className={styles.desc__text} tag="div" view="p-20" color="secondary">
          {p.description}
        </Text>
        <div className={styles.actions}>
          <Text className={styles.actions__price} tag="div" view="title">
            <ProductPrice priceBegin={p.price} priceFinal={p.priceDiscount} />
          </Text>
          <div className={styles.actions__btns}>
            <CartButton product={p} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default observer(ProductContent);
