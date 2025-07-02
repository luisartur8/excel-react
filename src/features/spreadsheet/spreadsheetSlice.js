import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: [],
  headers: [],
  sheetName: {
    workbookName: '',
    sheetName: ''
  },
  font: '14px Arial',
  tipoPlanilha: 'clientes',
  hasInitialized: false,
  optionsByTipoPlanilha: {
    'clientes': ['nome', 'telefone', 'cpf_cnpj', 'data_nascimento', 'genero', 'email', 'anotacao', 'DDD'],
    'lancamentos': ['cliente_nome', 'cliente_telefone', 'cliente_cpf_cnpj', 'valor_venda', 'valor_resgate', 'anotacao_venda', 'item_venda', 'data_lancamento', 'nome_vendedor', 'codigo_vendedor', 'DDD'],
    'oportunidade': ['nome', 'telefone', 'cpf_cnpj', 'data_nascimento', 'genero', 'email', 'anotacao', 'DDD', 'bonus_valor', 'bonus_validade'],
    'produtos': ['codigo', 'nome', 'percentual', 'validade'],
  },
  centralizedConfig: {
    'column_min_width': 270
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
    },
    setHasInitialized(state, action) {
      state.hasInitialized = action.payload
    }
  },
});

export const { setData, setHeaders, setSheetName, setFont, setTipoPlanilha, setHasInitialized } = spreadsheetSlice.actions;
export default spreadsheetSlice.reducer;