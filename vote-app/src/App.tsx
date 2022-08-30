import "./App.css";
import CreateSurvey from "./pages/CreateSurvey";
import VotingPage from "./pages/VotingPage";
import { useState } from "react";
import OptionsContextProvider from "./store/option-context";

function App() {
  const [questionIsCreated, setQuestionIsCreated] = useState<boolean>(false);

  const askQuestion = () => {
    setQuestionIsCreated(true);
  };
  return (
    <OptionsContextProvider>
      <div className="App">
        {!questionIsCreated ? (
          <CreateSurvey askQusetion={askQuestion} />
        ) : (
          <VotingPage />
        )}
      </div>
    </OptionsContextProvider>
  );
}

export default App;
