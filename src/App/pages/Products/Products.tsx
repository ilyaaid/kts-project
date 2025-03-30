import axios from 'axios';
import * as qs from 'qs';
import React, { useEffect, useState } from 'react';
import { ProductType } from 'App/pages/Product';
import Button from 'components/Button';
import Card from 'components/Card';
import Input from 'components/Input';
import MultiDropdown, { Option } from 'components/MultiDropdown/MultiDropdown';
import Text from 'components/Text';
import { API_TOKEN, STRAPI_URL } from 'config/api';
import { routes } from 'config/routes';
import styles from './Procuts.module.scss';

const OPTIONS = [
  { key: 'msk', value: 'Moscow' },
  { key: 'spb', value: 'Saint Petersburg' },
  { key: 'ekb', value: 'Ekaterinburg' },
];

const ProductsSearch: React.FC = () => {
  const [value, setValue] = React.useState<Option[]>([]);

  return (
    <section className={styles.search}>
      <div className={styles.search__bar}>
        <form className={styles.search__form} onSubmit={(e) => e.preventDefault()}>
          <Input
            className={styles.search__form__input}
            value={''}
            placeholder="Search product"
            onChange={() => {}}
          ></Input>
          <Button type="submit">Find now</Button>
        </form>
        <MultiDropdown
          className={styles.search__filter}
          options={OPTIONS}
          onChange={setValue}
          value={value}
          getTitle={(values: Option[]) =>
            values.length === 0 ? 'Filter' : values.map(({ value }) => value).join(', ')
          }
        />
      </div>
    </section>
  );
};

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

const Products: React.FC = () => {
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
        <ProductsSearch></ProductsSearch>
        <ProductsList></ProductsList>
      </div>
    </div>
  );
};

export default Products;
