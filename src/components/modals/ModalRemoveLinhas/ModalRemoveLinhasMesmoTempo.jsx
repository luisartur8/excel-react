import { useDispatch, useSelector } from "react-redux";
import { setData } from "../../../features/spreadsheet/spreadsheetSlice";

export function ModalRemoveLinhasMesmoTempo({
  tableData,
  setInfoRemovedRowCols,
  // Cliente
  cbNome,
  cbTelefone,
  cbCpfCnpj,
  cbDataNascimento,
  cbGenero,
  cbEmail,
  cbAnotacao,
  // Lançamento
  cbClienteNome,
  cbClienteTelefone,
  cbClienteCpfCnpj,
  cbValorVenda,
  cbValorResgate,
  cbAnotacaoVenda,
  cbItemVenda,
  cbDataLancamento,
  cbNomeVendedor,
  cbCodigoVendedor,
  // Oportunidade
  cbBonusValor,
  cbBonusValidade,
  // Produtos
  cbCodigo,
  cbPercentual,
  cbValidade,
}) {
  const dispatch = useDispatch()

  const { headers: reduxHeaders } = useSelector((state) => state.spreadsheet);

  /**
   * Função que remove as linhas da tabela onde todas as células das colunas selecionadas estão vazias.
   * 
   * A função percorre as linhas da tabela e verifica as células das colunas selecionadas (através dos checkboxes).
   * Se todas as células de uma linha nas colunas selecionadas estiverem vazias, essa linha será removida.
   * 
   * A função também atualiza a mensagem sobre quantas linhas foram removidas.
   */
  function removeSpecificRows() {
    if (!tableData || tableData.length === 0) return null;

    // Cliente
    let indexNome = [];
    let indexTelefone = [];
    let indexCpf_cnpj = [];
    let indexData_nascimento = [];
    let indexGenero = [];
    let indexEmail = [];
    let indexAnotacao = [];

    // Lançamento
    let indexValorVenda = [];
    let indexValorResgate = [];
    let indexAnotacaoVenda = [];
    let indexItemVenda = [];
    let indexDataLancamento = [];
    let indexNomeVendedor = [];
    let indexCodigoVendedor = [];

    // Oportunidade
    let indexBonusValor = [];
    let indexBonusValidade = [];

    // Produtos
    let indexCodigo = [];
    let indexPercentual = [];
    let indexValidade = [];

    let linhasRemovidas = 0;

    // Mapeia as colunas selecionadas e armazena seus índices.
    reduxHeaders.map((cell, index) => {
      switch (cell) {
        case 'nome': indexNome.push(index); break;
        case 'telefone': indexTelefone.push(index); break;
        case 'cpf_cnpj': indexCpf_cnpj.push(index); break;
        case 'data_nascimento': indexData_nascimento.push(index); break;
        case 'genero': indexGenero.push(index); break;
        case 'email': indexEmail.push(index); break;
        case 'anotacao': indexAnotacao.push(index); break;

        case 'cliente_nome': indexNome.push(index); break;
        case 'cliente_telefone': indexTelefone.push(index); break;
        case 'cliente_cpf_cnpj': indexCpf_cnpj.push(index); break;
        case 'valor_venda': indexValorVenda.push(index); break;
        case 'valor_resgate': indexValorResgate.push(index); break;
        case 'anotacao_venda': indexAnotacaoVenda.push(index); break;
        case 'item_venda': indexItemVenda.push(index); break;
        case 'data_lancamento': indexDataLancamento.push(index); break;
        case 'nome_vendedor': indexNomeVendedor.push(index); break;
        case 'codigo_vendedor': indexCodigoVendedor.push(index); break;

        case 'bonus_valor': indexBonusValor.push(index); break;
        case 'bonus_validade': indexBonusValidade.push(index); break;

        case 'codigo': indexCodigo.push(index); break;
        case 'percentual': indexPercentual.push(index); break;
        case 'validade': indexValidade.push(index); break;
      }
    })

    // Se todas as célunas em todos os índices do array estiverem vazias, retorna false.
    function filterEmptyCells(row, arrIndex) {
      for (let j = 0; j < arrIndex.length; j++) {
        const coluna = arrIndex[j];

        if (row[coluna].value.trim() !== '') {
          return false;
        }
      }

      if (arrIndex.length === 0) {
        return false;
      }

      return true;
    }

    // Filtra as linhas da tabela, removendo as que possuem todas as células vazias nas colunas selecionadas.
    const updatedData = tableData.filter(row => {
      const allEmpty = {
        0: (cbNome || cbClienteNome) && !filterEmptyCells(row, indexNome),
        1: (cbTelefone || cbClienteTelefone) && !filterEmptyCells(row, indexTelefone),
        2: (cbCpfCnpj || cbClienteCpfCnpj) && !filterEmptyCells(row, indexCpf_cnpj),
        3: cbDataNascimento && !filterEmptyCells(row, indexData_nascimento),
        4: cbGenero && !filterEmptyCells(row, indexGenero),
        5: cbEmail && !filterEmptyCells(row, indexEmail),
        6: cbAnotacao && !filterEmptyCells(row, indexAnotacao),
        7: cbValorVenda && !filterEmptyCells(row, indexValorVenda),
        8: cbValorResgate && !filterEmptyCells(row, indexValorResgate),
        9: cbAnotacaoVenda && !filterEmptyCells(row, indexAnotacaoVenda),
        10: cbItemVenda && !filterEmptyCells(row, indexItemVenda),
        11: cbDataLancamento && !filterEmptyCells(row, indexDataLancamento),
        12: cbNomeVendedor && !filterEmptyCells(row, indexNomeVendedor),
        13: cbCodigoVendedor && !filterEmptyCells(row, indexCodigoVendedor),
        14: cbBonusValor && !filterEmptyCells(row, indexBonusValor),
        15: cbBonusValidade && !filterEmptyCells(row, indexBonusValidade),
        16: cbCodigo && !filterEmptyCells(row, indexCodigo),
        17: cbPercentual && !filterEmptyCells(row, indexPercentual),
        18: cbValidade && !filterEmptyCells(row, indexValidade)
      }

      // Mantém a linha a caso check box esteja selecionada e as celulas não sejam vazias.
      for (let key in allEmpty) {
        if (allEmpty[key]) {
          return true; // Mantém linha.
        }
      }

      linhasRemovidas++;
      return false; // Remove a linha.
    })

    const message = linhasRemovidas === 0
      ? "Nenhuma linha foi removida"
      : `Foram removidas ${linhasRemovidas} linha${linhasRemovidas > 1 ? 's' : ''}`;

    setInfoRemovedRowCols(message);

    dispatch(setData(updatedData))
  }

  return (
    <button className="remover-linhas-especificas remover-linha-botao" onClick={removeSpecificRows}>Remover</button>
  )
}