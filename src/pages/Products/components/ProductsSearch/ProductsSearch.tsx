import { observer } from 'mobx-react-lite';
import React from 'react';
import Button from 'components/Button';
import Input from 'components/Input';
import MultiDropdown, { Option } from 'components/MultiDropdown';
import { ProductsProps } from 'pages/Products';
import { ProductCategoryModel } from 'store/models/Product';
import styles from './ProductsSearch.module.scss';

function categoriesToOptions(categories: ProductCategoryModel[]) {
  return categories.map((cat) => ({ key: cat.documentId, value: cat.title }));
}

const ProductsSearch: React.FC<ProductsProps> = ({ productsStore }) => {
  const options: Option[] = categoriesToOptions(productsStore.filters.allCategories);

  const handleChangeInput = React.useCallback(
    (val: string) => {
      productsStore.filters.setSelTitle(val);
    },
    [productsStore],
  );

  const handleChangeDropdown = React.useCallback(
    (val: Option[]) => {
      productsStore.filters.setSelCategoryKeys(val.map((opt) => opt.key));
    },
    [productsStore],
  );

  const handleSubmit = React.useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      productsStore.filters.submitForm();
    },
    [productsStore],
  );

  return (
    <section className={styles.search}>
      <div className={styles.search__bar}>
        <form onSubmit={handleSubmit}>
          <div className={styles.search__form}>
            <Input
              className={styles.search__form__input}
              value={productsStore.filters.selTitle}
              placeholder="Search product"
              onChange={handleChangeInput}
            ></Input>
            <Button type="submit">Find now</Button>
          </div>
          <MultiDropdown
            className={styles.search__filter}
            options={options}
            onChange={handleChangeDropdown}
            value={categoriesToOptions(productsStore.filters.selCategories)}
            getTitle={(values: Option[]) =>
              values.length === 0 ? 'Filter' : values.map(({ value }) => value).join(', ')
            }
          />
        </form>
      </div>
    </section>
  );
};

export default observer(ProductsSearch);
