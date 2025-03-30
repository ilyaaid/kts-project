import axios from 'axios';
import classNames from 'classnames';
import * as qs from 'qs';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import Button from 'components/Button';
import Card from 'components/Card';
import Text from 'components/Text';
import ArrowRightIcon from 'components/icons/ArrowRightIcon';
import { STRAPI_URL, API_TOKEN } from 'config/api';
import { routes } from 'config/routes';
import styles from './Product.module.scss';

export type ProductImageType = {
  id: number;
  url: string;
  alternativeText: string;
};

export type ProductType = {
  id: number;
  documentId: string;
  title: string;
  description: string;
  price: number;
  isInStock: boolean;
  images: ProductImageType[];
};

type CircleArrowRightProps = {
  className?: string;
  disabled?: boolean;
};

const CircleArrowRight: React.FC<CircleArrowRightProps> = ({ className, disabled, ...others }) => {
  const classes = classNames(className, styles.circle);
  return (
    <button {...others} className={classes} disabled={disabled}>
      <ArrowRightIcon className={styles.circle__arrow}></ArrowRightIcon>
    </button>
  );
};

const Product: React.FC = () => {
  const params = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState<ProductType>();

  useEffect(() => {
    window.scrollTo(0, 0);
    const queryStr = qs.stringify({
      populate: ['images', 'productCategory'],
    });
    const fetch = async () => {
      const resp = await axios.get(`${STRAPI_URL}/products/${params.id}?${queryStr}`, {
        headers: {
          Authorization: `Bearer ${API_TOKEN}`,
        },
      });
      // console.log(resp.data);
      setProduct(resp.data.data);
    };

    fetch();
  }, [params.id]);
  // console.log(params);
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
                <CircleArrowRight className={styles.circle_left}></CircleArrowRight>
                <CircleArrowRight></CircleArrowRight>
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

export default Product;
