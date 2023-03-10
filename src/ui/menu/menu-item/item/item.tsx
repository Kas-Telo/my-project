import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import style from './item.module.css';

type Props = {
  title: string;
  path: string;
  dataTestId?: string;
  onClick: () => void;
};

export const Item = ({ path, title, dataTestId, onClick }: Props) => {
  const location = useLocation();

  const activeMenuClass = `${location.pathname === path ? style.activeMenu : ''}`;

  return (
    <React.Fragment>
      <Link data-test-id={dataTestId} to={path} onClick={onClick}>
        <h5 className={activeMenuClass}>{title}</h5>
      </Link>
      {location.pathname === path && (
        <div
          style={{
            maxWidth: '255px',
            height: '1px',
            borderBottom: '1px #F83600 solid',
            marginTop: '8px',
          }}
        />
      )}
    </React.Fragment>
  );
};
