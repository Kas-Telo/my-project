import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';

import style from './body-typography.module.css';

type DefaultParagraphPropsType = DetailedHTMLProps<HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement>;

type Props = DefaultParagraphPropsType & {
  children: ReactNode;
  type: 'large' | 'small';
};

export const BodyTypography = ({ className, children, type, ...restprops }: Props) => {
  const finalClassName = `${type === 'large' ? style.large : style.small} ${className}`;

  return (
    <p className={finalClassName} {...restprops}>
      {children}
    </p>
  );
};
