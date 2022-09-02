import styles from "./VotingPage.module.css";
import { Card, Form, Container, FormGroup } from "react-bootstrap";
import { ChangeEvent, FormEvent, useState, useContext } from "react";
import { OptionsContext } from "../store/option-context";
import { useParams } from "react-router-dom";
import { useEffect, useCallback } from "react";
import { getDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import Button from "../UI/Button";
const VotingPage = () => {
  const [voted, setVoted] = useState(false);
  const { link } = useParams();
  const ctx = useContext(OptionsContext);
  const [inputId, setInputId] = useState<string>("");
  const changeHandler = (event: ChangeEvent) => {
    if ((event.target as HTMLInputElement).checked) {
      setInputId(event.target.id);
    }
  };

  const alreadyVoted = localStorage.getItem("voted");

  useEffect(() => {
    if (alreadyVoted) {
      setVoted(true);
    }
  }, []);
  ///////////////////
  useEffect(() => {
    const getData = async () => {
      if (link) {
        try {
          let linkRef = doc(db, "links", link);
          const data = await getDoc(linkRef);
          ctx.setQuestionHandler(data?.data()?.question);
          ctx.setOptionsArray(data?.data()?.options);
        } catch (e) {
          console.log(e);
        }
      }
    };
    getData();
  }, []);
  ///////////////////////////////
  const submitData = async (arg: {}) => {
    if (link) {
      let linkRef = doc(db, "links", link);
      updateDoc(linkRef, arg);
    }
  };

  const formSubmitHandler = (event: FormEvent) => {
    event.preventDefault();
    ctx.setOptionsArray((prevState) => {
      const newState = [...prevState];
      const optionVotedFor = newState.filter((elem) => elem.id === inputId);
      optionVotedFor[0].votes = optionVotedFor[0].votes + 1;
      return newState;
    });

    submitData({
      question: ctx.question,
      options: ctx.optionsArray,
    });
    setVoted(true);
    localStorage.setItem("voted", "1");
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1>{ctx.question}</h1>

        <Form onSubmit={formSubmitHandler}>
          {ctx.optionsArray.map((option) => {
            return (
              <Form.Group key={option.id}>
                <Form.Label>
                  {voted
                    ? `${option.votes} vote for ${option.text}`
                    : `${option.text}`}
                </Form.Label>
                <Form.Check
                  disabled={voted}
                  onChange={changeHandler}
                  id={option.id}
                  type="checkbox"
                ></Form.Check>
              </Form.Group>
            );
          })}
          <Button disabled={voted} type="submit" className={styles.button}>
            SUBMIT ANSWEAR
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default VotingPage;
