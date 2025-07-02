import { COLORS } from "./colors";
import { validarCelula } from "./validacao";

export function executarValidacao(reduxData, selectValue, columnIndex, cb, ddd, formatoOriginal, formatoFinal) {
  const updatedData = reduxData.map((row) => {
    const newRow = [...row];

    const cellData = newRow[columnIndex];

    if (cellData) {
      const originalValue = cellData.value;
      const correctedValue = validarCelula(originalValue, selectValue, cb, ddd, formatoOriginal, formatoFinal);

      newRow[columnIndex] =
        correctedValue === '' && originalValue !== ''
          ? { value: originalValue, backgroundColor: COLORS.wrongCell }
          : { value: correctedValue, backgroundColor: COLORS.defaultBackgroundCell };
    }

    return newRow;
  });

  return updatedData;
}
