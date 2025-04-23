import classNames from 'classnames';
import React from 'react';
import Icon, { IconProps } from 'components/icons/Icon';
import iconStyles from 'components/icons/icons.module.scss';
import styles from './ProfileIcon.module.scss';

const ProfileIcon: React.FC<IconProps & { logged: boolean }> = (props) => {
  const { color = 'primary', className, logged, ...others } = props;
  const classes = classNames(className, iconStyles[`stroke_${color}`]);
  return (
    <Icon {...others} className={classes}>
      <path
        className={styles[`fill_${logged ? color : 'transparent'}`]}
        d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z"
        stroke="#151411"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20.59 22C20.59 18.13 16.74 15 12 15C7.26003 15 3.41003 18.13 3.41003 22"
        stroke="#151411"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  );
};

export default ProfileIcon;
