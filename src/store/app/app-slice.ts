import { createAction, createSlice } from '@reduxjs/toolkit';

type StateType = {
  isLoading: boolean;
  appError: {
    status: number | null;
    error: string | null;
  };
  isInitialized: boolean;
};

const toggleLoading = createAction<{ isLoading: boolean }>('appActions/toggleLoading');
const setAppError = createAction<{
  status: number | null;
  error: string | null;
}>('appActions/setError');
const setIsInitialized = createAction<{ isInitialized: boolean }>('appActions/setIsInitialized');

export const initialState: StateType = {
  isLoading: false,
  appError: {
    status: null,
    error: null,
  },
  isInitialized: false,
};

const slice = createSlice({
  name: 'app',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(toggleLoading, (state, action) => {
      state.isLoading = action.payload.isLoading;
    });
    builder.addCase(setAppError, (state, action) => {
      state.appError = action.payload;
    });
    builder.addCase(setIsInitialized, (state, action) => {
      state.isInitialized = action.payload.isInitialized;
    });
  },
});

export const appReducer = slice.reducer;
export const syncAppActions = {
  toggleLoading,
  setAppError,
  setIsInitialized,
};
