import { Fragment, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { useAppSelector } from '../../common/hooks/use-app-selector';
import { Menu, MenuItem, MenuSubItem } from '../../ui/menu';

import style from './navigation.module.css';

type MenuItemType = {
  id: string;
  title: string;
  path: string;
  count: number;
};

type Props = {
  dataTestIdType: string;
  dataTestIdShowCase: string;
  dataTestIdTerms: string;
  dataTestIdContract: string;
  collapsed?: boolean;
  setCollapsed?: (value: boolean) => void;
};

export const Navigation = ({
  dataTestIdType,
  dataTestIdShowCase,
  dataTestIdTerms,
  dataTestIdContract,
  collapsed = false,
  setCollapsed,
}: Props) => {
  const location = useLocation();
  const categories = useAppSelector((state) => state.books.categories);

  const [categoriesCollapsed, setCategoriesCollapsed] = useState(
    !(location.pathname.toLowerCase().includes('/books'.toLowerCase()) || location.pathname === '/')
  );

  useEffect(() => {
    if (location.pathname.toLowerCase().includes('/books'.toLowerCase()) || location.pathname === '/') {
      if (setCollapsed) {
        setCollapsed(false);
      } else {
        setCategoriesCollapsed(false);
      }
    } else if (setCollapsed) {
      setCollapsed(true);
    } else {
      setCategoriesCollapsed(true);
    }
  }, [setCollapsed, location.pathname]);

  return (
    <Menu className={style.container}>
      <MenuItem
        dataTestId={dataTestIdShowCase}
        title='Ветрина книг'
        path='/books/all'
        basedPath='/book'
        collapsed={collapsed ? collapsed : categoriesCollapsed}
        onClickAccordion={setCollapsed ? setCollapsed : setCategoriesCollapsed}
      >
        {categories.map((el, index) => {
          if (index === 0) {
            return (
              <Fragment key={el.id}>
                <MenuSubItem dataTestId={`${dataTestIdType}-books`} title='Все книги' path='/books/all' />
                <MenuSubItem
                  dataTestIdType={dataTestIdType}
                  dataTestIdCategory={el.path}
                  title={el.name}
                  path={`/books/${el.path}`}
                  count={el.count}
                />
              </Fragment>
            );
          }

          return (
            <MenuSubItem
              key={el.id}
              dataTestIdType={dataTestIdType}
              dataTestIdCategory={el.path}
              title={el.name}
              path={`/books/${el.path}`}
              count={el.count}
            />
          );
        })}
      </MenuItem>
      <MenuItem dataTestId={dataTestIdTerms} path='/terms' basedPath='' title='Правила пользования' />
      <MenuItem basedPath='' dataTestId={dataTestIdContract} path='/contract' title='Договор оферты' />
    </Menu>
  );
};
