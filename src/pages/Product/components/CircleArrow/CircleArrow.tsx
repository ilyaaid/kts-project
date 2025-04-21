import classNames from 'classnames';
import React from 'react';
import ArrowRightIcon from 'components/icons/ArrowRightIcon';
import styles from './CircleArrow.module.scss';

type CircleArrowRightProps = {
  className?: string;
  disabled?: boolean;
  onClick: (type: 'left' | 'right') => void;
  type: 'left' | 'right';
};

const CircleArrow: React.FC<CircleArrowRightProps> = ({ className, disabled, onClick, type, ...others }) => {
  const classes = classNames(className, styles.circle);
  return (
    <button
      {...others}
      className={classes}
      onClick={() => {
        onClick(type);
      }}
      disabled={disabled}
    >
      <ArrowRightIcon className={styles.circle__arrow}></ArrowRightIcon>
    </button>
  );
};

export default CircleArrow;
