import React from 'react'
import { useState, useEffect } from 'react'

export default function WeeklyExpense() {
    const [categoryList, setCategoryList] = useState(null);
    const [categoryId, setCategory] = useState(null);
    const [expense, setExpense] = useState(0);
    const [month, setMonth] = useState(null);
    const [year, setYear] = useState(null);
    const [week,setWeek] = useState(null);


    const weekArray = [1,2,3,4,5]
    const monthArray = ["January", "February", "March", "April", "May", "June", "July"
      , "August", "September", "October", "November", "December"]
  
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
      setMonth(e.target.value);
    }
  
    function handleChangeYear(e) {
      setYear(e.target.value);
      console.log(e.target.value);
    }

    function handleChangeWeek(e) {
        setWeek(e.target.value)
    }
  
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
      setExpense(sum);
    }
  
    //sesion info
    const sessionInfo = JSON.parse(window.localStorage.getItem("session"));
  
  
    const handleGetExpenses = () => {

      //console.log(month, " ", year)
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Cookie", "connect.sid=s%3A6a4e7574-baae-4958-bf1c-dd03da07e908.SCmqi6wmaBaw34xhTddajrvQco0Mzl4%2FRTbCNmNi7Vk");
      
      var startDate = {date:""};
      var endDate = {date:""};
      if (week == 1) {
        startDate.date =  "1-"+month+"-"+year;
        endDate.date =  "8-"+month+"-"+year
      }

      if (week == 2) {
        startDate.date = "8-" + month + "-" + year;
        endDate.date = "14-" + month + "-" + year
      }

      if (week == 3) {
        startDate.date = "15-" + month + "-" + year;
        endDate.date = "22-" + month + "-" + year
      }

      if (week == 4) {
        startDate.date = "22-" + month + "-" + year;
        endDate.date = "29-" + month + "-" + year
      }

      if (week == 5) {
        startDate.date = "29-" + month + "-" + year;
        endDate.date = "31-" + month+"-"+year
      }

      var raw = JSON.stringify({
        "session_id": sessionInfo._id,
        "start_date": startDate.date,
        "end_date": endDate.date,
        //"start_date": "1-September-2022",
        // "end_date": "31-September-2022"
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
          <div className="col">
            <label htmlFor="week-select">Select a week</label><select onLoad={handleChangeWeek} onChange={handleChangeWeek} id="week-select" className="form-select" aria-label="Default select example" style={{ height: 40, width: 230 }} >
              <option selected>Select week</option>
              {weekArray.map((week) => <option value={week} key={week}>Week&nbsp;{week}</option>)}
            </select>
          </div>
          <div className="col">
            <label htmlFor="month-select">Select a month</label><select onLoad={handleChangeMonth} onChange={handleChangeMonth} id="month-select" className="form-select" aria-label="Default select example" style={{ height: 40, width: 230 }} >
              <option selected>Select month</option>
              {monthArray.map((month) => <option value={month} key={month}>{month}</option>)}
            </select>
          </div>
          <div className="col">
            <label htmlFor="year-select">Select an year</label><select onLoad={handleChangeYear} onChange={handleChangeYear} id="year-select" className="form-select" aria-label="Default select example" style={{ height: 40, width: 230 }} >
              <option selected>Select year</option>
              {yearArray.map((year) => <option value={year} key={year}>{year}</option>)}
            </select>
          </div>
          <div className="col mt-4">
            <button id="addExpense" type="button" class="btn btn-success" style={{ height: 40, width: 230 }} onClick={handleGetExpenses}>Show Expense</button>
          </div>
          <div className="col mt-4">
            <span class="badge text-bg-warning"><h3>Rs: &nbsp;{expense}</h3></span>        
          </div>
        </div>
      </div>
    )
  }
  