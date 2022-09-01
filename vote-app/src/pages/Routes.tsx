import { Routes, Route, useParams } from "react-router-dom";
import CreateSurvey from "./CreateSurvey";
import VotingPage from "./VotingPage";
import { useContext, useEffect } from "react";
import { OptionsContext } from "../store/option-context";
import { getDoc, doc } from "firebase/firestore";
import { collection } from "firebase/firestore/lite";
import { db } from "../firebase";
const Routing: React.FC = () => {
  const ctx = useContext(OptionsContext);
  let { link } = useParams();

  console.log(link);
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
    <Routes>
      <Route path="/" element={<CreateSurvey />} />
      <Route path={"/:link"} element={<VotingPage />} />
    </Routes>
  );
};

export default Routing;
