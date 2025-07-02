export function ModalRemoveLinhasCheckboxCliente({
  cbNome, setCbNome,
  cbTelefone, setCbTelefone,
  cbCpfCnpj, setCbCpfCnpj,
  cbDataNascimento, setCbDataNascimento,
  cbGenero, setCbGenero,
  cbEmail, setCbEmail,
  cbAnotacao, setCbAnotacao
}) {

  // Funções para alternar o estado (marcado/desmarcado) de cada checkbox
  function handleCbNome() {
    setCbNome(prevState => !prevState);
  }

  function handleCbTelefone() {
    setCbTelefone(prevState => !prevState);
  }

  function handleCbCpfCnpj() {
    setCbCpfCnpj(prevState => !prevState);
  }

  function handleCbDataNascimento() {
    setCbDataNascimento(prevState => !prevState);
  }

  function handleCbGenero() {
    setCbGenero(prevState => !prevState);
  }

  function handleCbEmail() {
    setCbEmail(prevState => !prevState);
  }

  function handleCbAnotacao() {
    setCbAnotacao(prevState => !prevState);
  }

  return (
    <table>
      <tbody>
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
              <input className="modal-linhas-telefone-checkbox" type="checkbox" onChange={handleCbTelefone} checked={cbTelefone} />
              telefone
            </label>
          </td>
        </tr>
        <tr>
          <td>
            <label>
              <input className="modal-linhas-cpf_cnpj-checkbox" type="checkbox" onChange={handleCbCpfCnpj} checked={cbCpfCnpj} />
              cpf_cnpj
            </label>
          </td>
        </tr>
        <tr>
          <td>
            <label>
              <input className="modal-linhas-data_nascimento-checkbox" type="checkbox" onChange={handleCbDataNascimento} checked={cbDataNascimento} />
              data_nascimento
            </label>
          </td>
        </tr>
        <tr>
          <td>
            <label>
              <input className="modal-linhas-genero-checkbox" type="checkbox" onChange={handleCbGenero} checked={cbGenero} />
              genero
            </label>
          </td>
        </tr>
        <tr>
          <td>
            <label>
              <input className="modal-linhas-email-checkbox" type="checkbox" onChange={handleCbEmail} checked={cbEmail} />
              email
            </label>
          </td>
        </tr>
        <tr>
          <td>
            <label>
              <input className="modal-linhas-anotacao-checkbox" type="checkbox" onChange={handleCbAnotacao} checked={cbAnotacao} />
              anotacao
            </label>
          </td>
        </tr>
      </tbody>
    </table>
  )
}