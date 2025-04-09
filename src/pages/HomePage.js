import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCountries, loadMore, filterByRegion } from '../redux/countrySlice';
import { Container, Row, Col, Button, Navbar, Nav } from 'react-bootstrap';
import Slider from '../components/Slider';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaYoutube } from 'react-icons/fa';

// ✅ MOVE THIS ABOVE HomePage
const Footer = () => (
  <footer className="text-center mt-5 mb-4">
    <div className="social-icons text-center d-flex justify-content-center gap-3">
                <i className="fab fa-google"></i>
                <i className="fab fa-facebook-f"></i>
                <i className="fab fa-linkedin-in"></i>
                <i className="fab fa-twitter"></i>
              </div>
    <p className="mb-1">Example@email.com</p>
    <small className="text-muted">Copyright © 2020 Name. All rights reserved.</small>
  </footer>
);

const HomePage = () => {
  const dispatch = useDispatch();
  const { filtered, visible, status, error, selectedRegion } = useSelector((state) => state.countries);

  useEffect(() => {
    dispatch(fetchCountries());
  }, [dispatch]);

  return (
    <Container className="mt-5">
      {/* Navbar */}
      <Navbar expand="md" className="mb-4 px-3 shadow-sm bg-white">
        <Container fluid className="justify-content-between">
          <Navbar.Brand><h4 className="m-0">Countries</h4></Navbar.Brand>
          <Navbar.Toggle aria-controls="region-navbar" />
          <Navbar.Collapse id="region-navbar">
            <Nav className="ms-auto d-flex gap-3 align-items-center">
              {['All', 'Asia', 'Europe'].map((region) => (
                <Nav.Link
                  key={region}
                  onClick={() => dispatch(filterByRegion(region))}
                  style={{
                    cursor: 'pointer',
                    fontWeight: selectedRegion === region ? 'bold' : 'normal',
                    textDecoration: selectedRegion === region ? 'underline' : 'none',
                    color: selectedRegion === region ? '#000' : '#666',
                  }}
                >
                  {region}
                </Nav.Link>
              ))}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Welcome Section */}
      <div className="welcome-container">
        <div className="welcome-line top-line"></div>
        <h1 className="welcome-title">WELCOME</h1>
        <div className="welcome-line bottom-line"></div>
      </div>

      {/* Slider */}
      <Slider />

      {/* Country Grid */}
      {status === 'loading' && <p>Loading countries...</p>}
      {error && <p>Error: {error}</p>}

      <Row>
        {filtered.slice(0, visible).map((country, index) => (
          <Col key={index} xs={12} sm={6} md={4} className="mb-3">
            <div className="country-card d-flex align-items-center p-2 border rounded shadow-sm">
              <img
                src={country.flag}
                alt={country.name}
                className="flag-img me-3"
              />
              <div>
                <h5 className="mb-1">{country.name}</h5>
                <p className="text-muted m-0">{country.region}</p>
              </div>
            </div>
          </Col>
        ))}
      </Row>

      {/* Load More Button */}
      {visible < filtered.length && (
        <div className="text-center mt-4">
          <Button variant="dark" onClick={() => dispatch(loadMore())}>
            Load More
          </Button>
        </div>
      )}
      <Footer />
    </Container>

    
  );
};

export default HomePage;
