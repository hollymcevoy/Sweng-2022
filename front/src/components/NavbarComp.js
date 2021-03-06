import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Susi from "../components/Susi";
import Username from "./Username";


class NavbarComp extends Component {
  render() {
    return ( 
      <div>
        <Navbar className="App-color-nav" expand="lg">
          <Navbar.Brand className="App-nav-brand" href="/"> QueryBot22 </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="container-fluid">
              <Nav.Link href="/upload">Upload</Nav.Link>
              <Nav.Link href="/knowledgebase">Knowledgebase</Nav.Link>
              <Nav.Link href="/chatbot">Chatbot</Nav.Link>
              
            </Nav>
          </Navbar.Collapse>
          <Navbar.Collapse className="justify-content-end">
            <Nav>
            <NavDropdown drop="start" flip="true" title={<Username/>} id="dropdown-menu dropdown-menu-left" >
              <NavDropdown.Item href="/account">Profile</NavDropdown.Item>
              <NavDropdown.Divider />
              <Susi />
            </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Navbar>

      </div>
    );
  }
}

export default NavbarComp;