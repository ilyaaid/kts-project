import { observer } from 'mobx-react-lite';
import React from 'react';
import { useNavigate, useParams } from 'react-router';
import Button from 'components/Button';
import Card from 'components/Card';
import Text from 'components/Text';
import ArrowRightIcon from 'components/icons/ArrowRightIcon';
import { routes } from 'config/routes';
import ProductStore from 'store/ProductStore';
import { useLocalStore } from 'utils/useLocalStore';
import CircleArrow from './components/CircleArrow';
import styles from './Product.module.scss';

const Product: React.FC = () => {
  const params = useParams();
  const navigate = useNavigate();

  const productStore = useLocalStore<ProductStore>(() => new ProductStore());

  React.useEffect(() => {
    window.scrollTo(0, 0);
    if (params.id) {
      productStore.getProduct(params.id);
    }
  }, [productStore, params.id]);

  const product = productStore.product;

  return (
    <div className="container">
      <div className={styles.inner}>
        <div className={styles.back}>
          <div className={styles.back__inner} onClick={() => navigate(-1)}>
            <ArrowRightIcon className={styles.back__icon} width={32} height={32}></ArrowRightIcon>
            <Text className={styles.back__text} tag="div" view="p-20">
              Back
            </Text>
          </div>
        </div>

        <section className={styles.content}>
          <div className={styles.image}>
            {product?.images[0].url && (
              <>
                <CircleArrow className={styles.image__left}></CircleArrow>
                <CircleArrow className={styles.image__right}></CircleArrow>
              </>
            )}
            <img className={styles.image__el} src={product?.images[0].url ?? '/picture.svg'}></img>
          </div>

          <div className={styles.desc}>
            <Text className={styles.desc__title} tag="div" view="title">
              {product?.title}
            </Text>
            <Text className={styles.desc__text} tag="div" view="p-20" color="secondary">
              {product?.description}
            </Text>
            <div className={styles.actions}>
              <Text className={styles.actions__price} tag="div" view="title">
                {product?.price}$
              </Text>
              <div className={styles.actions__btns}>
                <Button className={styles.actions__btns__item}>Buy Now</Button>
                <Button className={styles.actions__btns__item}>Add to Cart</Button>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.related}>
          <Text className={styles.related__title} tag="div" view="title">
            Related Items
          </Text>
          <div className={styles.related__list}>
            <Card
              className={styles.related__list__item}
              image="/picture.svg"
              title="Заголовок карточки в несколько строк Заголовок карточки в несколько строк"
              subtitle="Описание карточки Описание карточки Описание карточкиОписание карточкиОписание карточки Описание карточки"
              contentSlot="99$"
              actionSlot={<Button>Купить</Button>}
              toUrl={routes.product.create(product?.documentId ?? '')}
            ></Card>
            <Card
              className={styles.related__list__item}
              image="/picture.svg"
              title="Заголовок карточки в несколько строк Заголовок карточки в несколько строк"
              subtitle="Описание карточки Описание карточки Описание карточкиОписание карточкиОписание карточки Описание карточки"
              contentSlot="99$"
              actionSlot={<Button>Купить</Button>}
              toUrl={routes.product.create(product?.documentId ?? '')}
            ></Card>
            <Card
              className={styles.related__list__item}
              image="/picture.svg"
              title="Заголовок карточки в несколько строк Заголовок карточки в несколько строк"
              subtitle="Описание карточки Описание карточки Описание карточкиОписание карточкиОписание карточки Описание карточки"
              contentSlot="99$"
              actionSlot={<Button>Купить</Button>}
              toUrl={routes.product.create(product?.documentId ?? '')}
            ></Card>
          </div>
        </section>
      </div>
    </div>
  );
};

export default observer(Product);
