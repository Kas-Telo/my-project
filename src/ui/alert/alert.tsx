import { Size, useWindowSize } from '../../common/hooks/use-window-size';
import { Icon } from '../icon/icon';
import { Subtitle } from '../typography';

import style from './alert.module.css';

type Props = {
  children: string;
  type: 'error' | 'success';
  onClose: () => void;
};

export const Alert = ({ children, type, onClose }: Props) => {
  const size: Size = useWindowSize();
  const alertClass = `${type === 'error' ? style.error : style.success}`;

  return (
    <div data-test-id='error' className={`${style.container} ${alertClass}`}>
      <div className={style.contentContainer}>
        <div>
          <Icon
            title={type === 'error' ? 'error' : 'success'}
            width={size.width > 992 ? 32 : 24}
            height={size.width > 992 ? 32 : 24}
          />
        </div>
        <Subtitle className={style.message} type={size.width > 992 ? 'large' : 'small'}>
          {children}
        </Subtitle>
        <button className={style.closeButton} type='button' onClick={onClose}>
          <Icon title='close' width={size.width > 992 ? 24 : 16} height={size.width > 992 ? 24 : 16} />
        </button>
      </div>
    </div>
  );
};
