import { TbColumnRemove } from "react-icons/tb";
import { useDispatch } from "react-redux";
import { setData } from "../../features/spreadsheet/spreadsheetSlice";
import { COLORS } from "../../utils/colors";

export function ClearRedCellButton(props) {
  const dispatch = useDispatch();

  const clearRedCell = () => {
    const data = [...props.dataRef.current]

    const updatedData = data.map((row) => {
      let updatedRow = [...row];
      let cellData = updatedRow[props.colIndex];

      if (cellData && cellData.backgroundColor === COLORS.wrongCell) {
        updatedRow[props.colIndex] = { value: "", backgroundColor: COLORS.defaultBackgroundCell }
      }

      return updatedRow;
    })

    dispatch(setData(updatedData));
  }

  return (
    <button className="btn-apaga-red" onClick={clearRedCell}>
      <TbColumnRemove size={16} />
    </button>
  )
}