import '../styles.css';
import "../Header.css"

import { Container, Nav, NavDropdown, Navbar } from 'react-bootstrap';

import React from 'react';
import myLogo from '../image/myLogo.webp';

const Header = () => {
  const user = true; // Placeholder for user authentication state

  const handleLogout = () => {
    console.log("Logged out"); // Replace with actual logout functionality
  };

  return (
    <header>
      <Navbar className="custom-navbar" expand="lg" collapseOnSelect>
        <Container>
          <Navbar.Brand href="/">
            <img
              src={myLogo} // Use the imported logo
              className="d-inline-block align-top"
              alt="Logo"
            />
            {' '}
            Princeley Solar Calculator
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto"> {/* Use ms-auto for Bootstrap 5 */}
              {user ? (
                <NavDropdown title="Profile" id="username">
                  <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
                  <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
                </NavDropdown>
              ) : (
                <Nav.Link href="/login">Login</Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
