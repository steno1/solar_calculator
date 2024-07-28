// Import necessary styles and CSS files

import 'react-toastify/dist/ReactToastify.css'; // Import toast styles

import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { useLoginMutation, useRegisterUserMutation } from '../slices/UserApiSlice';

import Footer from '../components/Footer';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { toast } from 'react-toastify';

const RegisterScreen = () => {
  // State variables for form inputs
  const [name, setName] = useState(''); // Add state for name
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Initialize useNavigate hook for navigation
  const navigate = useNavigate();
  // Initialize the registerUser mutation hook
  const [registerUser, { isLoading, error }] = useRegisterUserMutation();
  // Initialize the login mutation hook
  const [login] = useLoginMutation();

  // Handle form submission for user registration
  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match'); // Show error if passwords do not match
      return;
    }
    try {
      // Register user via API and include name in the request
      await registerUser({ name, email, password }).unwrap();
      // Automatically log in the user after successful registration
      await login({ email, password }).unwrap();
      toast.success('Registration successful!'); // Show success message
      navigate('/'); // Redirect to home page or any other page you want
    } catch (err) {
      console.error(err);
      toast.error('Registration failed. Please try again.'); // Show error message
    }
  };

  return (
    <>
      <Container className='py-3'>
        <Row className='justify-content-md-center'>
          <Col xs={12} md={6}>
            <h1>Register</h1>
            {error && <Message variant='danger'>{error?.data?.message || error.error}</Message>}
            {isLoading && <Loader />}
            <Form onSubmit={submitHandler}>
              <Form.Group controlId='name'>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter name'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group controlId='email'>
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type='email'
                  placeholder='Enter email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group controlId='password'>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type='password'
                  placeholder='Enter password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group controlId='confirmPassword'>
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type='password'
                  placeholder='Confirm password'
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  style={{ marginBottom: '10px' }}
                />
              </Form.Group>

              <Button type='submit' variant='dark' style={{ marginTop: '10px' }}>
                Register
              </Button>
            </Form>
           
            <Row className='py-3'>
              <Col>
                Have an Account?{' '}
                <Link to='/login' style={{ color: 'white' }}>
                  Login
                </Link>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
      <div>
        <Footer className='footer-container' />
      </div>
    </>
  );
};

export default RegisterScreen; // Export the RegisterScreen component as default
