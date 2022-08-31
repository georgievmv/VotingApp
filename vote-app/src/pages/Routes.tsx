import { Routes, Route } from "react-router-dom";
import CreateSurvey from "./CreateSurvey";
import VotingPage from "./VotingPage";
import { useContext } from "react";
import { OptionsContext } from "../store/option-context";
const Routing: React.FC = () => {
  const ctx = useContext(OptionsContext);

  return (
    <Routes>
      <Route path="/welcome" element={<CreateSurvey />} />
      <Route path={`/${ctx.questionLink}`} element={<VotingPage />} />
    </Routes>
  );
};

export default Routing;
