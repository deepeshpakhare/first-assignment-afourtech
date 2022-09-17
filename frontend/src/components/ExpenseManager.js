import React from 'react'
import {Redirect} from  "react-router-dom"
import {BrowserRouter, Switch, Route} from "react-router-dom"
import ManageExpenses from './ManageExpenses';
import Naviagtionbar from "./Navigationbar"
import MonthlyExpense from './MonthlyExpense';
import CreateCategoryForm from './CreateCategoryForm';
import WeeklyExpense from './WeeklyExpense';
import AddExpenseForm from './AddExpenseForm';
import SetMonthlyBudget from './SetMonthlyBudget';
import Logout from './Logout';
import { authContext } from "./LoginForm";
import PleaseLogin from './PleaseLogin';
import { notificatoinContext } from './AddExpenseForm';

export default function ExpenseManager() {
    const user = React.useContext(authContext);
    console.log("user is in expense manager "+user);
    console.log(authContext);
    const notificationCount = React.useContext(notificatoinContext);
    console.log("notification count"+notificationCount);
    if(user == null) {
        return (
            <PleaseLogin></PleaseLogin>
        )
    }
  return (
    <>
    <BrowserRouter>
    <div className='container-fluid'>
        <div className='row'>
            <div className='col'>
                <Naviagtionbar />
            </div>   
        </div>
        <div className='row'>
            <div className='col'>
                <Switch>
                    <Route path ="/expensemanager">
                        <CreateCategoryForm/>
                    </Route>
                    <Route path="/createcategories">
                        <CreateCategoryForm/>
                    </Route>
                    <Route path="/manageexpenses">
                        <ManageExpenses/>
                    </Route>
                    <Route path="/monthlyexpense">
                        <MonthlyExpense />
                    </Route>
                    <Route path="/weeklyexpense">
                        <WeeklyExpense />
                    </Route>
                    <Route path="/setmonthlybudget">
                        <SetMonthlyBudget />
                    </Route>
                </Switch>
            </div>   
        </div>
    </div>   
    </BrowserRouter>
</>
  )
}