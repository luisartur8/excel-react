import { useEffect, useState } from "react";
import "../../styles/ModalBaixarPlanilha.css"
import { useDispatch, useSelector } from "react-redux";
import { centerModal, makeDraggable } from "../../utils/arrastarModais";
import { setModalBaixarPlanilha } from "../../features/modals/modalsSlice";
import * as XLSX from 'xlsx';

export function ModalBaixarPlanilha(props) {
  const dispatch = useDispatch()

  const { modalBaixarPlanilha } = useSelector((state) => state.modals)
  const { sheetName, tipoPlanilha, headers: reduxHeaders } = useSelector((state) => state.spreadsheet)

  const [extensionSelectValue, setExtensionSelectValue] = useState('xlsx');
  const [inputNomeValue, setInputNomeValue] = useState('');
  const [extraInfo, setExtraInfo] = useState('ㅤ');

  useEffect(() => {
    if (modalBaixarPlanilha.isOpen) {
      const extensionMap = {
        xls: 'xls',
        csv: 'csv',
        ods: 'ods',
        xlsx: 'xlsx'
      };

      const fileExtension = sheetName.workbookName.split('.').pop().toLowerCase();
      setExtensionSelectValue(extensionMap[fileExtension] || 'xlsx');
      setInputNomeValue(splitByLastDot(sheetName.workbookName)[0]);

      centerModal('#modalBaixarPlanilha');

      document.getElementById('modalBaixarPlanilha').focus();
    }
  }, [modalBaixarPlanilha, sheetName]);

  useEffect(() => {
    // Caracteres que não podem terminar o nome do arquivo.
    const regex = /[ .\\/:*?"<>|]$/;
    const isInvalidEnd = regex.test(inputNomeValue);

    if (!isValidFileName(inputNomeValue) || inputNomeValue.startsWith('.') || isInvalidEnd) {
      setExtraInfo('Nome inválido!');
    } else {
      setExtraInfo('ㅤ');
    }
  }, [inputNomeValue])

  useEffect(() => {
    makeDraggable("#modalBaixarPlanilha", ".dragHandle");
  }, []);

  const isValidFileName = (fileName) => {
    const regex = /^[a-zA-Z0-9-_ .,()&+=]+$/;
    return regex.test(fileName);
  };

  function splitByLastDot(str) {
    const lastDotIndex = str.lastIndexOf('.');

    if (lastDotIndex !== -1) {
      return [str.slice(0, lastDotIndex), str.slice(lastDotIndex + 1)];
    }

    return [str];
  }

  function handleInputNome(e) {
    setInputNomeValue(e.target.value);
  }

  function handleExtensionChange(e) {
    setExtensionSelectValue(e.target.value);
  }

  function btnCloseDownload() {
    dispatch(setModalBaixarPlanilha({ isOpen: false }))
  }

  function exportarParaExcel() {
    const tableData = [...props.dataRef.current]

    if (!tableData || tableData.length === 0) {
      alert('Nenhuma tabela disponível');
      return;
    }

    if (extraInfo !== 'ㅤ') {
      return;
    }

    const completeFileName = `${inputNomeValue.trim()}.${extensionSelectValue}`;
    const data = tableData.map(row => row.map(cell => cell.value));

    let sheetHeader = reduxHeaders;

    if (tipoPlanilha === 'lancamento') {
      sheetHeader = reduxHeaders.map(head => {
        if (head === 'nome') return 'cliente_nome';
        if (head === 'telefone') return 'cliente_telefone';
        if (head === 'cpf_cnpj') return 'cliente_cpf_cnpj';
        return head
      })
    }

    data.unshift(sheetHeader);

    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.aoa_to_sheet(data);

    XLSX.utils.book_append_sheet(workbook, worksheet, sheetName.sheetName);
    XLSX.writeFile(workbook, completeFileName);

    dispatch(setModalBaixarPlanilha({ isOpen: false }))
  }

  const actionsByKeyPress = (e) => {
    if (e.key === 'Enter') {
      exportarParaExcel();
    } else if (e.key === 'Escape') {
      btnCloseDownload();
    } else if (e.key === 'Tab') {
      e.preventDefault();
    }
  };

  return (
    <div id="modalBaixarPlanilha" tabIndex="-1" onKeyDown={actionsByKeyPress} style={{ display: modalBaixarPlanilha.isOpen ? "flex" : "none" }}>
      <div className="modalHeaderBaixarPlanilhaConteudo draggable-modal">
        <div className="modalHeaderBaixarPlanilha dragHandle">
          <p>Baixar planilha</p>
          <span onClick={btnCloseDownload}>X</span>
        </div>
        <div className="operacoesModalDownload">
          <div className="personalizacaoDownloadInputs">
            <input type="text" placeholder="Nome da planilha" value={inputNomeValue} onChange={handleInputNome} />
            <select value={extensionSelectValue} onChange={handleExtensionChange}>
              <option value="xlsx">.xlsx ▼</option>
              <option value="xls">.xls ▼</option>
              <option value="csv">.csv ▼</option>
              <option value="ods">.ods ▼</option>
            </select>
          </div>
          <div className="extraInfoDiv">{extraInfo}</div>
          <div className="downloadModalAgrupaButton">
            <button className="modalButtonCancelaDownload" onClick={btnCloseDownload}>Cancelar</button>
            <button className="modalButtonDownload" onClick={exportarParaExcel}>Baixar</button>
          </div>
        </div>
      </div>
    </div>
  );
}