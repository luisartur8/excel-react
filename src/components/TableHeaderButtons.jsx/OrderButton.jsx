import { FaSortAlphaUp } from "react-icons/fa";
import { FaSortAlphaDownAlt } from "react-icons/fa";

export function OrderButton() {

  const ordenarAlfabetico = (order) => {
    alert(order)
  }

  return (
    <>
      <button className="btn-ordenar-crescente" onClick={() => ordenarAlfabetico('crescente')}><FaSortAlphaUp size={16} /></button>
      <button className="btn-ordenar-decrescente" onClick={() => ordenarAlfabetico('decrescente')}><FaSortAlphaDownAlt size={16} /></button>
    </>
  )
}