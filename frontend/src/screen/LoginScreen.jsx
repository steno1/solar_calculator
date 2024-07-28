// Import necessary styles and CSS files

import 'react-toastify/dist/ReactToastify.css'; // Import toast styles
import '../footerFix.css'; // Import custom CSS

import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';

import Footer from '../components/Footer';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { useLoginMutation } from '../slices/UserApiSlice';

// Import components from react-bootstrap for layout and styling

// Import Link for navigation and useNavigate for programmatic navigation

// Import React and hooks for component state management


// Import Footer, Loader, and Message components



// Import actions and hooks for Redux and toast notifications



// Import API slice hook for login mutation


const LoginScreen = () => {
  // State variables for form inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Initialize useNavigate hook for navigation
  const navigate = useNavigate();
  // Initialize useDispatch hook for Redux actions
  const dispatch = useDispatch();

  // Initialize the login mutation hook
  const [login, { isLoading, error }] = useLoginMutation();

  // Handle form submission for user login
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      // Perform login via API and unwrap the result
      const userData = await login({ email, password }).unwrap();
      // Dispatch the setCredentials action to update the Redux store
      dispatch(setCredentials(userData));
      toast.success('Logged in successfully!'); // Show success message
      navigate('/'); // Redirect to home page or any other page you want
    } catch (err) {
      console.error(err);
      toast.error('Login failed. Please check your credentials.'); // Show error message
    }
  };

  // Inline styles for container and form
  const containerStyle = {
    paddingBottom: '60px', // Space for the footer
    minHeight: window.innerWidth <= 767 ? 'calc(100vh - 60px)' : 'auto' // Increase height on mobile
  };

  const formStyle = {
    minHeight: window.innerWidth <= 767 ? '300px' : 'auto' // Increase form height on mobile
  };

  const linkRowStyle = {
    marginTop: '-50px' // Adjust margin for the link row
  };

  return (
    <>
      <Container className='py-3' style={containerStyle}>
        <Row className='justify-content-md-center'>
          <Col xs={12} md={6}>
            <h1>Sign In</h1>
            {error && <Message variant='danger'>{error?.data?.message || error.error}</Message>}
            {isLoading && <Loader />}
            <Form onSubmit={submitHandler} style={formStyle}>
              <Form.Group controlId='email' className='mt-3'>
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId='password' className='mt-3'>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type='password'
                  placeholder='Enter password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>

              <Button type='submit' variant='dark' style={{ marginTop: '40px' }}>
                Sign In
              </Button>
            </Form>
            <Row className='py-3 mt-3' style={linkRowStyle}>
              <Col>
                New Customer?{' '}
                <Link to='/register' style={{ color: 'white', marginTop: '30px' }}>
                  Register
                </Link>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
      <Footer className='footer-container' />
    </>
  );
};

export default LoginScreen; // Export the LoginScreen component as default
