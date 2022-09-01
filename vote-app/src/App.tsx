import "./App.css";
import useHttp from "./hooks/use-http";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getDoc, doc } from "firebase/firestore";
import { db } from "./firebase";
import OptionsContextProvider from "./store/option-context";
import { BrowserRouter as Router } from "react-router-dom";
import Routing from "./pages/Routes";

function App() {
  let { link } = useParams();

  useEffect(() => {
    const getData = async () => {
      if (link) {
        console.log("runing");
        let linkDoc = doc(db, "links", link);
        const data = await getDoc(linkDoc);
        console.log(data);
      }
    };
    getData();
  });
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
