import React from "react";
import "./c-banner.css";
import { Container } from "react-bootstrap";

function ContactBaner() {
  return (
    <div>
      <>
        <div
          className=" BanerCon text-center py-5"
          style={{ marginTop: "-20px" }}
        >
          <Container fluid>
            <h3 className="display-4 text-white ">Contact Us</h3>
            <p className="lead text-white ">
              If you have any feedbacks, suggestions and even compliments that
              <br />
              you would like to share with us, do reach out to us. We love to
              hear from you.
            </p>
          </Container>
        </div>
      </>
    </div>
  );
}

export default ContactBaner;
