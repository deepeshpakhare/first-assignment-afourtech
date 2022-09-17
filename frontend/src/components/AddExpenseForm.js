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
    const [totalExpense, setTotalExpense] = useState(0);
    var [startDate, setStartDate] = useState(null);
    var [endDate, setEndDate] = useState(null);
    var start_date = null;
    var end_date = null;

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
        console.log(sum);
        console.log(responseJson);
        setTotalExpense(sum);
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
        end_date = new Date (new Date(e).setDate(new Date(e).getDate() - (new Date(e).getDate() - 1)));
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
        if (val == NaN) {
            alert("Please enter a valid amount");
        } else {
            setExpense(parseInt(e.target.value));
        }
    }

    function setSelectedCategory(e) {
        setCategoryId(e.target.value);
        console.log("categoryid is " + categoryId)
        //console.log("initilay budget state is " + budget.value)
    }

    const getExpenses = () => {
        //var endDate = new Date(month)
        //endDate.setDate(endDate.getDate() + 30);
        console.log("get expenses is called");
        console.log(startDate,endDate);
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

        fetch("http://localhost:8080/getSummary", requestOptions)
            .then(response => response.json())
            .then(result =>
                showExpense(categoryId, result)
            )
            .catch(error => console.log('error', error));
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


    async function handleAddExpense(e) {
        //alert("Expense Added")
        var budget = null;
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
                .then(result => console.log(result))
                .catch(error => console.log('error', error));

            //getexpenses called
            getExpenses();
            //console.log(budget)
            if ((totalExpense >= budget.amount)||(expense>budget.amount)) {
                alert("Your total expense have exceeded budget");
            }
        } catch (ex) {
            alert("Please set the monthly budget first");
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
                <select onClick={setSelectedCategory} onLoad={setSelectedCategory} onChange={setSelectedCategory} className="form-select" aria-label="Default select example" style={{ height: '80%', width: 530 }} >
                    <option>Select a category</option>
                    {props.categories ? props.categories.map((category) => <option value={category._id} key={category.category_name}>{category.category_name}</option>) : null}
                </select>
            </div>
            <div className="row mt-5">
                <div className="form-floating mb-3">
                    <input className="form-control" type="text" id="expenseAmount" onChange={handleChangeExpense} placeholder='enter category' style={{ height: '80%', width: 530 }} />
                    <label for="expenseAmount">Expense:</label>
                </div>
            </div>
            <div className="row mt-2">
                <button id="addExpense" type="button" class="btn btn-success" style={{ height: 70, width: 530 }} onClick={handleAddExpense}>Add Expense</button>
            </div>
            <div className="col mt-4">
                <span class="badge text-bg-warning"><h3>Rs: &nbsp;{totalExpense}</h3></span>
            </div>
        </div>
    )
}
