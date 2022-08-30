import "./App.css";

import OptionsContextProvider from "./store/option-context";
import { BrowserRouter as Router } from "react-router-dom";
import Routing from "./pages/Routes";
function App() {
  return (
    <OptionsContextProvider>
      <Router>
        <div className="App">
          <Routing />
        </div>
      </Router>
    </OptionsContextProvider>
  );
}

export default App;
