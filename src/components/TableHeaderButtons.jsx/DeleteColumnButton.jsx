import { TiDeleteOutline } from "react-icons/ti";
import { useDispatch } from "react-redux";
import { setModalDeleteColumn } from "../../features/modals/modalsSlice";

export function DeleteColumnButton(props) {
  const dispatch = useDispatch()

  const openDeleteColumnModal = () => {
    dispatch(setModalDeleteColumn({ isOpen: true, colIndex: props.colIndex }))
  }

  return (
    <button className="btn-remove" onClick={openDeleteColumnModal}><TiDeleteOutline size={18} /></button>
  )
}