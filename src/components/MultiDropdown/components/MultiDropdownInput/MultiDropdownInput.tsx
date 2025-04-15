import classNames from 'classnames';
import React, { useRef, useState } from 'react';
import Input from 'components/Input';
import { MultiDropDownPropsOptions } from 'components/MultiDropdown';
import ArrowDownIcon from 'components/icons/ArrowDownIcon';
import styles from './MultiDropdownInput.module.scss';

const MultiDropDownInput: React.FC<MultiDropDownPropsOptions> = (props) => {
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

export default MultiDropDownInput;
