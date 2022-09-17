import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'

export default function Notifications() {

  var [data,setData] = useState([]);
  var [categoryNames,setCategoryNames] = useState([]);
  var [budgetsArray,setBudgetsArray] = useState([]);
  var [datesArray,setDatesArray] = useState([]);

  const sessionInfo = JSON.parse(window.localStorage.getItem("session"));

  useEffect(
    () => {
      handleShowNotification();
    }
  )

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
    return result.data.notifications;
  }

  async function getCategoryName(category_id) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Cookie", "connect.sid=s%3Adb8f2f2e-3680-4dd7-8b7d-cb022010cc7a.4AKLofa96yxCRAhjQJdkKKyaeOJpc0g%2FqQxJ9klQpmk");

    var raw = JSON.stringify({
      "session_id": sessionInfo._id,
      "category_id": category_id
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    var response = await fetch("http://localhost:8080/fetchCategory", requestOptions);
    var result = await response.json();
    return result.data.category.category_name;
  }

  async function getBudget(categoryId) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Cookie", "connect.sid=s%3A80dace41-48b4-47d8-a444-f8febddbfd90.1vgh6QFP%2FtUfsEdt%2B%2F91KgBJjKFVnMm6vghCiOGLmP8");

    var raw = JSON.stringify({
      "session_id": sessionInfo._id,
      "category_id": categoryId
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    var response = await fetch("http://localhost:8080/getBudget", requestOptions)
    var result = await response.json();
    return result.data.budget.amount;
  }



 async function handleShowNotification() {
    var notifications = await getAllNotifications();
    var count = 0;
    var temp = [];
    for (var notification of notifications) {
      count++;
      var categoryName = await getCategoryName(notification.category_id);
      console.log("category name "+categoryName);
      categoryNames.push(categoryName);
      var budgetAmount = await getBudget(notification.category_id);
      console.log("budget amount "+budgetAmount);
      budgetsArray.push(budgetAmount);
      var date = notification.date_of_creation;
      var tempDate = new Date(date);
      console.log("date "+date);
      datesArray.push(tempDate.toDateString());
    }
    for (var i=0; i<count; i++) {
        temp.push({
          categoryName:categoryNames[i],
          budgetAmount:budgetsArray[i],
          date:datesArray[i],
        });
    }
    setData(temp);
    console.log("length of data is "+data.length)
  }

  function getFullData(item) {
    return (<li className="list-group-item">The total expense for the category <span class="badge rounded-pill text-bg-primary">{item.categoryName}</span> has crossed the budget amount &nbsp;
    <span class="badge rounded-pill text-bg-danger"> Rs. {item.budgetAmount}</span> on the date &nbsp;
     <span class="badge rounded-pill text-bg-success">{item.date}</span></li>);
  }

  return (
    <div>
      <div className="row ">
        {/*<button onClick={handleShowNotification} style={{ width: "50%" }}>Show notifications</button>*/}
        <ul className="list-group ml-5">
        {data.map(getFullData)}
        </ul>
      </div>
    </div>
  )
}
