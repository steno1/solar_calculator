// Import necessary styles and CSS files

import 'react-toastify/dist/ReactToastify.css'; // Import toast styles
import '../footerFix.css'; // Import updated CSS

import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useGetUserProfileQuery, useUpdateUserProfileMutation } from '../slices/UserApiSlice';

import Footer from '../components/Footer';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { setCredentials } from '../slices/authSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

// Import components from react-bootstrap for layout and styling

// Import React and hooks for component state and lifecycle management

// Import ToastContainer and toast for displaying notifications

// Import API slice hooks for user profile queries and mutations


// Import Footer, Loader, and Message components



// Import the setCredentials action from authSlice

// Import useDispatch for dispatching actions and useNavigate for navigation



const UserProfileScreen = () => {
  // Initialize useNavigate hook for navigation
  const navigate = useNavigate();
  // Initialize useDispatch hook for dispatching actions
  const dispatch = useDispatch();
  // Fetch user profile data and status from the API
  const { data: userProfile, isLoading, error } = useGetUserProfileQuery();
  // Initialize the updateUserProfile mutation hook
  const [updateUserProfile, { isLoading: isUpdating, error: updateError }] = useUpdateUserProfileMutation();

  // State variables for form inputs
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // UseEffect to set form fields when user profile data is loaded
  useEffect(() => {
    if (userProfile) {
      setName(userProfile.name || '');
      setEmail(userProfile.email || '');
    }
  }, [userProfile]);

  // Handle form submission for updating user profile
  const handleUpdate = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match'); // Show error if passwords do not match
      return;
    }
    try {
      // Update user profile via API and dispatch updated credentials to Redux store
      const updatedUser = await updateUserProfile({ name, email, password }).unwrap();
      dispatch(setCredentials(updatedUser));
      toast.success('Profile updated successfully'); // Show success message
      navigate('/'); // Redirect to home page
    } catch (err) {
      toast.error('Error updating profile'); // Show error message
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
            <Button
              onClick={() => navigate('/')}
              variant='dark'
              className='mb-3'
            >
              Back to Home
            </Button>
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

export default UserProfileScreen; // Export the UserProfileScreen component as default
