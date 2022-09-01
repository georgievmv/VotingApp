import styles from "./VotingPage.module.css";
import { Button, Card, Form, Container, FormGroup } from "react-bootstrap";
import { ChangeEvent, FormEvent, useState, useContext } from "react";
import { OptionsContext } from "../store/option-context";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../firebase";

const VotingPage = () => {
  const { link } = useParams();
  const ctx = useContext(OptionsContext);
  const [inputId, setInputId] = useState<string>("");
  const changeHandler = (event: ChangeEvent) => {
    setInputId(event.target.id);
  };
  ///////////////////
  useEffect(() => {
    const getData = async () => {
      if (link) {
        try {
          let linkRef = doc(db, "links", link);
          const data = await getDoc(linkRef);
          console.log(data?.data()?.options);
        } catch (e) {
          console.log(e);
        }
      }
    };
    getData();
  });
  ///////////////////////////////
  const formSubmitHandler = (event: FormEvent) => {
    event.preventDefault();
    console.log(ctx.optionsArray.filter((elem) => elem.id === inputId));
  };
  return (
    <Container className={styles.container}>
      <Card className="w-50">
        <Card.Header>{ctx.question}</Card.Header>
        <Card.Body>
          <Form onSubmit={formSubmitHandler}>
            {ctx.optionsArray.map((option) => {
              return (
                <Form.Group key={option.id}>
                  <Form.Label>{option.text}</Form.Label>
                  <Form.Check
                    onChange={changeHandler}
                    id={option.id}
                    type="checkbox"
                  ></Form.Check>
                </Form.Group>
              );
            })}
            <Button type="submit" className={"mt-2"}>
              SUBMIT ANSWEAR
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default VotingPage;
