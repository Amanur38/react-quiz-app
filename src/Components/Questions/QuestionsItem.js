import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import Constants from "../../Lib/Constants";
import QuestionEditModal from "./QuestionEditModal";

const QuestionsItem = () => {
  const userRole = JSON.parse(localStorage.getItem(Constants.USER_ROLE));

  const userAnswers =
    userRole.userType === Constants.USERS[0].userType
      ? null
      : localStorage.getItem(Constants.USER_ANSWER);
  let questionList = localStorage.getItem(Constants.QUESTION_LIST);

  const Questions = [
    {
      id: 1629517146766,
      questionText: "What does HTML stand for?",
      options: [
        { text: "Hyperlinks and Text Markup Language1", isCorrect: false },
        { text: " Home Tool Markup Language", isCorrect: false },
        { text: " Hyper Text Markup Language", isCorrect: true },
      ],
    },
    {
      id: 1629517158929,
      questionText: "Who is making the Web standards?",
      options: [
        { text: "Google", isCorrect: false },
        { text: "The World Wide Web Consortium", isCorrect: true },
        { text: "Facebook", isCorrect: false },
      ],
    },
    {
      id: 1629517194817,
      questionText: "Choose the correct HTML element for the largest heading:",
      options: [
        { text: "<heading>", isCorrect: false },
        { text: "<h5>", isCorrect: false },
        { text: "<h1>", isCorrect: true },
      ],
    },
  ];

  const [questions, setQuestions] = useState([]);

  const [answers, setAnswer] = useState([]);
  const [scores, setScores] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editData, setEditData] = useState();

  useEffect(async () => {
    if (!questionList) {
      window.localStorage.setItem(
        Constants.QUESTION_LIST,
        JSON.stringify(Questions)
      );
      setQuestions(Questions);
    } else {
      setQuestions(JSON.parse(questionList));
    }
    if (userAnswers) {
      setAnswer(JSON.parse(userAnswers));
    }
  }, []);

  const selectAnswer = async (id, selectAnswer) => {
    let answerObject = {
      id: id,
      answer: selectAnswer,
    };

    for (var i = 0; i < answers.length; i++) {
      if (answers[i].id === id) {
        answers.splice(i, 1);
      }
    }
    if (selectAnswer.isCorrect) {
      setScores(scores + 1);
    }
    setAnswer((prevAnswer) => [...prevAnswer, answerObject]);
  };

  const submitAnswer = (e) => {
    e.preventDefault();

    questions.filter((question) => {
      // filter out (!) items in answers
      return !answers.some((answer) => {
        return question.id === answer.id;
      });
    });

    let correctAnswers = 0;

    for (var ans of answers) {
      if (ans.answer.isCorrect) correctAnswers += 1;
    }
    setScores(correctAnswers);
    setShowScore(true);

    localStorage.setItem(Constants.USER_ANSWER, JSON.stringify(answers));
    localStorage.setItem(Constants.USER_SCORE, scores);
  };

  const editQuestion = (payload) => {
    setEditData(payload);
    setShowEditModal(true);
  };

  const deleteQuestion = (id) => {
    for (var i = 0; i < questions.length; i++) {
      if (questions[i].id === id) {
        if (!alert("Are you sure that you want to delete this question?")) {
          questions.splice(i, 1);
          localStorage.setItem(
            Constants.QUESTION_LIST,
            JSON.stringify(questions)
          );
          window.location.reload(true);
        }
      }
    }
  };

  const modalOpenClose = (e) => {
    setShowEditModal(!showEditModal);
  };

  return (
    <Container className="justify-content-left">
      <Row>
        {!showScore ? (
          <Col>
            {questions.length > 0 ? (
              <form onSubmit={submitAnswer}>
                {userRole.userType === Constants.USERS[1].userType ? (
                  <p className="text-center m-4">
                    Please choose all the questions and submit. You can see your
                    score. If you want to change your selected answer, you need
                    to select the answer and submit.
                  </p>
                ) : null}
                {questions
                  .sort((a, b) => {
                    // Sort by descending order
                    return b.id - a.id;
                  })
                  .map((item, index) => {
                    let userAnswerParsed =
                      userAnswers && JSON.parse(userAnswers);
                    let selectedAnswer = undefined;
                    if (userAnswerParsed) {
                      selectedAnswer = userAnswerParsed.find(
                        (element) => element.id === item.id
                      );
                    }
                    return (
                      <div key={index} className="card m-2 p-4">
                        <div className="d-flex justify-content-between">
                          <h2>{item.questionText}</h2>
                          {userRole.userType === Constants.USERS[0].userType ? (
                            <div className="button-wrapper">
                              <Button
                                variant="info"
                                type="button"
                                onClick={() => editQuestion(item)}
                              >
                                Edit
                              </Button>
                              <Button
                                variant="danger"
                                type="button"
                                onClick={() => deleteQuestion(item.id)}
                              >
                                Delete
                              </Button>
                            </div>
                          ) : null}
                        </div>
                        {item.options.map((option, i) => {
                          return (
                            <div key={i} className="question-option">
                              <input
                                type="radio"
                                id={item.questionText}
                                name={item.questionText}
                                value={`${option.text}`}
                                onClick={() => selectAnswer(item.id, option)}
                                required
                                defaultChecked={
                                  selectedAnswer &&
                                  option.text === selectedAnswer.answer.text
                                }
                              />{" "}
                              {option.text}
                            </div>
                          );
                        })}
                      </div>
                    );
                  })}
                <div className="d-flex justify-content-center m-4">
                  {userRole.userType === Constants.USERS[1].userType ? (
                    <Button variant="primary" type="submit">
                      Submit
                    </Button>
                  ) : null}
                </div>
              </form>
            ) : (
              <h4 className="text-center mt-4">No question found.</h4>
            )}
          </Col>
        ) : (
          <div className="d-flex justify-content-center mt-4">
            <Card className="text-center" style={{ width: "20rem" }}>
              <Card.Body>
                <Card.Title>Your Scores</Card.Title>
                <Card.Text>
                  {scores} out of {questions.length}
                </Card.Text>
                <Button
                  variant="primary"
                  type="submit"
                  onClick={() => setShowScore(false)}
                >
                  Edit answers
                </Button>
              </Card.Body>
            </Card>
          </div>
        )}
      </Row>
      {editData ? (
        <QuestionEditModal
          payload={editData}
          onClick={modalOpenClose}
          isShow={showEditModal}
        />
      ) : null}
    </Container>
  );
};

export default QuestionsItem;
