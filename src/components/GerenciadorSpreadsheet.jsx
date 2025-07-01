import VirtualSpreadsheet from "./VirtualSpreadsheet";
import { useDispatch, useSelector } from "react-redux";
import { setHeaders, setTipoPlanilha } from "../features/spreadsheet/spreadsheetSlice";

import iconHeaderNummus from '../assets/nummus-logo.png';
import "../styles/GerenciadorSpreadsheet.css"
import { NoSpreadsheet } from "./NoSpreadsheet";
import { LateralBar } from "./LateralBar";
import { useEffect, useRef, useState } from "react";

export default function GerenciadorSpreadsheet() {
  const dispatch = useDispatch()

  const { data: reduxData, headers: reduxHeaders, tipoPlanilha } = useSelector((state) => state.spreadsheet);

  const [data, setData] = useState([]);
  const dataRef = useRef(data);

  useEffect(() => {
    dataRef.current = data;
  }, [data]);

  const options = ['clientes', 'lancamentos', 'oportunidade', 'produtos'];

  const changeTipoPlanilha = (e) => {
    dispatch(setTipoPlanilha(e.target.value))

    if (reduxHeaders.length > 0 && dataRef.length !== 0) {
      if (e.target.value === 'lancamentos') {
        dispatch(setHeaders(Array(reduxHeaders.length).fill('cliente_nome')));
        return;
      }
      dispatch(setHeaders(Array(reduxHeaders.length).fill('nome')));
    }
  }

  return (
    <>
      <header className="header-gerenciador">
        <div className="header-titulo-imagem">
          <img src={iconHeaderNummus} alt="logo-nummus" />
          <h1>Gerenciador de Planilhas</h1>
        </div>
        <div className="radio-group">
          {options.map((option) => (
            <label
              key={option}
              className={`radio-label ${tipoPlanilha === option ? 'checked' : ''}`}
            >
              <input
                type="radio"
                name="option"
                value={option}
                checked={tipoPlanilha === option}
                onChange={changeTipoPlanilha}
              />
              {option.charAt(0).toUpperCase() + option.slice(1)}
            </label>
          ))}
        </div>
      </header>
      {reduxData.length === 0 ? (
        <NoSpreadsheet />
      ) : (
        <div className="main-layout">
          <div className="sidebar">
            <LateralBar data={data} setData={setData} dataRef={dataRef} />
          </div>
          <div className="main-content">
            <VirtualSpreadsheet data={data} setData={setData} dataRef={dataRef} />
          </div>
        </div>
      )}
    </>
  )
}