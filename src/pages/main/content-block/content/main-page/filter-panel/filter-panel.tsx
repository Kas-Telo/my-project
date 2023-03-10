import { ChangeEvent } from 'react';

import { useActions } from '../../../../../../common/hooks/use-actions';
import { useAppSelector } from '../../../../../../common/hooks/use-app-selector';
import { Size, useWindowSize } from '../../../../../../common/hooks/use-window-size';
import { syncBooksActions } from '../../../../../../store/main-page/books/books-slice';
import { ButtonWithIcon, InputSearch } from '../../../../../../ui';
import { BodyTypography } from '../../../../../../ui/typography';

import style from './filter-panel.module.css';

type Props = {
  viewType: 'tile' | 'list';
  onChangeViewType: (type: 'tile' | 'list') => void;
  className?: string;
  searchValue: string;
  setSearchValue: (value: string) => void;
  onCloseInput: () => void;
  onOpenInput: () => void;
  displayInput: boolean;
};

export const FilterPanel = ({
  searchValue,
  setSearchValue,
  onCloseInput,
  onOpenInput,
  displayInput,
  viewType,
  onChangeViewType,
  className,
}: Props) => {
  const size: Size = useWindowSize();
  const currentSortValue = useAppSelector((state) => state.books.currentSortValue);
  const { changeSortValue } = useActions(syncBooksActions);

  const buttonSize = size.width <= 470 ? 32 : 38;
  const iconSize = size.width <= 470 ? 16 : 19;

  const titleIcon = currentSortValue === 'ascending' ? 'sort-ascending' : 'sort-descending';
  const containerClass = `${style.container} ${className}`;

  const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.currentTarget.value);
  };

  const sortHandler = () => {
    changeSortValue({ sortValue: currentSortValue === 'ascending' ? 'descending' : 'ascending' });
  };

  return (
    <div>
      {displayInput ? (
        <InputSearch
          dataTestIdClose='button-search-close'
          className={style.inputMobile}
          placeholder='Поиск книги или автора…'
          variant='mobile'
          onCloseInput={onCloseInput}
          value={searchValue}
          onChange={onChangeInputHandler}
        />
      ) : (
        <div className={containerClass}>
          <div className={style.filterBlock}>
            <ButtonWithIcon
              dataTestId='button-search-open'
              className={style.searchButton}
              isActive={false}
              titleIcon='search'
              onClick={onOpenInput}
              minHeight={buttonSize}
              minWidth={buttonSize}
              iconWidth={iconSize}
              iconHeight={iconSize}
            />
            <InputSearch
              className={style.inputDesktop}
              placeholder='Поиск книги или автора…'
              variant='desktop'
              value={searchValue}
              onChange={onChangeInputHandler}
            />
            <ButtonWithIcon
              data-test-id='sort-rating-button'
              className={style.buttonSort}
              isActive={false}
              titleIcon={titleIcon}
              onClick={sortHandler}
              minHeight={buttonSize}
              minWidth={buttonSize}
              iconWidth={iconSize}
              iconHeight={iconSize}
            >
              <BodyTypography className={style.sortButtonText} type='small'>
                По рейтингу
              </BodyTypography>
            </ButtonWithIcon>
          </div>
          <div className={style.viewBlock}>
            <ButtonWithIcon
              data-test-id='button-menu-view-window'
              isActive={viewType === 'tile'}
              titleIcon='tile'
              onClick={() => onChangeViewType('tile')}
              minHeight={buttonSize}
              minWidth={buttonSize}
              iconWidth={iconSize}
              iconHeight={iconSize}
            />
            <ButtonWithIcon
              data-test-id='button-menu-view-list'
              isActive={viewType === 'list'}
              titleIcon='burger-menu'
              onClick={() => onChangeViewType('list')}
              minHeight={buttonSize}
              minWidth={buttonSize}
              iconWidth={iconSize}
              iconHeight={iconSize}
            />
          </div>
        </div>
      )}
    </div>
  );
};
