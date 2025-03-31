import React from 'react';
import Icon, { IconProps } from 'components/icons/Icon';
import iconStyles from 'components/icons/icons.module.scss';

const ArrowRightIcon: React.FC<IconProps> = (props) => {
  const { color = 'primary', ...others } = props;
  return (
    <Icon {...others}>
      <path
        className={iconStyles[`stroke_${color}`]}
        d="M8.90997 19.92L15.43 13.4C16.2 12.63 16.2 11.37 15.43 10.6L8.90997 4.07999"
        stroke="#151411"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  );
};

export default ArrowRightIcon;
