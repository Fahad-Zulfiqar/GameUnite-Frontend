import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { CiLocationOn } from "react-icons/ci";
import { IoCallOutline } from "react-icons/io5";
import { CiMail } from "react-icons/ci";

function ContactCard() {
  return (
    <>
      <Container className="mt-5 mb-5">
        <h3 className="text-center text-black fw-bold fs-2">
          VISIT OUR OFFICE
        </h3>
        <Row className="justify-content-center mt-5">
          <Col md={4} sm={6} xs={12} className="mb-3">
            <div className="card text-center text-black">
              <div className="card-body">
                <IoCallOutline className="icon display-2 m-2" />
                <h5 className="card-title fw-bold">Phone </h5>
                <p className="card-text">professional</p>
                <Button variant="outline-primary" block>
                  Submit Request
                </Button>
              </div>
            </div>
          </Col>
          <Col md={4} sm={6} xs={12} className="mb-3">
            <div className="card text-center">
              <div className="card-body Bg">
                <CiLocationOn className="icon text-light display-2 m-2" />
                <h5 className="card-title fw-bold text-light">Location</h5>
                <p className="card-text text-light">professional</p>
                <Button variant="outline-light" block>
                  Submit Request
                </Button>
              </div>
            </div>
          </Col>
          <Col md={4} sm={6} xs={12} className="mb-3">
            <div className="card text-center text-black">
              <div className="card-body">
                <CiMail className="icon  display-2 m-2" />
                <h5 className="card-title fw-bold ">Email</h5>
                <p className="card-text">professional</p>
                <Button variant="outline-primary" block>
                  Submit Request
                </Button>
              </div>
            </div>
          </Col>
        </Row>

        <section className="mb-2 bg-light">
          <h3 className="text-center  pb-4 mt-4 pt-4 fw-bold fs-1 text-black">
            Let’s Talk
          </h3>
          <p className=" p text-center w-responsive mx-auto mb-5 text-black">
            Do you have any questions? Please do not hesitate to contact us
            directly. Our team will come back to you within a matter of hours to
            help you.
          </p>

          <Row className="justify-content-center">
            <Col md={6}>
              <Form
                id="contact-form"
                name="contact-form"
                action="mail"
                method="POST"
                className="mx-auto"
              >
                <Row className="mb-2">
                  <Col md={6}>
                    <Form.Group controlId="name">
                      <Form.Control type="text" placeholder="Your name" />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="email">
                      <Form.Control type="text" placeholder="Your email" />
                    </Form.Group>
                  </Col>
                </Row>
                <Form.Group controlId="subject" className=" mb-2">
                  <Form.Control type="text" placeholder="Subject" />
                </Form.Group>
                <Form.Group controlId="message">
                  <Form.Control
                    as="textarea"
                    rows="5"
                    placeholder="Your message"
                  />
                </Form.Group>
                <div className="text-center text-md-left mt-3 mb-4 ">
                  <Button type="submit" block className=" w-50">
                    Send
                  </Button>
                </div>
              </Form>
            </Col>
          </Row>
        </section>
      </Container>
    </>
  );
}

export default ContactCard;
