import { Routes, Route } from "react-router-dom";
import CreateSurvey from "./CreateSurvey";
import VotingPage from "./VotingPage";

const Routing: React.FC = (props) => {
  return (
    <Routes>
      <Route path="/welcome" element={<CreateSurvey />} />
      <Route path="/question" element={<VotingPage />} />
    </Routes>
  );
};

export default Routing;
