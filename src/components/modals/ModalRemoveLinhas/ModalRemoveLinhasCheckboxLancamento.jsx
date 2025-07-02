export function ModalRemoveLinhasCheckboxLancamento({
  cbClienteNome, setCbClienteNome,
  cbClienteTelefone, setCbClienteTelefone,
  cbClienteCpfCnpj, setCbClienteCpfCnpj,
  cbValorVenda, setCbValorVenda,
  cbValorResgate, setCbValorResgate,
  cbAnotacaoVenda, setCbAnotacaoVenda,
  cbItemVenda, setCbItemVenda,
  cbDataLancamento, setCbDataLancamento,
  cbNomeVendedor, setCbNomeVendedor,
  cbCodigoVendedor, setCbCodigoVendedor,
}) {

  // Funções para alternar o estado (marcado/desmarcado) de cada checkbox
  function handleCbClienteNome() {
    setCbClienteNome(prevState => !prevState);
  }

  function handleCbClienteTelefone() {
    setCbClienteTelefone(prevState => !prevState);
  }

  function handleCbClienteCpfCnpj() {
    setCbClienteCpfCnpj(prevState => !prevState);
  }

  function handleCbValorVenda() {
    setCbValorVenda(prevState => !prevState);
  }

  function handleCbValorResgate() {
    setCbValorResgate(prevState => !prevState);
  }

  function handleCbAnotacaoVenda() {
    setCbAnotacaoVenda(prevState => !prevState);
  }

  function handleCbItemVenda() {
    setCbItemVenda(prevState => !prevState);
  }

  function handleCbDataLancamento() {
    setCbDataLancamento(prevState => !prevState);
  }

  function handleCbNomeVendedor() {
    setCbNomeVendedor(prevState => !prevState);
  }

  function handleCbCodigoVendedor() {
    setCbCodigoVendedor(prevState => !prevState);
  }

  return (
    <table>
      <tbody>
        <tr>
          <td>
            <label>
              <input className="modal-linhas-cliente-nome-checkbox" type="checkbox" onChange={handleCbClienteNome} checked={cbClienteNome} />
              cliente_nome
            </label>
          </td>
        </tr>
        <tr>
          <td>
            <label>
              <input className="modal-linhas-cliente-telefone-checkbox" type="checkbox" onChange={handleCbClienteTelefone} checked={cbClienteTelefone} />
              cliente_telefone
            </label>
          </td>
        </tr>
        <tr>
          <td>
            <label>
              <input className="modal-linhas-cliente-cpf_cnpj-checkbox" type="checkbox" onChange={handleCbClienteCpfCnpj} checked={cbClienteCpfCnpj} />
              cliente_cpf_cnpj
            </label>
          </td>
        </tr>
        <tr>
          <td>
            <label>
              <input className="modal-linhas-valor_venda-checkbox" type="checkbox" onChange={handleCbValorVenda} checked={cbValorVenda} />
              valor_venda
            </label>
          </td>
        </tr>
        <tr>
          <td>
            <label>
              <input className="modal-linhas-valor_resgate-checkbox" type="checkbox" onChange={handleCbValorResgate} checked={cbValorResgate} />
              valor_resgate
            </label>
          </td>
        </tr>
        <tr>
          <td>
            <label>
              <input className="modal-linhas-anotacao_venda-checkbox" type="checkbox" onChange={handleCbAnotacaoVenda} checked={cbAnotacaoVenda} />
              anotacao_venda
            </label>
          </td>
        </tr>
        <tr>
          <td>
            <label>
              <input className="modal-linhas-item_venda-checkbox" type="checkbox" onChange={handleCbItemVenda} checked={cbItemVenda} />
              item_venda
            </label>
          </td>
        </tr>
        <tr>
          <td>
            <label>
              <input className="modal-linhas-data_lancamento-checkbox" type="checkbox" onChange={handleCbDataLancamento} checked={cbDataLancamento} />
              data_lancamento
            </label>
          </td>
        </tr>
        <tr>
          <td>
            <label>
              <input className="modal-linhas-nome_vendedor-checkbox" type="checkbox" onChange={handleCbNomeVendedor} checked={cbNomeVendedor} />
              nome_vendedor
            </label>
          </td>
        </tr>
        <tr>
          <td>
            <label>
              <input className="modal-linhas-codigo_vendedor-checkbox" type="checkbox" onChange={handleCbCodigoVendedor} checked={cbCodigoVendedor} />
              codigo_vendedor
            </label>
          </td>
        </tr>
      </tbody>
    </table>
  )
}