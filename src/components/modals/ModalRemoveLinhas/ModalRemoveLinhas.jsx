import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { centerModal, makeDraggable } from "../../../utils/arrastarModais";
import { setModalRemoveLinhas } from "../../../features/modals/modalsSlice";
import { ModalRemoveLinhasVazias } from "./ModalRemoveLinhasVazias";
import { ModalRemoveLinhasCheckboxLancamento } from "./ModalRemoveLinhasCheckboxLancamento";
import { ModalRemoveLinhasCheckboxCliente } from "./ModalRemoveLinhasCheckboxCliente";
import { ModalRemoveLinhasCheckboxOportunidade } from "./ModalRemoveLinhasCheckboxOportunidade";
import { ModalRemoveLinhasCheckboxProdutos } from "./ModalRemoveLinhasCheckboxProdutos";
import { ModalRemoveLinhasMesmoTempo } from "./ModalRemoveLinhasMesmoTempo";

import "../../../styles/modalRemoveLinhas.css"

export function ModalRemoveLinhas(props) {
  const dispatch = useDispatch()

  const { tipoPlanilha } = useSelector((state) => state.spreadsheet);
  const { modalRemoveLinhas } = useSelector((state) => state.modals);

  /**
     * Estado para os checkboxes que controlam os campos a serem considerados na remoção de linhas.
     * Alguns estados podem estar presentes em mais de um tipo de planilha.
     * (Tipo Cliente, Lançamento, Oportunidade e Produtos).
     */
  // Cliente.
  const [cbNome, setCbNome] = useState(false);
  const [cbTelefone, setCbTelefone] = useState(false);
  const [cbCpfCnpj, setCbCpfCnpj] = useState(false);
  const [cbDataNascimento, setCbDataNascimento] = useState(false);
  const [cbGenero, setCbGenero] = useState(false);
  const [cbEmail, setCbEmail] = useState(false);
  const [cbAnotacao, setCbAnotacao] = useState(false);

  // Lançamento.
  const [cbClienteNome, setCbClienteNome] = useState(false);
  const [cbClienteTelefone, setCbClienteTelefone] = useState(false);
  const [cbClienteCpfCnpj, setCbClienteCpfCnpj] = useState(false);
  const [cbValorVenda, setCbValorVenda] = useState(false);
  const [cbValorResgate, setCbValorResgate] = useState(false);
  const [cbAnotacaoVenda, setCbAnotacaoVenda] = useState(false);
  const [cbItemVenda, setCbItemVenda] = useState(false);
  const [cbDataLancamento, setCbDataLancamento] = useState(false);
  const [cbNomeVendedor, setCbNomeVendedor] = useState(false);
  const [cbCodigoVendedor, setCbCodigoVendedor] = useState(false);

  // Oportunidade.
  const [cbBonusValor, setCbBonusValor] = useState(false);
  const [cbBonusValidade, setCbBonusValidade] = useState(false);

  // Produtos.
  const [cbCodigo, setCbCodigo] = useState(false);
  const [cbPercentual, setCbPercentual] = useState(false);
  const [cbValidade, setCbValidade] = useState(false);

  // Estado para armazenar as informações sobre as colunas ou linhas removidas.
  const [infoRemovedRowCols, setInfoRemovedRowCols] = useState('ㅤ');

  /**
   * Efeito que é executado quando o modal de remoção de linhas é aberto.
   * Reseta os valores dos checkboxes e centraliza o modal na tela.
   */
  useEffect(() => {
    if (modalRemoveLinhas) {
      setCbNome(false);
      setCbTelefone(false);
      setCbCpfCnpj(false);
      setCbDataNascimento(false);
      setCbGenero(false);
      setCbEmail(false);
      setCbAnotacao(false);
      setCbClienteNome(false);
      setCbClienteTelefone(false);
      setCbClienteCpfCnpj(false);
      setCbValorVenda(false);
      setCbValorResgate(false);
      setCbAnotacaoVenda(false);
      setCbItemVenda(false);
      setCbDataLancamento(false);
      setCbNomeVendedor(false);
      setCbCodigoVendedor(false);
      setCbBonusValor(false);
      setCbBonusValidade(false);
      setCbCodigo(false);
      setCbPercentual(false);
      setCbValidade(false);

      if (tipoPlanilha === 'clientes') {
        setCbTelefone(true);
        setCbCpfCnpj(true);
      } else if (tipoPlanilha === 'lancamentos') {
        setCbClienteTelefone(true);
        setCbClienteCpfCnpj(true);
      } else if (tipoPlanilha === 'oportunidade') {
        setCbTelefone(true);
        setCbCpfCnpj(true);
      } else if (tipoPlanilha === 'produtos') {
        setCbNome(true);
      }

      setInfoRemovedRowCols('ㅤ');
      centerModal('#modalRemoveLinhas');

      document.getElementById('modalRemoveLinhas').focus();
    }
  }, [modalRemoveLinhas, tipoPlanilha])

  // Permite o modal ser arrastado na tela.
  useEffect(() => {
    makeDraggable("#modalRemoveLinhas", ".dragHandle");
  }, []);

  function closeModal() {
    dispatch(setModalRemoveLinhas({ isOpen: false }))
  }

  /**
   * Lida com a tecla pressionada no modal.
   * Fecha o modal ao pressionar 'Escape'.
   * 
   * @param {KeyboardEvent} e - Evento da tecla pressionada.
   * 
   * @returns {void} Não retorna nada, apenas executa uma ação baseada na tecla pressionada.
   */
  const actionsByKeyPress = (e) => {
    e.preventDefault();
    if (e.key === 'Escape') {
      closeModal();
    }
  };

  return (
    <div id="modalRemoveLinhas" tabIndex="-1" onKeyDown={actionsByKeyPress} style={{ display: modalRemoveLinhas.isOpen ? "flex" : "none" }}>
      <div className="modal-remove-linhas-conteudo draggable-modal">
        <div id="modalHeaderRemoveLinhas" className="dragHandle">
          <label>Remover linhas</label>
          <span className="close-modal-linhas-btn" onClick={closeModal}>X</span>
        </div>
        <div className="remove-linha-bordinha">
          <div className="modal-secao-remover-quando-vazia">
            <label>Remover quando vazias:</label>
            <ModalRemoveLinhasVazias
              dataRef={props.dataRef.current}
              setInfoRemovedRowCols={setInfoRemovedRowCols}
            />
          </div>
          <div className="modal-secao-remover-quando-vazia2">
            <label>Quando vazias ao mesmo tempo:</label>
            {(() => {
              switch (tipoPlanilha) {
                case 'clientes':
                  return (
                    <ModalRemoveLinhasCheckboxCliente
                      cbNome={cbNome}
                      setCbNome={setCbNome}
                      cbTelefone={cbTelefone}
                      setCbTelefone={setCbTelefone}
                      cbCpfCnpj={cbCpfCnpj}
                      setCbCpfCnpj={setCbCpfCnpj}
                      cbDataNascimento={cbDataNascimento}
                      setCbDataNascimento={setCbDataNascimento}
                      cbGenero={cbGenero}
                      setCbGenero={setCbGenero}
                      cbEmail={cbEmail}
                      setCbEmail={setCbEmail}
                      cbAnotacao={cbAnotacao}
                      setCbAnotacao={setCbAnotacao}
                    />
                  );
                case 'lancamentos':
                  return (
                    <ModalRemoveLinhasCheckboxLancamento
                      cbClienteNome={cbClienteNome}
                      setCbClienteNome={setCbClienteNome}
                      cbClienteTelefone={cbClienteTelefone}
                      setCbClienteTelefone={setCbClienteTelefone}
                      cbClienteCpfCnpj={cbClienteCpfCnpj}
                      setCbClienteCpfCnpj={setCbClienteCpfCnpj}
                      cbValorVenda={cbValorVenda}
                      setCbValorVenda={setCbValorVenda}
                      cbValorResgate={cbValorResgate}
                      setCbValorResgate={setCbValorResgate}
                      cbAnotacaoVenda={cbAnotacaoVenda}
                      setCbAnotacaoVenda={setCbAnotacaoVenda}
                      cbItemVenda={cbItemVenda}
                      setCbItemVenda={setCbItemVenda}
                      cbDataLancamento={cbDataLancamento}
                      setCbDataLancamento={setCbDataLancamento}
                      cbNomeVendedor={cbNomeVendedor}
                      setCbNomeVendedor={setCbNomeVendedor}
                      cbCodigoVendedor={cbCodigoVendedor}
                      setCbCodigoVendedor={setCbCodigoVendedor}
                    />
                  );
                case 'oportunidade':
                  return (
                    <ModalRemoveLinhasCheckboxOportunidade
                      cbNome={cbNome}
                      setCbNome={setCbNome}
                      cbTelefone={cbTelefone}
                      setCbTelefone={setCbTelefone}
                      cbCpfCnpj={cbCpfCnpj}
                      setCbCpfCnpj={setCbCpfCnpj}
                      cbDataNascimento={cbDataNascimento}
                      setCbDataNascimento={setCbDataNascimento}
                      cbGenero={cbGenero}
                      setCbGenero={setCbGenero}
                      cbEmail={cbEmail}
                      setCbEmail={setCbEmail}
                      cbAnotacao={cbAnotacao}
                      setCbAnotacao={setCbAnotacao}
                      cbBonusValor={cbBonusValor}
                      setCbBonusValor={setCbBonusValor}
                      cbBonusValidade={cbBonusValidade}
                      setCbBonusValidade={setCbBonusValidade}
                    />
                  );
                case 'produtos':
                  return (
                    <ModalRemoveLinhasCheckboxProdutos
                      cbNome={cbNome}
                      setCbNome={setCbNome}
                      cbCodigo={cbCodigo}
                      setCbCodigo={setCbCodigo}
                      cbPercentual={cbPercentual}
                      setCbPercentual={setCbPercentual}
                      cbValidade={cbValidade}
                      setCbValidade={setCbValidade}
                    />
                  )
                default:
                  return <p>Erro: Tipo de planilha inexistente ({tipoPlanilha})</p>;
              }
            })()}
            <div className="informacoes-linhas-removidas">{infoRemovedRowCols}</div>
            <ModalRemoveLinhasMesmoTempo
              tableData={props.dataRef.current}
              setInfoRemovedRowCols={setInfoRemovedRowCols}
              cbNome={cbNome}
              cbTelefone={cbTelefone}
              cbCpfCnpj={cbCpfCnpj}
              cbDataNascimento={cbDataNascimento}
              cbGenero={cbGenero}
              cbEmail={cbEmail}
              cbAnotacao={cbAnotacao}
              //
              cbClienteNome={cbClienteNome}
              cbClienteTelefone={cbClienteTelefone}
              cbClienteCpfCnpj={cbClienteCpfCnpj}
              cbValorVenda={cbValorVenda}
              cbValorResgate={cbValorResgate}
              cbAnotacaoVenda={cbAnotacaoVenda}
              cbItemVenda={cbItemVenda}
              cbDataLancamento={cbDataLancamento}
              cbNomeVendedor={cbNomeVendedor}
              cbCodigoVendedor={cbCodigoVendedor}
              //
              cbBonusValor={cbBonusValor}
              cbBonusValidade={cbBonusValidade}
              //
              cbCodigo={cbCodigo}
              cbPercentual={cbPercentual}
              cbValidade={cbValidade}
            />
          </div>
        </div>
      </div>
    </div>
  )
}