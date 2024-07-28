import React from "react";
import { Link } from "react-router-dom";
import { useGetProductsQuery } from "../../../slices/productsApiSlice";
import Loader from "../../Loader";
import Message from "../../Message";
import './accounts.css'; // Adjusted CSS file path

const Accounts = () => {
  const { data, isLoading, error } = useGetProductsQuery({});

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <Message variant="danger">{error?.data.message || error.error}</Message>;
  }

  // Assuming data.products contains an array of product objects with image URLs and names
  const products = data?.products || [];

  return (
    <div className="accounts">
      <span className="acc_name">Accounts</span>
      <div className="trending__card">
        <div className="acc__card">
          <div className="card__title">Accounts</div>
          <div className="card__subtitle">Services</div>

          {/* Map through products data and display */}
          {products.slice(0, 3).map((product) => (
            <div key={product._id} className="c1">
              <img src={product.image} alt={product.name} />
              <Link to={`/product/${product._id}`}>{product.name}</Link>
            </div>
          ))}
        </div>
        <div className="item__card">
          <div className="card__title">Items</div>
          <div className="card__subtitle">Services</div>

          {/* Example with same image and link */}
          {products.slice(3, 6).map((product) => (
            <div key={product._id} className="c1">
              <img src={product.image} alt={product.name} />
              <Link to={`/product/${product._id}`}>{product.name}</Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Accounts;
