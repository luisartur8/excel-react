import GerenciadorSpreadsheet from "./components/GerenciadorSpreadsheet"
import { Provider } from "react-redux"
import { store } from "./store/store"

function App() {
  return (
    <Provider store={store}>
      <GerenciadorSpreadsheet />
    </Provider>
  )
}

export default App
