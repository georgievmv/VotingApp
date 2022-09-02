import {
  FormEvent,
  useState,
  useContext,
  ChangeEvent,
  useRef,
  ReactHTML,
  useEffect,
} from "react";
import { Button, Card } from "react-bootstrap";
import styles from "./CreateSurvey.module.css";
import { Options } from "../models/OptionsType";
import { useNavigate } from "react-router-dom";
import { OptionsContext } from "../store/option-context";
import { db } from "../firebase";
import { setDoc, doc } from "firebase/firestore";

const CreateSurvey: React.FC = () => {
  const [isInitial, setIsinitial] = useState<boolean>(true);
  const ctx = useContext(OptionsContext);
  const questionInputRef = useRef<HTMLInputElement>(null);
  const [optionsArray, setOptionsArray] = useState<Options[]>([]);
  const [optionsCount, setOptionsCount] = useState<number[]>([1]);
  const navigate = useNavigate();

  const formSubmitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    const enteredQuestion = questionInputRef?.current?.value || "";
    ctx.setQuestionHandler(enteredQuestion);
    ctx.setOptionsArray(optionsArray);
    ctx.setQuestionLink((Math.random() + 1).toString(36).substring(2));
  };

  useEffect(() => {
    if (isInitial) {
      setIsinitial(false);
      return;
    }
    {
      setDoc(doc(db, "links", ctx.questionLink), {
        question: ctx.question,
        options: ctx.optionsArray,
      });
      console.log(ctx.questionLink);
      navigate(`/${ctx.questionLink}`);
    }
  }, [ctx.questionLink]);

  const optionChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const objToBeAdded = {
      id: event.target.id,
      text: event.target.value,
      votes: 0,
    };
    const idIsPresent = optionsArray.find(
      (elem) => elem.id === objToBeAdded.id
    );
    if (!idIsPresent) {
      setOptionsArray((prevState) => {
        const newState = [...prevState, objToBeAdded];
        return newState;
      });
    } else if (idIsPresent) {
      setOptionsArray((prevState) => {
        const index = prevState.indexOf(idIsPresent);
        prevState.splice(index, 1, objToBeAdded);
        return prevState;
      });
    }
  };

  const addOptionHandler = () => {
    setOptionsCount((prevState) => {
      return prevState.concat(prevState.length + 1);
    });
  };
  return (
    <div className={styles.container}>
      <Card className="p-3">
        <form onSubmit={formSubmitHandler}>
          <div className={styles.formGroup}>
            <label>Enter your question here</label>
            <input ref={questionInputRef} type="text" />
          </div>
          {optionsCount.map((elem) => {
            return (
              <div key={elem.toString()} className={styles.formGroup}>
                <label>Enter options here</label>
                <input
                  onChange={optionChangeHandler}
                  id={elem.toString()}
                  type="text"
                />
              </div>
            );
          })}
          <div>
            <Button onClick={addOptionHandler} className={styles.button}>
              ADD OPTION
            </Button>
            <Button type="submit" className={styles.button}>
              SUBMIT
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default CreateSurvey;
