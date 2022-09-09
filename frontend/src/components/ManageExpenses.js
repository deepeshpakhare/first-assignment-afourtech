import React from 'react'
import { useState } from 'react'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import {} from "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css"
import CreateCategoryForm from './CreateCategoryForm';

export default function ManageExpenses(props) {
  const [category, setCategory] = useState("");
  const [date, setDate] = useState(new Date());
  const [categories, setCategories] = useState([]);

  function handleChangeCategory(e) {
    setCategory(e.target.value);
  }

  function handleDateChange(e) {
    let parsedDate = e.getDay
    setDate(e);
  }
  const sessionInfo = JSON.parse(window.localStorage.getItem("session"))
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

  window.fetch("http://localhost:8080/myCategories",requestOptions).then(
    (response) => response.json()
  ).then(
    console.log
  )

  return (
    <div className='container'>
      <div className="row">
        <div className="col">
          <CreateCategoryForm></CreateCategoryForm>
        </div>
        <div className="col">
         {/* <AddExpenseForm categories={categories}></AddExpenseForm>*/}
         <h2>Add expense</h2>
        </div>
      </div>
    </div>
  )  
  return (
    <div id="manageExpensesDiv">
      <br />
      <form method="post">
        <table id="manage-expenses">
          <tr>
            <td><u>Step 1]: Create Categories</u></td>
          </tr>
          <br />
          <tr>
            <td>
              <input type="text" id="category" value={category} onChange={handleChangeCategory} placeholder='enter category' />
            </td>
            <td>
              <button type="submit">Create Category</button>{category}
            </td>
          </tr>
        </table>
        <table id="manage-expenses">
          <br />
          <tr>
            <td><u>Step 2]: Select date to add expenses </u></td>
          </tr>
          <br />
          <tr>
            <td>
              <Calendar value={date} onChange={handleDateChange} maxDate={new Date()}></Calendar>
            </td>
          </tr>
          <br />
          <tr>
            <td><u>Step 3]: Add expenses for date : </u></td>
            <td>{date.toDateString()}</td>
          </tr>
        </table>
        <table id="manage-expenses">
          <tr>
            <td>
              Select Category:
            </td>
            <td>
              <select name="categories" id="categories-id">
                {props.categories.map((category)=> (<option value={category._id}>{category.category_name}</option>))}
              </select>
            </td>
            <td>
              Expense:
            </td>
            <td>
              <input type="text" />
            </td>
            <td>
              <button type='submit'>Add expense</button>
            </td>
          </tr>
        </table>
      </form>
    </div>
  )
}
