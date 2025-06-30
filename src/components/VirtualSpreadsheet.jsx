import { useState, useRef, useEffect } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import { useDispatch, useSelector } from 'react-redux';
import { Cell } from './TableCell';
import { getColMaxWidth } from '../utils/calculateResizeColumn';
import { TableHeader } from './TableHeader';
import { setHeaders } from '../features/spreadsheet/spreadsheetSlice';

export default function VirtualSpreadsheet() {
  const dispatch = useDispatch();

  // Estado da tabela
  const [data, setData] = useState([]);
  const dataRef = useRef(data);

  // Controla se já inicializou os headers e colWidths
  const hasInitializedData = useRef(false);

  const [colWidths, setColWidths] = useState([]);
  const [renderTrigger, setRenderTrigger] = useState(0);

  const parentRef = useRef();

  // Pega dados do redux
  const { data: reduxData, font } = useSelector((state) => state.spreadsheet);

  // Sincroniza data com reduxData
  useEffect(() => {
    const cloned = reduxData.map((row) => row.map((cell) => ({ ...cell })));
    setData(cloned);
  }, [reduxData]);

  // Sincroniza dataRef com data
  useEffect(() => {
    dataRef.current = data; // ← Agora está apontando para uma cópia mutável
    setRenderTrigger((r) => r + 1);

    if (!hasInitializedData.current && data.length > 0) {
      dispatch(setHeaders(Array(data[0].length).fill('nome')));
      setColWidths(Array(data[0].length).fill(270));
      hasInitializedData.current = true;
    }
  }, [data, dispatch]);


  // Configuração do virtualizer para as linhas
  const rowVirtualizer = useVirtualizer({
    count: data.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 35,
    overscan: 10,
  });

  return (
    <div>
      <div
        ref={parentRef}
        style={{
          height: '600px',
          width: '100%',
          overflow: 'auto',
          border: '1px solid gray',
        }}
      >
        {/* Header */}
        <TableHeader
          dataRef={dataRef}
          colWidths={colWidths}
          setColWidths={setColWidths}
          getColMaxWidth={getColMaxWidth}
          font={font}
        />

        {/* Corpo da tabela */}
        <div
          key={renderTrigger}
          style={{
            height: `${rowVirtualizer.getTotalSize()}px`,
            width: 'max-content',
            position: 'relative',
          }}
        >
          {rowVirtualizer.getVirtualItems().map((virtualRow) => {
            const rowIndex = virtualRow.index;
            return (
              <div
                key={rowIndex}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  transform: `translateY(${virtualRow.start}px)`,
                  display: 'flex',
                }}
              >
                {data[rowIndex].map((_, colIndex) => (
                  <Cell
                    key={`${rowIndex}-${colIndex}`} // chave única por célula
                    rowIndex={rowIndex}
                    colIndex={colIndex}
                    dataRef={dataRef}
                    colWidth={colWidths[colIndex]}
                  />
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
