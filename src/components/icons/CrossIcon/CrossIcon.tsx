import classNames from 'classnames';
import React from 'react';
import Icon, { IconProps } from 'components/icons/Icon';
import iconStyles from 'components/icons/icons.module.scss';

const CrossIcon: React.FC<IconProps> = (props) => {
  const { color = 'primary', className, ...others } = props;
  const classes = classNames(className, iconStyles[`stroke_${color}`]);
  return (
    <Icon {...others} className={classes}>
      <path d="M18 6L6 18" stroke="#151411" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6 6L18 18" stroke="#151411" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </Icon>
  );
};

export default CrossIcon;
