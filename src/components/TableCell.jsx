import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { COLORS } from "../utils/colors";

export const Cell = React.memo(function Cell({ rowIndex, colIndex, dataRef, colWidth }) {
  const inputRef = useRef(null);

  const reduxData = useSelector((state) => {
    const data = state.spreadsheet.data;
    return data?.[rowIndex]?.[colIndex] ?? '';
  });

  const [localValue, setLocalValue] = useState(() => reduxData?.value || '');

  useEffect(() => {
    const newValue = dataRef.current?.[rowIndex]?.[colIndex]?.value || '';
    setLocalValue(newValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rowIndex, colIndex]);

  const onChange = (e) => {
    const newValue = e.target.value;
    setLocalValue(newValue);

    if (dataRef.current?.[rowIndex]?.[colIndex]) {
      dataRef.current[rowIndex][colIndex].value = newValue;
    }
  };

  return (
    <div
      style={{
        position: 'relative',
        width: `${colWidth}px`,
        flexShrink: 0
      }}
    >
      <input
        ref={inputRef}
        value={localValue}
        onChange={onChange}
        style={{
          width: '100%',
          height: '30px',
          border: '1px solid #ccc',
          boxSizing: 'border-box',
          backgroundColor: reduxData?.backgroundColor || COLORS.defaultBackgroundCell,
        }}
      />
    </div>
  );
});
