import { observer, useLocalObservable } from 'mobx-react-lite';
import React from 'react';
import { useNavigate, useParams } from 'react-router';
import Loader from 'components/Loader';
import Text from 'components/Text';
import ArrowRightIcon from 'components/icons/ArrowRightIcon';
import ProductStore from 'store/ProductStore';
import ProductContent from './components/ProductContent';
import styles from './Product.module.scss';

const ProductContext = React.createContext<ProductStore | null>(null);
const ProductProvider = ProductContext.Provider;
export const useProductContext = () => React.useContext(ProductContext);

const Product: React.FC = () => {
  const params = useParams();
  const navigate = useNavigate();

  const productStore = useLocalObservable<ProductStore>(() => new ProductStore());

  React.useEffect(() => {
    window.scrollTo(0, 0);
    if (params.id) {
      productStore.getProduct(params.id);
    }
  }, [productStore, params.id]);

  return (
    <div className="container">
      <div className={styles.back}>
        <div className={styles.back__inner} onClick={() => navigate(-1)}>
          <ArrowRightIcon className={styles.back__icon} width={32} height={32}></ArrowRightIcon>
          <Text className={styles.back__text} tag="div" view="p-20">
            Back
          </Text>
        </div>
      </div>

      <ProductProvider value={productStore}>
        {!productStore.product ? <Loader size="l"></Loader> : <ProductContent></ProductContent>}
      </ProductProvider>
    </div>
  );
};

export default observer(Product);
