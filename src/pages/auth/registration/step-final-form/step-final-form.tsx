import { Ref } from 'react';
import { Controller, useForm } from 'react-hook-form';
import MaskedInput from 'react-text-mask';

import { authRegexp } from '../../../../common/enums-and-constants/regexp-constants';
import { Size, useWindowSize } from '../../../../common/hooks/use-window-size';
import { ArrowLink } from '../../../../components/arrow-link/arrow-link';
import { AuthModal } from '../../../../components/auth-modal/auth-modal';
import { MyForm } from '../../../../components/my-form/my-form';
import { Button } from '../../../../ui';
import { Input } from '../../../../ui/input/input';
import { BodyTypography, Info, Subtitle } from '../../../../ui/typography';
import { StepFinalDataType } from '../registration';

import style from '../step-form.module.css';

type Props = {
  addData: (data: StepFinalDataType) => void;
};

export const StepFinalForm = ({ addData }: Props) => {
  const size: Size = useWindowSize();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    control,
  } = useForm({
    criteriaMode: 'all',
    mode: 'all',
    defaultValues: {
      phone: '',
      email: '',
    },
  });

  const classPhoneError = `${errors.phone && style.markErrorText}`;

  const onSubmit = (data: StepFinalDataType) => {
    addData(data);
  };

  const patternPhoneNumber = [
    '+',
    '3',
    '7',
    '5',
    ' ',
    '(',
    /(2|3|4)/,
    /(9|3|4)/,
    ')',
    ' ',
    /\d/,
    /\d/,
    /\d/,
    '-',
    /\d/,
    /\d/,
    '-',
    /\d/,
    /\d/,
  ];

  return (
    <AuthModal>
      <div>
        <h4 style={{ paddingBottom: '8px' }}>Регистрация</h4>
        <Subtitle type='small'>шаг 3 из 3</Subtitle>
      </div>
      <MyForm data-test-id='register-form' onSubmit={handleSubmit(onSubmit)}>
        <div style={{ width: '100%' }}>
          <Controller
            name='phone'
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <MaskedInput
                mask={patternPhoneNumber}
                placeholderChar='x'
                value={value}
                onBlur={onBlur}
                onChange={onChange}
                render={(ref, props) => (
                  <Input
                    placeholder='Номер телефона'
                    name='phone'
                    ref={ref as Ref<HTMLInputElement>}
                    type='tel'
                    {...props}
                  />
                )}
              />
            )}
            rules={{
              required: 'Поле не может быть пустым',
              pattern: authRegexp.phone,
            }}
          />
          <Info dataTestId='hint' type='large' className={`${classPhoneError} ${style.fullErrorText}`}>
            {errors.phone?.types?.required ? errors.phone?.message : 'В формате +375 (xx) xxx-xx-xx'}
          </Info>
        </div>
        <div style={{ width: '100%' }}>
          <Input
            placeholder='E-mail'
            isError={!!errors.email}
            {...register('email', {
              required: 'Поле не может быть пустым',
              pattern: {
                value: authRegexp.email,
                message: 'Введите корректный e-mail',
              },
            })}
          />
          {errors.email?.message && (
            <Info dataTestId='hint' type='large' className={style.markErrorText}>
              {errors.email?.message}
            </Info>
          )}
        </div>
        <div style={{ width: '100%' }}>
          <Button
            className={style.submitButton}
            size={size.width > 576 ? 'large' : 'small'}
            sizeTypography={size.width > 576 ? 'large' : 'small'}
            variant='primary'
            variantTypography={size.width > 576 ? 'desktop' : 'mobile'}
            submit={true}
            disabled={!!errors.email || !!errors.phone || !watch('email') || !watch('phone')}
          >
            Зарегистрироваться
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
