import { useDispatch, useSelector } from "react-redux";
import { corrigirDDD, corrigirTelefone, corrigirTelefoneSemDDD } from "../../utils/validacao";
import { COLORS } from "../../utils/colors";
import { setData } from "../../features/spreadsheet/spreadsheetSlice";
import { FaPhone } from "react-icons/fa";

export function JuntarDDDTelefoneButton(props) {
  const dispatch = useDispatch()

  const { headers: reduxHeaders } = useSelector((state) => state.spreadsheet);

  function juntarDDDTelefone() {
    const tableData = [...props.dataRef.current]

    if (!tableData || tableData.length === 0) {
      alert('Nenhuma tabela disponível');
      return;
    };

    let indexDDD = [];
    let indexTelefone = [];

    reduxHeaders.map((cell, index) => {
      if (cell === 'DDD') {
        indexDDD.push(index);
      }

      if (cell === 'telefone' || cell === 'cliente_telefone') {
        indexTelefone.push(index);
      }
    });

    if (!(indexDDD.length === 1 && indexTelefone.length >= 1)) {
      alert('Apenas 1 DDD, e no mínimo 1 telefone');
      return;
    }

    const updatedData = tableData.map(row => {
      const ddd = row[indexDDD].value;
      let newRow = [...row];

      for (let i = 0; i < indexTelefone.length; i++) {
        const telefoneIndex = indexTelefone[i];
        const telefone = row[telefoneIndex].value;
        let numeroCompleto;

        // Se já for um telefone valido, continua igual, se não adiciona o DDD e valida novamente.
        if (corrigirTelefone(telefone) !== '') { // Retorna '' se for inválido.
          numeroCompleto = corrigirTelefone(telefone);
        } else {
          numeroCompleto = corrigirTelefone(corrigirDDD(ddd) + corrigirTelefoneSemDDD(telefone));
        }

        // Se 'numeroCompleto' estiver vazio, a célula é considerada inválida.
        // Nesse caso, o valor original na célula continua igual e muda o 'backgroundColor' para a cor secundária (geralmente vermelho).
        // Caso o valor original também seja vazio, não é necessário mudar o 'backgroundColor'.
        if (numeroCompleto === '') {
          newRow[telefoneIndex] = { value: telefone, backgroundColor: telefone === '' ? COLORS.defaultBackgroundCell : COLORS.wrongCell };
        } else {
          newRow[telefoneIndex] = { value: numeroCompleto, backgroundColor: COLORS.defaultBackgroundCell };
        }
      }

      return newRow;
    });

    dispatch(setData(updatedData))
  }

  return (
    <button className="sidebar-btn" onClick={() => juntarDDDTelefone()}>
      <FaPhone className="sidebar-icon" />
      DDD + Telefone
    </button>
  )
}