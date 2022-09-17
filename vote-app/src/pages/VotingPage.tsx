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
  const [ip, setIp] = useState(undefined);
  const [voted, setVoted] = useState(false);
  const { link } = useParams();
  const ctx = useContext(OptionsContext);
  const [inputId, setInputId] = useState<string>("");

  function cbChange(obj: HTMLInputElement) {
    let cbs = document.getElementsByClassName(styles.input);
    for (var i = 0; i < cbs.length; i++) {
      (cbs[i] as HTMLInputElement).checked = false;
    }
    obj.checked = true;
  }

  const changeHandler = (event: ChangeEvent) => {
    cbChange(event.target as HTMLInputElement);
    if ((event.target as HTMLInputElement).checked) {
      setInputId(event.target.id);
    }
  };

  useEffect(() => {
    const regex = new RegExp(`^${ip}$`);
    console.log(ip);
    const checkIfAlreadyVoted = async () => {
      if (link) {
        try {
          let linkRef = doc(db, "links", link);
          const data = await getDoc(linkRef);
          const votedIpArr = data?.data()?.ip;
          if (votedIpArr) {
            ctx.setIpList((prevState) => {
              const newState = [...prevState, ...votedIpArr];
              const filteredArr = newState.filter(
                (item, index) => newState.indexOf(item) === index
              );
              return filteredArr;
            });
          }
          for (let elem in votedIpArr) {
            if (regex.test(votedIpArr[elem])) {
              console.log(votedIpArr[elem]);
              setVoted(true);
              console.log("yes");
            }
          }
        } catch (e) {
          console.log(e);
        }
      }
    };
    checkIfAlreadyVoted();
  }, [ip]);

  useEffect(() => {
    const getIp = async () => {
      const response = await fetch("https://geolocation-db.com/json/");
      const data = await response.json();
      setIp(data.IPv4);
    };

    getIp();
  }, []);
  useEffect(() => {
    if (ip) {
      ctx.setIpList((prevState) => {
        return [...prevState, ip];
      });
    }
  }, [ip]);
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
      await updateDoc(linkRef, arg);
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
      ip: ctx.ipList,
    });
    console.log("yes");
    setVoted(true);
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1>{ctx.question}</h1>

        <Form className={styles.form} onSubmit={formSubmitHandler}>
          {ctx.optionsArray.map((option) => {
            return (
              <Form.Group className={styles.inputGroup} key={option.id}>
                <input
                  name={option.id}
                  className={styles.input}
                  disabled={voted}
                  onChange={changeHandler}
                  id={option.id}
                  type="checkbox"
                />
                <span className={styles.check}></span>
                <Form.Label htmlFor={option.id} className={styles.label}>
                  {voted
                    ? `${option.votes} vote for ${option.text}`
                    : `${option.text}`}
                </Form.Label>
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
