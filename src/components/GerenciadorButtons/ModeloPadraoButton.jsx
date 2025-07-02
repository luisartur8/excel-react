import { useDispatch, useSelector } from "react-redux";
import { setData, setHeaders } from "../../features/spreadsheet/spreadsheetSlice";
import { COLORS } from "../../utils/colors";
import { FaRegCopy } from "react-icons/fa";

export function ModeloPadraoButton(props) {
  const dispatch = useDispatch()

  const { headers: reduxHeaders, tipoPlanilha } = useSelector((state) => state.spreadsheet);

  function organizarPlanilha() {
    const tableData = [...props.dataRef.current]

    if (!tableData || tableData.length === 0) return null;

    let indexHeader = {};
    let colunasRepetidas = false;

    // Verifica se há colunas com o mesmo nome no header.
    reduxHeaders.forEach((header, index) => {
      if (header) {
        if (!indexHeader[header]) {
          indexHeader[header] = [];
        }
        indexHeader[header].push(index);
        if (indexHeader[header].length > 1) {
          colunasRepetidas = true;
        }
      }
    });

    if (colunasRepetidas) {
      alert('Não é permitido colunas com mesmo nome');
      return;
    }

    let ordem = [];

    if (tipoPlanilha === 'clientes') {
      ordem = [
        ...(Array.isArray(indexHeader.nome) ? indexHeader.nome : [-1]),
        ...(Array.isArray(indexHeader.telefone) ? indexHeader.telefone : [-1]),
        ...(Array.isArray(indexHeader.cpf_cnpj) ? indexHeader.cpf_cnpj : [-1]),
        ...(Array.isArray(indexHeader.data_nascimento) ? indexHeader.data_nascimento : [-1]),
        ...(Array.isArray(indexHeader.genero) ? indexHeader.genero : [-1]),
        ...(Array.isArray(indexHeader.email) ? indexHeader.email : [-1]),
        ...(Array.isArray(indexHeader.anotacao) ? indexHeader.anotacao : [-1])
      ];

      props.setColWidths(Array(ordem.length).fill(270))
      dispatch(setHeaders(['nome', 'telefone', 'cpf_cnpj', 'data_nascimento', 'genero', 'email', 'anotacao']))
    } else if (tipoPlanilha === 'lancamentos') {
      ordem = [
        ...(Array.isArray(indexHeader.nome) ? indexHeader.nome : [-1]),
        ...(Array.isArray(indexHeader.telefone) ? indexHeader.telefone : [-1]),
        ...(Array.isArray(indexHeader.cpf_cnpj) ? indexHeader.cpf_cnpj : [-1]),
        ...(Array.isArray(indexHeader.valor_venda) ? indexHeader.valor_venda : [-1]),
        ...(Array.isArray(indexHeader.valor_resgate) ? indexHeader.valor_resgate : [-1]),
        ...(Array.isArray(indexHeader.anotacao_venda) ? indexHeader.anotacao_venda : [-1]),
        ...(Array.isArray(indexHeader.item_venda) ? indexHeader.item_venda : [-1]),
        ...(Array.isArray(indexHeader.data_lancamento) ? indexHeader.data_lancamento : [-1]),
        ...(Array.isArray(indexHeader.nome_vendedor) ? indexHeader.nome_vendedor : [-1]),
        ...(Array.isArray(indexHeader.codigo_vendedor) ? indexHeader.codigo_vendedor : [-1])
      ];

      dispatch(setHeaders(['nome', 'telefone', 'cpf_cnpj', 'valor_venda', 'valor_resgate', 'anotacao_venda', 'item_venda', 'data_lancamento', 'nome_vendedor', 'codigo_vendedor']));
    } else if (tipoPlanilha === 'oportunidade') {
      ordem = [
        ...(Array.isArray(indexHeader.nome) ? indexHeader.nome : [-1]),
        ...(Array.isArray(indexHeader.telefone) ? indexHeader.telefone : [-1]),
        ...(Array.isArray(indexHeader.cpf_cnpj) ? indexHeader.cpf_cnpj : [-1]),
        ...(Array.isArray(indexHeader.data_nascimento) ? indexHeader.data_nascimento : [-1]),
        ...(Array.isArray(indexHeader.genero) ? indexHeader.genero : [-1]),
        ...(Array.isArray(indexHeader.email) ? indexHeader.email : [-1]),
        ...(Array.isArray(indexHeader.anotacao) ? indexHeader.anotacao : [-1]),
        ...(Array.isArray(indexHeader.bonus_valor) ? indexHeader.bonus_valor : [-1]),
        ...(Array.isArray(indexHeader.bonus_validade) ? indexHeader.bonus_validade : [-1])
      ];

      dispatch(setHeaders(['nome', 'telefone', 'cpf_cnpj', 'data_nascimento', 'genero', 'email', 'anotacao', 'bonus_valor', 'bonus_validade']));
    } else if (tipoPlanilha === 'produtos') {
      ordem = [
        ...(Array.isArray(indexHeader.codigo) ? indexHeader.codigo : [-1]),
        ...(Array.isArray(indexHeader.nome) ? indexHeader.nome : [-1]),
        ...(Array.isArray(indexHeader.percentual) ? indexHeader.percentual : [-1]),
        ...(Array.isArray(indexHeader.validade) ? indexHeader.validade : [-1])
      ];

      dispatch(setHeaders(['codigo', 'nome', 'percentual', 'validade']));
    };

    // O array [ordem] vem com os indices de cada coluna de [tableData] já em ordem
    const updatedData = tableData.map(row => {
      return ordem.map(index => {
        return index === -1 ? { value: '', style: { backgroundColor: COLORS.defaultBackgroundCell } } : row[index];
      });
    })

    dispatch(setData(updatedData))

    props.setColWidths(Array(ordem.length).fill(270))
  }

  return (
    <button className="sidebar-btn" onClick={organizarPlanilha}>
      <FaRegCopy className="sidebar-icon" />
      Modelo padrão
    </button>
  )
}