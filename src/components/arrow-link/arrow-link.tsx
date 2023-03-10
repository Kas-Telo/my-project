import { Link } from 'react-router-dom';

import { Icon } from '../../ui/icon/icon';
import { ButtonTypography } from '../../ui/typography';

import style from './arrow-link.module.css';

type Props = {
  children?: string;
  path: string;
  positionArrow: 'before' | 'after';
};

export const ArrowLink = ({ children, path, positionArrow }: Props) => (
  <Link to={path} className={style.linkContainer}>
    {positionArrow === 'before' && <Icon title='arrow-left' />}
    <ButtonTypography size='small' variant='mobile'>
      {children}
    </ButtonTypography>
    {positionArrow === 'after' && <Icon title='arrow-right' />}
  </Link>
);
