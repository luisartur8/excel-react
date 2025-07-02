import { useState, useRef, useEffect } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import { useDispatch, useSelector } from 'react-redux';
import { Cell } from './TableCell';
import { getColMaxWidth } from '../utils/calculateResizeColumn';
import { TableHeader } from './TableHeader';
import { setHasInitialized, setHeaders } from '../features/spreadsheet/spreadsheetSlice';

export default function VirtualSpreadsheet({ data, setData, dataRef, colWidths, setColWidths }) {
  const dispatch = useDispatch();

  const { data: reduxData, font, tipoPlanilha, hasInitialized } = useSelector((state) => state.spreadsheet);

  const [renderTrigger, setRenderTrigger] = useState(0);

  const parentRef = useRef();

  useEffect(() => {
    const cloned = reduxData.map((row) => row.map((cell) => ({ ...cell })));
    setData(cloned);
  }, [reduxData, setData]);

  useEffect(() => {
    dataRef.current = data;
    setRenderTrigger((r) => r + 1);

    if (!hasInitialized && data.length > 0) {
      const selects = tipoPlanilha === 'lancamentos' ? 'cliente_nome' : 'nome';
      dispatch(setHeaders(Array(reduxData[0].length).fill(selects)));
      setColWidths(Array(reduxData[0].length).fill(270));
      dispatch(setHasInitialized(true));
    }
  }, [dataRef, data, reduxData, dispatch, hasInitialized, tipoPlanilha, setColWidths]);

  const rowVirtualizer = useVirtualizer({
    count: data.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 35,
    overscan: 40,
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
        {/* BODY */}
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
                <>
                  <div className='col-lines'>
                    {rowIndex + 1}
                  </div>
                  <div className='col-delete-line'>
                    <button
                      onClick={() => {
                        setData((prev) => prev.filter((_, i) => i !== rowIndex));
                      }}
                    >
                      ✖
                    </button>
                  </div>

                  {data[rowIndex].map((_, colIndex) => (
                    <Cell
                      key={`${rowIndex}-${colIndex}`}
                      rowIndex={rowIndex}
                      colIndex={colIndex}
                      dataRef={dataRef}
                      colWidth={colWidths[colIndex]}
                    />
                  ))}
                </>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
