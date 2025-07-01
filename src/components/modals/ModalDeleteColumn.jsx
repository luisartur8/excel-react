import { useDispatch, useSelector } from "react-redux";
import { setData, setHeaders } from "../../features/spreadsheet/spreadsheetSlice";
import { setModalDeleteColumn } from "../../features/modals/modalsSlice";
import { useEffect } from "react";

import "../../styles/ModalDeleteColumn.css";
import { centerModal, makeDraggable } from "../../utils/arrastarModais";

export function ModalDeleteColumn(props) {
  const dispatch = useDispatch();

  const { headers: reduxHeaders } = useSelector((state) => state.spreadsheet);
  const { modalDeleteColumn } = useSelector((state) => state.modals);

  const { colIndex } = modalDeleteColumn;

  useEffect(() => {
    if (modalDeleteColumn.isOpen) {
      centerModal('.modal-delete-column-content');
      document.getElementById("modalDeleteColumn").focus();
    }
  }, [modalDeleteColumn]);

  useEffect(() => {
    makeDraggable(".modal-delete-column-content", ".dragHandle");
  }, []);

  const onConfirm = () => {
    const updatedData = props.dataRef.current.map((row) => {
      const newRow = [...row];
      newRow.splice(colIndex, 1);
      return newRow;
    });

    dispatch(setData(updatedData));

    const updatedHeaders = [...reduxHeaders];
    updatedHeaders.splice(colIndex, 1);
    dispatch(setHeaders(updatedHeaders));

    props.setColWidths((prev) => {
      const updated = [...prev];
      updated.splice(colIndex, 1);
      return updated;
    });

    dispatch(setModalDeleteColumn({ isOpen: false, colIndex: 0 }));
  };

  const onCancel = () => {
    dispatch(setModalDeleteColumn({ isOpen: false, colIndex: 0 }));
  };

  const actionsByKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onConfirm();
    } else if (e.key === "Escape") {
      e.preventDefault();
      onCancel();
    }
  };

  return (
    <div
      id="modalDeleteColumn"
      tabIndex="-1"
      onKeyDown={actionsByKeyPress}
      style={{ display: modalDeleteColumn.isOpen ? "flex" : "none" }}
    >
      <div className="modal-delete-column-content draggable-modal">
        <div id="modalHeaderDeleteColumn" className="dragHandle">
        </div>
        <h2>Excluir Coluna</h2>
        <p>Tem certeza que deseja excluir esta coluna?</p>
        <div className="modal-delete-column-buttons">
          <button className="btn-confirm" onClick={onConfirm}>Confirmar</button>
          <button className="btn-cancel" onClick={onCancel}>Cancelar</button>
        </div>
      </div>
    </div>
  )
}
