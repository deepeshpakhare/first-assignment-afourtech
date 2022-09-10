import React from 'react'
import { useState } from 'react'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { } from "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css"
import CreateCategoryForm from './CreateCategoryForm';
import AddExpenseForm from './AddExpenseForm';
import { useEffect } from 'react';

export default function ManageExpenses(props) {
  const [category, setCategory] = useState("");
  const [date, setDate] = useState(new Date());
  const [categories, setCategories] = useState(null);

  function handleChangeCategory(e) {
    setCategory(e.target.value);
  }

  function handleDateChange(e) {
    let parsedDate = e.getDay
    setDate(e);
  }
  const sessionInfo = JSON.parse(window.localStorage.getItem("session"))
  useEffect(() => {
    if (categories == null) {
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
          setCategories(rsp.data.categories);
        }
      )
    }
  });


  return (

    <div className='container mt-3'>
      <div className="row">
        {/*<div className="col-6">
          <CreateCategoryForm></CreateCategoryForm>
        </div>*/}
        <div className="col-6">
          <AddExpenseForm categories={categories}></AddExpenseForm>
        </div>
      </div>
    </div>
  );
}
