import { useForm } from 'react-hook-form';

import { Size, useWindowSize } from '../../../../common/hooks/use-window-size';
import { MyForm } from '../../../../components/my-form/my-form';
import { Button } from '../../../../ui';

import style from './reset-password-form.module.css';

export const ResetPasswordForm = () => {
  const size: Size = useWindowSize();
  const { register } = useForm({
    criteriaMode: 'all',
    mode: 'all',
    defaultValues: {
      email: '',
    },
  });

  return (
    <MyForm>
      <Button
        className={style.submitButton}
        size={size.width > 576 ? 'large' : 'small'}
        sizeTypography={size.width > 576 ? 'large' : 'small'}
        variant='primary'
        variantTypography={size.width > 576 ? 'desktop' : 'mobile'}
        submit={true}
      >
        Сохранить изменения
      </Button>
    </MyForm>
  );
};
