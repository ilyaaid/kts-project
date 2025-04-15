import classNames from 'classnames';
import React from 'react';
import { Link } from 'react-router';
import Text from '../Text';
import styles from './Card.module.scss';

export type CardProps = {
  /** Дополнительный classname */
  className?: string;
  /** URL изображения */
  image: string;
  /** Слот над заголовком */
  captionSlot?: React.ReactNode;
  /** Заголовок карточки */
  title: React.ReactNode;
  /** Описание карточки */
  subtitle: React.ReactNode;
  /** Содержимое карточки (футер/боковая часть), может быть пустым */
  contentSlot?: React.ReactNode;
  /** Клик на карточку */
  onClick?: React.MouseEventHandler;
  /** Слот для действия */
  actionSlot?: React.ReactNode;
  /** Ссылка для перехода по карточке */
  toUrl: string;
};

const Card: React.FC<CardProps> = (props) => {
  const { className, image, captionSlot, title, subtitle, contentSlot, actionSlot, onClick, toUrl, ...others } = props;
  const classes = classNames(styles['default'], className);
  return (
    <div {...others} className={classes} onClick={onClick}>
      <Link to={toUrl}>
        <div className={styles['img']}>
          <img src={image} alt={image} />
        </div>
      </Link>
      <div className={styles['content']}>
        <div className={styles['content__text']}>
          {captionSlot && (
            <Text tag="div" view="p-14" color="secondary">
              {captionSlot}
            </Text>
          )}
          <Link className={styles.link} to={toUrl}>
            <Text tag="div" weight="medium" view="p-20" color="primary" maxLines={2}>
              {title}
            </Text>
          </Link>
          <Text tag="div" view="p-16" color="secondary" maxLines={3}>
            {subtitle}
          </Text>
        </div>
        <div className={styles['content__footer']}>
          {contentSlot && (
            <Text tag="div" weight="bold" view="p-18">
              {contentSlot}
            </Text>
          )}
          {actionSlot}
        </div>
      </div>
    </div>
  );
};

export default Card;
