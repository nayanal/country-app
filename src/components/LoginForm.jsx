import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Alert, Container, Row, Col } from 'react-bootstrap';
import './Login.css';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;

  const validate = () => {
    const newErrors = {};
    if (!email) newErrors.email = 'Email is required';
    if (!password) newErrors.password = 'Password is required';
    else if (!passwordRegex.test(password))
      newErrors.password = 'Password must be at least 8 characters, include 1 uppercase, 1 number, and 1 symbol';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      navigate('/home');
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div className="login-wrapper">
      <Container fluid className="login-container">
        <Row className="align-items-center justify-content-center">
          {/* Sign In Form */}
          <Col md={6} lg={4} className="login-form p-4">
            <h2 className="mb-1">Sign In</h2>
            <p>
              New user? <a href="/register">Create an account</a>
            </p>
            <Form onSubmit={handleSubmit}>
              <Form.Control
                type="text"
                placeholder="Username or email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && <Alert variant="danger">{errors.email}</Alert>}

              <Form.Control
                type="password"
                placeholder="Password"
                className="mt-3"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {errors.password && <Alert variant="danger">{errors.password}</Alert>}

              <Form.Check
                type="checkbox"
                label="Keep me signed in"
                className="mt-3"
              />

              <Button variant="dark" type="submit" className="mt-4 w-100">
                Sign In
              </Button>

              <div className="text-center mt-4 mb-2">— Or Sign In With —</div>

              <div className="social-icons text-center d-flex justify-content-center gap-3">
                <i className="fab fa-google"></i>
                <i className="fab fa-facebook-f"></i>
                <i className="fab fa-linkedin-in"></i>
                <i className="fab fa-twitter"></i>
              </div>
            </Form>
          </Col>

          {/* Illustration */}
          <Col md={6} lg={4} className="d-none d-md-flex justify-content-center">
            <img
              src="/images/pngtree-business-office-flat-character-meeting-png-image_37339.jpg" // 🖼️ Replace with your local image
              alt="Illustration"
              className="login-image"
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default LoginForm;
