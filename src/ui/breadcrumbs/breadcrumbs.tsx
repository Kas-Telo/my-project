import { ReactElement } from 'react';

import { Size, useWindowSize } from '../../common/hooks/use-window-size';
import { Icon } from '../icon/icon';

import { ICrumb } from './crumb/crumb';

import style from './breadcrumbs.module.css';

type Props = {
  children: ReactElement<ICrumb> | Array<ReactElement<ICrumb>>;
};

export const Breadcrumbs = ({ children }: Props) => {
  const size: Size = useWindowSize();

  return (
    <div className={style.container}>
      <div className={style.contentContainer}>
        {Array.isArray(children)
          ? children.map((el, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <div key={index} style={{ display: 'inline' }}>
                {el}
                {index < children.length - 1 && (
                  <Icon
                    height={size.height > 450 ? 24 : 16}
                    width={size.width > 450 ? 24 : 16}
                    title='slash'
                    style={{ margin: '0 4px -9px' }}
                    stroke='#A7A7A7'
                  />
                )}
              </div>
            ))
          : children}
      </div>
    </div>
  );
};
