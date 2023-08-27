import { FormEvent, useState, useContext, ChangeEvent, useRef, ReactHTML, useEffect } from 'react';
import Button from '../UI/Button';
import styles from './CreateSurvey.module.css';
import { Options } from '../models/OptionsType';
import { useNavigate } from 'react-router-dom';
import { OptionsContext } from '../store/option-context';
import { db } from '../firebase';
import { setDoc, doc } from 'firebase/firestore';
import { useSearchParams } from 'react-router-dom';

const CreateSurvey: React.FC = () => {
  const [isInitial, setIsinitial] = useState<boolean>(true);
  const ctx = useContext(OptionsContext);
  const questionInputRef = useRef<HTMLInputElement>(null);
  const [optionsArray, setOptionsArray] = useState<Options[]>([]);
  const [optionsCount, setOptionsCount] = useState<number[]>([1]);
  const [isInputQuestionInvalid, setIsInputQuestionInvalid] = useState<boolean>(false);
  const [isInputOptionInvalid, setIsInputOptionInvalid] = useState<boolean>(false);
  const navigate = useNavigate();

  const formSubmitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    const enteredQuestion = questionInputRef?.current?.value || '';
    if (enteredQuestion.length < 2) {
      setIsInputQuestionInvalid(true);
      return;
    }
    let questionValidator = true;
    if (optionsArray.find((elem) => elem.text.length < 1)) questionValidator = false;
    if (!questionValidator) {
      setIsInputOptionInvalid(true);
      console.log('yes');
      return;
    }

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
      setDoc(doc(db, 'links', ctx.questionLink), {
        question: ctx.question,
        options: ctx.optionsArray,
      });

      navigate(`/${ctx.questionLink}`);
    }
  }, [ctx.questionLink]);

  const optionChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsInputOptionInvalid(false);

    const objToBeAdded = {
      id: event.target.id,
      text: event.target.value,
      votes: 0,
    };
    const idIsPresent = optionsArray.find((elem) => elem.id === objToBeAdded.id);
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

  const questionChangeHandler = () => {
    setIsInputQuestionInvalid(false);
  };

  const addOptionHandler = () => {
    setOptionsCount((prevState) => {
      return prevState.concat(prevState.length + 1);
    });
  };
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <form className={styles.form} onSubmit={formSubmitHandler}>
          <div className={styles.formGroup}>
            <label>
              {!isInputQuestionInvalid
                ? 'Enter your question here'
                : 'Please enter a valid question'}
            </label>
            <input
              onChange={questionChangeHandler}
              className={styles.input}
              ref={questionInputRef}
              type="text"
            />
          </div>
          {optionsCount.map((elem) => {
            return (
              <div key={elem.toString()} className={styles.formGroup}>
                <label>
                  {' '}
                  {!isInputOptionInvalid ? 'Enter options here' : 'Please enter a valid option'}
                </label>
                <input
                  className={styles.input}
                  onChange={optionChangeHandler}
                  id={elem.toString()}
                  type="text"
                />
              </div>
            );
          })}
          <div className={styles.btnContainer}>
            <Button type="button" onClick={addOptionHandler} className={styles.button}>
              ADD OPTION
            </Button>
            <Button type="submit" className={styles.button}>
              SUBMIT
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateSurvey;
