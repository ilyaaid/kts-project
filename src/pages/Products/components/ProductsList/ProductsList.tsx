import axios from 'axios';
import * as qs from 'qs';
import React, { useEffect, useState } from 'react';
import Button from 'components/Button';
import Card from 'components/Card';
import Text from 'components/Text';
import { API_TOKEN, STRAPI_URL } from 'config/api';
import { routes } from 'config/routes';
import { ProductType } from 'pages/Product';
import styles from './ProductsList.module.scss';

const ProductsList = () => {
  const [productsTotal, setProductsTotal] = useState<number>(0);
  const [products, setProducts] = useState<ProductType[]>([]);
  useEffect(() => {
    const queryStr = qs.stringify({
      populate: ['images', 'productCategory'],
    });
    const fetch = async () => {
      const resp = await axios.get(`${STRAPI_URL}/products?${queryStr}`, {
        headers: {
          Authorization: `Bearer ${API_TOKEN}`,
        },
      });
      // console.log(resp.data);
      setProducts(resp.data.data);
      setProductsTotal(resp.data.meta.pagination.total);
    };

    fetch();
  }, []);
  return (
    <section className={styles.list}>
      <div className={styles.list__title}>
        <Text tag="div" view="subtitle">
          Total products
        </Text>
        <Text tag="div" view="p-20" color="accent" weight="bold">
          {productsTotal}
        </Text>
      </div>
      <div className={styles.list__items}>
        {products.map((p) => {
          return (
            <Card
              key={p.id}
              className={styles.list__item}
              image={p.images[0] ? p.images[0].url : '/picture.svg'}
              title={p.title + 'fgdsfg'}
              subtitle={p.description}
              contentSlot={p.price + '$'}
              actionSlot={<Button>Купить</Button>}
              toUrl={routes.product.create(p.documentId)}
            ></Card>
          );
        })}
      </div>
    </section>
  );
};

export default ProductsList;
