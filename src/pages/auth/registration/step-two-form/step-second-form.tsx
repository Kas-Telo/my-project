import { useForm } from 'react-hook-form';

import { Size, useWindowSize } from '../../../../common/hooks/use-window-size';
import { ArrowLink } from '../../../../components/arrow-link/arrow-link';
import { AuthModal } from '../../../../components/auth-modal/auth-modal';
import { MyForm } from '../../../../components/my-form/my-form';
import { Button } from '../../../../ui';
import { Input } from '../../../../ui/input/input';
import { BodyTypography, Info, Subtitle } from '../../../../ui/typography';
import { StepSecondDataType } from '../registration';

import style from '../step-form.module.css';

type Props = {
  addData: (data: StepSecondDataType) => void;
};

export const StepSecondForm = ({ addData }: Props) => {
  const size: Size = useWindowSize();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    mode: 'all',
    defaultValues: {
      firstName: '',
      lastName: '',
    },
  });

  const onSubmit = (data: StepSecondDataType) => {
    addData(data);
  };

  return (
    <AuthModal>
      <div>
        <h4 style={{ paddingBottom: '8px' }}>Регистрация</h4>
        <Subtitle type='small'>шаг 2 из 3</Subtitle>
      </div>
      <MyForm data-test-id='register-form' onSubmit={handleSubmit(onSubmit)}>
        <div style={{ width: '100%' }}>
          <Input
            placeholder='Имя'
            isError={!!errors.firstName}
            {...register('firstName', {
              required: 'Поле не может быть пустым',
            })}
          />
          {errors.firstName?.message && (
            <Info dataTestId='hint' type='large' className={style.markErrorText}>
              {errors.firstName?.message}
            </Info>
          )}
        </div>
        <div style={{ width: '100%' }}>
          <Input
            placeholder='Фамилия'
            isError={!!errors.lastName}
            {...register('lastName', {
              required: 'Поле не может быть пустым',
            })}
          />
          {errors.lastName?.message && (
            <Info dataTestId='hint' type='large' className={style.markErrorText}>
              {errors.lastName?.message}
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
            disabled={!!errors.firstName || !!errors.lastName || !watch('firstName') || !watch('lastName')}
          >
            Последний шаг
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
