import { validarCelula } from "./validacao";

export function executarValidacao(data, selectValue, columnIndex, cb, ddd, formatoOriginal, formatoFinal) {
  const updatedData = data.map((row) => {
    const cellData = row[columnIndex];

    if (cellData) {
      const originalValue = cellData.value;
      const correctedValue = validarCelula(originalValue, selectValue, cb, ddd, formatoOriginal, formatoFinal);

      if (correctedValue === '' && originalValue !== '') {
        row[columnIndex] = { value: originalValue, style: { backgroundColor: 'red' } };
      } else {
        row[columnIndex] = { value: correctedValue, style: { backgroundColor: 'white' } };
      }
    }

    return row;
  });

  return updatedData
}