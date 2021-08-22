import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import Constants from "../../Lib/Constants";
import NavBar from "../Common/NavBar";
import NotPermit from "../Common/NotPermit";

const AnswersItem = () => {
  const userRole = JSON.parse(localStorage.getItem(Constants.USER_ROLE));
  const userAnswers = localStorage.getItem(Constants.USER_ANSWER);
  let questionList = localStorage.getItem(Constants.QUESTION_LIST);

  const [questions, setQuestions] = useState([]);

  const [answers, setAnswer] = useState([]);

  useEffect(async () => {
    if (questionList) {
      setQuestions(JSON.parse(questionList));
    }
    if (userAnswers) {
      setAnswer(JSON.parse(userAnswers));
    }
  }, []);

  return (
    <Container className="justify-content-left">
      <NavBar />
      <Row>
        {userRole.userType === Constants.USERS[0].userType ? (
          <Col>
            {questions.length > 0 && answers.length > 0 ? (
              <form>
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
                        </div>
                        {item.options.map((option, i) => {
                          return (
                            <div key={i} className="question-option">
                              <input
                                type="radio"
                                id={item.questionText}
                                name={item.questionText}
                                value={`${option.text}`}
                                disabled
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
              </form>
            ) : (
              <h4 className="text-center mt-4">No answers found.</h4>
            )}
          </Col>
        ) : (
          <NotPermit />
        )}
      </Row>
    </Container>
  );
};

export default AnswersItem;
