import '../styles.css';
import "../Header.css";

import { Container, Nav, NavDropdown, Navbar } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import React from 'react';
import { logout } from '../slices/authSlice'; // Import the logout action
import myLogo from '../image/myLogo.webp';
import { useLogoutMutation } from '../slices/UserApiSlice'; // Import the logout mutation hook
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Header = () => {
  const [logoutUser] = useLogoutMutation(); // Initialize logout mutation
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize useNavigate
  const { userInfo } = useSelector((state) => state.auth); // Access userInfo from the Redux store

  const handleLogout = async () => {
    try {
      await logoutUser().unwrap(); // Call the logout API
      dispatch(logout()); // Dispatch the logout action
      navigate('/login'); // Redirect to login page
    } catch (error) {
      console.error("Logout failed", error);
    }
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
              {userInfo ? (
                <NavDropdown title={userInfo.name} id="username">
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
