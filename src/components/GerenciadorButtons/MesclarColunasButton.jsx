import { useEffect, useState } from 'react';
import { FaCompressAlt } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';

import "../../styles/MesclarColunasButton.css"
import { setData, setHeaders } from '../../features/spreadsheet/spreadsheetSlice';

export function MesclarColunasButton(props) {
  const dispatch = useDispatch()

  const handleSelectChange = (e) => {
    setMergeInput(e.target.value)
  }

  const { headers: reduxHeader, tipoPlanilha, optionsByTipoPlanilha } = useSelector((state) => state.spreadsheet)

  const [mergeInput, setMergeInput] = useState(tipoPlanilha !== 'lancamentos' ? 'nome' : 'cliente_nome')

  useEffect(() => {
    setMergeInput(tipoPlanilha !== 'lancamentos' ? 'nome' : 'cliente_nome');
  }, [tipoPlanilha]);

  /**
   * Função que mescla as colunas com o nome especificado por `mergeInput` no cabeçalho.
   * Ela encontra as colunas com esse nome, mescla as células das colunas subsequentes com a primeira.
   * coluna correspondente, e então remove as colunas subsequentes.
   */
  function handleMesclarColunas() {
    const tableData = [...props.dataRef.current]

    const indexHeader = [];

    // Encontra os indices correspondentes.
    reduxHeader.forEach((col, index) => {
      if (col === mergeInput) {
        indexHeader.push(index);
      }
    });

    if (indexHeader.length < 2) {
      return;
    }

    // Atualiza o header removendo as colunas subsequentes.
    const updatedHeader = [...reduxHeader];
    for (let i = indexHeader.length - 1; i > 0; i--) {
      updatedHeader.splice(indexHeader[i], 1);
    }

    // Atualiza os dados da tabela mesclando os valores das células.
    const updatedData = tableData.map(row => {
      const updatedRow = [...row];

      // Mescla as colunas subsequentes com a primeira coluna correspondente.
      for (let a = indexHeader.length - 1; a > 0; a--) {
        const col1Index = indexHeader[0];
        const col2Index = indexHeader[a];

        if (col2Index < updatedRow.length) {
          const celulaCol1 = updatedRow[col1Index];
          const celulaCol2 = updatedRow[col2Index];

          // Se a célula da primeira coluna estiver vazia, atribui o valor da segunda coluna.
          if (celulaCol1.value.trim() === '') {
            celulaCol1.value = celulaCol2.value;
          }
          // Remove a segunda coluna após a mesclagem.
          updatedRow.splice(col2Index, 1);
        }
      }

      return updatedRow;
    });

    // Atualiza os dados.
    dispatch(setData(updatedData))
    dispatch(setHeaders(updatedHeader))
  }

  return (
    <div className='merge-col-container'>
      <div className='span-input-container'>
        <span>Colunas: </span>
        <select
          id="meclar-col-select"
          value={mergeInput}
          onChange={handleSelectChange}
        >
          {optionsByTipoPlanilha[tipoPlanilha].map((option) => (
            <option key={`mesclar-${option}`} value={option}>{option}</option>
          ))}
        </select>
      </div>
      <button className="sidebar-btn" onClick={handleMesclarColunas}>
        <FaCompressAlt className="sidebar-icon" />
        Mesclar colunas
      </button>
    </div>
  )
}