import React from 'react'
import {Redirect} from  "react-router-dom"
import {BrowserRouter, Switch, Route} from "react-router-dom"
import ManageExpenses from './ManageExpenses';
import Naviagtionbar from "./Navbar"
import Summary from './Summary';
import CreateCategoryForm from './CreateCategoryForm';
import AddExpenseForm from './AddExpenseForm';



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
                                <Route path="/summary">
                                    <Summary />
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