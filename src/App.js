import React from 'react';
import { HashRouter as Router } from "react-router-dom";
import {PrivateRoute, RedirectLoggedIn} from "./Components/AuthRouter";

import Login from './Components/Login';
import Questions from './Components/Questions';
import AddQuestion from './Components/Questions/AddQuestion';
import Answer from './Components/Answers/Answer';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <div className="App">
      {/* Github pages does not work too well with Browser router. That why I'm using HashRouter */}
      <Router basename="/react-quiz-app">
        <RedirectLoggedIn exact path="/login" component={Login}/>
        <PrivateRoute exact path="/" component={Questions}/>
        <PrivateRoute exact path="/add-question" component={AddQuestion}/>
        <PrivateRoute exact path="/answer" component={Answer}/>
      </Router>
    </div>
  );
}

export default App;
