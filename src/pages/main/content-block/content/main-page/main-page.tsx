import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { BookCardType } from '../../../../../api/books/books-api-types';
import { useActions } from '../../../../../common/hooks/use-actions';
import { useAppSelector } from '../../../../../common/hooks/use-app-selector';
import { useScrollLock } from '../../../../../common/hooks/use-scroll-lock';
import { BookCard } from '../../../../../components/book-card';
import { syncAppActions } from '../../../../../store/app/app-slice';
import {
  asyncBooksActions,
  DomainCategoryType,
  SortValueType,
  syncBooksActions,
} from '../../../../../store/main-page/books/books-slice';
import { Loader } from '../../../../../ui/loader/loader';

import { FilterPanel } from './filter-panel/filter-panel';

import style from './main-page.module.css';

const filteredBooksByCategories = (books: BookCardType[], category: DomainCategoryType): BookCardType[] =>
  books.filter((el) => el.categories?.includes(category.name));

const sortedBooksByRating = (books: BookCardType[], sortValue: SortValueType): BookCardType[] => {
  const copyBooks = [...books];

  return copyBooks.sort((a, b) => {
    const aRating: number | null = a.rating === null ? 0 : a.rating;
    const bRating: number | null = b.rating === null ? 0 : b.rating;

    return sortValue === 'ascending' ? aRating - bRating : bRating - aRating;
  });
};

const filteredBooksByTitle = (books: BookCardType[], title: string): BookCardType[] =>
  books.filter((el) => el.title.toLowerCase().includes(title.toLowerCase()));

const categoriesWithBooksCounts = (books: BookCardType[], categories: DomainCategoryType[]): DomainCategoryType[] => {
  let copyCategories = [...categories];

  books.forEach((book) => {
    copyCategories = copyCategories.map((category) =>
      book.categories?.includes(category.name)
        ? {
            ...category,
            count: category.count ? category.count + 1 : 1,
          }
        : category.count
        ? category
        : { ...category, count: 0 }
    );
  });

  return copyCategories;
};

export const MainPage = () => {
  const [books, setBooks] = useState<BookCardType[]>([]);
  const [displayInput, setDisplayInput] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [viewType, setViewType] = useState<'tile' | 'list'>('tile');

  const location = useLocation();
  const { category } = useParams();
  const navigate = useNavigate();

  const booksState = useAppSelector((state) => state.books.bookCardList);
  const categories = useAppSelector((state) => state.books.categories);
  const isAuth = useAppSelector((state) => state.auth.isAuth);
  const isFirstLoadingCategories = useAppSelector((state) => state.books.isFirstLoadingCategories);
  const isLoading = useAppSelector((state) => state.app.isLoading);
  const error = useAppSelector((state) => state.app.appError);
  const currentSortValue = useAppSelector((state) => state.books.currentSortValue);

  const { fetchCategories, fetchBooks } = useActions(asyncBooksActions);
  const { toggleLoading } = useActions(syncAppActions);
  const { setIsFirstLoadingCategories, updateCategories } = useActions(syncBooksActions);
  const { lockScroll, unlockScroll } = useScrollLock();

  const currentCategory = useMemo(() => categories.find((el) => el.path === category), [category, categories]);
  const shouldFetch = useRef(true);

  const fetchCategoriesAndBooks = useCallback(async () => {
    toggleLoading({ isLoading: true });
    lockScroll();
    if (categories.length === 0) {
      await Promise.all([fetchBooks({}), fetchCategories({})]);
    } else {
      await fetchBooks({});
    }
    toggleLoading({ isLoading: false });
    unlockScroll();
  }, [categories.length, fetchBooks, fetchCategories, lockScroll, toggleLoading, unlockScroll]);

  useEffect(() => {
    if (!isAuth) {
      navigate('/auth');
    } else if (shouldFetch.current) {
      shouldFetch.current = false;
      fetchCategoriesAndBooks();
    }
  }, [fetchCategoriesAndBooks, isAuth, navigate]);

  useEffect(() => {
    if (isFirstLoadingCategories && categories.length > 0 && booksState.length > 0) {
      updateCategories({ categories: categoriesWithBooksCounts(booksState, categories) });
      setIsFirstLoadingCategories({ isFirstLoadingCategories: false });
    }
  }, [booksState, categories, isFirstLoadingCategories, setIsFirstLoadingCategories, updateCategories]);

  useEffect(() => {
    let booksTemp = booksState;

    if (currentCategory) {
      booksTemp = filteredBooksByCategories(booksTemp, currentCategory);
    }
    booksTemp = sortedBooksByRating(booksTemp, currentSortValue);
    booksTemp = filteredBooksByTitle(booksTemp, searchValue);

    setBooks(booksTemp);
  }, [booksState, categories.length, currentCategory, currentSortValue, searchValue]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <section className={style.contentContainer}>
      {!error && (
        <FilterPanel
          onChangeViewType={setViewType}
          viewType={viewType}
          onOpenInput={() => setDisplayInput(true)}
          onCloseInput={() => setDisplayInput(false)}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          displayInput={displayInput}
        />
      )}
      <div className={style.booksContainer}>
        {currentCategory?.count === 0 ? (
          <div className={style.emptyDataTextContainer}>
            <h3 className={style.emptyDataText} data-test-id='empty-category'>
              В этой категории книг ещё нет
            </h3>
          </div>
        ) : books.length === 0 && searchValue ? (
          <div className={style.emptyDataTextContainer}>
            <h3 className={style.emptyDataText} data-test-id='search-result-not-found'>
              По запросу ничего не найдено
            </h3>
          </div>
        ) : (
          books.map((el) => (
            <BookCard
              key={el.id}
              filterForHighlightText={searchValue}
              path={`${location.pathname}/${el.id}`}
              bookCard={el}
              displayOption={viewType}
            />
          ))
        )}
      </div>
    </section>
  );
};
