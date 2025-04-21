import classNames from 'classnames';
import React, { useEffect, useRef, useState } from 'react';
import MultiDropDownInput from './components/MultiDropdownInput';
import MultiDropDownOptions from './components/MultiDropdownOptions';
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

export type MultiDropDownPropsOptions = MultiDropdownProps & {
  optionsVal: Option[];
  setOptionsVal: (options: Option[]) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
};

const MultiDropdown: React.FC<MultiDropdownProps> = (props) => {
  const { className, disabled, options } = props;
  const [open, setOpen] = useState(false);
  const [optionsVal, setOptionsVal] = useState<Option[]>(options);
  // console.log(options, optionsVal);
  const ref = useRef<HTMLDivElement | null>(null);

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
    <div ref={ref} className={classes}>
      <MultiDropDownInput {...{ ...props, optionsVal, setOptionsVal, open, setOpen }} />
      {!disabled && open && <MultiDropDownOptions {...{ ...props, optionsVal, setOptionsVal, open, setOpen }} />}
    </div>
  );
};

export default MultiDropdown;
