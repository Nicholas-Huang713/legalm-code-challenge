import "./App.scss";
import OwnerList from "./pages/OwnerList/OwnerList";
import { ModalProvider } from "./context/ModalContext";

function App() {
  return (
    <div>
      <header>
        <h1>Dog Adoption</h1>
      </header>
      <main>
        <ModalProvider>
          <OwnerList />
        </ModalProvider>
      </main>
    </div>
  );
}

export default App;
