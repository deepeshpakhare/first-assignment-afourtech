import React, { Component } from 'react'
import { NavLink , useNavigate } from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavbarBrand, Stack } from 'react-bootstrap';
import Logout from './Logout';
import { notificatoinContext } from './AddExpenseForm';


export default function Navigationbar() {
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
    console.log(notificationCount);
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
