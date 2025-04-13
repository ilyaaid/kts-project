import { observer } from 'mobx-react-lite';
import React, { useRef } from 'react';
import Button from 'components/Button';
import Card from 'components/Card';
import Loader from 'components/Loader';
import Paginator from 'components/Paginator';
import Text from 'components/Text';
import { routes } from 'config/routes';
import { useProductsContext } from 'pages/Products';
import styles from './ProductsList.module.scss';

const ProductsList: React.FC = () => {
  const productsStore = useProductsContext()!;

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [productsStore]);

  const listRef = useRef<HTMLDivElement>(null);
  return (
    <section ref={listRef} className={styles.list}>
      <div className={styles.list__title}>
        <Text tag="div" view="subtitle">
          Total products
        </Text>
        <Text tag="div" view="p-20" color="accent" weight="bold">
          {productsStore.paginator.params.total}
        </Text>
      </div>
      {productsStore.meta.loading ? (
        <div className={styles.list__loader}>
          <Loader size="l"></Loader>
        </div>
      ) : (
        <div className={styles.list__items}>
          {productsStore.products.map((p) => {
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
      )}

      <div className={styles.list__paginator}>
        <Paginator
          current={productsStore.paginator.params.page}
          pageCount={productsStore.paginator.params.pageCount}
          onChange={(newP) => {
            window.scrollTo({
              top: listRef.current!.offsetTop,
              behavior: 'smooth',
            });
            productsStore.paginator.getPage(newP);
          }}
        ></Paginator>
      </div>
    </section>
  );
};

export default observer(ProductsList);
