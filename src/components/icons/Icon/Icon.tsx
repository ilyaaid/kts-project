import * as React from 'react';

export type IconProps = React.SVGAttributes<SVGElement> & {
  className?: string;
  color?: 'primary' | 'secondary' | 'accent';
  width?: number;
  height?: number;
};

const Icon: React.FC<React.PropsWithChildren<IconProps>> = (props) => {
  const { width = 24, height = 24, className, ...others } = props;
  return <svg viewBox="0 0 24 24" {...others} className={className} width={width} height={height} fill="none" />;
};

export default Icon;
