import classNames from 'classnames';
import React, { JSX } from 'react';
import Text from 'components/Text';
import ArrowRightIcon from 'components/icons/ArrowRightIcon/ArrowRightIcon';
import styles from './Paginator.module.scss';

export type PaginatorProps = {
  className?: string;
  current: number;
  pageCount: number;
  onChange: (newPage: number) => void;
};

const Paginator: React.FC<PaginatorProps> = ({ current, pageCount, className, onChange, ...others }) => {
  const classes = classNames(styles.paginator, className);
  const isStart = current <= 1;
  const isEnd = current >= pageCount;
  const classesArrowLeft = classNames(styles.paginator__arrow, styles.paginator__arrow_left, {
    [styles.paginator__arrow_disabled]: isStart,
  });
  const classesArrowRight = classNames(styles.paginator__arrow, {
    [styles.paginator__arrow_disabled]: isEnd,
  });

  const digits: number[] = [];
  for (let i = 1; i <= pageCount; ++i) {
    digits.push(i);
  }
  const filterDigits = digits.filter((num) => Math.abs(num - current) < 2 || num === 1 || num === pageCount);

  const Items: JSX.Element[] = [];
  for (let i = 0; i < filterDigits.length; ++i) {
    const cur = filterDigits[i];
    if (i >= 1 && cur - filterDigits[i - 1] > 1) {
      Items.push(
        <div key={cur - 1} className={styles.paginator__item}>
          <Text tag="div" view="p-18" weight="medium">
            ...
          </Text>
        </div>,
      );
    }
    const classesItem = classNames(styles.paginator__item, {
      [styles.paginator__item_active]: cur === current,
    });
    Items.push(
      <div
        key={cur}
        className={classesItem}
        onClick={() => {
          onChange(cur);
        }}
      >
        <Text tag="div" view="p-18" weight="medium">
          {cur}
        </Text>
      </div>,
    );
  }

  return (
    <div {...others} className={classes}>
      <ArrowRightIcon
        width={35}
        height={35}
        className={classesArrowLeft}
        onClick={() => {
          if (!isStart) {
            onChange(current - 1);
          }
        }}
      ></ArrowRightIcon>
      {Items}
      <ArrowRightIcon
        width={35}
        height={35}
        className={classesArrowRight}
        onClick={() => {
          if (!isEnd) {
            onChange(current + 1);
          }
        }}
      ></ArrowRightIcon>
    </div>
  );
};

export default Paginator;
