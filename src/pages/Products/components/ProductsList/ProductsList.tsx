import { observer } from 'mobx-react-lite';
import React from 'react';
import Button from 'components/Button';
import Card from 'components/Card';
import Paginator from 'components/Paginator';
import Text from 'components/Text';
import { routes } from 'config/routes';
import { ProductsProps } from 'pages/Products';
import styles from './ProductsList.module.scss';

const ProductsList: React.FC<ProductsProps> = ({ productsStore }) => {
  return (
    <section className={styles.list}>
      <div className={styles.list__title}>
        <Text tag="div" view="subtitle">
          Total products
        </Text>
        <Text tag="div" view="p-20" color="accent" weight="bold">
          {productsStore.paginator.meta?.pagination.total ?? 0}
        </Text>
      </div>
      <div className={styles.list__items}>
        {productsStore.products?.map((p) => {
          return (
            <Card
              key={p.id}
              className={styles.list__item}
              image={p.images[0] ? p.images[0].url : '/picture.svg'}
              title={p.title}
              subtitle={p.description}
              contentSlot={p.price + '$'}
              actionSlot={<Button>Купить</Button>}
              toUrl={routes.product.create(p.documentId)}
            ></Card>
          );
        })}
      </div>
      <div className={styles.list__paginator}>
        <Paginator
          current={productsStore.paginator.meta.pagination.page}
          pageCount={productsStore.paginator.meta.pagination.pageCount}
          onChange={(newP) => {
            window.scrollTo(0, 0);
            productsStore.paginator.getPage(newP);
          }}
        ></Paginator>
      </div>
    </section>
  );
};

export default observer(ProductsList);
