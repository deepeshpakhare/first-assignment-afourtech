import React, { useState } from 'react'
import Calendar from "react-calendar"
import 'react-calendar/dist/Calendar.css';


export default function AddExpenseForm(props) {
const [date,setDate] = useState(new Date());
const [expense,setExpense] = useState(0);
function changeDate(e) {
    setDate(e);
    alert(e.toDateString())
}
function handleChangeExpense(e) {
    var val = parseInt(e.target.value);
    if(val == NaN) {
        alert("Please enter a valid amount");
    } else{
        setExpense(parseInt(e.target.value));
    }
}
    console.log(props);
  return (
    <div className='container'>
        <div className="row">
            <div className="col">
                Select Date:<Calendar maxDate={new Date()} onChange={changeDate} /> 
            </div>
        </div>
        <div className="row">
            <select className="form-select" aria-label="Default select example" style={{width:"66%"}}>
                <option selected>Select a category</option>
                {props.categories ? props.categories.map((category)=><option value={category._id} key={category.category_name}>{category.category_name}</option>) : null}
            </select>

        </div>
        <div className="row">
            <div className="form-floating mb-3">
                    <input className="form-control" type="text" id="expenseAmount"  onChange={handleChangeExpense} placeholder='enter category' />
                        <label for="expenseAmount">Expense:</label>
            </div>
        </div>
        <div className="row">    
            <div className="col">
                <button type="button" class="btn btn-success" style={{height:'80%',width:'40%'}}>Add Expense</button>
            </div>
        </div>
    </div>
  )
}
