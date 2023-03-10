import { Link, useLocation } from 'react-router-dom';

import { Size, useWindowSize } from '../../../common/hooks/use-window-size';
import { BodyTypography } from '../../typography';

import style from './crumb.module.css';

export type ICrumb = {
  path: string;
  children: string;
  dataTestIdLink?: string;
  dataTestIdName?: string;
};

export const Crumb = ({ path, children, dataTestIdLink, dataTestIdName }: ICrumb) => {
  const location = useLocation();
  const size: Size = useWindowSize();

  return (
    <div style={{ display: 'inline' }}>
      {location.pathname === path ? (
        <BodyTypography
          data-test-id={dataTestIdName}
          className={style.text}
          type={size.width > 450 ? 'large' : 'small'}
        >
          {children}
        </BodyTypography>
      ) : (
        <Link to={path} data-test-id={dataTestIdLink}>
          <BodyTypography className={style.text} type={size.width > 450 ? 'large' : 'small'}>
            {children}
          </BodyTypography>
        </Link>
      )}
    </div>
  );
};
