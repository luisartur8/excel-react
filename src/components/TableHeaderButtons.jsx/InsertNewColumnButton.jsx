import { FaChevronLeft } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { setData, setHeaders } from "../../features/spreadsheet/spreadsheetSlice";

export function InsertNewColumnButton(props) {
  const dispatch = useDispatch()

  const { headers: reduxHeaders, tipoPlanilha, centralizedConfig } = useSelector((state) => state.spreadsheet);

  const insertNewColumn = (dataRef, direction, colIndex) => {
    const emptyCell = { value: '', style: { backgroundColor: 'white' } };

    const updatedData = dataRef.current.map((row) => {
      const newRow = [...row];
      if (direction === 'left') {
        newRow.splice(colIndex, 0, emptyCell);
      } else if (direction === 'right') {
        newRow.splice(colIndex + 1, 0, emptyCell);
      }
      return newRow;
    });

    dispatch(setData(updatedData));

    let headerOption = 'nome'

    if (tipoPlanilha === 'lancamentos') headerOption = 'cliente_nome';

    const updatedHeaders = [...reduxHeaders];
    if (direction === "left") {
      updatedHeaders.splice(colIndex, 0, headerOption);
    } else if (direction === 'right') {
      updatedHeaders.splice(colIndex + 1, 0, headerOption);
    }

    if (direction === "left") {
      props.setColWidths(prev => {
        const updated = [...prev];
        updated.splice(colIndex, 0, centralizedConfig.column_min_width);
        return updated;
      });
    } else if (direction === 'right') {
      props.setColWidths(prev => {
        const updated = [...prev];
        updated.splice(colIndex + 1, 0, centralizedConfig.column_min_width);
        return updated;
      });
    }

    dispatch(setHeaders(updatedHeaders));
  };

  return (
    <span
      className={`btn-insert-${props.direction} botoes-header`}
      onClick={() => insertNewColumn(props.dataRef, props.direction, props.colIndex)}
    >
      {props.direction === 'left' ? <FaChevronLeft /> : <FaChevronRight />}
    </span>
  );
}