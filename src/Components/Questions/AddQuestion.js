import React, { useState } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import Constants from "../../Lib/Constants";
import NavBar from "../Common/NavBar";
import NotPermit from "../Common/NotPermit";

const AddQuestion = () => {
  const userRole = JSON.parse(localStorage.getItem(Constants.USER_ROLE));

  const initStateQuestionWithOptions = {
    question: "",
    optionOne: "",
    optionTwo: "",
    optionThree: "",
  };

  const [questionWithOptions, setQuestionWithOptions] = useState(
    initStateQuestionWithOptions
  );

  const [correctAnswer, setCorrectAnswer] = useState({
    optionOne: false,
    optionTwo: false,
    optionThree: false,
  });

  const AddQuestion = async (e) => {
    if (
      isValid(questionWithOptions.question) &&
      isValid(questionWithOptions.optionOne) &&
      isValid(questionWithOptions.optionTwo) &&
      isValid(questionWithOptions.optionThree) &&
      (correctAnswer.optionOne ||
        correctAnswer.optionTwo ||
        correctAnswer.optionThree)
    ) {
      e.preventDefault();
      let questionList = window.localStorage.getItem(Constants.QUESTION_LIST);
      let id = Date.now();
      const question = {
        id: id,
        questionText: questionWithOptions.question,
        options: [
          {
            text: questionWithOptions.optionOne,
            isCorrect: correctAnswer.optionOne,
          },
          {
            text: questionWithOptions.optionTwo,
            isCorrect: correctAnswer.optionTwo,
          },
          {
            text: questionWithOptions.optionThree,
            isCorrect: correctAnswer.optionThree,
          },
        ],
      };
      let parsedQuestions = JSON.parse(questionList);
      parsedQuestions.push(question);
      localStorage.setItem(
        Constants.QUESTION_LIST,
        JSON.stringify(parsedQuestions)
      );
      setQuestionWithOptions(initStateQuestionWithOptions);
    }
  };

  function isValid(value) {
    return value !== "" && value !== null && value !== undefined;
  }

  return (
    <Container>
      <NavBar />
      <div className="text-center m-3, pt-4 pb-4">
        <h5>You can add a question for users by submit the below form.</h5>
      </div>
      <Row className="justify-content-center">
        {userRole.userType === Constants.USERS[0].userType ? (
          <Col md={6}>
            <Form method="post">
              <Row>
                <Col>
                  <Form.Label htmlFor="inlineFormInput">
                    Input your question
                  </Form.Label>
                  <Form.Control
                    className="mb-2"
                    id="inlineFormInput"
                    placeholder="Ex: What is react?"
                    value={questionWithOptions.question || ""}
                    required
                    onChange={(event) =>
                      setQuestionWithOptions({ question: event.target.value })
                    }
                  />
                </Col>
              </Row>
              <br></br>

              <Row className="align-items-center">
                <Col xs="auto">
                  <Form.Control
                    className="mb-2"
                    id="inlineFormInput"
                    placeholder="Option one"
                    value={questionWithOptions.optionOne || ""}
                    required
                    onChange={(event) =>
                      setQuestionWithOptions({
                        ...questionWithOptions,
                        optionOne: event.target.value,
                      })
                    }
                  />
                </Col>
                <Col xs="auto">
                  <Form.Check
                    type="radio"
                    id="autoSizingCheck"
                    className="mb-2"
                    label="Answer"
                    name="option"
                    onChange={() =>
                      setCorrectAnswer({
                        optionOne: true,
                        optionTwo: false,
                        optionThree: false,
                      })
                    }
                    required
                  />
                </Col>
              </Row>

              <Row className="align-items-center">
                <Col xs="auto">
                  <Form.Control
                    className="mb-2"
                    id="inlineFormInput"
                    placeholder="Option two"
                    value={questionWithOptions.optionTwo || ""}
                    onChange={(event) =>
                      setQuestionWithOptions({
                        ...questionWithOptions,
                        optionTwo: event.target.value,
                      })
                    }
                    required
                  />
                </Col>
                <Col xs="auto">
                  <Form.Check
                    type="radio"
                    id="autoSizingCheck"
                    className="mb-2"
                    label="Answer"
                    name="option"
                    onChange={() =>
                      setCorrectAnswer({
                        optionOne: false,
                        optionTwo: true,
                        optionThree: false,
                      })
                    }
                    required
                  />
                </Col>
              </Row>
              <Row className="align-items-center">
                <Col xs="auto">
                  <Form.Control
                    className="mb-2"
                    id="inlineFormInput"
                    placeholder="Option three"
                    value={questionWithOptions.optionThree || ""}
                    onChange={(event) =>
                      setQuestionWithOptions({
                        ...questionWithOptions,
                        optionThree: event.target.value,
                      })
                    }
                    required
                  />
                </Col>
                <Col xs="auto">
                  <Form.Check
                    type="radio"
                    id="autoSizingCheck"
                    className="mb-2"
                    label="Answer"
                    name="option"
                    onChange={() =>
                      setCorrectAnswer({
                        optionOne: false,
                        optionTwo: false,
                        optionThree: true,
                      })
                    }
                    required
                  />
                </Col>
              </Row>
              <div className="d-flex justify-content-center m-4">
                <Button onClick={AddQuestion} variant="primary" type="submit">
                  Add
                </Button>
              </div>
            </Form>
          </Col>
        ) : (
          <NotPermit />
        )}
      </Row>
    </Container>
  );
};

export default AddQuestion;
