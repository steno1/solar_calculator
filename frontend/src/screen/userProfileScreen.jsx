// UserProfileScreen.js

import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { useGetUserProfileQuery, useUpdateUserProfileMutation } from '../slices/UserApiSlice';

import Loader from '../components/Loader';
import Message from '../components/Message';
import { useNavigate } from 'react-router-dom';

const UserProfileScreen = () => {
  const navigate = useNavigate();
  const { data: userProfile, isLoading, error } = useGetUserProfileQuery();
  const [updateUserProfile, { isLoading: isUpdating, error: updateError }] = useUpdateUserProfileMutation();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (userProfile) {
      setName(userProfile.name || '');
      setEmail(userProfile.email || '');
    }
  }, [userProfile]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }
    try {
      await updateUserProfile({ name, email, password }).unwrap();
      setMessage('Profile updated successfully');
      navigate('/'); // Redirect to home or another page
    } catch (err) {
      setMessage('Error updating profile');
    }
  };

  return (
    <Container className='py-3'>
      <Row className='justify-content-md-center'>
        <Col xs={12} md={6}>
          <h1>User Profile</h1>
          {error && <Message variant='danger'>{error?.data?.message || error.error}</Message>}
          {isLoading && <Loader />}
          {updateError && <Message variant='danger'>{updateError?.data?.message || updateError.error}</Message>}
          {isUpdating && <Loader />}
          {message && <Message variant='info'>{message}</Message>}
          <Form onSubmit={handleUpdate}>
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
                placeholder='Enter new password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId='confirmPassword'>
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Confirm new password'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Form.Group>

            <Button type='submit' variant='dark' style={{ marginTop: '10px' }}>
              Update Profile
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default UserProfileScreen;
