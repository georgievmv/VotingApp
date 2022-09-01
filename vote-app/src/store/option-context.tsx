import React from "react";
import { useState } from "react";
import { Options } from "../models/OptionsType";

type OptionsContextObj = {
  setQuestionLink: (arg: string) => void;
  questionLink: string;
  setQuestionHandler: (arg: string) => void;
  question: string;
  optionsArray: Options[];
  submitOptionsHandler: (arg: Options[]) => void;
};

export const OptionsContext = React.createContext<OptionsContextObj>({
  setQuestionLink: (arg: string) => {},
  questionLink: "",
  setQuestionHandler: (arg: string) => {},
  question: "",
  optionsArray: [],
  submitOptionsHandler: (arg: Options[]) => {},
});

const OptionsContextProvider: React.FC<{ children: React.ReactNode }> = (
  props
) => {
  const [questionLink, setQuestionLink] = useState<string>("");
  const [question, setQuestion] = useState<string>("");
  const [optionsArray, setOptionsArray] = useState<Options[]>([
    { text: "", id: "", votes: 0 },
  ]);

  const submitOptionsHandler = (arg: Options[]) => {
    setOptionsArray(arg);
  };
  const setQuestionHandler = (arg: string) => {
    setQuestion(arg);
  };
  const contextValue = {
    setQuestionLink,
    questionLink,
    setQuestionHandler,
    question,
    optionsArray,
    submitOptionsHandler,
  };

  return (
    <OptionsContext.Provider value={contextValue}>
      {props.children}
    </OptionsContext.Provider>
  );
};
export default OptionsContextProvider;
