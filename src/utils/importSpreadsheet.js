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
        const workbook = XLSX.read(data, { type: 'array', cellDates: true });

        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];

        const parsed = XLSX.utils.sheet_to_json(worksheet, {
          raw: false, // Todos os dados que chegarem serão uma string.
          // dateNF: 'dd/mm/yyyy',
          header: 1, // Considera a primeira linha como o header.
          defval: "" // Celulas null se tornam uma string vazia.
        });

        const result = parsed.map((row) =>
          row.map((cell) => ({
            value: String(cell ?? ''),
            backgroundColor: 'white',
          }))
        );

        resolve({ sheetName, workbookName: file.name, result });
      } catch (error) {
        reject(error);
      }
    };

    reader.onerror = reject;
    reader.readAsArrayBuffer(file);
  });
}

export const exampleSpreadsheet = [
  [
    { value: 'nome', backgroundColor: 'white' },
    { value: 'ddd', backgroundColor: 'white' },
    { value: 'telefone', backgroundColor: 'white' },
    { value: 'cpf_cnpj', backgroundColor: 'white' },
    { value: 'data_nascimento', backgroundColor: 'white' },
    { value: 'genero', backgroundColor: 'white' },
    { value: 'email', backgroundColor: 'white' }
  ],
  [
    { value: 'João Silva', backgroundColor: 'white' },
    { value: '', backgroundColor: 'white' },
    { value: '48 88888888', backgroundColor: 'white' },
    { value: '59581164014', backgroundColor: 'white' },
    { value: '3/20/1989', backgroundColor: 'white' },
    { value: 'feminino', backgroundColor: 'white' },
    { value: 'teste__ola@gmail.com', backgroundColor: 'white' }
  ],
  [
    { value: 'Carlos Eduard0', backgroundColor: 'white' },
    { value: '', backgroundColor: 'white' },
    { value: '48 9 88888888', backgroundColor: 'white' },
    { value: '552.859.550-92', backgroundColor: 'white' },
    { value: '4/5/02', backgroundColor: 'white' },
    { value: 'masculino', backgroundColor: 'white' },
    { value: 'joao.silva@gmail.com', backgroundColor: 'white' }
  ],
  [
    { value: 'Rafael_Martins', backgroundColor: 'white' },
    { value: '48', backgroundColor: 'white' },
    { value: '98888-8888', backgroundColor: 'white' },
    { value: '12345678891', backgroundColor: 'white' },
    { value: '12/31/1899', backgroundColor: 'white' },
    { value: 'f', backgroundColor: 'white' },
    { value: 'joao.silva@gmail.con', backgroundColor: 'white' }
  ],
  [
    { value: 'L+cas Almeida', backgroundColor: 'white' },
    { value: '', backgroundColor: 'white' },
    { value: '23 9 88888888', backgroundColor: 'white' },
    { value: '59581164014', backgroundColor: 'white' },
    { value: '12/31/1899', backgroundColor: 'white' },
    { value: 'm', backgroundColor: 'white' },
    { value: 'joao.silva@gmail.com', backgroundColor: 'white' }
  ],
  [
    { value: 'João Silva', backgroundColor: 'white' },
    { value: '48', backgroundColor: 'white' },
    { value: '98888-8888', backgroundColor: 'white' },
    { value: '552.859.550-92', backgroundColor: 'white' },
    { value: '3/20/1989', backgroundColor: 'white' },
    { value: 'f', backgroundColor: 'white' },
    { value: 'maria_oliveira123@yahoo.com.br', backgroundColor: 'white' }
  ],
  [
    { value: 'àáãâ', backgroundColor: 'white' },
    { value: '23', backgroundColor: 'white' },
    { value: '98888-8888', backgroundColor: 'white' },
    { value: '12345678891', backgroundColor: 'white' },
    { value: '4/5/02', backgroundColor: 'white' },
    { value: 'm', backgroundColor: 'white' },
    { value: 'carlos-martins@outlook.com', backgroundColor: 'white' }
  ],
  [
    { value: 'Rafael Martins', backgroundColor: 'white' },
    { value: '', backgroundColor: 'white' },
    { value: '48988 8 8 8 8 8 8', backgroundColor: 'white' },
    { value: '92.389.070/0001-00', backgroundColor: 'white' },
    { value: '3/20/1989', backgroundColor: 'white' },
    { value: 'feminino', backgroundColor: 'white' },
    { value: 'ana.paula@empresa.com', backgroundColor: 'white' }
  ],
  [
    { value: 'Lucas Almeida', backgroundColor: 'white' },
    { value: '', backgroundColor: 'white' },
    { value: '', backgroundColor: 'white' },
    { value: '92389070000100', backgroundColor: 'white' },
    { value: '4/5/02', backgroundColor: 'white' },
    { value: 'masculino', backgroundColor: 'white' },
    { value: 'teste.email+123@dominio.org', backgroundColor: 'white' }
  ]
];
