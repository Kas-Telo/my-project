import { Outlet } from 'react-router-dom';

import { Loader } from '../../../../ui/loader/loader';
import { useAppSelector } from '../../../hooks/use-app-selector';

export const AuthLayout = () => {
  const isLoading = useAppSelector((state) => state.app.isLoading);

  return (
    <div
      data-test-id='auth'
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'linear-gradient(231.58deg, #F83600 -53.35%, #F9D423 297.76%)',
        minWidth: '100vw',
        minHeight: '100vh',
        padding: '0 16px',
      }}
    >
      {isLoading && <Loader />}
      <Outlet />
    </div>
  );
};
