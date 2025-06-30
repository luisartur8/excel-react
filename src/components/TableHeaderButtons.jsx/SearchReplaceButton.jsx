import { FaMagnifyingGlass } from "react-icons/fa6";

export function SearchReplaceButton() {

  const openSearchReplaceModal = () => {
    return alert('openSearchReplaceModal')
  }

  return (
    <button className="btn-abrir-localizar-substituir" onClick={openSearchReplaceModal}>
      <FaMagnifyingGlass size={16} />
    </button>
  )
}