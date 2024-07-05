import "./App.scss";
import OwnerList from "./pages/OwnerList/OwnerList";

function App() {
  return (
    <div>
      <header>
        <h1>Dog Adoption</h1>
      </header>
      <main>
        <OwnerList />
      </main>
    </div>
  );
}

export default App;
