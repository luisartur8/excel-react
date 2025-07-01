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
  },
  modalBaixarPlanilha: {
    isOpen: false
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
    },
    setModalBaixarPlanilha(state, action) {
      state.modalBaixarPlanilha = action.payload
    }
  },
});

export const { setModalDeleteColumn, setModalValidatePhone, setModalValidateDate, setModalBaixarPlanilha } = modalsSlice.actions;
export default modalsSlice.reducer;