import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: [],
  headers: [],
  sheetName: {
    worbookName: '',
    sheetName: ''
  },
  font: '14px Arial',
  tipoPlanilha: 'clientes',
  optionsByTipoPlanilha: {
    'clientes': ['nome', 'telefone', 'cpf_cnpj', 'data_nascimento', 'genero', 'email', 'anotacao'],
    'lancamentos': ['cliente_nome', 'cliente_telefone', 'cliente_cpf_cnpj', 'valor_venda', 'valor_resgate', 'anotacao_venda', 'item_venda', 'data_lancamento', 'nome_vendedor', 'codigo_vendedor'],
    'oportunidade': ['nome', 'telefone', 'cpf_cnpj', 'data_nascimento', 'genero', 'email', 'anotacao', 'bonus_valor', 'bonus_validade'],
    'produtos': ['codigo', 'nome', 'percentual', 'validade'],
  },
  centralizedConfig: {
    'column_min_width': 270,
    'primary_background_color': 'white',
    'secondary_background_color': 'red',
  }
};

const spreadsheetSlice = createSlice({
  name: 'spreadsheet',
  initialState,
  reducers: {
    setData(state, action) {
      state.data = action.payload;
    },
    setHeaders(state, action) {
      state.headers = action.payload;
    },
    setSheetName(state, action) {
      state.sheetName = {
        ...state.sheetName,
        ...action.payload
      }
    },
    setFont(state, action) {
      state.font = action.payload;
    },
    setTipoPlanilha(state, action) {
      state.tipoPlanilha = action.payload
    }
  },
});

export const { setData, setHeaders, setSheetName, setFont, setTipoPlanilha } = spreadsheetSlice.actions;
export default spreadsheetSlice.reducer;