import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { useAppSelector } from '../../../common/hooks/use-app-selector';
import { AuthModal } from '../../../components/auth-modal/auth-modal';
import { Button } from '../../../ui';
import { BodyTypography } from '../../../ui/typography';

import { ForgotPasswordForm } from './forgot-password-form/forgot-password-form';
import { ResetPasswordForm } from './reset-password-form/reset-password-form';

import style from '../auth/auth.module.css';

export const ForgotPass = () => {
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();

  const isAuth = useAppSelector((state) => state.auth.isAuth);
  const responseInfo = useAppSelector((state) => state.auth.authInfo);

  const onClickModalButton = () => {
    if (responseInfo.status === 200) {
      navigate('/auth');
    } else {
      navigate('/forgot-password');
    }
  };

  useEffect(() => {
    if (isAuth) {
      navigate('/books/all');
    }
  }, [isAuth, navigate]);

  return (
    <div>
      {responseInfo.info ? (
        <AuthModal type='info'>
          {searchParams.get('code') ? (
            responseInfo.status === 200 ? (
              <h2>Новые данные сохранены</h2>
            ) : (
              <h2>Данные не сохранились</h2>
            )
          ) : (
            <h2>Письмо выслано</h2>
          )}
          <BodyTypography type='large'>{responseInfo.info}</BodyTypography>
          {!searchParams.get('code') && (
            <Button
              submit={false}
              variant='primary'
              size='large'
              sizeTypography='large'
              className={style.infoButton}
              variantTypography='desktop'
              onClick={onClickModalButton}
            >
              {responseInfo.status === 200 ? 'Вход' : 'Повторить'}
            </Button>
          )}
        </AuthModal>
      ) : (
        <AuthModal>{searchParams.get('code') ? <ResetPasswordForm /> : <ForgotPasswordForm />}</AuthModal>
      )}
    </div>
  );
};
