import { useEffect, useRef } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { Auth } from '../../../pages/auth/auth/auth';
import { ForgotPass } from '../../../pages/auth/forgot-pass/forgot-pass';
import { Registration } from '../../../pages/auth/registration/registration';
import { BookPage } from '../../../pages/book';
import { LayoutMainPage, MainPage, Terms } from '../../../pages/main';
import { Profile } from '../../../pages/profile';
import { syncAppActions } from '../../../store/app/app-slice';
import { syncAuthActions } from '../../../store/auth/auth';
import { Loader } from '../../../ui/loader/loader';
import { useActions } from '../../hooks/use-actions';
import { useAppSelector } from '../../hooks/use-app-selector';
import { Layout } from '../layout';
import { AuthLayout } from '../layout/auth-layout/auth-layout';
import { MainLayout } from '../layout/main-layout/main-layout';

const getToken = () => {
  let token = localStorage.getItem('token');

  if (token !== null) token = JSON.parse(token);

  return token;
};

export const Routing = () => {
  const isAuth = useAppSelector((state) => state.auth.isAuth);
  const isInitialized = useAppSelector((state) => state.app.isInitialized);

  const { setIsInitialized } = useActions(syncAppActions);
  const { toggleIsAuth } = useActions(syncAuthActions);

  const shouldFetch = useRef(true);

  useEffect(() => {
    if (shouldFetch.current) {
      if (getToken()) {
        toggleIsAuth({ isAuth: true });
      } else {
        toggleIsAuth({ isAuth: false });
      }
      shouldFetch.current = false;
      setIsInitialized({ isInitialized: true });
    }
  }, [setIsInitialized, toggleIsAuth]);

  if (!isInitialized) {
    return <Loader />;
  }

  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route path='/' element={<Navigate to={isAuth ? '/books/all' : '/auth'} />} />
        <Route element={<MainLayout />}>
          <Route element={<LayoutMainPage />}>
            <Route path='/books/:category' element={<MainPage />} />
            <Route path='/terms' element={<Terms contentView='terms' />} />
            <Route path='/contract' element={<Terms contentView='contract' />} />
          </Route>
          <Route path='/profile' element={<Profile />} />
          <Route path='/books/:category/:bookId' element={<BookPage />} />
        </Route>
        <Route element={<AuthLayout />}>
          <Route path='/auth' element={<Auth />} />
          <Route path='/registration' element={<Registration />} />
          <Route path='/forgot-pass' element={<ForgotPass />} />
        </Route>
      </Route>
    </Routes>
  );
};
