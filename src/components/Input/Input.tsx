import classNames from 'classnames';
import React from 'react';
import textStyles from 'components/Text/Text.module.scss';
import styles from './Input.module.scss';

export type InputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> & {
  /** Значение поля */
  value: string;
  /** Callback, вызываемый при вводе данных в поле */
  onChange: (value: string) => void;
  /** Слот для иконки справа */
  afterSlot?: React.ReactNode;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { className, value, onChange, afterSlot, placeholder, disabled, ...other } = props;
  const handleChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onChange(event.target.value);
    },
    [onChange],
  );
  const classesWrapper = classNames(
    styles['wrapper'],
    {
      [styles['wrapper_slot']]: afterSlot,
      [styles['wrapper_disabled']]: disabled,
    },
    className,
  );
  const classes = classNames(styles['elem'], textStyles['default'], textStyles['view_p-16']);
  const after = afterSlot ? true : false;
  return (
    <div className={classesWrapper}>
      <input
        {...other}
        ref={ref}
        className={classes}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        disabled={disabled}
      ></input>
      {after && <div className={styles.after}>{afterSlot}</div>}
    </div>
  );
});

Input.displayName = 'Input';
export default Input;
