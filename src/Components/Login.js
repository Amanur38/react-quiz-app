import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Constants from "../Lib/Constants";

const Login = () => {
  const [allValues, setAllValues] = useState({
    userName: "",
    password: "",
    isError: false,
  });

  const onChangeFormValue = (e) => {
    setAllValues({
      ...allValues,
      [e.target.name]: e.target.value,
      isError: false,
    });
  };

  const onSubmitLoginForm = (e) => {
    if(allValues.userName !== "" && allValues.password !== "") e.preventDefault();
    const findUser = Constants.USERS.filter((user) => {
      return user.userName === allValues.userName;
    });

    if (findUser.length > 0) {
      if (findUser[0].password === allValues.password) {
        delete findUser[0].password;
        window.localStorage.setItem(
          Constants.USER_ROLE,
          JSON.stringify(findUser[0])
        );
        window.location.reload(true);
      } else {
        setAllValues({ ...allValues, isError: true });
      }
    }
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={6} className="mt-4 text-align-left">
          <Form onSubmit={onSubmitLoginForm}>
            <Form.Label className="header-text">Login</Form.Label>
            {allValues.isError ? (
              <p className="alert alert-danger">Invalid login credentials</p>
            ) : null}
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>User Name</Form.Label>
              <Form.Control
                name="userName"
                onChange={onChangeFormValue}
                type="text"
                placeholder="Enter user name"
                list="userNameList"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                name="password"
                onChange={onChangeFormValue}
                type="password"
                placeholder="Password"
                required
              />
            </Form.Group>
            <div className="d-flex justify-content-center m-4">
              <Button variant="primary" type="submit">
                Login
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
      {/* Input fields datalist for easier to select user */}
      <datalist id="userNameList">
        <option value={Constants.USERS[0].userName} />
        <option value={Constants.USERS[1].userName} />
      </datalist>
    </Container>
  );
};

export default Login;
