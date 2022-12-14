import React from "react";
import { useState } from "react";
import { Options } from "../models/OptionsType";

type OptionsContextObj = {
  setQuestionLink: (arg: string) => void;
  questionLink: string;
  setQuestionHandler: (arg: string) => void;
  question: string;
  optionsArray: Options[];
  setOptionsArray: (arg: Options[] | ((arg: Options[]) => Options[])) => void;
  ipList: string[];
  setIpList: (arg: (arg: string[]) => string[]) => void;
};

export const OptionsContext = React.createContext<OptionsContextObj>({
  setQuestionLink: (arg: string) => {},
  questionLink: "",
  setQuestionHandler: (arg: string) => {},
  question: "",
  optionsArray: [],
  setOptionsArray: (arg: Options[] | ((arg: Options[]) => Options[])) => {},
  ipList: [],
  setIpList: (arg) => {},
});

const OptionsContextProvider: React.FC<{ children: React.ReactNode }> = (
  props
) => {
  const [ipList, setIpList] = useState<string[]>([]);
  const [questionLink, setQuestionLink] = useState<string>("");
  const [question, setQuestion] = useState<string>("");
  const [optionsArray, setOptionsArray] = useState<Options[]>([
    { text: "", id: "", votes: 0 },
  ]);

  const setQuestionHandler = (arg: string) => {
    setQuestion(arg);
  };
  const contextValue = {
    setQuestionLink,
    questionLink,
    setQuestionHandler,
    question,
    optionsArray,
    setOptionsArray,
    ipList,
    setIpList,
  };

  return (
    <OptionsContext.Provider value={contextValue}>
      {props.children}
    </OptionsContext.Provider>
  );
};
export default OptionsContextProvider;
