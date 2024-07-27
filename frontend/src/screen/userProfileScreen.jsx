import 'react-toastify/dist/ReactToastify.css'; // Import toast styles
import '../footerFix.css'; // Import updated CSS

import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify'; // Import toast and ToastContainer
import { useGetUserProfileQuery, useUpdateUserProfileMutation } from '../slices/UserApiSlice';

import Footer from '../components/Footer';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { setCredentials } from '../slices/authSlice'; // Import setCredentials action
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const UserProfileScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data: userProfile, isLoading, error } = useGetUserProfileQuery();
  const [updateUserProfile, { isLoading: isUpdating, error: updateError }] = useUpdateUserProfileMutation();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    if (userProfile) {
      setName(userProfile.name || '');
      setEmail(userProfile.email || '');
    }
  }, [userProfile]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    try {
      const updatedUser = await updateUserProfile({ name, email, password }).unwrap();
      dispatch(setCredentials(updatedUser)); // Update Redux store with new user data
      toast.success('Profile updated successfully');
      navigate('/'); // Redirect to home or another page
    } catch (err) {
      toast.error('Error updating profile');
    }
  };

  // Inline styles for container and form
  const containerStyle = {
    paddingBottom: '60px', // Space for the footer
    minHeight: window.innerWidth <= 767 ? 'calc(100vh - 60px)' : 'auto' // Increase height on mobile
  };

  const formStyle = {
    minHeight: window.innerWidth <= 767 ? '400px' : 'auto' // Increase form height on mobile
  };

  return (
    <>
      <Container className='py-3' style={containerStyle}>
        <ToastContainer /> {/* ToastContainer to display toasts */}
        <Row className='justify-content-md-center'>
          <Col xs={12} md={6}>
            <h1>User Profile</h1>
            {error && <Message variant='danger'>{error?.data?.message || error.error}</Message>}
            {isLoading && <Loader />}
            {updateError && <Message variant='danger'>{updateError?.data?.message || updateError.error}</Message>}
            {isUpdating && <Loader />}
            <Form onSubmit={handleUpdate} style={formStyle}>
              <Form.Group controlId='name'>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter name'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId='email' className='mt-3'>
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type='email'
                  placeholder='Enter email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId='password'  className='mt-3'>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type='password'
                  placeholder='Enter new password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId='confirmPassword' className='mt-3'>
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type='password'
                  placeholder='Confirm new password'
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </Form.Group>

              <Button type='submit' className='mt-4' variant='dark' style={{ marginTop: '10px' }}>
                Update Profile
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
      <Footer className='footer-container' />
    </>
  );
};

export default UserProfileScreen;
