// Import custom styles and CSS files

import '../styles.css';
import "../Header.css";

import { Container, Nav, NavDropdown, Navbar } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import React from 'react';
import { logout } from '../slices/authSlice';
import myLogo from '../image/myLogo.webp';
import { useLogoutMutation } from '../slices/UserApiSlice';
import { useNavigate } from 'react-router-dom';

// Import components from react-bootstrap for layout and styling

// Import hooks from react-redux to interact with the Redux store


// Import React for building the component

// Import the logout action from authSlice

// Import the logo image

// Import the logout mutation hook from UserApiSlice

// Import useNavigate hook from react-router-dom for navigation


const Header = () => {
  // Initialize the logout mutation hook
  const [logoutUser] = useLogoutMutation();
  // Initialize useDispatch hook to dispatch actions
  const dispatch = useDispatch();
  // Initialize useNavigate hook for navigation
  const navigate = useNavigate();
  // Access userInfo from the auth slice in the Redux store
  const { userInfo } = useSelector((state) => state.auth);

  // Define the handleLogout function to handle user logout
  const handleLogout = async () => {
    try {
      // Call the logout API
      await logoutUser().unwrap();
      // Dispatch the logout action
      dispatch(logout());
      // Redirect to login page
      navigate('/login');
    } catch (error) {
      // Log any error that occurs during logout
      console.error("Logout failed", error);
    }
  };

  return (
    <header>
      {/* Create a Navbar with custom styles, expandable on large screens, and collapsible on small screens */}
      <Navbar className="custom-navbar" expand="lg" collapseOnSelect>
        <Container>
          {/* Navbar brand with logo and title */}
          <Navbar.Brand href="/">
            <img
              src={myLogo} // Use the imported logo
              className="d-inline-block align-top"
              alt="Logo"
            />
            {' '}
            Princeley Solar Calculator
          </Navbar.Brand>
          {/* Navbar toggle button for small screens */}
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          {/* Navbar collapse area */}
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto"> {/* Use ms-auto for Bootstrap 5 to align items to the right */}
              {userInfo ? (
                // If user is logged in, show user dropdown with profile and logout options
                <NavDropdown title={userInfo.name} id="username">
                  <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>  
                  <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
                </NavDropdown>
              ) : (
                // If user is not logged in, show login link
                <Nav.Link href="/login">Login</Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header; // Export the Header component as default
