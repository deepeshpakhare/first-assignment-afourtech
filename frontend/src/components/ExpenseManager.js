import React from 'react'
import {Redirect} from  "react-router-dom"
import {BrowserRouter, Switch, Route} from "react-router-dom"
import ManageExpenses from './ManageExpenses';
import Naviagtionbar from "./Navbar"
import Summary from './Summary';
import ManageExpenses1 from './ManageExpenses1';



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
                                    <ManageExpenses1/>
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