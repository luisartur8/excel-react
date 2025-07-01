import { useDispatch, useSelector } from "react-redux";
import { setHeaders } from "../features/spreadsheet/spreadsheetSlice";
import { InsertNewColumnButton } from "./TableHeaderButtons.jsx/InsertNewColumnButton";
import { DeleteColumnButton } from "./TableHeaderButtons.jsx/DeleteColumnButton";
import { ValidateColumnButton } from "./TableHeaderButtons.jsx/ValidateColumnButton";
import { ClearRedCellButton } from "./TableHeaderButtons.jsx/ClearRedCellButton";
import { SearchReplaceButton } from "./TableHeaderButtons.jsx/SearchReplaceButton";
import { OrderButton } from "./TableHeaderButtons.jsx/OrderButton";

import "../styles/TableHeader.css";
import { ModalDeleteColumn } from "./modals/ModalDeleteColumn";
import { ModalValidatePhone } from "./modals/ModalValidatePhone";
import { ModalValidateDate } from "./modals/ModalValidateDate";

export function TableHeader({ dataRef, colWidths, setColWidths, getColMaxWidth, font }) {
  const dispatch = useDispatch()

  const { data: reduxData, headers: reduxHeaders, tipoPlanilha, optionsByTipoPlanilha } = useSelector((state) => state.spreadsheet);

  const handleSelectChange = (e, colIndex) => {
    let headerValues = [...reduxHeaders]
    headerValues[colIndex] = e.target.value
    dispatch(setHeaders(headerValues))
  }

  const handleMouseDown = (e, colIndex) => {
    const startX = e.clientX;
    const startWidth = colWidths[colIndex];

    const onMouseMove = (eMove) => {
      let newWidth = Math.max(50, startWidth + (eMove.clientX - startX));

      if (newWidth < 270) newWidth = 270;

      setColWidths((prev) => {
        const updated = [...prev];
        updated[colIndex] = newWidth;
        return updated;
      });
    };

    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  const handlerResizeColumn = (dataRef, colIndex, font) => {
    let newWidth = getColMaxWidth(dataRef, colIndex, font);

    if (newWidth < 270) newWidth = 270;

    setColWidths((prev) => {
      const updated = [...prev];
      updated[colIndex] = newWidth;
      return updated;
    });
  };

  return (
    <div className="table-header-container" >
      {dataRef.current.length > 0 && dataRef.current[0] && (
        <div style={{ display: 'flex', position: 'sticky', top: 0, background: '#eee', zIndex: 2 }}>
          {reduxData[0].map((_, colIndex) => (
            <div
              className="toolbar"
              key={`header-${colIndex}`}
              style={{
                width: `${colWidths[colIndex]}px`,
              }}
            >
              <div className="button-group" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '2px' }}>
                <InsertNewColumnButton dataRef={dataRef} direction={'left'} colIndex={colIndex} setColWidths={setColWidths} />
                <DeleteColumnButton colIndex={colIndex} />
                <ValidateColumnButton dataRef={dataRef} colIndex={colIndex} />
                <ClearRedCellButton dataRef={dataRef} colIndex={colIndex} />
                <SearchReplaceButton />
                <OrderButton dataRef={dataRef} colIndex={colIndex} />
                <InsertNewColumnButton dataRef={dataRef} direction={'right'} colIndex={colIndex} setColWidths={setColWidths} />
              </div>
              <select
                id="col-select"
                value={reduxHeaders[colIndex]}
                onChange={(e) => handleSelectChange(e, colIndex)}
                style={{ marginTop: '4px', width: '90%' }}
              >
                {optionsByTipoPlanilha[tipoPlanilha].map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
              <div
                className="header-resizer"
                onMouseDown={(e) => handleMouseDown(e, colIndex)}
                onDoubleClick={() => handlerResizeColumn(dataRef, colIndex, font)}
              />
            </div>
          ))}
        </div>
      )}
      <ModalDeleteColumn dataRef={dataRef} setColWidths={setColWidths} />
      <ModalValidatePhone dataRef={dataRef} />
      <ModalValidateDate dataRef={dataRef} />
    </div>
  )
}