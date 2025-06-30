import { TbColumnRemove } from "react-icons/tb";

export function ClearRedCellButton() {

  const clearRedCell = () => {
    alert('clearRedCell')
  }

  return (
    <button className="btn-apaga-red" onClick={clearRedCell}>
      <TbColumnRemove size={16} />
    </button>
  )
}