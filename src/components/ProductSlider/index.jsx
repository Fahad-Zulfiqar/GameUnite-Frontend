// import React from 'react'
import { Link } from "react-router-dom";
import { Carousel, Image } from "react-bootstrap";
// import Loader from "../Loader";
import Message from "../Message";
import { useGetTopGenreQuery } from "../../slices/productsApiSlice";

const ProductSlider = () => {
  const { data: products, isLoading, error } = useGetTopGenreQuery();

  return isLoading ? (
    // <Loader />
    <></>
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <Carousel pause="hover" className="product-slider bg-primary mb-4 ">
      {products.map((product) => (
        <Carousel.Item key={product._id}>
          <Link to={`/product/${product._id}`}>
            <Image
              src={product.image}
              alt={product.name}
              // style={{ width: "100%", height: "20%", objectFit: "cover" }}
            />
            <Carousel.Caption className="carousel-caption">
              <h2>
                {product.name} (${product.price})
              </h2>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default ProductSlider;
