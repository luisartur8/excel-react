import { configureStore } from '@reduxjs/toolkit';
import spreadsheetReducer from '../features/spreadsheet/spreadsheetSlice';
import modalsReducer from '../features/modals/modalsSlice';

export const store = configureStore({
  reducer: {
    spreadsheet: spreadsheetReducer,
    modals: modalsReducer
  },
});
