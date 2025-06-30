import * as XLSX from 'xlsx';

const validFileTypes = [
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // XLSX
  'application/vnd.ms-excel', // XLS
  'text/csv', // CSV
  'application/vnd.oasis.opendocument.spreadsheet', // ODS
];

export async function importSpreadsheet(file) {
  if (!validFileTypes.includes(file.type)) {
    alert("Por favor, selecione um arquivo válido (.xlsx, .xls, .csv, .ods).");
    return;
  }

  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });

        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];

        const parsed = XLSX.utils.sheet_to_json(worksheet, {
          raw: false, // Todos os dados que chegarem serão uma string.
          header: 1, // Considera a primeira linha como o header.
          defval: "" // Celulas null se tornam uma string vazia.
        });

        const result = parsed.map((row) =>
          row.map((cell) => ({
            value: String(cell ?? ''),
            backgroundColor: 'white',
          }))
        );

        resolve({ sheetName, worbookName: file.name, result });
      } catch (error) {
        reject(error);
      }
    };

    reader.onerror = reject;
    reader.readAsArrayBuffer(file);
  });
}