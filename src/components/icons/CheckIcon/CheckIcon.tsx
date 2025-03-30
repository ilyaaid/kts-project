import * as React from 'react';
import iconStyles from 'components/icons/icons.module.scss';
import Icon, { IconProps } from '../Icon';

const CheckIcon: React.FC<IconProps> = (props) => {
  const { color = 'primary', ...others } = props;
  return (
    <Icon {...others}>
      <path className={iconStyles[`stroke_${color}`]} d="M4 11.6129L9.87755 18L20 7" strokeWidth="2" />
    </Icon>
  );
};

export default CheckIcon;
