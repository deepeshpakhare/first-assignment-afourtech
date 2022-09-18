import React from 'react'
import { NavLink } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';

export default function Logout() {
    {window.localStorage.removeItem("loginStatus");}
    {window.localStorage.removeItem("session")}
    {window.localStorage.removeItem("username")}
    {console.log(window.localStorage.getItem("loginSatus"));}
    {window.localStorage.removeItem("notificationCount");}
  return (
    <div>
      <center>
        <br />
        <br />
        <br />
        <h2>You have successfully logged out!</h2>
      <Nav.Link ><NavLink to="login"> <h2>Login</h2>
      </NavLink></Nav.Link>
      </center>    
    </div>
  )
}
