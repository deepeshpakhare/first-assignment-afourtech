import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

export default class navbar extends Component {
  render() {
    const tagval = "<h2>";
    const tagvalend = "</h2>";
    const menus = [
      {to:"manageexpenses",val:"Manage EXpenses"},
      {to:"summary",val:"Summary"},
      {to:"monthlybudget",val:"Set Monthly Budget"},
      {to:"notiications", val:"Notofications"}
    ]
    return (
      <div>
        <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand></Navbar.Brand>
          <Nav className="me-auto">
            {menus.map((menu)=>{return (<Nav.Link ><NavLink to={menu.to}><h5>{menu.val}</h5></NavLink></Nav.Link>)
            })}
          </Nav>
        </Container>
      </Navbar>              
      </div>
    )
  }
}
