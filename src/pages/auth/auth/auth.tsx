import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useActions } from '../../../common/hooks/use-actions';
import { useAppSelector } from '../../../common/hooks/use-app-selector';
import { AuthModal } from '../../../components/auth-modal/auth-modal';
import { syncAuthActions } from '../../../store/auth/auth';
import { Button } from '../../../ui';
import { BodyTypography } from '../../../ui/typography';

import { AuthForm } from './auth-form/auth-form';

import style from './auth.module.css';

export const Auth = () => {
  const navigate = useNavigate();

  const isAuth = useAppSelector((state) => state.auth.isAuth);
  const authError = useAppSelector((state) => state.auth.authInfo);

  const { setAuthInfo } = useActions(syncAuthActions);

  useEffect(() => {
    if (isAuth) {
      navigate('/books/all');
    }
  }, [isAuth, navigate]);

  return (
    <div>
      {authError.info ? (
        <AuthModal dataTestId='status-block' type='info'>
          <h4>Вход не выполнен</h4>
          <BodyTypography type='large'>Что-то пошло не так. Попробуйте ещё раз</BodyTypography>
          <Button
            submit={false}
            variant='primary'
            size='large'
            sizeTypography='large'
            className={style.infoButton}
            variantTypography='desktop'
            onClick={() => setAuthInfo({ status: null, info: null })}
          >
            Повторить
          </Button>
        </AuthModal>
      ) : (
        <AuthForm />
      )}
    </div>
  );
};
