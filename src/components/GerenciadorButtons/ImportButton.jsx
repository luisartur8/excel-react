import { useDispatch } from 'react-redux';
import { useRef, useState } from 'react';
import { exampleSpreadsheet, importSpreadsheet } from '../../utils/importSpreadsheet';
import { setData, setSheetName, setTipoPlanilha } from '../../features/spreadsheet/spreadsheetSlice';

import importFile from '../../assets/import-file.png';

export default function ImportButton() {
  const dispatch = useDispatch();
  const inputRef = useRef();
  const [isDragging, setIsDragging] = useState(false);

  const handleFile = async (file) => {
    if (!file) return;
    try {
      const { sheetName, workbookName, result } = await importSpreadsheet(file);
      dispatch(setSheetName({ workbookName, sheetName }));
      dispatch(setData(result));
    } catch (error) {
      console.error('Erro ao carregar a planilha:', error);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleFile(file);
    }
    e.target.value = null;
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    handleFile(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const insertExample = (e) => {
    e.preventDefault();
    dispatch(setTipoPlanilha('clientes'));
    dispatch(setSheetName({ workbookName: 'workbookName', sheetName: 'sheetName' }));
    dispatch(setData(exampleSpreadsheet));
  }

  return (
    <div
      className={`dropzone-container ${isDragging ? 'drag-over' : ''}`}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
    >
      <label
        htmlFor="file-upload"
        className="dropzone"
      >
        <img src={importFile} alt="Importar Planilha" className="dropzone-icon" />
        <p>
          <strong>Selecione um arquivo</strong> ou arraste ele aqui. <strong style={{ zIndex: '999' }} onClick={insertExample}>[Inserir exemplo]</strong>
        </p>
      </label>
      <input
        id="file-upload"
        ref={inputRef}
        type="file"
        accept=".xlsx, .xls, .csv, .ods"
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
    </div>
  );
}
