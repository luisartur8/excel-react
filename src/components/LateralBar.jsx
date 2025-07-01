import { useDispatch } from "react-redux";
import "../styles/LateralBar.css";
import { FaDownload, FaTrash, FaFileExport, FaPhone, FaMinusCircle, FaRegCopy } from "react-icons/fa";
import { setData, setHasInitialized } from "../features/spreadsheet/spreadsheetSlice";
import { setModalBaixarPlanilha } from "../features/modals/modalsSlice";

export function LateralBar() {
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
      <button className="sidebar-btn">
        <FaPhone className="sidebar-icon" />
        DDD + Telefone
      </button>
      <button className="sidebar-btn">
        <FaMinusCircle className="sidebar-icon" />
        Remover linhas
      </button>
      <button className="sidebar-btn">
        <FaRegCopy className="sidebar-icon" />
        Modelo padrão
      </button>
    </aside>
  );
}
