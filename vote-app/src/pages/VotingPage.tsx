import styles from "./VotingPage.module.css";
import { Button, Card, Form, Container, FormGroup } from "react-bootstrap";
import { ChangeEvent, FormEvent, useState } from "react";

const DUMMY_CONTENT = [
  { text: "Vaucher", id: "1" },
  { text: "Pari v plik", id: "2" },
  { text: "Seshoar", id: "3" },
];

const VotingPage = () => {
  const [inputId, setInputId] = useState<string>("");
  const changeHandler = (event: ChangeEvent) => {
    setInputId(event.target.id);
  };

  const formSubmitHandler = (event: FormEvent) => {
    event.preventDefault();
    console.log(DUMMY_CONTENT.filter((elem) => elem.id === inputId));
  };
  return (
    <Container className={styles.container}>
      <Card className="w-50">
        <Card.Header>Here is the question</Card.Header>
        <Card.Body>
          <Form onSubmit={formSubmitHandler}>
            {DUMMY_CONTENT.map((option) => {
              return (
                <Form.Group key={option.id}>
                  <Form.Label>{option.text}</Form.Label>
                  <Form.Control
                    onChange={changeHandler}
                    id={option.id}
                    type="radio"
                  ></Form.Control>
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
