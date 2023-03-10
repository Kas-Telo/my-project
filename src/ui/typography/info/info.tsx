import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';

import style from './info.module.css';

type DefaultParagraphPropsType = DetailedHTMLProps<HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement>;

type Props = DefaultParagraphPropsType & {
  children: ReactNode;
  type: 'large' | 'small';
  dataTestId?: string;
};

export const Info = ({ children, type, dataTestId, ...restprops }: Props) => {
  const finalClassName = type === 'large' ? `${style.large}` : `${style.small}`;

  return (
    <p data-test-id={dataTestId} className={finalClassName} {...restprops}>
      {children}
    </p>
  );
};
