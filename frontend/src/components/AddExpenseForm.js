import { parseISO } from 'date-fns';
import React, { useState } from 'react'
import { useEffect } from 'react';
import Calendar from "react-calendar"
import 'react-calendar/dist/Calendar.css';
import ReactDatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
const moment = require("moment")



export default function AddExpenseForm(props) {
    const [date, setDate] = useState(new Date());
    const [expense, setExpense] = useState(0);
    const [categoryId, setCategoryId] = useState(null);
    const [totalExpense, setTotalExpense] = useState(null);
    var [startDate, setStartDate] = useState(null);
    var [endDate, setEndDate] = useState(null);
    var start_date = null;
    var end_date = null;
    //var notificationCount;
    var budget;
    var totalExpenseSum = 0;
    useEffect(
        () => {
            //notificationCount = 0;
            budget = null;
            //totalExpense = 0;
            //setTotalExpense();

        }
    )

    const sessionInfo = JSON.parse(window.localStorage.getItem("session"));

    function showExpense(category_id, responseJson) {
        var sum = 0;
        //const parsedJason = JSON.parse(responseJson);
        for (var expenseObject of responseJson.data.expensesInDateRange) {
            if (expenseObject.category_id == category_id) {
                //console.log("yes");
                sum = sum + expenseObject.amount;
            }
        }
        console.log("sum is" + sum);
        console.log(responseJson);
        setTotalExpense(sum);
        totalExpenseSum = sum;
        //setExpenseList(responseJson.data.expensesInDateRange);
    }



    function changeDate(e) {
        setDate(e);
        //console.log(e)
        start_date = new Date(e);
        var current_month = start_date.getMonth() + 1;
        var current_year = start_date.getFullYear();
        //console.log(current_year);
        start_date.setDate(start_date.getDate() - (start_date.getDate() - 1));
        setStartDate(start_date);
        end_date = new Date(new Date(e).setDate(new Date(e).getDate() - (new Date(e).getDate() - 1)));
        if ((current_month === 1) || (current_month === 3) || (current_month === 5) || (current_month === 7)
            || (current_month === 8) || (current_month === 10) || (current_month === 12)) {
            end_date.setDate(end_date.getDate() + 30);
        } else {
            if ((current_year % 4 == 0) && (current_month == 2)) {
                end_date.setDate(end_date.getDate() + 28);
            }
            if ((current_month == 2)) {
                end_date.setDate(end_date.getDate() + 27);
            }
            end_date.setDate(end_date.getDate() + 29);
        }

        //end_date.setDate(end_date.getDate()+30);
        console.log("start_date" + start_date);
        console.log("end_date" + end_date);
        //var temp = new Date(e);
        //setSendingDate(temp.getFullYear()+"-"+temp.getMonth()+"-"+temp.getDay());
        //alert(new Date(e).toISOString());

        setEndDate(end_date);
    }
    function handleChangeExpense(e) {
        var val = parseInt(e.target.value);
        if (isNaN(val) || (val == " ")) {
            alert("Please enter a number");
            document.getElementById("expenseAmount").value = "";
        } else {
            setExpense(parseInt(e.target.value));
        }
    }

    function setSelectedCategory(e) {
        setCategoryId(e.target.value);
        console.log("categoryid is " + categoryId)
        //console.log("initilay budget state is " + budget.value)
    }

    const getExpenses = async () => {
        //var endDate = new Date(month)
        //endDate.setDate(endDate.getDate() + 30);
        console.log("get expenses is called");
        console.log(startDate, endDate);
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Cookie", "connect.sid=s%3A6a4e7574-baae-4958-bf1c-dd03da07e908.SCmqi6wmaBaw34xhTddajrvQco0Mzl4%2FRTbCNmNi7Vk");

        var raw = JSON.stringify({
            "session_id": sessionInfo._id,
            "start_date": startDate,
            //"start_date": "1-September-2022",
            "end_date": endDate
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        var response = await fetch("http://localhost:8080/getSummary", requestOptions);
        var result = await response.json()
        showExpense(categoryId, result)

    }

    async function getBudget() {

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Cookie", "connect.sid=s%3Af52647f8-0374-4add-a9f4-1247d3d3bffb.11Mnjp0%2Bn%2BuScB6AFwVeZA592tAwMH0EzQWJRasP09A");

        var raw = JSON.stringify({
            "session_id": sessionInfo._id,
            "category_id": categoryId,
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        var response = await fetch("http://localhost:8080/getBudget", requestOptions);
        var result = await response.json();
        if (result.meta.code != 0) {
            throw result.meta.message;
        }
        console.log("result is " + result.data.budget.amount);
        return result.data.budget;
    }

    async function createNotification() {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Cookie", "connect.sid=s%3A80dace41-48b4-47d8-a444-f8febddbfd90.1vgh6QFP%2FtUfsEdt%2B%2F91KgBJjKFVnMm6vghCiOGLmP8");

        var raw = JSON.stringify({
            "session_id": sessionInfo._id,
            "category_id": categoryId,
            "budget_id": budget._id,
            "date_of_creation": new Date(),
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        var response = await fetch("http://localhost:8080/createNotification", requestOptions);
        var result = await response.json();
        console.log(result);
        if (result.meta.code != 0) {
            throw result.meta.message;
        }

    }

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

    function isEnteredExpenseValueValid(expenseVal) {
        if (expenseVal == "") {
            return false;
        }
        return true;
    }
    async function handleAddExpense(e) {
        //alert("Expense Added")
        if (isEnteredExpenseValueValid(expense)) {
            try {
                budget = await getBudget()
                console.log("budget is " + budget.amount);
                var myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/json");
                myHeaders.append("Cookie", "connect.sid=s%3A68ad74f3-1a26-43ba-8bb1-449d70f49133.PTNrJWHaTgOOyT%2BE6CM5NLVbN6sipYgpJ6WYx7RrdTg");

                var raw = JSON.stringify({
                    "session_id": sessionInfo._id,
                    "category_id": categoryId,
                    "amount": expense,
                    "date_of_expense": date,
                });

                var requestOptions = {
                    method: 'POST',
                    headers: myHeaders,
                    body: raw,
                    redirect: 'follow'
                };

                fetch("http://localhost:8080/addExpense", requestOptions)
                    .then(response => response.json())
                    .then((result) => {
                        console.log(result);
                        alert("Expense has been successfully added");
                        document.getElementById("expenseAmount").value = "";
                    })
                    .catch(error => console.log('error', error));

                //getexpenses called
                await getExpenses();
                console.log("total expense is" + totalExpenseSum)
                if ((totalExpenseSum > budget.amount) || (expense > budget.amount)) {

                    alert("Your total expense have exceeded budget");
                    createNotification();
                    var notifications = await getAllNotifications();
                    var notificationCount = getNotificationCount(notifications);
                    console.log("notification count is " + notificationCount);
                    window.location.reload();
                    //notificationCount = notificationCount + 1;
                    console.log("notification count is " + notificationCount)
                    window.localStorage.setItem("notificationCount", notificationCount);
                }

            } catch (ex) {
                alert("Please set the monthly budget first");
            }
        }else{
            alert("The entered value is not a valid amount");
        }

    }

    return (

        <div className='container-lg'>
            <div className="row">
                <div className="col">
                    Select Date:<ReactDatePicker withPortal dateFormat={"dd/MM/yyyy"} className="form-select" selected={date} maxDate={new Date()} style={{ height: '80%', width: 40 }} onChange={changeDate} />
                </div>
            </div>

            <div className="row mt-5 ml-3">
                <div className="col">
                    <select onClick={setSelectedCategory} onLoad={setSelectedCategory} onChange={setSelectedCategory} className="form-select" aria-label="Default select example" style={{ height: '90', width: 525 }} >
                        <option>Select a category</option>
                        {props.categories ? props.categories.map((category) => <option value={category._id} key={category.category_name}>{category.category_name}</option>) : null}
                    </select>
                </div>

            </div>
            <div className="row mt-5">
                <div className="form-floating mb-3">
                    <input className="form-control" type="text" id="expenseAmount" onChange={handleChangeExpense} placeholder='enter category' style={{ height: '80%', width: 525 }} />
                    <label for="expenseAmount">Expense:</label>
                </div>
            </div>
            <div className="row mt-2">
                <div className="col">
                    <button id="addExpense" type="button" class="btn btn-success" style={{ height: 70, width: 530 }} onClick={handleAddExpense}>Add Expense</button>

                </div>
            </div>
        </div>
    )
}
