import { Card, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "../Rating/Rating";

import fire from "../../assets/Images/blueFire.gif";

import "./style.css";

const Product = ({ product }) => {
  return (
    <>
      <Card className="my-3 p-3 rounded text-dark">
        <Link to={`/product/${product._id}`}>
          <Card.Img
            src={product.image}
            variant="top"
            style={{
              height: "150px",
              objectFit: "contain",
              borderRadius: "9.5%",
            }}
          />
        </Link>
        <Card.Body>
          <Link to={`/product/${product._id}`}>
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
                  marginRight: "5px",
                  marginBottom: "6px",
                }}
              />
              <strong>{product.name}</strong>
              <br />
              <span className="badge bg-primary">{product.category}</span>
            </Card.Title>
          </Link>
          <Card.Text as="div">
            <Rating
              value={product.rating}
              text={`${product.numReviews} reviews`}
            />
          </Card.Text>
          <Card.Text as="h3">${product.price}</Card.Text>
          <hr />
          <Card.Text as="div">
            <strong className="user-img"></strong>
            <strong style={{ position: "absolute", left: "90px" }}>
              {product.user.name}
            </strong>
          </Card.Text>
        </Card.Body>
      </Card>
    </>
  );
};

export default Product;
