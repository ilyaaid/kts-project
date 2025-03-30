import classNames from 'classnames';
import React from 'react';
import Loader from 'components/Loader';
import Text from 'components/Text';
import styles from './Button.module.scss';

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  /** Состояние загрузки */
  loading?: boolean;
  /** Текст кнопки */
  children: React.ReactNode;

  disabled?: boolean;
  className?: string;
};

const Button: React.FC<ButtonProps> = (props) => {
  const { className, disabled, loading, children, ...others } = props;
  const classes = classNames(
    className,
    styles['primary__default'],
    loading ? styles['primary__loading'] : styles['primary__simple'],
    {
      [styles['primary__disabled']]: disabled,
    },
  );
  return (
    <button {...others} className={classes} disabled={loading ? true : disabled ? true : false}>
      {loading && <Loader className={styles['loader']} size="s"></Loader>}
      <Text tag="div" view="button">
        {children}
      </Text>
    </button>
  );
};

export default Button;
