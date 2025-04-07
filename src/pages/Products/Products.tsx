import { observer } from 'mobx-react-lite';
import React from 'react';
import Text from 'components/Text';
import ProductsStore from 'store/ProductsStore';
import { useLocalStore } from 'utils/useLocalStore';
import ProductsList from './components/ProductsList';
import ProductsSearch from './components/ProductsSearch';
import styles from './Procuts.module.scss';

const Products: React.FC = () => {
  const productsStore = useLocalStore<ProductsStore>(() => new ProductsStore());
  React.useEffect(() => {
    productsStore.initialData();
  }, [productsStore]);

  return (
    <div className="container">
      <div className={styles.products__inner}>
        <section className={styles.intro}>
          <Text className={styles.intro__title} tag="div" view="title">
            Products
          </Text>
          <Text className={styles.intro__description} tag="div" view="p-20" color="secondary">
            We display products based on the latest products we have, if you want to see our old products please enter
            the name of the item
          </Text>
        </section>
        <ProductsSearch productsStore={productsStore}></ProductsSearch>
        <ProductsList productsStore={productsStore}></ProductsList>
      </div>
    </div>
  );
};

export default observer(Products);
