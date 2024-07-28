import { Card, Image } from "react-bootstrap";
import { Link } from "react-router-dom";

import fire from "../../assets/Images/fire.gif";

const Blog = ({ blog }) => {
  return (
    <>
      <Card className="my-3 p-3 rounded text-dark">
        <Link to={`/blog/${blog._id}`}>
          <Card.Img
            src={blog.image}
            variant="top"
            style={{
              height: "150px",
              objectFit: "contain",
              borderRadius: "9.5%",
            }}
          />
        </Link>
        <Card.Body>
          <Link to={`/blog/${blog._id}`}>
            <Card.Title
              as="div"
              className="product-title"
              style={{ height: "55px" }}
            >
              <Image
                src={fire}
                alt="fire logo"
                style={{
                  width: "16px",
                  marginLeft: "5px",
                  marginBottom: "8px",
                }}
              />
              <strong>{blog.name}</strong>
              <br />
              <span className="badge bg-primary">{blog.category}</span>
            </Card.Title>
          </Link>
          <Card.Text as="p">Read me</Card.Text>
        </Card.Body>
      </Card>
    </>
  );
};

export default Blog;
