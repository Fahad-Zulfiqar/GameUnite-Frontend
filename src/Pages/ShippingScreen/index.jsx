import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FormContainer from "../../components/FormContainer";
import { saveShippingAddress } from "../../slices/cardSlice";
import CheckoutSteps from "../../components/CheckoutSteps";

const ShippingScreen = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [emailAddress, setEmailAddress] = useState(
    shippingAddress?.emailAddress || ""
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(saveShippingAddress({ emailAddress }));
    navigate("/payment");
    // console.log("submit");
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 />
      <h1>Destination</h1>

      <Form onSubmit={submitHandler}>
        <Form.Group controlId="email address" className="my-2">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter email address"
            value={emailAddress}
            onChange={(e) => setEmailAddress(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type="submit" variant="primary" className="my-2">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ShippingScreen;
