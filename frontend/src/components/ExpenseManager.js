import React from 'react'
import {Redirect} from  "react-router-dom"
import {BrowserRouter, Switch, Route} from "react-router-dom"
import ManageExpenses from './ManageExpenses';
import Naviagtionbar from "./Navbar"
import MonthlyExpense from './MonthlyExpense';
import CreateCategoryForm from './CreateCategoryForm';
import WeeklyExpense from './WeeklyExpense';
import AddExpenseForm from './AddExpenseForm';
import SetMonthlyBudget from './SetMonthlyBudget';


class ExpenseManager extends React.Component {
    render() {
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
        );
      }
}

export default ExpenseManager;