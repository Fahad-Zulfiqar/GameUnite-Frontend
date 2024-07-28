import React from "react";
import "./banner.css";
import { Container, Button } from "react-bootstrap";
import { FaAngleDoubleDown } from "react-icons/fa";

const Banner = () => {
  return (
    <>
      <div className="Bg text-center py-5" style={{ marginTop: "-20px" }}>
        <Container fluid>
          <h1 className="display-4 text-white">
            World-Leading Peer 2 Peer Digital Marketplace
          </h1>
          <p className="lead text-white">
            Buy, sell, and discover exclusive digital items
          </p>
          <Button variant="outline-light  " size="lg" className="mt-3 ">
            More
            <FaAngleDoubleDown x />
          </Button>
        </Container>
      </div>
    </>
  );
};

export default Banner;
