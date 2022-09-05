import React from "react";
import "./App.css"
import "bootstrap/dist/css/bootstrap.min.css";
import RegistrationForm from "./components/RegistrationForm";
//import RegistartionFucntion from "./components/RegistartionFucntion";
import LoginForm from "./components/LoginForm";
import ExpenseManager from "./components/ExpenseManager";

import {BrowserRouter as Router, Switch, Route} from "react-router-dom"

function App() {
    return (
      <Router>
        <div className="App">
          <Switch>
              <Route exact path="/" component={RegistrationForm}></Route>
              <Route path="/registration" component={RegistrationForm}></Route>
              <Route path="/login" component={LoginForm}></Route>
              <Route path="/expensemanager" component={ExpenseManager}></Route>
          </Switch>
        </div>
      </Router>
    );
}
export default App;
