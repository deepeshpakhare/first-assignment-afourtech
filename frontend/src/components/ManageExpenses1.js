import React from 'react'
import { useState } from 'react'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export default function ManageExpenses1() {
    const [category,setCategory] = useState("");
    const [date,setDate] = useState(new Date());

    function handleChangeCategory(e) {
        setCategory(e.target.value);
    } 

    function handleDateChange(e) {
        let parsedDate = e.getDay
        setDate(e);
    }

  return (
    <div  id="manageExpensesDiv">
    <br />
      <form method="post">
        <table  id="manage-expenses">
          <tr>
            <td><u>Step 1]: Create Categories</u></td>
          </tr>
          <br />
          <tr>
            <td>
               <input type="text"  id="category"  value={category} onChange={handleChangeCategory} placeholder='enter category'/>
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
                    <select name="categories" id="categories-id"></select>
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
