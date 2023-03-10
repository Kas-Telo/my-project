import { DetailedHTMLProps, FormHTMLAttributes, ReactNode } from 'react';

import style from './my-form.module.css';

type DefaultInputPropsType = DetailedHTMLProps<FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>;

type Props = DefaultInputPropsType & {
  children: ReactNode;
  className?: string;
};

export const MyForm = ({ className, children, ...restProps }: Props) => (
  <form {...restProps} className={`${style.form} ${className}`}>
    {children}
  </form>
);
