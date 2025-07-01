export function getTextWidth(text, font = '14px Arial') {
  const canvas = getTextWidth.canvas || (getTextWidth.canvas = document.createElement('canvas'));
  const context = canvas.getContext('2d');
  context.font = font;
  return context.measureText(text).width;
}

export function getColMaxWidth(dataRef, colIndex, font = '14px Arial', min = 50, padding = 16) {
  let max = min;
  for (let row = 0; row < dataRef.current.length; row++) {
    const value = dataRef.current[row][colIndex]?.value?.toString() ?? '';
    const width = getTextWidth(value, font) + padding;
    if (width > max) max = width;
  }
  return max;
}