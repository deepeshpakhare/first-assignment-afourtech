import React from "react";
import "./App.css"
import "bootstrap/dist/css/bootstrap.min.css";
import { } from "bootstrap";
import RegistrationForm from "./components/RegistrationForm";
//import RegistartionFucntion from "./components/RegistartionFucntion";
import LoginForm from "./components/LoginForm";
import ExpenseManager from "./components/ExpenseManager";
import CreateCategoryForm from "./components/CreateCategoryForm";
import Logout from "./components/Logout";
import Notifications from "./components/Notifications";
import { notificatoinContext } from './components/NotificationContext';


import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
const isUserLoggedInContext = React.createContext(false);

function App() {
  return (
    <notificatoinContext.Provider value={0}>
      <Router>
        <div className="App">
          <Switch>
            <Route exact path="/" component={RegistrationForm}></Route>
            <Route path="/registration" component={RegistrationForm}></Route>
            <Route path="/login" component={LoginForm}></Route>
            <Route path="/expensemanager" component={ExpenseManager}></Route>
            <Route path="/manageexpenses" component={ExpenseManager}></Route>
            <Route path="/createcategories" component={ExpenseManager}></Route>
            <Route path="/monthlybudget" component={ExpenseManager}></Route>
            <Route path="/monthlyexpense" component={ExpenseManager}></Route>
            <Route path="/weeklyexpense" component={ExpenseManager}></Route>
            <Route path="/setmonthlybudget" component={ExpenseManager}></Route>
            <Route path="/logout" component={Logout}></Route>
            <Route path="/notifications" component={ExpenseManager}></Route>
          </Switch>
        </div>
      </Router>
    </notificatoinContext.Provider>
  );
}
export default App;
