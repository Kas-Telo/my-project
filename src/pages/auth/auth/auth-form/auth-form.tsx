import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

import { useAppDispatch } from '../../../../common/hooks/use-app-dispatch';
import { Size, useWindowSize } from '../../../../common/hooks/use-window-size';
import { ArrowLink } from '../../../../components/arrow-link/arrow-link';
import { AuthModal } from '../../../../components/auth-modal/auth-modal';
import { MyForm } from '../../../../components/my-form/my-form';
import { asyncAuthActions } from '../../../../store/auth/auth';
import { Button } from '../../../../ui';
import { Input } from '../../../../ui/input/input';
import { BodyTypography, Info } from '../../../../ui/typography';

import style from './auth-form.module.css';

type AuthSubmitForm = {
  identifier: string;
  password: string;
};

export const AuthForm = () => {
  const [badRequestError, toggleBadRequestError] = useState(false);
  const size: Size = useWindowSize();
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthSubmitForm>({
    mode: 'all',
  });

  const onSubmit = async ({ identifier, password }: AuthSubmitForm) => {
    const action = await dispatch(
      asyncAuthActions.auth({
        identifier,
        password,
      })
    );

    if (asyncAuthActions.auth.rejected.match(action)) {
      if (action.payload?.errorStatus === 400) {
        toggleBadRequestError(true);
      }
    }
  };

  return (
    <AuthModal>
      <h4>Вход в личный кабинет</h4>
      <MyForm data-test-id='auth-form' onSubmit={handleSubmit(onSubmit)}>
        <div style={{ width: '100%' }}>
          <Input
            type='text'
            placeholder='Логин'
            {...register('identifier', {
              required: 'Поле не может быть пустым',
            })}
          />
          {errors.identifier?.message && (
            <Info dataTestId='hint' type='large' style={{ color: '#F42C4F' }}>
              {errors.identifier?.message}
            </Info>
          )}
        </div>
        <div style={{ width: '100%' }}>
          <div className={style.passwordBlock}>
            <Input
              placeholder='Пароль'
              type='password'
              {...register('password', {
                required: 'Поле не может быть пустым',
              })}
            />
            {errors.password?.message && (
              <Info dataTestId='hint' type='large' style={{ color: '#F42C4F' }}>
                {errors.password?.message}
              </Info>
            )}
          </div>
          <div>
            <div className={`${badRequestError ? style.activeBadRequestError : style.notActiveBadRequestError}`}>
              <Info dataTestId='hint' type='large' style={{ color: '#F42C4F' }}>
                Неверный логин или пароль!
              </Info>
            </div>
            <Link to='/forgot-pass'>
              <Info type='large' style={{ color: `${badRequestError ? '#363636' : '#A7A7A7'}` }}>
                {badRequestError ? 'Восстановить?' : 'Забыли логин или пароль?'}
              </Info>
            </Link>
          </div>
        </div>
        <div style={{ width: '100%' }}>
          <Button
            className={style.submitButton}
            size={size.width > 576 ? 'large' : 'small'}
            sizeTypography={size.width > 576 ? 'large' : 'small'}
            variant='primary'
            variantTypography={size.width > 576 ? 'desktop' : 'mobile'}
            submit={true}
          >
            Вход
          </Button>
          <div className={style.registrationLinkBlock}>
            <BodyTypography style={{ color: '#727272', minWidth: '166px' }} type='large'>
              Нет учётной записи?
            </BodyTypography>
            <ArrowLink path='/registration' positionArrow='after'>
              Регистрация
            </ArrowLink>
          </div>
        </div>
      </MyForm>
    </AuthModal>
  );
};
