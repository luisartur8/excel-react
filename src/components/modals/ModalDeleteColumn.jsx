import { useDispatch, useSelector } from "react-redux";
import { setData, setHeaders } from "../../features/spreadsheet/spreadsheetSlice";
import { setModalDeleteColumn } from "../../features/modals/modalsSlice";

export function ModalDeleteColumn(props) {
  const dispatch = useDispatch();

  const { headers: reduxHeaders } = useSelector((state) => state.spreadsheet);
  const { modalDeleteColumn } = useSelector((state) => state.modals);

  if (!modalDeleteColumn.isOpen) return null;

  const { colIndex } = modalDeleteColumn;

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
  return (
    <>
      <div
        style={{
          position: "fixed",
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: "rgba(0,0,0,0.5)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 1000,
        }}
      >
        <div
          style={{
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "8px",
            maxWidth: "400px",
            width: "90%",
            boxShadow: "0 2px 10px rgba(0,0,0,0.3)",
            textAlign: "center",
          }}
        >
          <h2>Excluir Coluna</h2>
          <p>Tem certeza que deseja excluir esta coluna?</p>

          <div style={{ marginTop: "20px", display: "flex", justifyContent: "space-around" }}>
            <button
              style={{ padding: "8px 16px", backgroundColor: "#d9534f", color: "white", border: "none", borderRadius: "4px" }}
              onClick={onConfirm}
            >
              Confirmar
            </button>
            <button
              style={{ padding: "8px 16px", backgroundColor: "#6c757d", color: "white", border: "none", borderRadius: "4px" }}
              onClick={onCancel}
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
