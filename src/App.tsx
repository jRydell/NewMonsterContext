import "./App.css";

import Monster from "./Monster";
import MonsterContextProvider from "./MonsterContextProvider";

function App() {
  return (
    <MonsterContextProvider>
      <h1>Monsters</h1>
      <Monster />
    </MonsterContextProvider>
  );
}

export default App;
