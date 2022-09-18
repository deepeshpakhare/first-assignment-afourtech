import React, { Component, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavbarBrand, Stack, Dropdown } from 'react-bootstrap';
import Logout from './Logout';
import { notificatoinContext, notiifcationCountNumber } from './NotificationContext';
import Notifications from './Notifications';
import { useEffect } from 'react';


export default function Navigationbar() {
  const username = window.localStorage.getItem("username");
  const menus = [
    { to: "createcategories", val: "Create Categories" },
    { to: "setmonthlybudget", val: "Set Budget" },
    { to: "manageexpenses", val: "Add Expenses" },
    { to: "monthlyexpense", val: "Monthly Expenses" },
    { to: "weeklyexpense", val: "Weekly Expenses" },

  ]
  var [data, setData] = useState(null);
  var [timerId, setTimerId] = useState(null);

  function navigateToLogout() {
    window.location.href = "http://localhost:3000/logout";
  }
  const notificationCount = React.useContext(notificatoinContext);
  console.log(notificationCount);

  const sessionInfo = JSON.parse(window.localStorage.getItem("session"));

  function fethOnce() {
    if (data == null) {
        handleShowNotification();
      }
  }

  useEffect(
    () => {
      timerId = setInterval(() => {
        data = null;
        fethOnce();
      }, 2000);
    },
    () => {
      clearInterval(timerId);
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


  async function getMyBudgets() {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Cookie", "connect.sid=s%3A40008306-bdea-4ef6-b1f2-213e546ca80c.gD94RtO6kDXRvGyy37wNcdjedMASwHJp0LnQnyAMRys");

    var raw = JSON.stringify({
      "session_id": sessionInfo._id,
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    var response = await fetch("http://localhost:8080/myBudgets", requestOptions)
    var result = await response.json();
    return result.data.budgets;
  }

  const getCategoryList = async function () {

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
    var response = await window.fetch("http://localhost:8080/myCategories", requestOptions);
    var result = await response.json()
    return result.data.categories;
  }


  async function handleShowNotification() {
    var notifications = await getAllNotifications();
    var budgets = await getMyBudgets();
    var budget_lookup = budgets.reduce((prev, budget, index, budgets) => {
      prev['_' + budget._id] = budget;
      return prev;
    }, {});
    var categories = await getCategoryList();
    var category_lookup = categories.reduce((prev, category, index, categories) => {
      prev['_' + category._id] = category;
      return prev;
    }, {});
    var count = 0;
    var temp = [];
    for (var notification of notifications) {
      count++;
      var category = category_lookup['_' + notification.category_id];

      var categoryName = category.category_name;
      //console.log("category name " + categoryName);
      var budget = budget_lookup['_' + notification.budget_id];
      var budgetAmount = budget.amount;
      //console.log("budget amount " + budgetAmount);
      var date = notification.date_of_creation;
      var tempDate = new Date(date);
      //console.log("date " + date);
      temp.push({
        categoryName: categoryName,
        budgetAmount: budgetAmount,
        date: tempDate,
      });
    }
    setData(temp);
    console.log("length of data is " + data?.length)
  }

  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Stack>
            <NavbarBrand><h1><span class="badge rounded-pill text-bg-danger">Expense Manager</span></h1></NavbarBrand>
            <Navbar.Brand >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Welcome  {username}!</Navbar.Brand>
          </Stack>
          <Nav className="me-auto">
            {menus.map((menu) => {
              return (<Nav.Link ><NavLink to={menu.to}><h5><button type="button" class="btn btn-success">{menu.val}</button></h5></NavLink></Nav.Link>)
            })}
            <Nav.Link >
              <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  Notifications <br /> <span>{data?.length}</span>
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item href="#/action-1"><Notifications data={data} /></Dropdown.Item>
                  <Dropdown.Item href="#/action-2">Mark as read</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Nav.Link>
            <Nav.Link ><NavLink to="logout"><h5>
              <button onClick={navigateToLogout} type="button" class="btn btn-danger" style={{ height: 60 }}>
                Logout
              </button></h5>
            </NavLink></Nav.Link>
          </Nav>

        </Container>
      </Navbar>
    </div>
  )
}


{/*export default class navbar extends Component {
  render() {
    const username = window.localStorage.getItem("username");
    const menus = [
      {to:"createcategories",val:"Create Categories"},
      {to:"setmonthlybudget",val:"Monthly Budget"},
      {to:"manageexpenses",val:"Manage Expenses"},
      {to:"monthlyexpense",val:"Monthly Expense"},
      {to:"weeklyexpense",val:"Weekly Expense"},

    ]
   
    function navigateToLogout() {
      window.location.href = "http://localhost:3000/logout";
    }
    const notificationCount = React.useContext(notificatoinContext);

    return (
      <div>
        <Navbar bg="dark" variant="dark">
        <Container>
          <Stack>
          <NavbarBrand><h1><span class="badge rounded-pill text-bg-danger">Expense Manager</span></h1></NavbarBrand>
          <Navbar.Brand >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Welcome  {username}!</Navbar.Brand>
          </Stack>
          <Nav className="me-auto">
            {menus.map((menu)=>{return (<Nav.Link ><NavLink to={menu.to}><h5><button type="button" class="btn btn-success">{menu.val}</button></h5></NavLink></Nav.Link>)
            })}
            <Nav.Link ><NavLink to="notifications"><h5>
              <button type="button" class="btn btn-success">
                Notifications <span class="badge text-bg-secondary">{notificationCount}</span>
              </button></h5>
            </NavLink></Nav.Link>
            <Nav.Link ><NavLink to="logout"><h5>
              <button onClick={navigateToLogout} type="button" class="btn btn-danger" style={{height:60}}>
                Logout
              </button></h5>
            </NavLink></Nav.Link>
          </Nav>
      
        </Container>
      </Navbar>              
      </div>
    )
  }
}*/}
