import { FaEdit } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { setModalValidateDate, setModalValidatePhone } from "../../features/modals/modalsSlice";
import { executarValidacao } from "../../utils/validateColumn";
import { setData } from "../../features/spreadsheet/spreadsheetSlice";

export function ValidateColumnButton(props) {
  const dispatch = useDispatch();

  const { headers: reduxHeaders } = useSelector((state) => state.spreadsheet);

  const validateColumn = (colIndex) => {
    const option = reduxHeaders[colIndex]

    if (option === 'telefone' || option === 'cliente_telefone') {
      dispatch(setModalValidatePhone({ isOpen: true, colIndex }))
      return;
    }

    if (option === 'data_nascimento' || option === 'data_lancamento') {
      dispatch(setModalValidateDate({ isOpen: true, colIndex }))
      return;
    }

    const updatedData = executarValidacao([...props.dataRef.current], reduxHeaders[colIndex], colIndex)
    dispatch(setData(updatedData))
  }

  return (
    <button className="btn-executar-validacao" onClick={() => validateColumn(props.colIndex)}>
      <FaEdit size={16} />
    </button>
  )
}