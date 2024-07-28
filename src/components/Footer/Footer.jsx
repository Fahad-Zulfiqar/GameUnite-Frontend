import React from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import { FaInstagram, FaTwitter, FaFacebook, FaLinkedin } from "react-icons/fa";
import "../Footer/Footer.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footerbg text-white py-5">
      <Container>
        <Row className="align-items-center">
          {/* Left side - Game Unite logo */}
          <Col md={6} className="fs-3 mb-4">
            GameUnite
          </Col>
          {/* Right side - Social media icons */}
          <Col md={6} className="text-end">
            <div className="social-icons-footer">
              <FaInstagram className="icon text-instagram me-3" />
              <FaTwitter className="icon text-twitter me-3" />
              <FaFacebook className="icon text-facebook me-3" />
              <FaLinkedin className="icon text-linkedin me-3" />
            </div>
          </Col>
          {/* Bottom Border */}
          <Col xs={12}>
            <hr className="border border-white mb-4" />
          </Col>
          {/* Company Info */}
          <Col md={9}>
            <h5 className="text-light fs-4 mb-3">Company Info</h5>
            <nav className="footer-links">
              <a href="#" className="footer-brand fw-bold">Home</a>
              <a href="#" className="footer-brand fw-bold">About Us</a>
              <a href="#" className="footer-brand fw-bold">Contact Us</a>
              <a href="#" className="footer-brand fw-bold">Blogs</a>
            </nav>
          </Col>
          {/* Get in Touch */}
          <Col md={3} className="text-end">
            <h5 className="mb-3">Get in Touch</h5>
            <Form>
              <div className="input-group mb-3">
                <input type="text" className="form-control" placeholder="Email" />
                <button className="btn btn-primary" type="button">Subscribe</button>
              </div>
              <Form.Text className="text-muted mb-3">
                We'll never share your email with anyone.
              </Form.Text>
              <Form.Text className="text-bold text-light">Gameunite@gmail.com</Form.Text>
            </Form>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
