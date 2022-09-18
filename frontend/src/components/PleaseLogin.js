import React from 'react'
import { NavLink } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';

export default function PleaseLogin() {
    return (
        <div>
          <center>
            <br />
            <br />
            <br />
            <h2>Please login to use the service!</h2>
          <Nav.Link ><NavLink to="login"><h2>Login</h2> 
          </NavLink></Nav.Link>
          </center>    
        </div>
      )
}
