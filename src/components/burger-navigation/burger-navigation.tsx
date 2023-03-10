import { useState } from 'react';

import { useActions } from '../../common/hooks/use-actions';
import { syncAuthActions } from '../../store/auth/auth';
import { syncBooksActions } from '../../store/main-page/books/books-slice';
import { Menu, MenuItem } from '../../ui/menu';
import { Navigation } from '../navigation';

import style from './burger-navigation.module.css';

type Props = {
  onClose: () => void;
  dataTestId: string;
};

export const BurgerNavigation = ({ onClose, dataTestId }: Props) => {
  const [collapsed, setCollapsed] = useState(false);

  const { toggleIsAuth } = useActions(syncAuthActions);
  const { updateCategories, setIsFirstLoadingCategories } = useActions(syncBooksActions);

  const exitButtonClick = () => {
    localStorage.setItem('token', `${JSON.stringify(null)}`);
    updateCategories({ categories: [] });
    setIsFirstLoadingCategories({ isFirstLoadingCategories: true });
    toggleIsAuth({ isAuth: false });
  };

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
    <div className={style.container} onClick={onClose} data-test-id={dataTestId}>
      <div className={style.navContainer}>
        <Navigation
          dataTestIdType='burger'
          dataTestIdShowCase='burger-showcase'
          dataTestIdTerms='burger-terms'
          dataTestIdContract='burger-contract'
          collapsed={collapsed}
          setCollapsed={setCollapsed}
        />
      </div>
      <div className={style.hr} />
      <div className={style.profileContainer}>
        <Menu>
          <MenuItem title='Профайл' path='/profile' basedPath='' />
          <MenuItem dataTestId='exit-button' title='Выход' path='' basedPath='' onClick={exitButtonClick} />
        </Menu>
      </div>
    </div>
  );
};
