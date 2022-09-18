import React from 'react'
import { useState, useEffect } from 'react'
import ReactDatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import ExpenseTable from './ExpenseTable';
const moment = require("moment")


export default function (props) {
  const [categoryList, setCategoryList] = useState(null);
  const [categoryId, setCategory] = useState(null);
  const [expense, setExpense] = useState(0);
  const [month, setMonth] = useState(null);
  const [year, setYear] = useState(null);
  const [expenseList, setExpenseList] = useState([]);

  const monthArray = [
    { "month": "01", "val": "January" },
    { "month": "02", "val": "February" },
    { "month": "03", "val": "March" },
    { "month": "04", "val": "April" },
    { "month": "05", "val": "May" },
    { "month": "06", "val": "June" },
    { "month": "07", "val": "July" },
    { "month": "08", "val": "August" },
    { "month": "09", "val": "September" },
    { "month": "10", "val": "October" },
    { "month": "11", "val": "November" },
    { "month": "12", "val": "December" },

  ]

  const yearsFunc = () => {
    var years = [];
    for (var i = new Date().getFullYear(); ; i--) {
      if (i == 1900) {
        break;
      }
      years.push(i);
    }
    //console.log(years.length);
    return years;
  }
  const yearArray = yearsFunc();

  function setSelectedCategory(e) {
    setCategory(e.target.value);
  }

  function handleChangeMonth(e) {
    setMonth(e);
    var endDate = new Date(e)
    endDate.setDate(endDate.getDate() + 30);
    console.log(e);
  }

  function handleChangeYear(e) {
    setYear(e.target.value);
    console.log(e.target.value);
  }

  function showExpense(category_id, responseJson) {
    var sum = 0;
    var expList = [];
    //const parsedJason = JSON.parse(responseJson);
    for (var expenseObject of responseJson.data.expensesInDateRange) {
      if (expenseObject.category_id == category_id) {
        //console.log("yes");
        sum = sum + expenseObject.amount;
        expList.push(expenseObject);
      }
    }
    console.log(sum);
    console.log(responseJson);
    setExpense(sum);
    setExpenseList(expList);
  }

  //sesion info
  const sessionInfo = JSON.parse(window.localStorage.getItem("session"));


  const handleGetExpenses = () => {

    var endDate = new Date(month)
    endDate.setDate(endDate.getDate() + 30);
    console.log(endDate);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Cookie", "connect.sid=s%3A6a4e7574-baae-4958-bf1c-dd03da07e908.SCmqi6wmaBaw34xhTddajrvQco0Mzl4%2FRTbCNmNi7Vk");

    var raw = JSON.stringify({
      "session_id": sessionInfo._id,
      "start_date": month,
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

  const showCategoryList = function () {
    if (categoryList == null) {
      var payload = {
        'session_id': sessionInfo._id
      }
      var requestOptions = {
        'method': 'POST',
        'body': JSON.stringify(payload),
        headers: {
          'Content-Type': 'application/json',
        },
      };
      window.fetch("http://localhost:8080/myCategories", requestOptions).then(
        (response) => response.json()
      ).then(
        (rsp) => {
          console.log(rsp);
          setCategoryList(rsp.data.categories);
        }
      )
    }
  }
  useEffect(() => {
    showCategoryList();
    yearsFunc();
  })
  return (
    <div>
      <div className="row mt-5 ml-3">
        <div className="col">
          <label htmlFor="category-select">Select a category</label><select onLoad={setSelectedCategory} onChange={setSelectedCategory} id="category-select" className="form-select" aria-label="Default select example" style={{ height: 40, width: 230 }} >
            <option selected>Select category</option>
            {categoryList ? categoryList.map((category) => <option value={category._id} key={category.category_name}>{category.category_name}</option>) : null}
          </select>
        </div>
        {/*<div className="col">
          <label htmlFor="month-select">Select a month</label><select onLoad={handleChangeMonth} onChange={handleChangeMonth} id="month-select" className="form-select" aria-label="Default select example" style={{ height: 40, width: 230 }} >
            <option selected>Select month</option>
            {monthArray.map((month) => <option value={month.month} key={month}>{month.val}</option>)}
          </select>
        </div>
        <div className="col">
          <label htmlFor="year-select">Select an year</label>{/*<select onLoad={handleChangeYear} onChange={handleChangeYear} id="year-select" className="form-select" aria-label="Default select example" style={{ height: 40, width: 230 }} >
            {/*<option selected>Select year</option>
            {yearArray.map((year) => <option value={year} key={year}>{year}</option>)}
            </select>*/}

        <div className="col mt-1"><label htmlFor="datepicker">Select date</label>
          <ReactDatePicker id="datepicker" showMonthYearPicker onChange={handleChangeMonth} dateFormat={"MM/yyyy"} selected={new Date()}></ReactDatePicker>
        </div>
        <div className="col mt-4">
          <button id="addExpense" type="button" class="btn btn-success" style={{ height: 40, width: 230 }} onClick={handleGetExpenses}>Show Monthly Expense</button>
        </div>
        <div className="col mt-4">
          <span class="badge text-bg-warning"><h3>Rs: &nbsp;{expense}</h3></span>
        </div>
      </div>
      <table className="table table-success table-striped w-50">
        <thead>
          <tr>
            <th>
              Date
            </th>
            <th>
              Amount
            </th>
          </tr>
        </thead>
        <tbody>
          {expenseList.map((expense) => (
            <tr >
              <td>{new Date(expense.date_of_expense).toDateString()}</td>
              <td className='text-end pe-5'>{expense.amount}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td  className='text-end pe-5'colspan="2">
              <span className="badge text-bg-warning">
                <h3>Total Rs: &nbsp;{expense}</h3>
              </span>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  )
}
