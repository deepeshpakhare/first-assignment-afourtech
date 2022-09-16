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

    const sessionInfo = JSON.parse(window.localStorage.getItem("session"));

    function changeDate(e) {
        setDate(e);
        console.log(e)
        //var temp = new Date(e);
        //setSendingDate(temp.getFullYear()+"-"+temp.getMonth()+"-"+temp.getDay());
        //alert(new Date(e).toISOString());
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
        try {
            var budget = await getBudget()
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
        } catch (ex) {
            alert("Please set the monthly budget first");
        }

    }

    return (

        <div className='container-lg'>
            <div className="row">
                <div className="col">
                    Select Date:<ReactDatePicker dateFormat={"dd/MM/yyyy"} className="form-select" selected={date} maxDate={new Date()} style={{ height: '80%', width: 40 }} onChange={changeDate} />
                </div>
            </div>

            <div className="row mt-5 ml-3">
                <select onChange={setSelectedCategory} defaultValue="1" className="form-select" aria-label="Default select example" style={{ height: '80%', width: 530 }} >
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
        </div>
    )
}
