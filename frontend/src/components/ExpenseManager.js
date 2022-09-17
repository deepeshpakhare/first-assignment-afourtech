import React, { useEffect } from 'react'
import { Redirect } from "react-router-dom"
import { BrowserRouter, Switch, Route } from "react-router-dom"
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
import Notifications from './Notifications';

export default function ExpenseManager() {
    const user = React.useContext(authContext);
    console.log("user is in expense manager " + user);
    console.log(authContext);
    const notificationCount = React.useContext(notificatoinContext);
    console.log("notification cout" + notificationCount);
    var flag = false;

   

    useEffect(
        () => {
            setNotificationCount();
        },
    )

    if (user == null) {
        return (
            <PleaseLogin></PleaseLogin>
        )
    }


    const sessionInfo = JSON.parse(window.localStorage.getItem("session"));


    async function getAllNotifications() {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Cookie", "connect.sid=s%3A80dace41-48b4-47d8-a444-f8febddbfd90.1vgh6QFP%2FtUfsEdt%2B%2F91KgBJjKFVnMm6vghCiOGLmP8");

        var raw = JSON.stringify({
            "session_id": sessionInfo._id,
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        var response = await fetch("http://localhost:8080/myNotifications", requestOptions);
        var result = await response.json()
        console.log("all notifications are " + result.data.notifications);
        return result;
    }

    function getNotificationCount(notificationsJson) {
        var count = 0;
        for (var notification of notificationsJson.data.notifications) {
            count++;
        }
        return count;
    }

    async function setNotificationCount() {
        var notifications = await getAllNotifications();
        var notificationNumber = getNotificationCount(notifications);
        console.log("notification count is " + notificationNumber);
        //window.location.reload();
        //notificationCount = notificationCount + 1;
        console.log("notification count is " + notificationNumber)
        window.localStorage.setItem("notificationCount", notificationNumber);
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
                                <Route path="/expensemanager">
                                    <CreateCategoryForm />
                                </Route>
                                <Route path="/createcategories">
                                    <CreateCategoryForm />
                                </Route>
                                <Route path="/manageexpenses">
                                    <ManageExpenses />
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
                                <Route path="/notifications">
                                    <Notifications />
                                </Route>
                            </Switch>
                        </div>
                    </div>
                </div>
            </BrowserRouter>
        </>
    )
}