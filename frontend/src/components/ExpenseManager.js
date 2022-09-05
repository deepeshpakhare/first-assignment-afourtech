import React from 'react'
import {Redirect} from  "react-router-dom"
import {BrowserRouter, Switch, Route} from "react-router-dom"
import ManageExpenses from './ManageExpenses';
import Naviagtionbar from "./Navbar"
import Summary from './Summary';




class ExpenseManager extends React.Component {
    render() {
        return (   
            <>
                <BrowserRouter>
                    <div>
                        <Naviagtionbar />
                    </div>
                    <div>
                            <Switch>
                                <Route path="/ManageExpenses">
                                    <ManageExpenses />
                                </Route>
                                <Route path="/summary">
                                    <Summary />
                                </Route>
                            </Switch>
                    </div>
                </BrowserRouter>
            </>
        );
      }
}

export default ExpenseManager;