import classNames from 'classnames';
import React from 'react';
import Icon, { IconProps } from 'components/icons/Icon';
import iconStyles from 'components/icons/icons.module.scss';

const BagIcon: React.FC<IconProps> = (props) => {
  const { color = 'primary', className, ...others } = props;
  const classes = classNames(className, iconStyles[`stroke_${color}`]);
  return (
    <Icon {...others} className={classes}>
      <path
        d="M7.5 7.67001V6.70001C7.5 4.45001 9.31 2.24001 11.56 2.03001C14.24 1.77001 16.5 3.88001 16.5 6.51001V7.89001"
        stroke="#151411"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.00001 22H15C19.02 22 19.74 20.39 19.95 18.43L20.7 12.43C20.97 9.99 20.27 8 16 8H8.00001C3.73001 8 3.03001 9.99 3.30001 12.43L4.05001 18.43C4.26001 20.39 4.98001 22 9.00001 22Z"
        stroke="#151411"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M15.4955 12H15.5045" stroke="#151411" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8.49451 12H8.50349" stroke="#151411" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </Icon>
  );
};
export default BagIcon;
