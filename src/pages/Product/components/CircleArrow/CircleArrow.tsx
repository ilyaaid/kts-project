import classNames from 'classnames';
import React from 'react';
import ArrowRightIcon from 'components/icons/ArrowRightIcon';
import styles from './CircleArrow.module.scss';

type CircleArrowRightProps = {
  className?: string;
  disabled?: boolean;
};

const CircleArrow: React.FC<CircleArrowRightProps> = ({ className, disabled, ...others }) => {
  const classes = classNames(className, styles.circle);
  return (
    <button {...others} className={classes} disabled={disabled}>
      <ArrowRightIcon className={styles.circle__arrow}></ArrowRightIcon>
    </button>
  );
};

export default CircleArrow;
