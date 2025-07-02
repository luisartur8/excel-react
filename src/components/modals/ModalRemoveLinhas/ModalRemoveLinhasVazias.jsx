import { useDispatch, useSelector } from "react-redux";
import { setData, setHeaders } from "../../../features/spreadsheet/spreadsheetSlice";

export function ModalRemoveLinhasVazias(props) {
  const dispatch = useDispatch()

  const { headers: reduxHeaders } = useSelector((state) => state.spreadsheet);

  /**
   * Função que remove as linhas vazias da tabela.
   * A função também atualiza a mensagem sobre quantas linhas foram removidas.
   */
  function removeEmptyRows() {
    const tableData = [...props.dataRef]

    if (!tableData || tableData.length === 0) return null;

    const rowLengthBefore = tableData.length;

    // Filtra as linhas, mantendo apenas as que possuem ao menos uma célula não vazia.
    const updatedData = tableData.filter(row => {
      return row.some(cell => cell.value.trim() !== '');
    });

    const rowLengthAfter = updatedData.length;
    const linhasRemovidas = rowLengthBefore - rowLengthAfter;

    const message = linhasRemovidas === 0
      ? "Nenhuma linha foi removida"
      : `Foram removidas ${linhasRemovidas} linha${linhasRemovidas > 1 ? 's' : ''}`;

    props.setInfoRemovedRowCols(message);
    dispatch(setData(updatedData))
  }

  /**
   * Função que remove as colunas vazias da tabela.
   * A função também atualiza a mensagem sobre quantas colunas foram removidas.
   */
  function removeEmptyCols() {
    const tableData = [...props.dataRef]

    if (!tableData || tableData.length === 0) return null;

    const colsLength = tableData[0].length;
    let colsToRemove = [];

    // Percorre as colunas da tabela, verificando se todas as células estão vazias.
    for (let c = colsLength - 1; c >= 0; c--) {
      let apagaColuna = true;

      for (let r = 0; r < tableData.length; r++) {
        if (tableData[r][c].value.trim() !== '') {
          apagaColuna = false;
          break;
        }
      }

      if (apagaColuna) {
        colsToRemove.push(c);
      }
    }

    // Se existirem colunas a serem removidas, atualiza os dados da tabela e o cabeçalho.
    if (colsToRemove.length > 0) {
      // Remove as colunas do header.
      const updatedHeader = reduxHeaders.filter((_, index) => !colsToRemove.includes(index));

      // Remove as colunas dos dados da tabela.
      const updatedData = tableData.map((row) => {
        return row.filter((_, index) => !colsToRemove.includes(index));
      });

      // Atualiza os dados.
      dispatch(setHeaders(updatedHeader))
      dispatch(setData(updatedData))

      // Exibe a mensagem sobre as colunas removidas.
      if (colsToRemove.length === 1) {
        props.setInfoRemovedRowCols(`Uma coluna foi removida.`);
      } else {
        props.setInfoRemovedRowCols(`Foram removidas ${colsToRemove.length} colunas`);
      }
    } else {
      props.setInfoRemovedRowCols(`Nenhuma coluna foi removida`);
    }
  }

  return (
    <div>
      <button className="remover-linhas-vazias remover-linha-botao" onClick={removeEmptyRows}>Linhas</button>
      <button className="remover-colunas-vazias remover-linha-botao" onClick={removeEmptyCols}>Colunas</button>
    </div>
  )
}