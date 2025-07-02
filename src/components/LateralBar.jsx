import { useDispatch } from "react-redux";
import "../styles/LateralBar.css";
import { FaDownload, FaTrash, FaFileExport, FaMinusCircle } from "react-icons/fa";
import { setData, setHasInitialized } from "../features/spreadsheet/spreadsheetSlice";
import { setModalBaixarPlanilha, setModalRemoveLinhas } from "../features/modals/modalsSlice";
import { JuntarDDDTelefoneButton } from "./GerenciadorButtons/JuntarDDDTelefoneButton";
import { ModeloPadraoButton } from "./GerenciadorButtons/ModeloPadraoButton";
import { MesclarColunasButton } from "./GerenciadorButtons/MesclarColunasButton";

export function LateralBar(props) {
  const dispatch = useDispatch()

  const apagarPlanilha = () => {
    dispatch(setHasInitialized(false));
    dispatch(setData([]))
  }

  return (
    <aside className="lateral-bar">
      <button className="sidebar-btn" onClick={() => dispatch(setModalBaixarPlanilha({ isOpen: true }))}>
        <FaDownload className="sidebar-icon" />
        Baixar planilha
      </button>
      <button className="sidebar-btn" onClick={() => apagarPlanilha()}>
        <FaTrash className="sidebar-icon" />
        Apagar
      </button>
      <button className="sidebar-btn" onClick={() => alert('Em breve')}>
        <FaFileExport className="sidebar-icon" />
        Exportar planilha
      </button>

      <JuntarDDDTelefoneButton dataRef={props.dataRef} />

      <button className="sidebar-btn" onClick={() => dispatch(setModalRemoveLinhas({ isOpen: true }))}>
        <FaMinusCircle className="sidebar-icon" />
        Remover linhas
      </button>

      <ModeloPadraoButton dataRef={props.dataRef} setColWidths={props.setColWidths} />

      <MesclarColunasButton dataRef={props.dataRef} />
    </aside>
  );
}
