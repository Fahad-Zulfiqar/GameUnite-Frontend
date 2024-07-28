import React from "react";
import "./banner.css";
import { Container, Row, Col } from "react-bootstrap";
import { FaInstagram, FaTwitter, FaFacebook, FaLinkedin } from "react-icons/fa";

const SocialMediaIcons = () => {
  return (
    <div className="social-icons">
      <FaInstagram className="icon text-instagram text-primary display-6 m-2" />
      <FaTwitter className="icon text-twitter text-primary display-6 m-2" />
      <FaFacebook className="icon text-facebook text-primary display-6 m-2" />
      <FaLinkedin className="icon text-facebook text-primary display-6 m-2" />
    </div>
  );
};

function ContactContent() {
  return (
    <>
      <Container className="mt-5 mb-5">
        <Row className="justify-content-center">
          <Col md={6}>
            <div className="card-body mt-5">
              <h3 className=" fw-bold fs-1 text-black">Get in touch today!</h3>
              <p>
                We know how large objects will act, but things on a small scale
              </p>
              <SocialMediaIcons />
            </div>
          </Col>
          <Col xs={6} className="ms-auto">
            <div className="responsive-map">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3403.655623806344!2d74.28990417469335!3d31.45114635056054!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39190143e0e99feb%3A0xf39379efff4dd86!2sUniversity%20of%20Management%20%26%20Technology!5e0!3m2!1sen!2s!4v1708151862157!5m2!1sen!2s"
                width="600"
                height="450"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default ContactContent;
