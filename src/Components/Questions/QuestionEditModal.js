import React, { useEffect, useState } from "react";
import { Modal, Row, Col, Button, Form } from "react-bootstrap";
import Constants from "../../Lib/Constants";

const EditQuestion = (props) => {
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
    optionThree: false
  });

  useEffect(() => {
    if (props.payload) {
      setQuestionWithOptions({
        question: props.payload.questionText,
        optionOne: props.payload.options[0].text,
        optionTwo: props.payload.options[1].text,
        optionThree: props.payload.options[2].text,
      });

      setCorrectAnswer({
        optionOne: props.payload.options[0].isCorrect,
        optionTwo: props.payload.options[1].isCorrect,
        optionThree: props.payload.options[2].isCorrect,
      })
    }
  }, []);

  const EditQuestion = async (e) => {
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
      console.log("🚀 ~ file: QuestionEditModal.js ~ line 62 ~ EditQuestion ~ questionList", questionList)
      let id = Date.now();
      const question = {
        id: props.payload.id,
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
      for (var i = 0; i < parsedQuestions.length; i++) {
        if (parsedQuestions[i].id === props.payload.id) {
            parsedQuestions.splice(i, 1);
        }
      }
      parsedQuestions.push(question);
        localStorage.setItem(
          Constants.QUESTION_LIST,
          JSON.stringify(parsedQuestions)
        );
        if(!alert("The question updated successfully.")) window.location.reload(true);
    }
  };

  function isValid(value) {
    return value !== "" && value !== null && value !== undefined;
  }

  return (
    <Modal
      show={props.isShow}
      onHide={props.onClick}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Edit Question</Modal.Title>
      </Modal.Header>
      <Modal.Body>
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
                  setQuestionWithOptions({ ...questionWithOptions, question: event.target.value })
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
                checked={correctAnswer.optionOne}
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
                checked={correctAnswer.optionTwo}
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
                required
                checked={correctAnswer.optionThree}
                onChange={() =>
                  setCorrectAnswer({
                    optionOne: false,
                    optionTwo: false,
                    optionThree: true,
                  })
                }
              />
            </Col>
          </Row>
          <Modal.Footer className="justify-content-center">
            <Button variant="secondary" onClick={props.onClick}>
              Cancel
            </Button>
            <Button variant="primary" onClick={EditQuestion}>
              Submit
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditQuestion;
