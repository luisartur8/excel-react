import { useDispatch } from 'react-redux';
import { useRef, useState } from 'react';
import { importSpreadsheet } from '../../utils/importSpreadsheet';
import { setData, setSheetName } from '../../features/spreadsheet/spreadsheetSlice';

import importFile from '../../assets/import-file.png';

export default function ImportButton() {
  const dispatch = useDispatch();
  const inputRef = useRef();
  const [isDragging, setIsDragging] = useState(false);

  const handleFile = async (file) => {
    if (!file) return;
    try {
      const { sheetName, worbookName, result } = await importSpreadsheet(file);
      dispatch(setSheetName({ worbookName, sheetName }));
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
          <strong>Selecione um arquivo</strong> ou arraste ele aqui.
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
