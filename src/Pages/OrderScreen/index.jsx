import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Col, Row, Button, ListGroup, Image, Card } from "react-bootstrap";
import { useSelector } from "react-redux";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { toast } from "react-toastify";
import Web3 from "web3";
import {
  useGetOrderDetailsQuery,
  useDeliverOrderMutation,
  usePayOrderMutation,
} from "../../slices/ordersApiSlice";
import FormContainer from "../../components/FormContainer";
import { loadStripe } from "@stripe/stripe-js";

const STRIPE_PUBLIC_KEY =
  "pk_test_51PcmDVJgX0ysL3FLKE6roebxz9VbhwJumQBO2oGTEOAQuBA56sqSUlZ6jxWXFDMcsaXm4vauqeIeCtlr4FM3LpVU00iffFr7FU";

const OrderScreen = () => {
  const { id: orderId } = useParams();
  const {
    data: order,
    isLoading,
    error,
    refetch,
  } = useGetOrderDetailsQuery(orderId);

  const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();
  const [deliverOrder, { isLoading: loadingDeliver }] =
    useDeliverOrderMutation();
  const { userInfo } = useSelector((state) => state.auth);

  const deliverOrderHandler = async () => {
    try {
      await deliverOrder(orderId);
      refetch();
      toast.success("Order delivered");
    } catch (err) {
      toast.error(err?.data?.message || err.message);
    }
  };

  const fetchProductPriceInEther = async (totalPrice) => {
    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd`
      );
      const data = await response.json();
      const ethPriceInUsd = data.ethereum.usd;
      return (totalPrice / ethPriceInUsd).toFixed(18);
    } catch (error) {
      console.error("Error fetching ETH price:", error);
      toast.error("Failed to fetch ETH price");
      return null;
    }
  };

  const handleMetaMaskPayment = async () => {
    if (typeof window.ethereum !== "undefined") {
      const web3 = new Web3(window.ethereum);
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const accounts = await web3.eth.getAccounts();
        const amountInEther = await fetchProductPriceInEther(order.totalPrice);
        if (!amountInEther) {
          toast.error("Unable to calculate payment amount in ETH");
          return;
        }

        await web3.eth.sendTransaction({
          from: accounts[0],
          to: "0x32fda2C14c7C756118f941Ed09bE3A441e9D6f2b",
          value: web3.utils.toWei(amountInEther, "ether"),
        });

        toast.success("Payment successful");
        await confirmPayment(orderId);
      } catch (error) {
        toast.error("Payment failed");
        console.error("MetaMask payment error:", error);
      }
    } else {
      toast.error("MetaMask is not installed");
    }
  };

  const confirmPayment = async (orderId) => {
    try {
      await payOrder({ orderId, details: { status: "paid" } });
      toast.success("Payment Successful");
      refetch();
    } catch (error) {
      toast.error(error?.data?.message || error.message);
    }
  };

  const makePayment = async () => {
    const stripe = await loadStripe(STRIPE_PUBLIC_KEY);

    if (!order || !order.orderItems || !Array.isArray(order.orderItems)) {
      toast.error("Missing or invalid order data");
      return;
    }

    const body = {
      products: order.orderItems,
      orderId: order._id,
    };

    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const response = await fetch(
        "http://localhost:5000/api/create-checkout-session",
        {
          method: "POST",
          headers: headers,
          body: JSON.stringify(body),
        }
      );

      const session = await response.json();

      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (result.error) {
        toast.error(result.error.message);
      } else {
        toast.success("Redirecting to checkout...");
      }
    } catch (error) {
      toast.error("Error during payment process");
      console.error("Error during payment:", error);
    }
  };

  useEffect(() => {
    const handlePaymentConfirmation = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const paymentStatus = urlParams.get("payment_status");
      const orderIdFromURL = urlParams.get("order_id");

      if (paymentStatus === "paid" && orderIdFromURL === orderId) {
        await confirmPayment(orderId);
      }
    };

    handlePaymentConfirmation();
  }, [orderId]);

  return isLoading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <>
      <FormContainer>
        <h1>Order: {order._id}</h1>
        <Row>
          <Col md={8}>
            <ListGroup variant="flush">
              <ListGroup.Item style={{ backgroundColor: "transparent" }}>
                <h2>Destination</h2>
                <p>
                  <strong>Name: </strong> {order.user.name}
                </p>
                <p>
                  <strong>Email: </strong> {order.user.email}
                </p>
                <p>
                  <strong>Address: </strong>{" "}
                  {order.shippingAddress.emailAddress}
                </p>
                {order.isDelivered ? (
                  <Message variant="success">
                    Delivered on {order.deliveredAt}
                  </Message>
                ) : (
                  <Message variant="danger">Not Delivered</Message>
                )}
              </ListGroup.Item>

              <ListGroup.Item style={{ backgroundColor: "transparent" }}>
                <h2>Payment Method</h2>
                <p>
                  <strong>Method: </strong> {order.paymentMethod}
                </p>
                {order.isPaid ? (
                  <Message variant="success">Paid on {order.paidAt}</Message>
                ) : (
                  <Message variant="danger">Not Paid</Message>
                )}
              </ListGroup.Item>

              <ListGroup.Item style={{ backgroundColor: "transparent" }}>
                <h2>Order Items</h2>
                {order.orderItems.map((item, index) => (
                  <ListGroup.Item
                    key={index}
                    style={{ border: "none", backgroundColor: "transparent" }}
                  >
                    <Row>
                      <Col md={2}>
                        <Image src={item.image} alt={item.name} fluid rounded />
                      </Col>
                      <Col>
                        <Link
                          to={`/product/${item.product}`}
                          style={{ color: "gray" }}
                        >
                          {item.name}
                        </Link>
                      </Col>
                      <Col md={4}>
                        {item.qty} X {item.price} = ${item.qty * item.price}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={4}>
            <Card style={{ backgroundColor: "transparent" }}>
              <ListGroup variant="flush">
                <ListGroup.Item style={{ backgroundColor: "transparent" }}>
                  <h2>Order Summary</h2>
                </ListGroup.Item>

                <ListGroup.Item style={{ backgroundColor: "transparent" }}>
                  <Row>
                    <Col>Items:</Col>
                    <Col>${order.itemsPrice}</Col>
                  </Row>

                  <Row>
                    <Col>Destiny:</Col>
                    <Col>${order.shippingPrice}</Col>
                  </Row>

                  <Row>
                    <Col>Tax:</Col>
                    <Col>${order.taxPrice}</Col>
                  </Row>

                  <Row>
                    <Col>Total:</Col>
                    <Col>${order.totalPrice}</Col>
                  </Row>
                </ListGroup.Item>

                {!order.isPaid && (
                  <ListGroup.Item style={{ backgroundColor: "transparent" }}>
                    {loadingPay && <Loader />}

                    {order.paymentMethod === "Stripe" ? (
                      <Button type="submit" onClick={makePayment}>
                        Pay with Stripe
                      </Button>
                    ) : (
                      <Button type="submit" onClick={handleMetaMaskPayment}>
                        Pay with MetaMask
                      </Button>
                    )}
                  </ListGroup.Item>
                )}

                {loadingDeliver && <Loader />}

                {userInfo &&
                  (userInfo.isAdmin || userInfo.isSeller) &&
                  !order.isDelivered && (
                    <ListGroup.Item style={{ backgroundColor: "transparent" }}>
                      <Button
                        type="button"
                        className="btn btn-block"
                        onClick={deliverOrderHandler}
                      >
                        Mark as delivered
                      </Button>
                    </ListGroup.Item>
                  )}
              </ListGroup>
            </Card>
          </Col>
        </Row>
      </FormContainer>
    </>
  );
};

export default OrderScreen;
