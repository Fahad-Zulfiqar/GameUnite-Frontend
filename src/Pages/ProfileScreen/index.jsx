import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col, Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import { FaTimes } from "react-icons/fa";
import { useGetMyOrdersQuery } from "../../slices/ordersApiSlice";
import { useGetUserProductsQuery } from "../../slices/productsApiSlice";
import { useState, useEffect } from "react";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import Product from "../../components/Products/Products.jsx";
import "./style.css";

const ProfileScreen = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const {
    data: orders,
    isLoading: loadingOrders,
    error: errorOrders,
  } = useGetMyOrdersQuery();

  const {
    data: products,
    isLoading: loadingProducts,
    error: errorProducts,
  } = useGetUserProductsQuery(userInfo._id);

  const [name, setName] = useState("");

  useEffect(() => {
    if (userInfo) {
      setName(userInfo.name);
    }
  }, [userInfo]);

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
        <Col md={6}>
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
                <Col key={product._id} sm={6} md={6} lg={4} xl={6}>
                  <Product product={product} />
                </Col>
              ))}
            </Row>
          )}
        </Col>
        <Col md={6}>
          <h2>My Orders</h2>
          {loadingOrders ? (
            <Loader />
          ) : errorOrders ? (
            <Message variant="danger">
              {errorOrders?.data?.message || errorOrders.error}
            </Message>
          ) : (
            <Table striped hover responsive className="table-sm">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>DATE</th>
                  <th>TOTAL</th>
                  <th>PAID</th>
                  <th>DELIVERED</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id}>
                    <td>{order._id}</td>
                    <td>{order.createdAt.substring(0, 10)}</td>
                    <td>${order.totalPrice}</td>
                    <td>
                      {order.isPaid ? (
                        order.paidAt.substring(0, 10)
                      ) : (
                        <FaTimes style={{ color: "red" }} />
                      )}
                    </td>
                    <td>
                      {order.isDelivered ? (
                        order.deliveredAt.substring(0, 10)
                      ) : (
                        <FaTimes style={{ color: "red" }} />
                      )}
                    </td>
                    <td>
                      <LinkContainer to={`/order/${order._id}`}>
                        <Button className="btn-sm" variant="light">
                          Details
                        </Button>
                      </LinkContainer>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default ProfileScreen;
