import { FaSortAlphaUp } from "react-icons/fa";
import { FaSortAlphaDownAlt } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { setData } from "../../features/spreadsheet/spreadsheetSlice";

export function OrderButton(props) {
  const dispatch = useDispatch()

  function ordenarAlfabetico(ordem) {
    const data = [...props.dataRef.current]

    const ordemRed = [];
    const ordemNormal = [];

    // Separa as linhas com base no backgroundColor.
    data.forEach((row) => {
      const cellData = row[props.colIndex];
      if (cellData) {
        if (cellData.backgroundColor === 'red') {
          ordemRed.push({ cellContent: cellData.value, row });
        } else {
          ordemNormal.push({ cellContent: cellData.value, row });
        }
      }
    });

    // Função para comparar os valores e garantir que os espaços em branco venham por último.
    function compareWithWhitespaceHandling(a, b) {
      // Se ambos são espaços em branco ou vazios, mantem a ordem.
      if (!a.cellContent && !b.cellContent) return 0;

      // Se um deles é vazio ou contém apenas espaços, ele vai para o final.
      if (!a.cellContent || a.cellContent.trim() === "") return 1;
      if (!b.cellContent || b.cellContent.trim() === "") return -1;

      // Caso contrário, faz a comparação padrão.
      if (ordem === 'crescente') {
        return a.cellContent.localeCompare(b.cellContent);
      } else if (ordem === 'decrescente') {
        return b.cellContent.localeCompare(a.cellContent);
      }

      return 0;
    }

    ordemRed.sort(compareWithWhitespaceHandling);
    ordemNormal.sort(compareWithWhitespaceHandling);

    // Junta as linhas ordenadas: primeiro as linhas vermelhas, depois as normais.
    const updatedData = [
      ...ordemRed.map(item => item.row),
      ...ordemNormal.map(item => item.row)
    ];

    dispatch(setData(updatedData))
  }

  return (
    <>
      <button className="btn-ordenar-crescente" onClick={() => ordenarAlfabetico('crescente')}><FaSortAlphaUp size={16} /></button>
      <button className="btn-ordenar-decrescente" onClick={() => ordenarAlfabetico('decrescente')}><FaSortAlphaDownAlt size={16} /></button>
    </>
  )
}