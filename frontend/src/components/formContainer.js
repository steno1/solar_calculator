// src/components/FormContainer.js

import { Container } from 'react-bootstrap';
import React from 'react';

const FormContainer = ({ children }) => {
  return (
    <Container>
      <div className="form-container">
        {children}
      </div>
    </Container>
  );
};

export default FormContainer;
