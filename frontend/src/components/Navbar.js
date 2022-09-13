import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavbarBrand, Stack } from 'react-bootstrap';

export default class navbar extends Component {
  render() {
    const username = window.localStorage.getItem("username");
    const menus = [
      {to:"createcategories",val:"Create Categories"},
      {to:"manageexpenses",val:"Manage Expenses"},
      {to:"summary",val:"Expense Summary"},
      {to:"monthlybudget",val:"Set Monthly Budge"},
      
    ]
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
            <Nav.Link ><NavLink to="createcategories"><h5>
              <button type="button" class="btn btn-success">
                Notifications <span class="badge text-bg-secondary">4</span>
              </button></h5>
            </NavLink></Nav.Link>
          </Nav>
      
        </Container>
      </Navbar>              
      </div>
    )
  }
}
