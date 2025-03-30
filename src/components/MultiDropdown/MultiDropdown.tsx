import classNames from 'classnames';
import React, { useEffect, useRef, useState } from 'react';
import Text from 'components/Text';
import Input from '../Input';
import ArrowDownIcon from '../icons/ArrowDownIcon';
import styles from './MultiDropdown.module.scss';

export type Option = {
  /** Ключ варианта, используется для отправки на бек/использования в коде */
  key: string;
  /** Значение варианта, отображается пользователю */
  value: string;
};

/** Пропсы, которые принимает компонент Dropdown */
export type MultiDropdownProps = {
  className?: string;
  /** Массив возможных вариантов для выбора */
  options: Option[];
  /** Текущие выбранные значения поля, может быть пустым */
  value: Option[];
  /** Callback, вызываемый при выборе варианта */
  onChange: (value: Option[]) => void;
  /** Заблокирован ли дропдаун */
  disabled?: boolean;
  /** Возвращает строку которая будет выводится в инпуте. В случае если опции не выбраны, строка должна отображаться как placeholder. */
  getTitle: (value: Option[]) => string;
};

export type MultiDropdownPropsOptions = MultiDropdownProps & {
  optionsVal: Option[];
  setOptionsVal: (options: Option[]) => void;
};

const MultiDropDownInput: React.FC<MultiDropdownPropsOptions> = (props) => {
  const { options, setOptionsVal, value, getTitle, disabled } = props;
  const [focus, setFocus] = useState<boolean>(false);
  const [inputStr, setInputStr] = useState<string>('');
  const classes = classNames(styles['dropdown__input']);

  const ref = useRef<HTMLInputElement>(null);

  const handleFocus = () => {
    setFocus(true);
    setOptionsVal(options);
  };

  const handleBlur = () => {
    setFocus(false);
    setInputStr('');
  };

  const handleChange = () => {
    if (ref.current) {
      const searchStr = ref.current.value;
      setInputStr(searchStr);
      setOptionsVal(options.filter((opt) => opt.value.toLowerCase().includes(searchStr.toLowerCase())));
    }
  };

  return (
    <Input
      ref={ref}
      className={classes}
      value={!focus && value.length !== 0 ? getTitle(value) : inputStr}
      disabled={disabled}
      placeholder={getTitle(value)}
      afterSlot={<ArrowDownIcon color="secondary" />}
      onChange={handleChange}
      onFocus={handleFocus}
      onBlur={handleBlur}
    ></Input>
  );
};

const MultiDropDownOptions: React.FC<MultiDropdownPropsOptions> = (props) => {
  const { options, value, onChange } = props;
  const indInValue = (opt: Option) => value.findIndex((item) => item.key === opt.key);
  const handleClickOption = (opt: Option) => {
    if (indInValue(opt) !== -1) {
      onChange(value.filter((val) => val.key !== opt.key));
    } else {
      onChange([...value, opt]);
    }
  };

  return (
    <div className={styles['options']}>
      {options.map((opt) => {
        const classesOption = classNames(styles['options__item'], {
          [styles['options__item_add']]: indInValue(opt) !== -1,
        });
        return (
          <div key={opt.key} onClick={() => handleClickOption(opt)} className={classesOption}>
            <Text tag="div">{opt.value}</Text>
          </div>
        );
      })}
    </div>
  );
};

const MultiDropdown: React.FC<MultiDropdownProps> = (props) => {
  const { className, disabled, options } = props;
  const [open, setOpen] = useState(false);
  const [optionsVal, setOptionsVal] = useState<Option[]>(options);
  // console.log(options, optionsVal);
  const ref = useRef<HTMLDivElement | null>(null);

  const handleClick = () => {
    setOpen(true);
  };

  useEffect(() => {
    const handleOutClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node) && open) {
        setOpen(false);
      }
    };
    document.addEventListener('click', handleOutClick);
    return () => {
      document.removeEventListener('click', handleOutClick);
    };
  }, [open]);

  useEffect(() => {
    setOptionsVal(options);
  }, [options]);

  const classes = classNames(className, styles['dropdown']);
  return (
    <div ref={ref} className={classes} onClick={handleClick}>
      <MultiDropDownInput {...{ ...props, optionsVal, setOptionsVal }}></MultiDropDownInput>
      {!disabled && open && <MultiDropDownOptions {...{ ...props, optionsVal, setOptionsVal }}></MultiDropDownOptions>}
    </div>
  );
};

export default MultiDropdown;
