import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from 'react';

import { Icon } from '../icon/icon';

import style from './button-with-icon.module.css';

type DefaultButtonPropsType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;
type Props = DefaultButtonPropsType & {
  isActive: boolean;
  titleIcon: 'tile' | 'burger-menu' | 'search' | 'sort-ascending' | 'sort-descending';
  iconHeight?: number;
  iconWidth?: number;
  minHeight?: number;
  minWidth?: number;
  children?: string | ReactNode;
  dataTestId?: string;
};

export const ButtonWithIcon = ({
  className,
  titleIcon,
  minHeight = 38,
  minWidth = 38,
  iconHeight = 19,
  iconWidth = 19,
  isActive,
  children,
  dataTestId,
  ...restProps
}: Props) => {
  const activeButtonClass = `${isActive ? style.active : style.default}`;
  const withChildrenClass = `${children ? style.withChildren : ''}`;

  return (
    <button
      data-test-id={dataTestId}
      className={`${activeButtonClass} ${style.common} ${withChildrenClass} ${className}`}
      type='button'
      {...restProps}
      style={{ minHeight: `${minHeight}px`, minWidth: `${minWidth}px` }}
    >
      <Icon
        title={titleIcon}
        fill={isActive ? '#fff' : '#A7A7A7'}
        height={`${iconHeight}px`}
        width={`${iconWidth}px`}
      />
      {children}
    </button>
  );
};
