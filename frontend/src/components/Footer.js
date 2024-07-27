// src/components/Footer.js

import '../Footer.css'; // Create this file for custom styles if not already present
import '../footerFix.css'; // Import custom CSS

import { Col, Container, Row } from 'react-bootstrap';

import React from 'react';

const Footer = () => {
  return (
    <footer className="footer-container">
      <Container>
        <Row>
          <Col className="text-center">
            <p>Princeley Solar Calculator &copy; {new Date().getFullYear()}</p>
            <p>onuprinceley@gmail.com</p> 
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
