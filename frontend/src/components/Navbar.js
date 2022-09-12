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
      {to:"createcategories",val:"Create Categories"},
      {to:"manageexpenses",val:"Manage Expenses     "},
      {to:"summary",val:"Summary     "},
      {to:"monthlybudget",val:"Set Monthly Budget    "},
      
    ]
    return (
      <div>
        <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand >| Expense Manager |</Navbar.Brand>
          <Nav className="me-auto">
            {menus.map((menu)=>{return (<Nav.Link ><NavLink to={menu.to}><h5><button type="button" class="btn btn-primary">{menu.val}</button></h5></NavLink></Nav.Link>)
            })}
            <Nav.Link ><NavLink to="createcategories"><h5>
              <button type="button" class="btn btn-primary">
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
