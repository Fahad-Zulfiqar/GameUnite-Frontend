import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "pk_test_51PcmDVJgX0ysL3FLKE6roebxz9VbhwJumQBO2oGTEOAQuBA56sqSUlZ6jxWXFDMcsaXm4vauqeIeCtlr4FM3LpVU00iffFr7FU"
);

export default stripePromise;
