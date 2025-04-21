import React from 'react';
import Text from 'components/Text';
import styles from './ProductPrice.module.scss';

type ProductPriceProps = React.HTMLAttributes<HTMLDivElement> & {
  priceBegin: number;
  priceFinal: number;
  className?: string;
};

const ProductPrice: React.FC<ProductPriceProps> = ({ priceBegin, priceFinal }) => {
  return (
    <div>
      {priceBegin !== priceFinal && (
        <Text className={styles.disc_text} tag="div" color="secondary">
          {priceBegin}$
        </Text>
      )}
      <Text className={styles.final_text} tag="div">
        {priceFinal}$
      </Text>
    </div>
  );
};

export default ProductPrice;
