import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { booksApi } from '../../../api/books/books-api';
import { BookType } from '../../../api/books/books-api-types';
import { handleAsyncServerNetworkError } from '../../../common/utils/error-util';
import { ThunkApiTypeForAsyncThunk } from '../..';

export const fetchBook = createAsyncThunk<BookType, { id: number }, ThunkApiTypeForAsyncThunk>(
  'book/fetchBook',
  async ({ id }, thunkApi) => {
    try {
      const response = await booksApi.getBook(id);

      return response.data;
    } catch (e) {
      return handleAsyncServerNetworkError(e, thunkApi, true);
    }
  }
);

const initialState = {
  book: {} as BookType,
};

const slice = createSlice({
  name: 'book',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchBook.fulfilled, (state, action) => {
      state.book = action.payload;
    });
  },
});

export const bookReducer = slice.reducer;
export const asyncBookActions = {
  fetchBook,
};
