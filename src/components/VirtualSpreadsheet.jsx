import { useState, useRef, useEffect } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import { useDispatch, useSelector } from 'react-redux';
import { Cell } from './TableCell';
import { getColMaxWidth } from '../utils/calculateResizeColumn';
import { TableHeader } from './TableHeader';
import { setHeaders } from '../features/spreadsheet/spreadsheetSlice';

export default function VirtualSpreadsheet() {
  const dispatch = useDispatch();

  const { data: reduxData, font } = useSelector((state) => state.spreadsheet);
  const [data, setData] = useState([]);
  const dataRef = useRef(data);

  const hasInitializedData = useRef(false);

  const [colWidths, setColWidths] = useState([]);
  const [renderTrigger, setRenderTrigger] = useState(0);

  const parentRef = useRef();

  useEffect(() => {
    const cloned = reduxData.map((row) => row.map((cell) => ({ ...cell })));
    setData(cloned);
  }, [reduxData]);

  useEffect(() => {
    dataRef.current = data;
    setRenderTrigger((r) => r + 1);

    if (!hasInitializedData.current && data.length > 0) {
      dispatch(setHeaders(Array(data[0].length).fill('nome')));
      setColWidths(Array(data[0].length).fill(270));
      hasInitializedData.current = true;
    }
  }, [data, dispatch]);

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
                {data[rowIndex].map((_, colIndex) => (
                  <Cell
                    key={`${rowIndex}-${colIndex}`}
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
