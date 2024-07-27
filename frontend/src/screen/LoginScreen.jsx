import 'react-toastify/dist/ReactToastify.css'; // Import toast styles
import '../footerFix.css'; // Import custom CSS

import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';

import Footer from '../components/Footer';
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

  // Inline styles for container and form
  const containerStyle = {
    paddingBottom: '60px', // Space for the footer
    minHeight: window.innerWidth <= 767 ? 'calc(100vh - 60px)' : 'auto' // Increase height on mobile
  };

  const formStyle = {
    minHeight: window.innerWidth <= 767 ? '300px' : 'auto' // Increase form height on mobile
  };

  const linkRowStyle = {
    marginTop: '-50px' 
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
              <Form.Group controlId='email'  className='mt-3'>
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type='text' 
                  placeholder='Enter email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId='password'  className='mt-3'>
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
            <Row className='py-3 mt-3'   style={linkRowStyle}>
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

export default LoginScreen;
