import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { centerModal, makeDraggable } from "../../utils/arrastarModais";
import { setModalValidateDate } from "../../features/modals/modalsSlice";
import { setData } from "../../features/spreadsheet/spreadsheetSlice";
import { executarValidacao } from "../../utils/validateColumn";

import iconCancelar from '../../assets/icon-cancelar.png';
import iconLixeira from '../../assets/icon-lixeira.png';

import "../../styles/ModalValidateDate.css"

export function ModalValidateDate(props) {
  const dispatch = useDispatch();

  const { headers: reduxHeaders } = useSelector((state) => state.spreadsheet);
  const { modalValidateDate } = useSelector((state) => state.modals);

  const [originalOne, setOriginalOne] = useState('dd');
  const [originalTwo, setOriginalTwo] = useState('mm');
  const [originalThree, setOriginalThree] = useState('yyyy');

  const [finalOne, setFinalOne] = useState('dd');
  const [finalTwo, setFinalTwo] = useState('mm');
  const [finalThree, setFinalThree] = useState('yyyy');

  useEffect(() => {
    if (modalValidateDate.isOpen) {
      setOriginalOne('dd');
      setOriginalTwo('mm');
      setOriginalThree('yyyy');
      setFinalOne('dd');
      setFinalTwo('mm');
      setFinalThree('yyyy');
      centerModal('#modalValidaNascimento');

      document.getElementById('modalValidaNascimento').focus();
    }
  }, [modalValidateDate]);

  useEffect(() => {
    makeDraggable("#modalValidaNascimento", ".dragHandle");
  }, []);

  // Data Original
  function handleOriginalOne(e) {
    setOriginalOne(e.target.value);
  }

  function handleOriginalTwo(e) {
    setOriginalTwo(e.target.value);
  }

  function handleOriginalThree(e) {
    setOriginalThree(e.target.value);
  }

  // Data Final
  function handleFinalOne(e) {
    setFinalOne(e.target.value);
  }

  function handleFinalTwo(e) {
    setFinalTwo(e.target.value);
  }

  function handleFinalThree(e) {
    setFinalThree(e.target.value);
  }

  function closeModal() {
    dispatch(setModalValidateDate({ isOpen: false, colIndex: -1 }))
  }

  function validarData() {
    const formatoOriginal = `${originalOne}/${originalTwo}/${originalThree}`;
    const formatoFinal = `${finalOne}/${finalTwo}/${finalThree}`;

    const selectValue = reduxHeaders[modalValidateDate.colIndex]

    const updatedData = executarValidacao([...props.dataRef.current], selectValue, modalValidateDate.colIndex, null, null, formatoOriginal, formatoFinal);
    dispatch(setData(updatedData))
    dispatch(setModalValidateDate({ isOpen: false, colIndex: -1 }))
  }

  const actionsByKeyPress = (e) => {
    e.preventDefault();
    if (e.key === 'Enter') {
      validarData();
    } else if (e.key === 'Escape') {
      closeModal();
    }
  };

  return (
    <div id="modalValidaNascimento" tabIndex="-1" onKeyDown={actionsByKeyPress} style={{ display: modalValidateDate.isOpen ? "flex" : "none" }}>
      <div className="modal-nascimento-conteudo draggable-modal">
        <div id="modalHeaderValidaNascimento" className="dragHandle"></div>
        <div className="nascimento-conteudo-central">
          <div className="quadrado-conteudo-nascimento">
            <p>Data original</p>
            <div className="nascimento-data-original">
              <select className="dia-mes-ano-original-1" value={originalOne} onChange={handleOriginalOne}>
                <option value="dd">Dia</option>
                <option value="mm">Mês</option>
                <option value="yyyy">Ano(yyyy)</option>
                <option value="yy">Ano(yy)</option>
              </select>
              <select className="dia-mes-ano-original-2" value={originalTwo} onChange={handleOriginalTwo}>
                <option value="dd">Dia</option>
                <option value="mm">Mês</option>
                <option value="yyyy">Ano(yyyy)</option>
                <option value="yy">Ano(yy)</option>
              </select>
              <select className="dia-mes-ano-original-3" value={originalThree} onChange={handleOriginalThree}>
                <option value="dd">Dia</option>
                <option value="mm">Mês</option>
                <option value="yyyy">Ano(yyyy)</option>
                <option value="yy">Ano(yy)</option>
              </select>
            </div>
            <p>Data final</p>
            <div className="nascimento-data-final">
              <select className="dia-mes-ano-final-1" value={finalOne} onChange={handleFinalOne}>
                <option value="dd">Dia</option>
                <option value="mm">Mês</option>
                <option value="yyyy">Ano(yyyy)</option>
                <option value="yy">Ano(yy)</option>
              </select>
              <select className="dia-mes-ano-final-2" value={finalTwo} onChange={handleFinalTwo}>
                <option value="dd">Dia</option>
                <option value="mm">Mês</option>
                <option value="yyyy">Ano(yyyy)</option>
                <option value="yy">Ano(yy)</option>
              </select>
              <select className="dia-mes-ano-final-3" value={finalThree} onChange={handleFinalThree}>
                <option value="dd">Dia</option>
                <option value="mm">Mês</option>
                <option value="yyyy">Ano(yyyy)</option>
                <option value="yy">Ano(yy)</option>
              </select>
            </div>
          </div>
          <div className="modal-nascimento-botao">
            <button className="botoesNascimento botaoValidarNascimento" onClick={validarData}>
              <img src={iconCancelar} />
              Validar
            </button>
            <button className="botoesNascimento botaoFecharNascimento" onClick={closeModal}>
              <img src={iconLixeira} />
              Fechar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}