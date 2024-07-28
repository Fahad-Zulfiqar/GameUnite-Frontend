import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col, Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import { FaTimes } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { useGetMyOrdersQuery } from "../../slices/ordersApiSlice";
import { useGetUserProductsQuery } from "../../slices/productsApiSlice";
import { useState, useEffect } from "react";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import Product from "../../components/Products/Products.jsx";

const UserProfilePage = () => {
  const { id: userId } = useParams();
  const { userInfo } = useSelector((state) => state.auth);

  const {
    data: orders,
    isLoading: loadingOrders,
    error: errorOrders,
  } = useGetMyOrdersQuery(userId);

  const {
    data: products,
    isLoading: loadingProducts,
    error: errorProducts,
  } = useGetUserProductsQuery(userId);

  const [name, setName] = useState("");

  useEffect(() => {
    if (userInfo && userInfo._id === userId) {
      setName(userInfo.name);
    } else if (products && products.length > 0) {
      setName(products[0].user.name);
    }
  }, [userInfo, userId, products]);

  return (
    <Container className="overflow-x">
      <Row>
        <Col md={12}>
          <div className="profile-pattern">
            <div className="profile-img"></div>
            <h2 className="user-name">{name}</h2>
          </div>
        </Col>
      </Row>

      <Row>
        <Col md={12}>
          <h2>My Products</h2>
          {loadingProducts ? (
            <Loader />
          ) : errorProducts ? (
            <Message variant="danger">
              {errorProducts?.data?.message || errorProducts.error}
            </Message>
          ) : (
            <Row>
              {products.map((product) => (
                <Col key={product._id} sm={6} md={6} lg={4} xl={3}>
                  <Product product={product} />
                </Col>
              ))}
            </Row>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default UserProfilePage;
