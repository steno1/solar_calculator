import 'react-toastify/dist/ReactToastify.css'; // Import toast styles

import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { useLoginMutation, useRegisterUserMutation } from '../slices/UserApiSlice'; // Import the login mutation hook

import Loader from '../components/Loader';
import Message from '../components/Message';
import { toast } from 'react-toastify'; // Import toast

const RegisterScreen = () => {
  const [name, setName] = useState(''); // Add state for name
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigate = useNavigate();
  const [registerUser, { isLoading, error }] = useRegisterUserMutation();
  const [login] = useLoginMutation(); // Initialize login mutation

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    try {
      await registerUser({ name, email, password }).unwrap(); // Include name in the request
      // Automatically log in the user after successful registration
      await login({ email, password }).unwrap();
      toast.success('Registration successful! Welcome back!');
      navigate('/'); // Redirect to home page or any other page you want
    } catch (err) {
      console.error(err);
      toast.error('Registration or login failed. Please try again.');
    }
  };

  return (
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
              />
            </Form.Group>

            <Form.Group controlId='email'>
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type='email'
                placeholder='Enter email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId='password'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Enter password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId='confirmPassword'>
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Confirm password'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
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
  );
};

export default RegisterScreen;
