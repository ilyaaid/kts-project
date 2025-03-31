import classNames from 'classnames';
import React from 'react';
import { MultiDropDownPropsOptions, Option } from 'components/MultiDropdown';
import Text from 'components/Text';
import styles from './MultiDropdownOptions.module.scss';

const MultiDropDownOptions: React.FC<MultiDropDownPropsOptions> = (props) => {
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

export default MultiDropDownOptions;
