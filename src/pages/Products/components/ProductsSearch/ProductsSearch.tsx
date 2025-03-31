import React from 'react';
import Button from 'components/Button';
import Input from 'components/Input';
import MultiDropdown, { Option } from 'components/MultiDropdown';
import styles from './ProductsSearch.module.scss';

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

export default ProductsSearch;
