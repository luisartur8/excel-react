import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isValidDDD } from "../../utils/validacao";
import { executarValidacao } from "../../utils/validateColumn";
import { setModalValidatePhone } from "../../features/modals/modalsSlice";
import { setData } from "../../features/spreadsheet/spreadsheetSlice";

import "../../styles/ModalValidatePhone.css"
import { centerModal, makeDraggable } from "../../utils/arrastarModais";

export function ModalValidatePhone(props) {
  const dispatch = useDispatch();
  const { modalValidatePhone } = useSelector((state) => state.modals);

  const [radioSemDDD, setRadioSemDDD] = useState(true);
  const [radioComDDD, setRadioComDDD] = useState(false);
  const [cbChecked, setCbChecked] = useState(false);
  const [cbEnable, setcbEnable] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [inputDisable, setInputDisable] = useState(true);
  const [opacityDDDInvalido, setOpacityDDDInvalido] = useState(0);

  useEffect(() => {
    if (modalValidatePhone.isOpen) {
      setRadioSemDDD(true);
      setRadioComDDD(false);

      setCbChecked(false);
      setcbEnable(false);

      setInputValue("");
      setInputDisable(true);
      setOpacityDDDInvalido(0);

      centerModal('.modal-telefone-content');

      document.getElementById('modalValidaTelefone').focus();
    }
  }, [modalValidatePhone]);

  useEffect(() => {
    makeDraggable(".modal-telefone-content", ".dragHandle");
  }, []);

  function validarTelefone() {
    const ddd = inputValue;

    if ((!isValidDDD(ddd) && cbChecked) || ddd.length > 2) {
      setInputValue("");
      setOpacityDDDInvalido(1);
      return;
    }
    setOpacityDDDInvalido(0);

    if (radioSemDDD) {
      const updatedData = executarValidacao([...props.dataRef.current], 'telefone', modalValidatePhone.colIndex);
      dispatch(setData(updatedData))
      dispatch(setModalValidatePhone({ isOpen: false, colIndex: -1 }))
      return;
    }

    if (radioComDDD) {
      const updatedData = executarValidacao([...props.dataRef.current], 'telefone', modalValidatePhone.colIndex, true, ddd);
      dispatch(setData(updatedData))
      dispatch(setModalValidatePhone({ isOpen: false, colIndex: -1 }))
      return;
    }

    throw new Error(`Erro: selectedRadio não foi reconhecido em validarTelefone()`);
  }

  function closeValidacaoTelefone() {
    dispatch(setModalValidatePhone({ isOpen: false, colIndex: -1 }))
  }

  function semDDDClick() {
    setRadioSemDDD(true);
    setRadioComDDD(false);
    setCbChecked(false);
    setcbEnable(false);
    setInputDisable(true);
    setInputValue("");
  }

  function comDDDClick() {
    setRadioSemDDD(false);
    setRadioComDDD(true);
    setcbEnable(true);
    setInputDisable(!cbChecked);
  }

  function onCbClick() {
    setCbChecked((prev) => {
      const newCbChecked = !prev;
      setInputDisable(!newCbChecked);
      return newCbChecked;
    });
    setInputValue("");
  }

  function handleInputChange(e) {
    setInputValue(e.target.value);
  }

  const actionsByKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      validarTelefone();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      closeValidacaoTelefone();
    } else if ((e.key === 'Tab' || e.key === 'ArrowUp' || e.key === 'ArrowDown') && (!e.altKey && !e.metaKey)) {
      e.preventDefault();
      if (radioComDDD) {
        semDDDClick()
      }
      if (radioSemDDD) {
        comDDDClick()
      }
    }
  };

  return (
    <div id="modalValidaTelefone" tabIndex="-1" onKeyDown={actionsByKeyPress} style={{ display: modalValidatePhone.isOpen ? "flex" : "none" }}>
      <div className="modal-telefone-content draggable-modal">
        <div id="modalHeaderValidaTelefone" className="dragHandle"></div>
        <div className="modal-telefone-bordinha">
          <p className="validar-como">VALIDAR COMO</p>
          <form className="formulario-modal-telefone">
            <label className="label-sem-ddd">
              <input
                className="radio-telefone-sem-ddd"
                onClick={semDDDClick}
                type="radio"
                name="opcoes-telefone"
                value="sem"
                checked={radioSemDDD}
                readOnly
              />
              SEM DDD (9 8888-8888)
            </label>
            <div className="quadrado-com-ddd">
              <label className="label-com-ddd">
                <input
                  className="radio-telefone-com-ddd"
                  onClick={comDDDClick}
                  type="radio"
                  name="opcoes-telefone"
                  value="com"
                  checked={radioComDDD}
                  readOnly
                />
                COM DDD (99 9 8888-8888)
              </label>
              <label className="inserir-ddd-personalizado">
                <input
                  className="checkbox-telefone-inserir-ddd"
                  onClick={onCbClick}
                  type="checkbox"
                  checked={cbChecked}
                  disabled={!cbEnable}
                />
                Inserir DDD personalizado
              </label>
              <input
                className="input-telefone-inserir-ddd"
                onChange={handleInputChange}
                value={inputValue}
                type="text"
                placeholder="Para telefones sem DDD"
                disabled={inputDisable}
              />
              <p className="p-ddd-invalido" style={{ opacity: opacityDDDInvalido }}>DDD Inválido</p>
            </div>
          </form>
          <div className="modal-telefone-botoes">
            <button className="botoesTelefone botaoValidarTelefone" onClick={validarTelefone}>Validar</button>
            <button className="botoesTelefone botaoFecharTelefone" onClick={closeValidacaoTelefone}>Fechar</button>
          </div>
        </div>
      </div>
    </div>
  )
}