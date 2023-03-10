import { createAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { booksApi } from '../../../api/books/books-api';
import { BookCardType, CategoryType } from '../../../api/books/books-api-types';
import { handleAsyncServerNetworkError } from '../../../common/utils/error-util';
import { ThunkApiTypeForAsyncThunk } from '../..';

const updateCategories = createAction<{ categories: DomainCategoryType[] }>('booksActions/updateCategories');
const zeroingBooks = createAction('booksActions/zeroingBooks');
const changeSortValue = createAction<{ sortValue: SortValueType }>('booksActions/changeSortValue');
const setIsFirstLoadingCategories = createAction<{ isFirstLoadingCategories: boolean }>(
  'booksActions/setIsFirstLoadingCategories'
);

export const fetchCategories = createAsyncThunk<DomainCategoryType[], unknown, ThunkApiTypeForAsyncThunk>(
  'books/fetchCategories',
  async (_, thunkApi) => {
    try {
      const response = await booksApi.getCategories();

      return response.data.map((el) => ({ ...el, count: null }));
    } catch (e) {
      return handleAsyncServerNetworkError(e, thunkApi, true);
    }
  }
);
export const fetchBooks = createAsyncThunk<BookCardType[], unknown, ThunkApiTypeForAsyncThunk>(
  'books/fetchBooks',
  async (_, thunkApi) => {
    try {
      if (thunkApi.getState().books.bookCardList.length > 0) {
        thunkApi.dispatch(zeroingBooks());
      }
      const response = await booksApi.getBooks();

      return response.data;
    } catch (e) {
      return handleAsyncServerNetworkError(e, thunkApi, true);
    }
  }
);

const initialState = {
  bookCardList: [] as BookCardType[],
  categories: [] as DomainCategoryType[],
  isFirstLoadingCategories: true,
  currentSortValue: 'descending' as SortValueType,
};

const slice = createSlice({
  name: 'books',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.categories = action.payload;
    });
    builder.addCase(fetchBooks.fulfilled, (state, action) => {
      state.bookCardList = action.payload;
    });
    builder.addCase(updateCategories, (state, action) => {
      state.categories = action.payload.categories;
    });
    builder.addCase(setIsFirstLoadingCategories, (state, action) => {
      state.isFirstLoadingCategories = action.payload.isFirstLoadingCategories;
    });
    builder.addCase(changeSortValue, (state, action) => {
      state.currentSortValue = action.payload.sortValue;
    });
    builder.addCase(zeroingBooks, (state) => {
      state.bookCardList = [];
    });
  },
});

export const booksReducer = slice.reducer;
export const asyncBooksActions = {
  fetchCategories,
  fetchBooks,
};
export const syncBooksActions = {
  changeSortValue,
  setIsFirstLoadingCategories,
  updateCategories,
  zeroingBooks,
};
export type DomainCategoryType = CategoryType & {
  count: number | null;
};
export type SortValueType = 'ascending' | 'descending';
