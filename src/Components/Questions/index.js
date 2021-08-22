import React from "react";
import { Container } from "react-bootstrap";
import QuestionsItem from "./QuestionsItem";
import NavBar from '../Common/NavBar';

const Questions = () => {
  return (
    <Container className="justify-content-center">
      <NavBar/>
      <QuestionsItem/>
    </Container>
  );
};

export default Questions;
