import { Container, Row, Col } from "react-bootstrap";

const FormContainer = ({ children }) => {
  return (
    <Container
      style={{
        backgroundColor: "rgba(0,0,0,0.05)",
        width: "100vw",
        borderRadius: "12px",
        padding: "20px",
      }}
    >
      <Row className="justify-content-lg-center">
        <Col
          xs={12}
          md={10}
          style={{
            // backgroundColor: "#EBF7EA",
            background: "rgba(255, 255, 255, 0.12)",
            borderRadius: "16px",
            color: "#000",
            boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
            backdropFilter: "blur(5px)",
            border: "1px solid rgba(255, 255, 255, 0.3)",
          }}
        >
          {children}
        </Col>
      </Row>
    </Container>
  );
};

export default FormContainer;
