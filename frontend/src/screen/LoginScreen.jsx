import 'react-toastify/dist/ReactToastify.css'; // Import toast styles

import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';

import Loader from '../components/Loader';
import Message from '../components/Message';
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify'; // Import toast
import { useDispatch } from 'react-redux';
import { useLoginMutation } from '../slices/UserApiSlice';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading, error }] = useLoginMutation();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const userData = await login({ email, password }).unwrap();
      dispatch(setCredentials(userData));
      toast.success('Logged in successfully!');
      navigate('/');
    } catch (err) {
      console.error(err);
      toast.error('Login failed. Please check your credentials.');
    }
  };

  return (
    <Container className='py-3'>
      <Row className='justify-content-md-center'>
        <Col xs={12} md={6}>
          <h1>Sign In</h1>
          {error && <Message variant='danger'>{error?.data?.message || error.error}</Message>}
          {isLoading && <Loader />}
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='email'>
              <Form.Label>Email Address</Form.Label>
              {/* Changed type from 'email' to 'text' */}
              <Form.Control
                type='text' 
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

            <Button type='submit' variant='dark' style={{ marginTop: '10px' }}>
              Sign In
            </Button>
          </Form>
          <Row className='py-3'>
            <Col>
              New Customer?{' '}
              <Link to='/register' style={{ color: 'white' }}>
                Register
              </Link>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginScreen;
