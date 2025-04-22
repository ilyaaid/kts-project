import { observer } from 'mobx-react-lite';
import React, { useRef } from 'react';
import Card, { CardSkeleton } from 'components/Card';
import CartButton from 'components/CartButton';
import Paginator from 'components/Paginator';
import ProductPrice from 'components/ProductPrice';
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
  const isLoad = productsStore.meta.loading;
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
      <div className={styles.list__items}>
        {isLoad
          ? Array(productsStore.paginator.params.pageSize)
              .fill(null)
              .map((_, ind) => <CardSkeleton key={ind} />)
          : productsStore.products.map((p) => {
              return (
                <Card
                  key={p.id}
                  className={styles.list__item}
                  image={p.images[0] ? p.images[0].url : '/picture.svg'}
                  title={p.title}
                  captionSlot={
                    p.isInStock ? (
                      <div className={styles.list__item__instock}>In stock (quantity: {p.quantity})</div>
                    ) : (
                      <div className={styles.list__item__outstock}>Out of stock</div>
                    )
                  }
                  subtitle={p.description}
                  contentSlot={<ProductPrice priceBegin={p.price} priceFinal={p.priceDiscount} />}
                  actionSlot={<CartButton product={p} />}
                  toUrl={routes.product.create(p.documentId)}
                ></Card>
              );
            })}
      </div>

      <div className={styles.list__paginator}>
        {!isLoad && (
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
        )}
      </div>
    </section>
  );
};

export default observer(ProductsList);
