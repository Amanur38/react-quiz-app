import React from "react";
import AuthService from "../../Lib/AuthService";
import { Button } from "react-bootstrap";
import Constants from "../../Lib/Constants";
import { Link } from 'react-router-dom';

const NavBar = () => {
  const userRole = JSON.parse(localStorage.getItem(Constants.USER_ROLE));
  const isAdmin = userRole.userType === Constants.USERS[0].userType;

  return (
    <ul className="nav justify-content-center">
      {isAdmin ? (
        <>
          <li className="nav-item">
            <Link className="nav-link active" to="/add-question">
              Add Question
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/answer">
              Answer
            </Link>
          </li>
        </>
      ) : null}
      <li className="nav-item">
        <Link className="nav-link" to="/">
          {isAdmin ? 'Questions' : "Quiz"}
        </Link>
      </li>
      <li className="nav-item">
        <Button variant="light">Hi {userRole.userName}</Button>
      </li>
      <li className="nav-item">
        <Button variant="light" onClick={() => AuthService.doLogout()}>
          Logout
        </Button>
      </li>
    </ul>
  );
};

export default NavBar;
