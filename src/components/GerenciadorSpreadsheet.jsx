import VirtualSpreadsheet from "./VirtualSpreadsheet";
import { useDispatch, useSelector } from "react-redux";
import { setTipoPlanilha } from "../features/spreadsheet/spreadsheetSlice";

import "../styles/GerenciadorSpreadsheet.css"
import { NoSpreadsheet } from "./NoSpreadsheet";

export default function GerenciadorSpreadsheet() {
  const dispatch = useDispatch()

  const { data: reduxData, tipoPlanilha } = useSelector((state) => state.spreadsheet);

  const options = ['clientes', 'lancamentos', 'oportunidade', 'produtos'];

  return (
    <>
      <header className="header-gerenciador">
        <div className="header-titulo-imagem">
          <img src="https://patricktulio.com.br/bk-nummus/wp-content/uploads/2023/03/lp-cashback.png" alt="logo-nummus" />
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
                onChange={(e) => dispatch(setTipoPlanilha(e.target.value))}
              />
              {option.charAt(0).toUpperCase() + option.slice(1)}
            </label>
          ))}
        </div>
      </header>
      {reduxData.length === 0 ? (
        <NoSpreadsheet />
      ) : (
        <VirtualSpreadsheet />
      )}
    </>
  )
}