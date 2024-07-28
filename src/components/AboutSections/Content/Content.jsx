import React from "react";
import { Container, Row, Col, Image, Card } from "react-bootstrap";

const Content = () => {
  return (
    <>
      <Container className="mt-5">
        <Row className="justify-content-center ">
          <Col md={4}>
            <div className="card-body mt-5">
              <h1 className="card-title fw-bold text-black fs-2">
                About GameUnite
              </h1>
              <p>
                We know how large objects will act, but things on a small scale.
              </p>
            </div>
          </Col>
          <Col xs={6} className="ms-auto">
            <div>
              <p>
                <strong>Welcome to GameUnite</strong> your ultimate platform for
                buying and selling gaming accounts, skins, and items.
              </p>
              <hr />
              <p>
                <strong>Our Story </strong> GameUnite began as a passion
                project, evolving into a thriving hub for secure virtual asset
                trading.
              </p>
              <hr />
              <p>
                <strong> What We Offer</strong> Trust and Security: Your safety
                is our priority with robust measures in place. User Friendly
                Platform Enjoy a seamless experience for all your gaming
                adventures. Global Community Connect with like minded gamers
                worldwide. Thank you for choosing GameUnite where gaming meets
                unity!
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Content;
