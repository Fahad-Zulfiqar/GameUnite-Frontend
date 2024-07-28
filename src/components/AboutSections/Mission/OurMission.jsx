import React from "react";
import "./OurMission.css";

import { Container, Row, Col } from "react-bootstrap";

const OurMission = () => {
  return (
    <div className="BanerCol">
      <Container className=" mt-5">
        <Row className="justify-content-center">
          <Col md={5} className="text-start">
            <h1 className="display-4 text-white mt-5">Our Missions</h1>
          </Col>
          <Col md={6} className="text-center pb-5">
            <p className=" text-white mt-5 ">
              <b className="h2 mx-2 ">1</b>
              To be the most trustable & secure digital marketplace alltimes.
            </p>
            <p className=" text-white mt-3 ">
              <b className="h2 mx-2">2</b>
              To empower our community to make a living off gaming from .
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default OurMission;
