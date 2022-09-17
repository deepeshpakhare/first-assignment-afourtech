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
            Please login to use the service!
          <Nav.Link ><NavLink to="login"> login
          </NavLink></Nav.Link>
          </center>    
        </div>
      )
}
