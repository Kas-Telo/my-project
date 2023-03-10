import { AxiosResponse } from 'axios';

import { instance } from '../api-instance';

import { BookCardType, BookType, CategoryType } from './books-api-types';

export const booksApi = {
  getBooks: () => instance.get<Record<string, never>, AxiosResponse<BookCardType[]>>('/api/books'),
  getBook: (id: number) => instance.get<Record<string, never>, AxiosResponse<BookType>>(`/api/books/${id}`),
  getCategories: () => instance.get<Record<string, never>, AxiosResponse<CategoryType[]>>('/api/categories'),
};
