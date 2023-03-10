import { Fragment, useState } from 'react';
import { useForm } from 'react-hook-form';

import { Size, useWindowSize } from '../../../../common/hooks/use-window-size';
import { ArrowLink } from '../../../../components/arrow-link/arrow-link';
import { AuthModal } from '../../../../components/auth-modal/auth-modal';
import { MyForm } from '../../../../components/my-form/my-form';
import { Button } from '../../../../ui';
import { Input } from '../../../../ui/input/input';
import { BodyTypography, Info, Subtitle } from '../../../../ui/typography';
import { StepFirstDataType } from '../registration';

import style from '../step-form.module.css';

type Props = {
  addData: (data: StepFirstDataType) => void;
};

export const StepFirstForm = ({ addData }: Props) => {
  const [isFocused, setIsFocused] = useState({
    username: false,
    password: false,
  });

  const size: Size = useWindowSize();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    criteriaMode: 'all',
    mode: 'all',
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const classErrorSpan = (errorVariable: boolean) => `${errorVariable ? style.markErrorText : ''}`;
  const classFullError = (field: 'username' | 'password') =>
    `${
      errors[field] && (field === 'username' ? !isFocused.username : !isFocused.password)
        ? style.markErrorText
        : style.fullErrorText
    }`;

  const onSubmit = (data: StepFirstDataType) => {
    addData(data);
  };

  return (
    <AuthModal>
      <div>
        <h4 style={{ paddingBottom: '8px' }}>Регистрация</h4>
        <Subtitle type='small'>шаг 1 из 3</Subtitle>
      </div>
      <MyForm data-test-id='register-form' onSubmit={handleSubmit(onSubmit)}>
        <div style={{ width: '100%' }}>
          <Input
            placeholder='Придумайте логин для входа'
            isError={!!errors.username}
            {...register('username', {
              required: 'Поле не может быть пустым',
              validate: {
                digitRequired: (value) => !!value.match(/[0-9]/),
                latinRequired: (value) => !value.match(/[^a-zA-Z0-9]/) && !!value.match(/[a-zA-z]/),
              },
              onBlur: () => {
                setIsFocused({ ...isFocused, username: false });
              },
              onChange: () => {
                setIsFocused({ ...isFocused, username: true });
              },
            })}
          />
          <Info dataTestId='hint' type='large' className={classFullError('username')}>
            {errors.username?.type === 'required' && !isFocused.username ? (
              errors.username.message
            ) : (
              <Fragment>
                Используйте для логина{' '}
                <span className={`${classErrorSpan(!!errors.username?.types?.latinRequired)} ${style.errorText}`}>
                  латинский алфавит
                </span>{' '}
                и{' '}
                <span className={`${classErrorSpan(!!errors.username?.types?.digitRequired)} ${style.errorText}`}>
                  цифры
                </span>
              </Fragment>
            )}
          </Info>
        </div>
        <div style={{ width: '100%' }}>
          <Input
            type='password'
            checkMark={!errors.password && !!watch('password')}
            placeholder='Пароль'
            isError={!!errors.password}
            {...register('password', {
              required: 'Поле не может быть пустым',
              validate: {
                minLength: (value) => value.length >= 8,
                capitalLetterRequired: (value) => !!value.match(/[A-ZА-ЯЁ]/),
                digitRequired: (value) => !!value.match(/[0-9]/),
              },
              onBlur: () => {
                setIsFocused({ ...isFocused, password: false });
              },
              onChange: () => {
                setIsFocused({ ...isFocused, password: true });
              },
            })}
          />
          <Info dataTestId='hint' type='large' className={classFullError('password')}>
            {errors.password?.type === 'required' && !isFocused.password ? (
              errors.password.message
            ) : (
              <Fragment>
                Пароль{' '}
                <span className={`${classErrorSpan(!!errors.password?.types?.minLength)} ${style.errorText}`}>
                  не менее 8 символов
                </span>
                , с{' '}
                <span
                  className={`${classErrorSpan(!!errors.password?.types?.capitalLetterRequired)} ${style.errorText}`}
                >
                  заглавной буквой
                </span>{' '}
                и{' '}
                <span className={`${classErrorSpan(!!errors.password?.types?.digitRequired)} ${style.errorText}`}>
                  цифрой
                </span>
              </Fragment>
            )}
          </Info>
        </div>
        <div style={{ width: '100%' }}>
          <Button
            className={style.submitButton}
            size={size.width > 576 ? 'large' : 'small'}
            sizeTypography={size.width > 576 ? 'large' : 'small'}
            variant='primary'
            variantTypography={size.width > 576 ? 'desktop' : 'mobile'}
            submit={true}
            disabled={!!errors.password || !!errors.username || !watch('password') || !watch('username')}
          >
            Следующий шаг
          </Button>
          <div className={style.registrationLinkBlock}>
            <BodyTypography style={{ color: '#727272', minWidth: '166px' }} type='large'>
              Есть учётной записи?
            </BodyTypography>
            <ArrowLink path='/auth' positionArrow='after'>
              Вход
            </ArrowLink>
          </div>
        </div>
      </MyForm>
    </AuthModal>
  );
};
