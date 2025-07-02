export function ModalRemoveLinhasCheckboxProdutos({
  cbNome, setCbNome,
  cbCodigo, setCbCodigo,
  cbPercentual, setCbPercentual,
  cbValidade, setCbValidade
}) {

  // Funções para alternar o estado (marcado/desmarcado) de cada checkbox
  function handleCbCodigo() {
    setCbCodigo(prevState => !prevState);
  }

  function handleCbNome() {
    setCbNome(prevState => !prevState);
  }

  function handleCbPercentual() {
    setCbPercentual(prevState => !prevState);
  }

  function handleCbValidade() {
    setCbValidade(prevState => !prevState);
  }

  return (
    <table>
      <tbody>
        <tr>
          <td>
            <label>
              <input className="modal-linhas-codigo-checkbox" type="checkbox" onChange={handleCbCodigo} checked={cbCodigo} />
              codigo
            </label>
          </td>
        </tr>
        <tr>
          <td>
            <label>
              <input className="modal-linhas-nome-checkbox" type="checkbox" onChange={handleCbNome} checked={cbNome} />
              nome
            </label>
          </td>
        </tr>
        <tr>
          <td>
            <label>
              <input className="modal-linhas-percentual-checkbox" type="checkbox" onChange={handleCbPercentual} checked={cbPercentual} />
              percentual
            </label>
          </td>
        </tr>
        <tr>
          <td>
            <label>
              <input className="modal-linhas-validade-checkbox" type="checkbox" onChange={handleCbValidade} checked={cbValidade} />
              validade
            </label>
          </td>
        </tr>
      </tbody>
    </table>
  )
}
