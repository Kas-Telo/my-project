import { ReactNode } from 'react';

import style from './auth-modal.module.css';

type Props = {
  type?: 'info';
  children: ReactNode;
  dataTestId?: string;
};

export const AuthModal = ({ children, type, dataTestId }: Props) => (
  <div
    data-test-id={type === 'info' && dataTestId}
    className={`${style.container} ${type === 'info' && style.infoContainer}`}
  >
    {children}
  </div>
);
