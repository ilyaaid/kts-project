import * as React from 'react';
import iconStyles from 'components/icons/icons.module.scss';
import Icon, { IconProps } from '../Icon';

const ArrowDownIcon: React.FC<IconProps> = (props) => {
  const { color = 'primary', ...others } = props;
  return (
    <Icon {...others}>
      <path
        className={iconStyles[`fill_${color}`]}
        d="M2.33563 8.74741L3.66436 7.25259L12 14.662L20.3356 7.25259L21.6644 8.74741L12 17.338L2.33563 8.74741Z"
      />
    </Icon>
  );
};

export default ArrowDownIcon;
