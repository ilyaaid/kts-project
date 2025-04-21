import classNames from 'classnames';
import React, { HTMLAttributes } from 'react';
import styles from './CardSkeleton.module.scss';

export type CardSkeletonProps = HTMLAttributes<HTMLDivElement> & {
  className?: string;
};

const CardSkeleton: React.FC<CardSkeletonProps> = ({ className }) => {
  const classes = classNames(styles.skeleton, className);
  return (
    <div className={classes}>
      <div className={styles.img}></div>
      <div className={styles.content}>
        <div className={styles.caption}></div>
        <div className={styles.title}></div>
        <div className={styles.desc}>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className={styles.action}>
          <div className={styles.slot}></div>
          <div className={styles.btn}></div>
        </div>
      </div>
    </div>
  );
};

export default CardSkeleton;
