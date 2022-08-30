import React from "react";
import { useState } from "react";
import { Options } from "../models/OptionsType";

type OptionsContextObj = {
  setQuestionHandler: (arg: string) => void;
  question: string;
  optionsArray: Options[];
  submitQuestionHandler: (arg: Options[]) => void;
};

export const OptionsContext = React.createContext<OptionsContextObj>({
  setQuestionHandler: (arg: string) => {},
  question: "",
  optionsArray: [],
  submitQuestionHandler: (arg: Options[]) => {},
});

const OptionsContextProvider: React.FC<{ children: React.ReactNode }> = (
  props
) => {
  const [question, setQuestion] = useState<string>("");
  const [optionsArray, setOptionsArray] = useState<Options[]>([
    { text: "", id: "" },
  ]);

  const submitQuestionHandler = (arg: Options[]) => {
    setOptionsArray(arg);
  };
  const setQuestionHandler = (arg: string) => {
    setQuestion(arg);
  };
  const contextValue = {
    setQuestionHandler,
    question,
    optionsArray,
    submitQuestionHandler,
  };

  return (
    <OptionsContext.Provider value={contextValue}>
      {props.children}
    </OptionsContext.Provider>
  );
};
export default OptionsContextProvider;
