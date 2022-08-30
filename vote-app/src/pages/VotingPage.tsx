import styles from "./VotingPage.module.css";
import { Button, Card, Form, Container, FormGroup } from "react-bootstrap";
import { ChangeEvent, FormEvent, useState, useContext } from "react";
import { OptionsContext } from "../store/option-context";

const DUMMY_CONTENT = [
  { text: "Vaucher", id: "1" },
  { text: "Pari v plik", id: "2" },
  { text: "Seshoar", id: "3" },
];

const VotingPage = () => {
  const ctx = useContext(OptionsContext);
  const [inputId, setInputId] = useState<string>("");
  const changeHandler = (event: ChangeEvent) => {
    setInputId(event.target.id);
  };

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
