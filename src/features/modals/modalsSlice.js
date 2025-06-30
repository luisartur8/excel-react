import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  modalDeleteColumn: {
    isOpen: false,
    colIndex: -1
  },
  modalValidatePhone: {
    isOpen: false,
    colIndex: -1
  },
  modalValidateDate: {
    isOpen: false,
    colIndex: -1
  }
};

const modalsSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    setModalDeleteColumn(state, action) {
      state.modalDeleteColumn = action.payload
    },
    setModalValidatePhone(state, action) {
      state.modalValidatePhone = action.payload
    },
    setModalValidateDate(state, action) {
      state.modalValidateDate = action.payload
    }
  },
});

export const { setModalDeleteColumn, setModalValidatePhone, setModalValidateDate } = modalsSlice.actions;
export default modalsSlice.reducer;