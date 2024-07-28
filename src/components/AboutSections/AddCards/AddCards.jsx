import React from "react";
import "./Cards.css";

import broken from "../../../assets/broken.avif";
import malik from "../../../assets/malik.jpg";
import aliii from "../../../assets/aliii.jpeg";

import { Container, Row, Col, Image } from "react-bootstrap";
import { FaInstagram, FaTwitter, FaFacebook } from "react-icons/fa";

const SocialMediaIcons = () => {
  return (
    <div className="social-icons">
      <FaInstagram className="icon text-instagram text-primary display-6 m-2" />
      <FaTwitter className="icon text-twitter text-primary display-6 m-2" />
      <FaFacebook className="icon text-facebook text-primary display-6 m-2" />
    </div>
  );
};

const AddCards = () => {
  return (
    <>
      <Container className="mt-5 mb-5">
        <h3 className="text-lg-center text-black">MEET OUR TEAM</h3>
        <Row className="justify-content-center mt-5 ">
          <Col md={4} style={{ width: "300px" }}>
            <div className="card text-center ">
              <Image
                src={malik}
                className="card-img-top rounded-circle"
                alt="..."
              />
              <div className="card-body">
                <h5 className="card-title fw-bold text-black">
                  Fahad Zulfiqar
                </h5>
                <p className="card-text">professional</p>
                <p className="card-email">fahad@gmail.com</p>
              </div>
              <SocialMediaIcons />
            </div>
          </Col>
          <Col md={4} style={{ width: "300px" }}>
            <div className="card text-center">
              <Image
                src={broken}
                className="card-img-top rounded-circle"
                alt="..."
              />
              <div className="card-body">
                <h5 className="card-title fw-bold text-black">M. Ashan</h5>
                <p className="card-text ">professional</p>
                <p className="card-email ">ashan@gmail.com</p>
              </div>
              <SocialMediaIcons />
            </div>
          </Col>
          <Col md={4} style={{ width: "300px" }}>
            <div className="card text-center">
              <Image
                src={aliii}
                className="card-img-top rounded-circle"
                alt="..."
              />
              <div className="card-body">
                <h5 className="card-title fw-bold text-black">Ali Raza</h5>
                <p className="card-text">professional</p>
                <p className="card-email">ali@gmail.com</p>
              </div>
              <SocialMediaIcons />
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AddCards;
