import React from "react";
import { Link } from "react-router-dom";
import { useGetProductsQuery } from "../../../slices/productsApiSlice";
import Loader from "../../Loader";
import Message from "../../Message";
import "./trending.css";

const Trending = () => {
  const { data, isLoading, error } = useGetProductsQuery({});

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return (
      <Message variant="danger">{error?.data.message || error.error}</Message>
    );
  }

  const trendingImages = data?.products.slice(0, 6);

  return (
    <div className="trending-container">
      <h2 className="trending-head">Trending Games</h2>
      <div className="trending-games">
        {trendingImages.map((product) => (
          <div key={product._id} className="trending-game">
            <Link to={`/product/${product._id}`} className="trending-link">
              <img
                src={product.image}
                alt={product.name}
                className="trending-image"
              />
            </Link>
            <div className="details">
              <Link to={`/product/${product._id}`} className="details-button">
                Buy Now
              </Link>
            </div>
          </div>
        ))}
      </div>
      <div className="more-items">
        <Link to="/product" className="more-items-button">
          More Items
        </Link>
      </div>
    </div>
  );
};

export default Trending;
