import { Routes, Route, useParams } from "react-router-dom";
import CreateSurvey from "./CreateSurvey";
import VotingPage from "./VotingPage";
import ErrorPage from "./ErrorPage";
const Routing: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<CreateSurvey />} />
      <Route path={"/:link"} element={<VotingPage />} />
      <Route path="/*" element={<ErrorPage />} />
    </Routes>
  );
};

export default Routing;
