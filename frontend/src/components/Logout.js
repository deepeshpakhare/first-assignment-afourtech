import React from 'react'
import { NavLink } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';

export default function Logout() {
    {window.localStorage.removeItem("loginStatus");}
    {window.localStorage.removeItem("session")}
    {window.localStorage.removeItem("username")}
    {console.log(window.localStorage.getItem("loginSatus"));}
  return (
    <div>
      <center>
        <br />
        <br />
        <br />
        You have successfully logged out!
      <Nav.Link ><NavLink to="login"> login
      </NavLink></Nav.Link>
      </center>    
    </div>
  )
}
